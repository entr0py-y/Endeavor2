// ═══════════════════════════════════════════════════════════════
// TESSERACT BACKGROUND
// A true 4D hypercube (tesseract) projected to 2D, slowly
// rotating through 4D space. Sized to fill the entire viewport.
// Cursor interaction tilts the 4D projection.
//
// Performance:
//   • 16 vertices + 32 edges = trivial geometry
//   • FPS-capped rAF loop (30 high / 20 low)
//   • Visibility API pause
//   • Zero React re-renders
// ═══════════════════════════════════════════════════════════════

"use client";

import { useEffect, useRef } from "react";

// ─── Config ──────────────────────────────────────────────────
interface TesseractConfig {
  /** Tesseract edge length (half-size in world units). */
  cubeSize: number;
  /** 4D rotation speed (radians/sec per plane). */
  rotationSpeed: number;
  /** Perspective distance for 4D→3D projection. */
  perspective4D: number;
  /** Perspective distance for 3D→2D projection. */
  perspective3D: number;
  /** Cursor interaction radius in CSS px. */
  interactionRadius: number;
  /** How much cursor tilts rotation (radians). */
  cursorTiltStrength: number;
  /** FPS cap. */
  fpsCap: number;
  fpsCapLowEnd: number;
}

const DEFAULT_CONFIG: TesseractConfig = {
  cubeSize: 1.6,
  rotationSpeed: 0.15,
  perspective4D: 2.5,
  perspective3D: 4.0,
  interactionRadius: 250,
  cursorTiltStrength: 0.18,
  fpsCap: 30,
  fpsCapLowEnd: 20,
};

// ─── 4D Hypercube topology ───────────────────────────────────
function generateVertices(s: number): number[][] {
  const verts: number[][] = [];
  for (let i = 0; i < 16; i++) {
    verts.push([
      (i & 1 ? s : -s),
      (i & 2 ? s : -s),
      (i & 4 ? s : -s),
      (i & 8 ? s : -s),
    ]);
  }
  return verts;
}

function generateEdges(): [number, number][] {
  const edges: [number, number][] = [];
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      const diff = i ^ j;
      if (diff === 1 || diff === 2 || diff === 4 || diff === 8) {
        edges.push([i, j]);
      }
    }
  }
  return edges;
}

// ─── 4D rotation ─────────────────────────────────────────────
function rotate4D(
  v: number[],
  out: number[],
  angleXW: number,
  angleYZ: number,
  angleXY: number,
  angleZW: number
) {
  let x = v[0], y = v[1], z = v[2], w = v[3];

  // XW plane
  let cosA = Math.cos(angleXW), sinA = Math.sin(angleXW);
  let nx = x * cosA - w * sinA;
  let nw = x * sinA + w * cosA;
  x = nx; w = nw;

  // YZ plane
  cosA = Math.cos(angleYZ); sinA = Math.sin(angleYZ);
  let ny = y * cosA - z * sinA;
  let nz = y * sinA + z * cosA;
  y = ny; z = nz;

  // XY plane (cursor-driven tilt)
  cosA = Math.cos(angleXY); sinA = Math.sin(angleXY);
  nx = x * cosA - y * sinA;
  ny = x * sinA + y * cosA;
  x = nx; y = ny;

  // ZW plane (slow secondary rotation)
  cosA = Math.cos(angleZW); sinA = Math.sin(angleZW);
  nz = z * cosA - w * sinA;
  nw = z * sinA + w * cosA;
  z = nz; w = nw;

  out[0] = x; out[1] = y; out[2] = z; out[3] = w;
}

// ─── Project 4D → 2D ────────────────────────────────────────
function project(v4: number[], p4D: number, p3D: number): { x: number; y: number; depth: number } {
  const w = 1 / (p4D - v4[3]);
  const x3 = v4[0] * w;
  const y3 = v4[1] * w;
  const z3 = v4[2] * w;

  const w2 = 1 / (p3D - z3);
  return {
    x: x3 * w2,
    y: y3 * w2,
    depth: w * w2,
  };
}

// ─── Device tier ─────────────────────────────────────────────
function detectTier(): "high" | "low" | "static" {
  if (typeof window === "undefined") return "static";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  const cores = navigator.hardwareConcurrency ?? 2;
  const mem = "deviceMemory" in navigator
    ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8 : 8;
  if (cores <= 4 || mem <= 4) return "low";
  return "high";
}

// ─── Component ───────────────────────────────────────────────
interface TesseractBackgroundProps {
  currentSection?: number;
  config?: Partial<TesseractConfig>;
}

export default function TesseractBackground({
  currentSection = 0,
  config: userConfig,
}: TesseractBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const sectionRef = useRef(currentSection);

  useEffect(() => { sectionRef.current = currentSection; }, [currentSection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const cfg = { ...DEFAULT_CONFIG, ...userConfig };
    const tier = detectTier();
    const isLowEnd = tier === "low";
    const interactionEnabled = tier === "high";
    const frameInterval = 1000 / (isLowEnd ? cfg.fpsCapLowEnd : cfg.fpsCap);

    // ── Tesseract geometry (allocated once) ──────────────────
    const verts4D = generateVertices(cfg.cubeSize);
    const edges = generateEdges();
    const rotated = verts4D.map(() => [0, 0, 0, 0]);
    const projected: { x: number; y: number; depth: number }[] = verts4D.map(() => ({
      x: 0, y: 0, depth: 0,
    }));

    // ── Canvas ──────────────────────────────────────────────
    let W = 0, H = 0;
    let scale = 0;
    const dpr = Math.min(window.devicePixelRatio, 1.5);

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      // Scale tesseract to fill the viewport (use larger dimension for full coverage)
      scale = Math.max(W, H) * 0.42;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      canvas!.style.width = `${W}px`;
      canvas!.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // ── Cursor ──────────────────────────────────────────────
    const cursor = { x: -9999, y: -9999, nx: 0, ny: 0 };

    function onMouseMove(e: MouseEvent) {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
      cursor.nx = (e.clientX / W - 0.5) * 2;
      cursor.ny = (e.clientY / H - 0.5) * 2;
    }
    function onMouseLeave() {
      cursor.x = -9999; cursor.y = -9999;
      cursor.nx = 0; cursor.ny = 0;
    }

    if (interactionEnabled) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave);
    }

    // ── Visibility ──────────────────────────────────────────
    let paused = false;
    function onVisibility() { paused = document.hidden; }
    document.addEventListener("visibilitychange", onVisibility);

    // ── Resize (debounced) ──────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    }
    window.addEventListener("resize", onResize);

    resize();

    // ── Interaction squared radius ──────────────────────────
    const irSq = cfg.interactionRadius * cfg.interactionRadius;

    // ── Smoothed cursor tilt ────────────────────────────────
    let tiltX = 0, tiltY = 0;

    // ── DRAW: Tesseract ─────────────────────────────────────
    function drawTesseract(time: number) {
      const t = time * 0.001;
      const speed = cfg.rotationSpeed;

      // Smooth cursor tilt (lerped)
      const targetTiltX = cursor.ny * cfg.cursorTiltStrength;
      const targetTiltY = cursor.nx * cfg.cursorTiltStrength;
      tiltX += (targetTiltX - tiltX) * 0.05;
      tiltY += (targetTiltY - tiltY) * 0.05;

      // Section-based subtle phase shift
      const sectionPhase = sectionRef.current * 0.4;

      // 4D rotation angles
      const angleXW = t * speed + sectionPhase;
      const angleYZ = t * speed * 0.7;
      const angleXY = tiltY;
      const angleZW = t * speed * 0.3;

      // Rotate and project all 16 vertices
      for (let i = 0; i < 16; i++) {
        rotate4D(verts4D[i], rotated[i], angleXW, angleYZ, angleXY + tiltX, angleZW);
        const p = project(rotated[i], cfg.perspective4D, cfg.perspective3D);
        projected[i].x = W * 0.5 + p.x * scale;
        projected[i].y = H * 0.5 + p.y * scale;
        projected[i].depth = p.depth;
      }

      // Depth range for normalization
      let minD = Infinity, maxD = -Infinity;
      for (let i = 0; i < 16; i++) {
        if (projected[i].depth < minD) minD = projected[i].depth;
        if (projected[i].depth > maxD) maxD = projected[i].depth;
      }
      const depthRange = maxD - minD || 1;

      // ── Draw 32 edges ───────────────────────────────────
      for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const pa = projected[a];
        const pb = projected[b];

        const avgDepth = ((pa.depth - minD) + (pb.depth - minD)) / (2 * depthRange);
        let alpha = 0.08 + avgDepth * 0.32;

        // Cursor glow on edges
        if (interactionEnabled) {
          const midX = (pa.x + pb.x) * 0.5;
          const midY = (pa.y + pb.y) * 0.5;
          const dx = cursor.x - midX;
          const dy = cursor.y - midY;
          const dSq = dx * dx + dy * dy;
          if (dSq < irSq) {
            alpha += (1 - dSq / irSq) * 0.3;
          }
        }

        ctx!.strokeStyle = `rgba(255, 255, 255, ${Math.min(alpha, 0.65)})`;
        ctx!.lineWidth = 0.6 + avgDepth * 1.2;
        ctx!.beginPath();
        ctx!.moveTo(pa.x, pa.y);
        ctx!.lineTo(pb.x, pb.y);
        ctx!.stroke();
      }

      // ── Draw 16 vertices ────────────────────────────────
      ctx!.fillStyle = "#ffffff";
      for (let i = 0; i < 16; i++) {
        const p = projected[i];
        const normalDepth = (p.depth - minD) / depthRange;
        let alpha = 0.25 + normalDepth * 0.65;
        let radius = 2 + normalDepth * 3;

        // Cursor proximity boost
        if (interactionEnabled) {
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < irSq) {
            const factor = 1 - dSq / irSq;
            alpha = Math.min(alpha + factor * 0.4, 1);
            radius += factor * 3;
          }
        }

        // Outer glow (cheap fake shadow)
        ctx!.globalAlpha = alpha * 0.15;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius * 3.5, 0, Math.PI * 2);
        ctx!.fill();

        // Core dot
        ctx!.globalAlpha = alpha;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    // ── Main loop ───────────────────────────────────────────
    let lastFrame = 0;

    function loop(time: number) {
      rafRef.current = requestAnimationFrame(loop);
      if (paused) return;

      const delta = time - lastFrame;
      if (delta < frameInterval) return;
      lastFrame = time - (delta % frameInterval);

      ctx!.clearRect(0, 0, W, H);
      drawTesseract(time);
    }

    if (tier === "static") {
      drawTesseract(0);
    } else {
      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(resizeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
