// ═══════════════════════════════════════
// SECTION HEADER — section number + title + subtitle
// ═══════════════════════════════════════

import type { SectionMeta } from "@/lib/types";

interface SectionHeaderProps {
  meta: SectionMeta;
  className?: string;
}

export default function SectionHeader({
  meta,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <span className="font-mono text-label-xs text-text-dim tracking-[0.2em] block mb-4">
        [{meta.number}]
      </span>
      <h2 className="font-sans text-display-lg font-bold text-text-primary text-glow mb-3">
        {meta.title}
      </h2>
      {meta.subtitle && (
        <p className="font-mono text-body-sm text-text-muted">{meta.subtitle}</p>
      )}
    </div>
  );
}
