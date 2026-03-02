"use client";

import { PortfolioItem } from "@/types";
import { ProjectCard } from "@/components/molecules/ProjectCard";
import { ProjectDetailsSidebar } from "@/components/organisms/ProjectDetailsSidebar";
import { ContentView } from "@/components/organisms/ContentView";
import { useRouter } from "next/navigation";

interface LabsListProps {
  items?: PortfolioItem[];
  selectedId?: string;
}

export function LabsList({ items = [], selectedId }: LabsListProps) {
  const router = useRouter();

  const selectedLab = items.find((p) => p.id === selectedId) || items[0];

  return (
    <ContentView
      title="labs-list.md"
      onClose={() => {
        router.push(`/?view=map`);
      }}
      className="p-1! md:p-12!"
    >
      {/* Left: Lab List */}
      <div className="w-full md:w-2/3 lg:w-3/4 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col relative">
        <div className="font-mono text-xs text-text-muted mb-6">
          Displaying {items.length} experiments...
        </div>
        <div className="space-y-8 pb-10">
          {items.map((lab) => (
            <div
              key={lab.id}
              onClick={() => {
                router.push(lab.path);
              }}
              className="cursor-pointer"
            >
              <ProjectCard project={lab} />
            </div>
          ))}
        </div>
      </div>

      {/* Right: Sidebar */}
      {selectedLab && <ProjectDetailsSidebar project={selectedLab} />}
    </ContentView>
  );
}

