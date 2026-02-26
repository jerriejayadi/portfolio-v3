import { cn } from "@/lib/utils";
import { TerminalHeader } from "@/components/molecules/TerminalHeader";

interface TerminalCardProps {
  filename?: string;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function TerminalCard({
  filename,
  onClose,
  className,
  children,
}: TerminalCardProps) {
  return (
    <div
      className={cn(
        "bg-surface border border-surface-border rounded-lg shadow-2xl flex flex-col transition-colors duration-300",
        className,
      )}
    >
      <TerminalHeader filename={filename} onClose={onClose} />
      <div className="p-4 font-mono text-sm leading-relaxed text-text-secondary overflow-y-auto max-h-[70vh] custom-scrollbar">
        {children}
      </div>
    </div>
  );
}

