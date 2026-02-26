"use client";

import { BackgroundEffects } from "@/components/organisms/BackgroundEffects";
import React from "react";
import { useViewMode } from "@/hooks/useViewMode";
import { MapView } from "@/components/organisms/MapView";
import { ListView } from "@/components/organisms/ListView";
import { PortfolioItem, Experience } from "@/types";

export function HomeContent({ 
  experiences, 
  portfolioItems 
}: { 
  experiences: Experience[],
  portfolioItems: PortfolioItem[]
}) {
  const { currentView } = useViewMode();

  return (
    <>
      {/* Background layer */}
      <BackgroundEffects />

      {currentView === "list" ? (
        <ListView experiences={experiences} items={portfolioItems} />
      ) : (
        /* UI overlay */
        <MapView experiences={experiences} />
      )}
    </>
  );
}
