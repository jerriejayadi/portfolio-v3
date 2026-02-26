"use client";

import { Activity, Power } from "lucide-react";
import { PortfolioItem } from "@/types";

interface ProjectDetailsSidebarProps {
  project: PortfolioItem;
}

export function ProjectDetailsSidebar({ project }: ProjectDetailsSidebarProps) {
  return (
    <div className="hidden md:flex w-full md:w-1/3 lg:w-1/4 bg-[#0a0a14]/80 border-l border-surface-border p-6 font-mono text-xs overflow-y-auto custom-scrollbar  flex-col relative">
      <div className="absolute top-0 right-0 p-2 opacity-20 pointer-events-none">
        <Activity className="size-16" />
      </div>

      {/* Tech Stack Analysis */}
      <div className="mb-6">
        <h4 className="text-slate-500 uppercase tracking-widest mb-4 text-[10px] font-bold">
          {"/// TECH_STACK_ANALYSIS"}
        </h4>
        <div className="space-y-4">
          {project.techStack?.map((tech, index) => (
             <div key={index}>
              <div className="text-primary mb-1">Tech {index + 1}</div>
              <div className="text-white bg-white/5 p-2 rounded border border-white/10">
                {tech}
              </div>
            </div>
          ))}
          {!project.techStack?.length && (
            <div className="text-slate-500 text-xs italic">No tech stack defined.</div>
          )}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-6">
        <h4 className="text-slate-500 uppercase tracking-widest mb-4 text-[10px] font-bold">
          {"/// PERFORMANCE_METRICS"}
        </h4>
        <div className="bg-black/30 p-3 rounded border border-white/5 space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-400">Bundle Size:</span>
            <span className="text-green-400">42KB (gzipped)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">FCP:</span>
            <span className="text-green-400">0.8s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Lighthouse:</span>
            <span className="text-green-400">98/100</span>
          </div>
          <div className="w-full bg-slate-800 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-green-500 w-[98%] h-full"></div>
          </div>
        </div>
      </div>

      {/* Exit Button */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <button className="w-full py-3 border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all rounded font-mono font-bold text-xs flex items-center justify-center gap-2 group">
          <Power className="size-4 group-hover:rotate-90 transition-transform" />
          exit_process()
        </button>
      </div>
    </div>
  );
}

