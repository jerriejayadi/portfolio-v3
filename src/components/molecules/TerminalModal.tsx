"use client";

import { cn } from "@/lib/utils";
import { TerminalHeader } from "@/components/molecules/TerminalHeader";
import { Button } from "../atoms/Button";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface TerminalModalProps {
  open: boolean;
  onClose: () => void;
  filename?: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalModal({
  open,
  onClose,
  filename,
  children,
  className,
}: TerminalModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className={cn(
          "w-full max-w-lg bg-surface border border-surface-border rounded-lg shadow-2xl flex flex-col transition-colors duration-300",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <TerminalHeader
            filename={filename}
            className="flex-1 rounded-tr-none"
            onClose={onClose}
          />
        </div>

        {/* Content */}
        <div className="p-4 font-mono text-sm leading-relaxed text-text-secondary overflow-y-auto max-h-[70vh] custom-scrollbar">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

