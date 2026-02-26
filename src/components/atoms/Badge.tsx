import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "neutral";
  className?: string;
}

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  const variants = {
    primary: "bg-primary/20 text-primary-light",
    neutral: "bg-surface-hover text-text-secondary border border-surface-border",
  };

  return (
    <span
      className={cn(
        "text-[10px] px-1.5 py-0.5 rounded inline-block",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

