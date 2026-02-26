"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";
import { NodeLabel } from "@/components/molecules/NodeLabel";
import { HoverCard } from "@/components/molecules/HoverCard";
import { SkillSatellite } from "@/components/molecules/SkillSatellite";

/* ─── Types ────────────────────────────────────────────────── */
interface HoverCardConfig {
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  tags?: { label: string; variant?: "primary" | "neutral" }[];
  position?:
    | "left"
    | "right"
    | "top"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "bottom";
}

interface GardenNodeProps {
  icon: LucideIcon;
  label: string;
  /** Tailwind absolute position classes, e.g. "top-[25%] left-[80%]" */
  position: string;
  /** Node circle size */
  size?: "sm" | "md" | "lg";
  /** Hover border accent color */
  hoverColor?: string;
  /** Float animation variant */
  animation?: "float" | "float-delayed";
  /** Child satellites for skill nodes */
  satellites?: {
    label: string | React.ReactNode;
    icon?: string;
    iconAlt?: string;
    className: string;
  }[];
  /** Hover card config (built-in content) */
  hoverCard?: HoverCardConfig;
  /** Interaction mode: "hover" shows card on hover, "toggle" shows on click */
  interactionMode?: "hover" | "toggle";
  /** Custom content rendered inside the hover card shell (overrides built-in card content) */
  customContent?: (onClose: () => void) => React.ReactNode;
  /** Click handler for the node (runs in addition to toggle behaviour) */
  onClick?: () => void;
  className?: string;
}

const sizeMap = {
  sm: "size-14",
  md: "size-16",
  lg: "size-20",
};

const iconSizeMap = {
  sm: "size-5",
  md: "size-6",
  lg: "size-7",
};

/* ─── Component ────────────────────────────────────────────── */
export function GardenNode({
  icon: Icon,
  label,
  position,
  size = "md",
  hoverColor = "hover:border-primary hover:shadow-[0_0_20px_rgba(17,17,212,0.5)]",
  animation = "float",
  satellites = [],
  hoverCard,
  interactionMode = "hover",
  customContent,
  onClick,
  className,
}: GardenNodeProps) {
  const [open, setOpen] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);

  const isToggle = interactionMode === "toggle";
  const hasCard = !!(hoverCard || customContent);

  /* ── Click-outside handler for toggle mode ── */
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (nodeRef.current && !nodeRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isToggle && open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isToggle, open, handleClickOutside]);

  /* ── Node click ── */
  const handleClick = () => {
    if (isToggle && (hasCard || satellites.length > 0)) {
      setOpen((prev) => !prev);
    }
    onClick?.();
  };

  return (
    <div
      ref={nodeRef}
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 z-20",
        animation === "float" ? "animate-float" : "animate-float-delayed",
        position,
        className,
      )}
    >
      <div className="relative flex flex-col items-center">
        {/* Main node circle */}
        <div
          className={cn(
            "bg-surface border border-surface-border rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer z-20 hover:bg-surface-hover",
            sizeMap[size],
            hoverColor,
            // Always apply peer class if we have satellites or card in hover mode
            (hasCard || satellites.length > 0) &&
              interactionMode === "hover" &&
              "peer",
          )}
          onClick={handleClick}
        >
          <Icon
            className={cn(
              "text-text-primary transition-colors duration-300",
              iconSizeMap[size],
            )}
          />
        </div>

        {/* Label */}
        <NodeLabel>{label}</NodeLabel>

        {/* Satellites */}
        {satellites.map((sat, index) => {
          const isHover = interactionMode === "hover";
          return (
            <SkillSatellite
              key={`sat-${index}`}
              label={sat.label}
              icon={sat.icon}
              iconAlt={sat.iconAlt}
              className={cn(
                "absolute transition-all duration-300",
                sat.className,
                isHover
                  ? "opacity-0 scale-0 peer-hover:opacity-100 peer-hover:scale-100"
                  : open
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0",
              )}
            />
          );
        })}

        {/* Hover / Toggle card */}
        {hasCard && (
          <HoverCard
            {...(hoverCard ?? {})}
            mode={interactionMode}
            visible={open}
            className="w-auto min-w-64"
          >
            {customContent?.(() => setOpen(false))}
          </HoverCard>
        )}
      </div>
    </div>
  );
}

