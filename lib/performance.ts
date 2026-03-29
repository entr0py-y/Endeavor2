// ═══════════════════════════════════════
// DEVICE CAPABILITY DETECTION
// Determines if enhanced canvas background should run
// ═══════════════════════════════════════

export interface DeviceCapabilities {
  canRunParticles: boolean;
  prefersReducedMotion: boolean;
  coreCount: number;
  memoryGB: number | null;
}

export function detectCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return {
      canRunParticles: false,
      prefersReducedMotion: false,
      coreCount: 0,
      memoryGB: null,
    };
  }

  const coreCount = navigator.hardwareConcurrency || 2;

  // deviceMemory is not available in all browsers — check existence
  const memoryGB =
    "deviceMemory" in navigator
      ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? null
      : null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Fallback triggers: low core count, low memory, or reduced motion
  const isLowEnd =
    coreCount <= 4 || (memoryGB !== null && memoryGB <= 2);

  const canRunParticles = !isLowEnd && !prefersReducedMotion;

  return {
    canRunParticles,
    prefersReducedMotion,
    coreCount,
    memoryGB,
  };
}
