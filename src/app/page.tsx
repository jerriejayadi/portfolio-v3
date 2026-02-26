import React from "react";
import { client } from "@/sanity/client";
import { EXPERIENCES_QUERY } from "@/sanity/lib/queries";
import { HomeContent } from "@/components/templates/HomeContent";

import { PROJECTS_QUERY, THOUGHTS_QUERY } from "@/sanity/lib/queries";
import { PortfolioItem } from "@/types";

export default async function Home() {
  let experiences = [];
  let projects = [];
  let thoughts = [];
  
  try {
    const [expData, projData, thoughtsData] = await Promise.all([
      client.fetch(EXPERIENCES_QUERY),
      client.fetch(PROJECTS_QUERY),
      client.fetch(THOUGHTS_QUERY)
    ]);
    experiences = expData;
    projects = projData;
    thoughts = thoughtsData;
  } catch (error) {
    console.error("Sanity fetch failed:", error);
    // Fallback to empty arrays allow checking env vars without crash
  }

  // Transform Sanity data to UI PortfolioItem format
  const portfolioItems: PortfolioItem[] = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...projects.map((p: any): PortfolioItem => ({
      id: p.id,
      title: p.title,
      slug: p.slug, // Keep slug for internal use if needed
      path: p.type === "Project" ? `/projects/${p.slug}` : `/labs/${p.slug}`,
      type: p.type || "Project",
      status: p.status,
      techStack: p.techStack,
      lastCommit: p.lastCommit,
      description: p.description,
      preview: p.preview,
      iconName: p.type === "Project" ? "Rocket" : "FlaskConical",
      iconColor: p.type === "Project" ? "text-primary" : "text-purple-400",
      iconBg: "bg-surface",
      hoverColor: p.type === "Project" ? "group-hover:text-primary-light" : "group-hover:text-purple-300",
      hoverBorder: p.type === "Project" ? "group-hover:border-primary/50" : "group-hover:border-purple-400/50",
      badgeColor: p.type === "Project" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-purple-500/10 text-purple-400 border-purple-500/20",
      statusColor: p.status === "Stable" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]",
    })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...thoughts.map((t: any): PortfolioItem => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      path: `/thoughts/${t.slug}`,
      type: "Thought",
      status: "Published",
      techStack: ["Markdown"],
      lastCommit: new Date(t.publishedAt).toLocaleDateString(),
      snippet: t.snippet,
      iconName: "FileText",
      iconColor: "text-yellow-400",
      hoverBorder: "group-hover:border-yellow-400/50",
      badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      statusColor: "bg-slate-500",
      preview: {
        ...t.preview,
        title: "SNIPPET",
        statusColor: "bg-slate-500",
        content: t.snippet
      }
    }))
  ];

  return (
    <React.Suspense fallback={null}>
      <HomeContent 
        experiences={experiences} 
        portfolioItems={portfolioItems} 
      />
    </React.Suspense>
  );
}

