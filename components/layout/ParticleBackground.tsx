// ═══════════════════════════════════════
// PARTICLE MESH BACKGROUND
// Enhanced canvas for capable devices
// Falls back to CSS grid overlay (handled in globals.css)
// ═══════════════════════════════════════

"use client";

import { useEffect, useRef, useState } from "react";
import { detectCapabilities } from "@/lib/performance";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const MAX_NODES = 60;
const MAX_EDGES = 120;
const MAX_EDGE_DISTANCE = 150;
const DRIFT_SPEED = 0.15;
const NODE_COLOR = "rgba(255,255,255,0.35)";
const EDGE_COLOR = "rgba(255,255,255,0.06)";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const caps = detectCapabilities();
    if (!caps.canRunParticles) return;

    setShouldRender(true);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Debounced resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 300);
    };

    resize();

    // Initialize nodes
    const nodes: Node[] = [];
    for (let i = 0; i < MAX_NODES; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * DRIFT_SPEED * 2,
        vy: (Math.random() - 0.5) * DRIFT_SPEED * 2,
      });
    }
    nodesRef.current = nodes;

    let isVisible = true;

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    };

    function draw() {
      if (!isVisible || !ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;
      }

      // Draw edges (up to MAX_EDGES)
      let edgeCount = 0;
      ctx.strokeStyle = EDGE_COLOR;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < nodes.length && edgeCount < MAX_EDGES; i++) {
        for (let j = i + 1; j < nodes.length && edgeCount < MAX_EDGES; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_EDGE_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
            edgeCount++;
          }
        }
      }

      // Draw nodes
      ctx.fillStyle = NODE_COLOR;
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    }

    animFrameRef.current = requestAnimationFrame(draw);

    window.addEventListener("resize", debouncedResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
      aria-hidden="true"
    />
  );
}
