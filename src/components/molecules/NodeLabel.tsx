import { cn } from "@/lib/utils";

interface NodeLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function NodeLabel({ children, className }: NodeLabelProps) {
  return (
    <span
      className={cn(
        "mt-3 px-3 py-1 bg-surface/80 backdrop-blur rounded text-xs font-bold text-text-primary uppercase tracking-widest border border-surface-border transition-colors duration-300",
        className,
      )}
    >
      {children}
    </span>
  );
}

