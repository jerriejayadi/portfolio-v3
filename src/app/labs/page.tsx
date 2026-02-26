import { LabsList } from "@/components/templates/LabsList";
import { client } from "@/sanity/client";
import { LABS_QUERY } from "@/sanity/lib/queries";
import { PortfolioItem } from "@/types";

export default async function LabsPage() {
  const labs = await client.fetch(LABS_QUERY);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: PortfolioItem[] = labs.map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    path: `/labs/${p.slug}`,
    type: "Lab",
    status: p.status,
    techStack: p.techStack,
    lastCommit: p.lastCommit,
    description: p.description,
    preview: p.preview,
    iconName: "FlaskConical" as const,
    iconColor: "text-purple-400",
    iconBg: "bg-surface",
    hoverColor: "group-hover:text-purple-300",
    hoverBorder: "group-hover:border-purple-400/50",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    statusColor:
      p.status === "Stable"
        ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"
        : "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]",
  }));

  return <LabsList items={items} />;
}

