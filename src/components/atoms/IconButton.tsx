import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: "ghost" | "outline" | "primary";
  size?: "sm" | "md";
  label?: string;
}

function IconButton({
  icon: Icon,
  variant = "outline",
  size = "md",
  label,
  className,
  ...props
}: IconButtonProps) {
  const variants = {
    ghost: "text-text-muted hover:text-text-primary hover:bg-surface-hover/20",
    outline:
      "bg-surface border border-surface-border hover:border-primary/50 text-text-primary",
    primary:
      "bg-primary hover:bg-primary-light text-white shadow-lg shadow-primary/25",
  };

  const sizes = {
    sm: "size-8 text-sm",
    md: "h-9 px-4 text-sm",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-bold transition-all",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      <Icon className={cn("size-[18px]", label && "mr-2")} />
      {label && <span>{label}</span>}
    </button>
  );
}

export { IconButton };
export type { IconButtonProps };

