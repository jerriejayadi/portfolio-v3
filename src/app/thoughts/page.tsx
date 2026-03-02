import { ThoughtsList } from "@/components/templates/ThoughtsList";
import { client } from "@/sanity/client";
import { THOUGHTS_QUERY } from "@/sanity/lib/queries";
import { PortfolioItem } from "@/types";
import { sortPortfolioItems } from "@/lib/utils";

export default async function ThoughtPage() {
  const thoughts = await client.fetch(THOUGHTS_QUERY);
  console.log("thoughts", thoughts);

  // Transform to PortfolioItem
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: PortfolioItem[] = thoughts.map((t: any) => ({
    id: t.id,
    title: t.title,
    slug: t.slug,
    path: `/thoughts/${t.slug}`,
    type: "Thought",
    status: "Published",
    techStack: ["Markdown"],
    lastCommit: new Date(t.publishedAt).toLocaleDateString(),
    startedAt: t.publishedAt,
    publishedAt: t.publishedAt,
    snippet: t.snippet,
    iconName: "FileText",
    iconColor: "text-yellow-400",
    iconBg: "bg-surface",
    hoverColor: "group-hover:text-yellow-300",
    hoverBorder: "group-hover:border-yellow-400/50",
    badgeColor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    statusColor: "bg-slate-500",
    preview: {
      ...t.preview,
      title: "SNIPPET",
      statusColor: "bg-slate-500",
      content: t.snippet,
    },
  }));

  return <ThoughtsList items={sortPortfolioItems(items)} />;
}

