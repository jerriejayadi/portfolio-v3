import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

import { PortfolioItem } from "@/types";

export function sortPortfolioItems(items: PortfolioItem[]) {
  return [...items].sort((a, b) => {
    // 1. Status: ON_PROGRESS -> FINISHED
    const statusWeight = (status?: string) => {
      if (status === "ON_PROGRESS") return 1;
      if (status === "FINISHED") return 2;
      return 3;
    };
    const weightA = statusWeight(a.status);
    const weightB = statusWeight(b.status);
    if (weightA !== weightB) return weightA - weightB;

    // 2. Types: PROJECTS -> LABS -> THOUGHTS
    const typeWeight = (type: string) => {
      // Handle the different variations of types
      const t = type.toUpperCase();
      if (t.includes("PROJECT")) return 1;
      if (t.includes("LAB")) return 2;
      if (t.includes("THOUGHT")) return 3;
      return 4;
    };
    const tWeightA = typeWeight(a.type);
    const tWeightB = typeWeight(b.type);
    if (tWeightA !== tWeightB) return tWeightA - tWeightB;

    // 3. Created Date (startedAt or publishedAt) descending
    const dateA =
      a.startedAt || a.publishedAt
        ? new Date(a.startedAt || a.publishedAt!).getTime()
        : 0;
    const dateB =
      b.startedAt || b.publishedAt
        ? new Date(b.startedAt || b.publishedAt!).getTime()
        : 0;

    return dateB - dateA;
  });
}

