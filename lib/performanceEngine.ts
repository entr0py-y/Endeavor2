import { detectCapabilities } from "./performance";

export function getPerformanceEngine() {
    let targetFrameTime = 16.6; // Default to ~60fps
    
    return {
        start: () => {
            if (typeof window !== "undefined") {
                const caps = detectCapabilities();
                if (caps.prefersReducedMotion) {
                    targetFrameTime = Infinity; // Completely halt particle renders
                } else if (!caps.canRunParticles) {
                    targetFrameTime = 33.3; // Throttle low-end devices to 30fps
                } else {
                    targetFrameTime = 16.6; // Let rAF run unbounded on max specs
                }
            }
        },
        shouldRenderFrame: (lastRenderTime: number): boolean => {
            if (targetFrameTime === Infinity) return false;
            // Native smooth rAF handling for max frame limits without arbitrary blocking
            if (targetFrameTime === 16.6) return true; 
            
            const now = performance.now();
            return (now - lastRenderTime) >= targetFrameTime;
        }
    };
}
