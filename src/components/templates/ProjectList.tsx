"use client";

import { PortfolioItem } from "@/types";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { ProjectDetailsSidebar } from "@/components/organisms/ProjectDetailsSidebar";
import { ContentView } from "@/components/organisms/ContentView";
import { useRouter } from "next/navigation";

interface ProjectListProps {
  items?: PortfolioItem[];
  selectedId?: string;
}

export function ProjectList({ items = [], selectedId }: ProjectListProps) {
  const router = useRouter();

  const selectedProject = items.find((p) => p.id === selectedId) || items[0];

  return (
    <ContentView
      title="projects-list.md"
      onClose={() => {
        router.push(`/?view=map`);
      }}
      className="p-1! md:p-12!"
    >
      {/* Left: Project List */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col relative">
        <div className="font-mono text-xs text-text-muted mb-6">
          Displaying {items.length} repositories...
        </div>
        <div className="space-y-8 pb-10">
          {items.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                router.push(project.path);
              }}
              className="cursor-pointer"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Sidebar */}
      {selectedProject && <ProjectDetailsSidebar project={selectedProject} />}
    </ContentView>
  );
}

