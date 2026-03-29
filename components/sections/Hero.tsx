// ═══════════════════════════════════════
// HERO SECTION
// Left: typewriter name + CTAs
// Right: abstract mesh sphere (SVG)
// ═══════════════════════════════════════

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { fadeInUp, staggerContainer, staggerItem, viewportOnce } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { HeroData } from "@/lib/types";

interface HeroProps {
  data: HeroData;
}

export default function Hero({ data }: HeroProps) {
  const reducedMotion = useReducedMotion();
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // One-time typewriter effect on mount
  useEffect(() => {
    if (reducedMotion) {
      setTypedText(data.name);
      setShowCursor(false);
      return;
    }

    let index = 0;
    const text = data.name;
    const interval = setInterval(() => {
      index++;
      setTypedText(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(interval);
        // Hide cursor after finishing
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [data.name, reducedMotion]);

  return (
    <section
      id="identity"
      className="relative snap-section"
    >
      <div className="w-full max-w-container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column — Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              variants={staggerItem}
              className="font-mono text-body-sm text-text-muted mb-2"
            >
              {data.greeting}
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="font-sans text-display-xl font-bold text-accent-primary text-glow-strong mb-4 min-h-[64px]"
            >
              {typedText}
              {showCursor && (
                <span className="inline-block w-[3px] h-[56px] bg-accent-primary ml-1 align-middle animate-pulse" />
              )}
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="font-mono text-label-xs text-text-muted tracking-[0.12em] uppercase mb-4"
            >
              {data.role}
            </motion.p>

            <motion.p
              variants={staggerItem}
              className="font-sans text-body-md text-text-muted mb-8 max-w-md"
            >
              {data.description}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex gap-4 flex-wrap"
            >
              <Button variant="primary" href={data.primaryCta.href}>
                {data.primaryCta.label}
              </Button>
              <Button variant="secondary" href={data.secondaryCta.href}>
                {data.secondaryCta.label}
              </Button>
            </motion.div>
          </motion.div>

          {/* Right column — Abstract mesh sphere SVG */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <div className="group relative w-[400px] h-[400px] flex items-center justify-center">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full transition-transform duration-300 group-hover:rotate-[8deg]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Mesh sphere — [ASSUMED FROM REF] wireframe geodesic sphere */}
                {/* Outer ring */}
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.5"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="120"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="90"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.5"
                />
                {/* Horizontal ellipses */}
                <ellipse
                  cx="200"
                  cy="200"
                  rx="150"
                  ry="50"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                />
                <ellipse
                  cx="200"
                  cy="200"
                  rx="150"
                  ry="100"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.5"
                />
                {/* Rotated ellipses for geodesic feel */}
                <ellipse
                  cx="200"
                  cy="200"
                  rx="50"
                  ry="150"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                />
                <ellipse
                  cx="200"
                  cy="200"
                  rx="100"
                  ry="150"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="0.5"
                />
                {/* Diagonal cross lines */}
                <line x1="80" y1="80" x2="320" y2="320" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <line x1="320" y1="80" x2="80" y2="320" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <line x1="200" y1="50" x2="200" y2="350" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                {/* Mesh vertices — dots at intersections */}
                {[
                  [200, 50], [200, 350], [50, 200], [350, 200],
                  [110, 110], [290, 110], [110, 290], [290, 290],
                  [200, 80], [200, 320], [80, 200], [320, 200],
                  [140, 140], [260, 140], [140, 260], [260, 260],
                  [200, 110], [200, 290], [110, 200], [290, 200],
                  [170, 95], [230, 95], [170, 305], [230, 305],
                  [95, 170], [95, 230], [305, 170], [305, 230],
                  [200, 150], [150, 200], [250, 200], [200, 250],
                ].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r={i % 4 === 0 ? 2.5 : 1.5}
                    fill="rgba(255,255,255,0.35)"
                  />
                ))}
                {/* Connection lines between nearby vertices */}
                {[
                  [[200, 50], [170, 95]],
                  [[200, 50], [230, 95]],
                  [[170, 95], [110, 110]],
                  [[230, 95], [290, 110]],
                  [[170, 95], [200, 110]],
                  [[230, 95], [200, 110]],
                  [[110, 110], [140, 140]],
                  [[290, 110], [260, 140]],
                  [[200, 110], [140, 140]],
                  [[200, 110], [260, 140]],
                  [[140, 140], [200, 150]],
                  [[260, 140], [200, 150]],
                  [[140, 140], [150, 200]],
                  [[260, 140], [250, 200]],
                  [[150, 200], [200, 250]],
                  [[250, 200], [200, 250]],
                  [[50, 200], [95, 170]],
                  [[50, 200], [95, 230]],
                  [[350, 200], [305, 170]],
                  [[350, 200], [305, 230]],
                  [[95, 170], [110, 110]],
                  [[95, 230], [110, 290]],
                  [[305, 170], [290, 110]],
                  [[305, 230], [290, 290]],
                  [[110, 290], [140, 260]],
                  [[290, 290], [260, 260]],
                  [[140, 260], [200, 250]],
                  [[260, 260], [200, 250]],
                  [[200, 350], [170, 305]],
                  [[200, 350], [230, 305]],
                  [[170, 305], [110, 290]],
                  [[230, 305], [290, 290]],
                  [[170, 305], [200, 290]],
                  [[230, 305], [200, 290]],
                ].map(([[x1, y1], [x2, y2]], i) => (
                  <line
                    key={`line-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="0.5"
                  />
                ))}
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide bottom framing line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-subtle" />
    </section>
  );
}
