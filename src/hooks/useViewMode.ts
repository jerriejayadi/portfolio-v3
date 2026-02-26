"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function useViewMode() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Determine current "Mode"
  const isDetailPage =
    pathname.includes("/projects") ||
    pathname.includes("/thoughts") ||
    pathname.includes("/profile") ||
    pathname.includes("/labs");

  // Default to 'map' if no param is present on Home
  const currentView = isDetailPage
    ? "detail"
    : searchParams.get("view") || "map";

  // 2. The Toggle Function
  const setView = useCallback(
    (view: "map" | "list" | string) => {
      if (isDetailPage) {
        // If on detail page, clicking "Map" sends you Home
        if (view === "map") router.push("/?view=map");
        // Clicking "List" sends you Home List
        if (view === "list") router.push("/?view=list");
      } else {
        // If on Home, just update the param (shallow update)
        // Note: In Next.js App Router, router.push is the way to update params.
        // We use scroll: false to prevent jumping to top if already there.
        router.push(`/?view=${view}`, { scroll: false });
      }
    },
    [isDetailPage, router],
  );

  return { currentView, setView, isDetailPage };
}

