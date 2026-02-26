"use client";

import React from "react";
import { cn } from "@/lib/utils";

/* ─── Atomic Timeline Components ───────────────────────────── */

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-8 relative pl-4", className)}
      {...props}
    >
      {/* Vertical line background */}
      <div className="absolute left-8.75 top-2 bottom-2 w-px bg-surface-border/50" />
      {children}
    </div>
  ),
);
Timeline.displayName = "Timeline";

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative group flex gap-4", className)}
      {...props}
    >
      {children}
    </div>
  ),
);
TimelineItem.displayName = "TimelineItem";

interface TimelineConnectorProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean;
  isEnd?: boolean;
}

const TimelineConnector = React.forwardRef<
  HTMLDivElement,
  TimelineConnectorProps
>(({ className, isActive, isEnd, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("relative z-10 flex flex-col items-center mt-1", className)}
    {...props}
  >
    {isEnd ? (
      <div className="w-10 h-10 rounded-full border border-surface-border/30 flex items-center justify-center bg-surface text-text-muted/30">
        <div className="w-2 h-2 rounded-full bg-current" />
      </div>
    ) : (
      <div
        className={cn(
          "w-10 h-10 rounded-full border flex items-center justify-center bg-surface transition-colors duration-300",
          isActive
            ? "border-primary text-primary shadow-[0_0_10px_rgba(34,211,238,0.3)]"
            : "border-surface-border text-text-muted group-hover:border-primary/50 group-hover:text-primary/80",
        )}
      >
        {children}
      </div>
    )}
  </div>
));
TimelineConnector.displayName = "TimelineConnector";

interface TimelineContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const TimelineContent = React.forwardRef<HTMLDivElement, TimelineContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 rounded-lg", className)} {...props}>
      {children}
    </div>
  ),
);
TimelineContent.displayName = "TimelineContent";

export { Timeline, TimelineItem, TimelineConnector, TimelineContent };
