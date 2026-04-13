// ═══════════════════════════════════════
// HERO SECTION
// Left: typewriter name + CTAs
// Right: abstract mesh sphere (SVG)
// ═══════════════════════════════════════

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { staggerContainer, staggerItem } from "@/lib/animations";
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
        </div>
      </div>

      {/* Slide bottom framing line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-border-subtle" />
    </section>
  );
}
