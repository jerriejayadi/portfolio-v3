import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ghost" | "outline" | "primary" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  icon?: LucideIcon; // Optional icon (prepended by default)
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "outline",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      children,
      ...props
    },
    ref,
  ) => {
    const variants = {
      ghost:
        "text-text-muted hover:text-text-primary hover:bg-surface-hover/20",
      outline:
        "bg-surface border border-surface-border hover:bg-white/20 hover:border-primary/50 text-text-primary",
      primary:
        "bg-primary hover:bg-primary-light text-white shadow-lg shadow-primary/25",
      danger:
        "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/50",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-9 px-4 text-sm",
      lg: "h-11 px-8 text-base",
      icon: "size-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-bold transition-all disabled:opacity-50 disabled:pointer-events-none hover:cursor-pointer",
          variants[variant],
          sizes[size],
          className,
          children && "gap-2",
        )}
        {...props}
      >
        {Icon && iconPosition === "left" && (
          <Icon className={cn("size-[18px]")} />
        )}
        {children}
        {Icon && iconPosition === "right" && (
          <Icon className={cn("size-[18px]")} />
        )}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
