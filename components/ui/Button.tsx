// ═══════════════════════════════════════
// BUTTON — primary and secondary variants
// ═══════════════════════════════════════

interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  variant,
  children,
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 font-mono text-label-xs uppercase tracking-[0.12em] transition-all duration-200 rounded";

  const variants = {
    primary:
      "bg-accent-primary text-[#080808] hover:bg-[#E0E0E0] border border-transparent",
    secondary:
      "bg-transparent text-text-primary border border-border-strong hover:border-accent-primary hover:text-accent-primary",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} type="button">
      {children}
    </button>
  );
}
