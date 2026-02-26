import { ProjectList } from "@/components/templates/ProjectList";
import { client } from "@/sanity/client";
import { PROJECTS_QUERY } from "@/sanity/lib/queries";
import { PortfolioItem } from "@/types";

export default async function ProjectsPage() {
  const projects = await client.fetch(PROJECTS_QUERY);

  // Transform to PortfolioItem (duplicate logic from home, should be shared but inline for now)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items: PortfolioItem[] = projects.map((p: any) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
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
  }));

  return <ProjectList items={items} />;
}

