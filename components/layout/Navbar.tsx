// ═══════════════════════════════════════
// NAVBAR
// Fixed right rail on desktop, bottom bar on mobile
// [ASSUMED FROM REF] — vertical nav with section numbers
// ═══════════════════════════════════════

"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/types";

interface NavbarProps {
  items: NavItem[];
  brandLabel?: string;
}

export default function Navbar({ items, brandLabel = "<PORTFOLIO/>" }: NavbarProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(item.id);
          }
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [items]);

  return (
    <>
      {/* Brand mark — top left */}
      <div className="fixed top-6 left-6 z-50">
        <a
          href="#identity"
          className="font-mono text-label-xs text-text-primary tracking-[0.12em] uppercase hover:text-glow transition-all duration-200"
        >
          {brandLabel}
        </a>
      </div>

      {/* Desktop — fixed right rail */}
      <nav className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-1">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <a
              key={item.id}
              href={item.href}
              className={`group flex items-center gap-3 py-1.5 px-3 transition-all duration-200 border-l-2 ${
                isActive
                  ? "border-accent-primary text-text-primary"
                  : "border-transparent text-text-dim hover:text-text-muted"
              }`}
            >
              <span className="font-mono text-label-xs tracking-[0.2em]">
                {item.number}
              </span>
              <span className="font-mono text-label-xs tracking-[0.12em] uppercase">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Mobile — fixed bottom bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-bg-base/90 backdrop-blur-sm border-t border-border">
        <div className="flex items-center justify-around py-3 px-2">
          {items.map((item) => {
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 transition-colors duration-200 ${
                  isActive ? "text-text-primary" : "text-text-dim"
                }`}
              >
                <span className="font-mono text-[10px] tracking-[0.2em]">
                  {item.number}
                </span>
                <span className="font-mono text-[9px] tracking-[0.08em] uppercase">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
