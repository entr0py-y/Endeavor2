// ═══════════════════════════════════════
// CARD — general purpose container
// ═══════════════════════════════════════

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`bg-bg-surface border border-border rounded p-6 transition-all duration-200 ${
        hover
          ? "hover:border-border-strong hover:scale-[1.02]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
