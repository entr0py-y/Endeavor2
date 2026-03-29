import React, { useEffect, useRef } from 'react';
import { getPerformanceEngine } from '@/lib/performanceEngine';

interface DotGridBackgroundProps {
    isInverted?: boolean;
    currentSection?: number;
}

export default function DotGridBackground({ isInverted = false, currentSection = 0 }: DotGridBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const animationRef = useRef<number>();
    const isInvertedRef = useRef(isInverted);
    const sectionIndexRef = useRef(currentSection); // Moved up to use inside animate
    const transitionProgress = useRef(isInverted ? 1 : 0); // 0 = normal, 1 = inverted
    const performanceEngineRef = useRef<ReturnType<typeof getPerformanceEngine> | null>(null);
    const lastRenderTimeRef = useRef(0);
    const scaleRef = useRef(2); // Start at scale 2 (Low Density for Section 0)

    // Update refs when props change
    useEffect(() => {
        isInvertedRef.current = isInverted;
    }, [isInverted]);

    useEffect(() => {
        sectionIndexRef.current = currentSection;
    }, [currentSection]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize performance engine
        performanceEngineRef.current = getPerformanceEngine();
        performanceEngineRef.current.start();

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Configuration - optimized for performance
        // BASE_SPACING is High Density (Slides 2,3,4)
        const BASE_SPACING = 65; 
        const dotRadius = 0.8;
        const waveSpeed = 0.0012; // Faster wave animation
        const waveAmplitude = 4; // More noticeable movement
        const cursorRadius = 100;
        const cursorStrength = 8;
        const transitionSpeed = 0.02;
        const scaleSpeed = 0.03;

        let cols = 0;
        let rows = 0;
        let dots: { baseX: number; baseY: number }[] = [];
        let width = 0;
        let height = 0;
        let lastFrameTime = 0;

        // ... (noise and lerp functions omitted for brevity if unchanged, but included for complete replacement context) ...
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 1.5); // Cap DPR for performance
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);

            // Generate enough dots for High Density (Scale 1) to cover screen even when scaled
            // When Scale = 2 (Low Density), dots spread out, so we need fewer visible, but we always render full set
            // actually we need to generate for the SMALLEST spacing to ensure coverage scaling down?
            // Wait, we are scaling UP spacing.
            // Scale 1 = 65px spacing. Scale 2 = 130px spacing.
            // We need enough dots to cover screen at spacing 65px (Scale 1).
            cols = Math.ceil(width / BASE_SPACING) + 4; // Extra padding
            rows = Math.ceil(height / BASE_SPACING) + 4;

            // Offset to center the grid and extend beyond edges
            const offsetX = (width - cols * BASE_SPACING) / 2;
            const offsetY = (height - rows * BASE_SPACING) / 2;

            dots = [];
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    dots.push({
                        baseX: offsetX + col * BASE_SPACING,
                        baseY: offsetY + row * BASE_SPACING,
                    });
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouseRef.current.x = -1000;
            mouseRef.current.y = -1000;
        };

        let startTime = Date.now();

        const animate = (currentTime: number) => {
            // Use performance engine for adaptive frame timing
            const engine = performanceEngineRef.current;
            if (engine && !engine.shouldRenderFrame(lastRenderTimeRef.current)) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }
            lastRenderTimeRef.current = currentTime;
            lastFrameTime = currentTime;

            const elapsed = (Date.now() - startTime) * waveSpeed;
            const targetColorProgress = isInvertedRef.current ? 1 : 0;

            // Smooth transition for scale (density)
            // Alternate dot grid scaling every slide (Even slides = Scale 2 / Odd slides = Scale 1)
            const activeSec = sectionIndexRef.current;
            const targetScale = (activeSec % 2 === 0) ? 2 : 1;
            
            scaleRef.current += (targetScale - scaleRef.current) * scaleSpeed;
            const currentScale = scaleRef.current;

            // center for scaling
            const cx = width / 2;
            const cy = height / 2;

            // Smooth transition towards target color
            transitionProgress.current += (targetColorProgress - transitionProgress.current) * transitionSpeed;
            const progress = transitionProgress.current;

            // Clear canvas completely to make it transparent
            // Allows the global monochrome CSS --bg-base to shine through
            ctx.clearRect(0, 0, width, height);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            // Pre-calculate common values for performance
            const cursorRadiusSquared = cursorRadius * cursorRadius;
            const halfElapsed = elapsed * 0.5;

            // Draw dots - always white on all slides with glow
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';

            // Group dots by shadow blur to batch drawing and reduce state changes
            const normalDots: { x: number; y: number; radius: number; opacity: number }[] = [];
            const glowDots: { x: number; y: number; radius: number; opacity: number; blur: number }[] = [];

            // First pass: calculate all dot properties
            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];
                
                // *** Apply Scale Logic ***
                // Scale from center
                const scaledX = cx + (dot.baseX - cx) * currentScale;
                const scaledY = cy + (dot.baseY - cy) * currentScale;

                // Offscreen culling (loose bounds)
                if (scaledX < -50 || scaledX > width + 50 || scaledY < -50 || scaledY > height + 50) continue;

                // Calculate wave displacement (scaled by density inverse so it looks consistent?)
                // Actually keep wave consistent in world space
                const waveX = Math.cos(halfElapsed + dot.baseY * 0.01) * waveAmplitude;
                const waveY = Math.sin(halfElapsed + dot.baseX * 0.01) * waveAmplitude;

                const finalX = scaledX + waveX;
                const finalY = scaledY + waveY;

                // Calculate distance to cursor using squared distance first (avoid sqrt when possible)
                const dx = mx - finalX;
                const dy = my - finalY;
                const distSquared = dx * dx + dy * dy;

                // Breathing/Pulsing Effect
                const randomOffset = (dot.baseX * 13 + dot.baseY * 19);
                const pulseT = halfElapsed + randomOffset;
                const currentOpacity = 0.4 + (Math.sin(pulseT) * 0.5 + 0.5) * 0.5;

                let currentRadius = 1.5; // Base radius
                let shiftX = 0, shiftY = 0;

                if (distSquared < cursorRadiusSquared) {
                    const dist = Math.sqrt(distSquared);
                    const magFactor = 1 - dist / cursorRadius;
                    currentRadius += magFactor * 4;

                    const force = magFactor;
                    const angle = Math.atan2(dy, dx);
                    shiftX = Math.cos(angle) * force * cursorStrength;
                    shiftY = Math.sin(angle) * force * cursorStrength;

                    glowDots.push({
                        x: finalX + shiftX,
                        y: finalY + shiftY,
                        radius: currentRadius / Math.sqrt(currentScale), // Adjust size slightly based on scale? Optional.
                        opacity: currentOpacity,
                        blur: 12 + magFactor * 15
                    });
                } else {
                    normalDots.push({
                        x: finalX,
                        y: finalY,
                        radius: currentRadius,
                        opacity: currentOpacity
                    });
                }
            }

            // Second pass: batch draw normal dots (same shadow blur)
            ctx.shadowBlur = 12;
            for (let i = 0; i < normalDots.length; i++) {
                const dot = normalDots[i];
                ctx.globalAlpha = dot.opacity;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            // Third pass: draw glow dots (varying shadow blur - fewer of these)
            for (let i = 0; i < glowDots.length; i++) {
                const dot = glowDots[i];
                ctx.shadowBlur = dot.blur;
                ctx.globalAlpha = dot.opacity;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            animationRef.current = requestAnimationFrame(animate);
        };

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []); // Empty dependency array, relies entirely on sectionIndexRef to prevent canvas re-mounts on slide change
    
    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none transition-colors duration-500"
            aria-hidden="true"
        />
    );
}
