// ═══════════════════════════════════════
// PROGRESS BAR — animated skill indicator
// ═══════════════════════════════════════

"use client";

import { motion } from "framer-motion";
import { progressBarFill, viewportOnce } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

export default function ProgressBar({
  percentage,
  className = "",
}: ProgressBarProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`w-full h-[2px] bg-bg-elevated overflow-hidden ${className}`}
    >
      {reducedMotion ? (
        <div
          className="h-full bg-accent-primary"
          style={{ width: `${percentage}%` }}
        />
      ) : (
        <motion.div
          className="h-full bg-accent-primary"
          variants={progressBarFill(percentage)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        />
      )}
    </div>
  );
}
