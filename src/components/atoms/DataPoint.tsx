import { cn } from "@/lib/utils";

interface DataPointProps {
  children: React.ReactNode;
  className?: string;
}

export function DataPoint({ children, className }: DataPointProps) {
  return (
    <div
      className={cn(
        "text-[10px] font-mono text-slate-600 opacity-50 select-none pointer-events-none",
        className,
      )}
    >
      {children}
    </div>
  );
}

