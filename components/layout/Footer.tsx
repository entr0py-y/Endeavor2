// ═══════════════════════════════════════
// FOOTER
// Minimal monochrome footer
// ═══════════════════════════════════════

import type { FooterData } from "@/lib/types";

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  return (
    <footer className="relative py-12 border-t border-border">
      <div className="w-full max-w-container mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-label-xs text-text-dim tracking-[0.12em]">
            {data.copyright}
          </p>
          <p className="font-mono text-label-xs text-text-dim tracking-[0.12em]">
            {data.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
