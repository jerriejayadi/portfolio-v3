"use client";

import { useState, useEffect, useCallback } from "react";

/** Tailwind CSS default breakpoints (min-width) */
const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Reactive viewport hook aligned with Tailwind CSS breakpoints.
 *
 * Returns:
 * - `isMobile` — shortcut for `width < 768` (below `md`)
 * - `isViewport(bp)` — true when viewport width ≥ the given breakpoint
 * - `breakpoint` — the current active breakpoint name
 * - `width` — current window inner width
 */
export function useViewport() {
  const [width, setWidth] = useState(() => {
    if (typeof window === "undefined") return 1024; // SSR fallback
    return window.innerWidth;
  });

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /** Returns true when viewport width ≥ the given breakpoint */
  const isViewport = useCallback(
    (bp: Breakpoint) => width >= BREAKPOINTS[bp],
    [width],
  );

  /** Current active breakpoint name (largest breakpoint that matches) */
  const breakpoint: Breakpoint =
    (Object.entries(BREAKPOINTS) as [Breakpoint, number][])
      .slice()
      .reverse()
      .find(([, minWidth]) => width >= minWidth)?.[0] ?? "xs";

  const isMobile = width < BREAKPOINTS.md;

  return { isMobile, isViewport, breakpoint, width };
}

