// ═══════════════════════════════════════
// SHARED FRAMER MOTION VARIANTS
// All animation definitions live here.
// Components import these — never inline variant objects.
// ═══════════════════════════════════════

import type { Variants } from "framer-motion";

// Fade in + slide up — generic section entry
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Fade in only — no translation
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Stagger container — orchestrates children
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Stagger item — used by children inside a stagger container
export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// Progress bar fill animation
export const progressBarFill = (percentage: number): Variants => ({
  hidden: {
    width: "0%",
  },
  visible: {
    width: `${percentage}%`,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
});

// Scale on hover — cards and interactive elements
export const hoverScale = {
  scale: 1.02,
  transition: { duration: 0.2 },
};

// Viewport trigger config — used with whileInView
export const viewportOnce = {
  once: true,
  amount: 0.2,
};
