// ═══════════════════════════════════════
// BADGE — tag chips for project cards
// ═══════════════════════════════════════

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 font-mono text-label-xs uppercase tracking-[0.12em] text-text-muted border border-border-hover rounded transition-colors duration-200 hover:border-border-strong hover:text-text-primary ${className}`}
    >
      {children}
    </span>
  );
}
