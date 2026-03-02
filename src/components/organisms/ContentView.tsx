"use client";

import { cn } from "@/lib/utils";
import { TerminalHeader } from "../molecules/TerminalHeader";

interface ContentViewProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export function ContentView({
  title,
  children,
  onClose = () => window.history.back(),
  className,
}: ContentViewProps) {
  return (
    <main className="flex-1 relative pointer-events-none" id="garden-canvas">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 filter blur-sm">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center text-center scale-75">
          <div className="size-32 rounded-full bg-surface-dark border-2 border-primary/50"></div>
        </div>
        <div className="absolute top-[25%] left-[80%] size-16 bg-surface-hover rounded-full border border-surface-border"></div>
        <div className="absolute top-[30%] left-[20%] size-12 bg-surface-hover rounded-full border border-surface-border"></div>
        <div className="absolute top-[75%] left-[25%] size-10 bg-surface-hover rounded-full border border-surface-border"></div>
      </div>

      {/* Central Window */}
      <div
        className={cn(
          "z-50 flex w-full  items-center justify-center p-4 md:p-8 pointer-events-auto",
          className,
        )}
      >
        <div className="w-full max-w-6xl md:max-h-[75vh] glass-panel rounded-xl flex flex-col overflow-auto shadow-[0_0_50px_rgba(0,0,0,0.6)] animate-[fadeIn_0.5s_ease-out] border border-surface-border/50 relative">
          {/* Scanline Overlay */}
          <div className="absolute inset-0 scanline-overlay z-10 opacity-30 pointer-events-none"></div>

          {/* Window Title Bar */}
          <TerminalHeader filename={title} onClose={onClose} />
          {/* Content Split View */}
          <div className="flex flex-col md:flex-row h-[85vh] overflow-auto relative z-20">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

