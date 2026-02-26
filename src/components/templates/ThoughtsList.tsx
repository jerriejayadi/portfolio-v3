"use client";

import { ProjectCard } from "@/components/molecules/ProjectCard";
import { ProjectDetailsSidebar } from "@/components/organisms/ProjectDetailsSidebar";
import { ContentView } from "@/components/organisms/ContentView";
import { useRouter } from "next/navigation";
import { PortfolioItem } from "@/types";

interface ThoughtsListProps {
  items?: PortfolioItem[];
}

export function ThoughtsList({ items = [] }: ThoughtsListProps) {
  const router = useRouter();

  const selectedProject = items[0];

  return (
    <ContentView
      title="thoughts-list.md"
      onClose={() => {
        router.push(`/?view=map`);
      }}
      className="p-1! md:p-8!"
    >
      {/* Left: Project List */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col relative">
        <div className="font-mono text-xs text-slate-500 mb-6">
          Displaying {items.length} thoughts...
        </div>
        <div className="space-y-8 pb-10">
          {items.map((thought) => (
            <div
              key={thought.id}
              onClick={() => {
                router.push(thought.path);
              }}
              className="cursor-pointer"
            >
              <ProjectCard project={thought} />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Sidebar */}
      {selectedProject && <ProjectDetailsSidebar project={selectedProject} />}
    </ContentView>
  );
}
