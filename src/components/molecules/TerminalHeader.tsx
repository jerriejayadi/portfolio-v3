import { cn } from "@/lib/utils";
import { Expand, MoveDiagonal2, Terminal, X } from "lucide-react";

interface TerminalHeaderProps {
  filename?: string;
  className?: string;
  onClose?: () => void;
}

export function TerminalHeader({
  filename = "alex_profile.js",
  className,
  onClose,
}: TerminalHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-start gap-4 px-4 py-2 bg-surface-border/30 border-b border-surface-border rounded-t-lg cursor-pointer",
        className,
      )}
    >
      <div className="flex gap-1.5 group">
        <div className="size-2.5 flex items-center justify-center rounded-full bg-red-500">
          <X
            className="size-2 opacity-0 text-black group-hover:opacity-100"
            onClick={onClose}
          />
        </div>
        <div className="size-2.5 rounded-full bg-yellow-500 flex items-center justify-center text-black ">
          <span className="opacity-0 group-hover:opacity-100">-</span>
        </div>
        <div className="size-2.5 rounded-full bg-green-500 flex items-center justify-center">
          <MoveDiagonal2 className="size-2 opacity-0 text-black group-hover:opacity-100" />
        </div>
      </div>
      <div className="flex items-center gap-2 ">
        <Terminal className="size-3.5 text-text-muted" />
        <span className="text-xs font-mono text-text-secondary ">
          {filename}
        </span>
      </div>
    </div>
  );
}
