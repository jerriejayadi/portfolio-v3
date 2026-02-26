"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { useState } from "react";

interface ToggleItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface NavToggleGroupProps {
  items: ToggleItem[];
  defaultValue?: string;
  value?: string;
  className?: string;
  onCommand?: (value: string) => void;
}

export function NavToggleGroup({
  items,
  defaultValue,
  value,
  className,
  onCommand,
}: NavToggleGroupProps) {
  const [internalActive, setInternalActive] = useState(
    defaultValue ?? items[0]?.value,
  );

  const active = value ?? internalActive;

  const handleClick = (newValue: string) => {
    if (value === undefined) {
      setInternalActive(newValue);
    }
    onCommand?.(newValue);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-surface/50 p-1 rounded-lg border border-surface-border transition-colors duration-300",
        className,
      )}
    >
      {items.map((item) => {
        const isActive = active === item.value;
        return (
          <button
            key={item.value}
            onClick={() => handleClick(item.value)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all",
              isActive
                ? "bg-primary text-white shadow-lg shadow-primary/20"
                : "text-text-muted hover:text-text-primary hover:bg-surface-hover/50",
            )}
          >
            <item.icon className="size-4" />
            <span className="hidden md:block">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
