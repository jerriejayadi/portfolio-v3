"use client";

import {
  Code,
  Eye,
  Rocket,
  FlaskConical,
  FileText,
  ChevronRight,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/atoms/Card";
import { PortfolioItem } from "@/types";

type Project = PortfolioItem;

const ICON_MAP = {
  Briefcase: Briefcase,
  FlaskConical: FlaskConical,
  FileText: FileText,
};

// ─── Sub-components ─────────────────────────────────────────────────────────

interface ProjectCardImageProps {
  src: string;
  alt: string;
}

export function ProjectCardImage({ src, alt }: ProjectCardImageProps) {
  return (
    <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden bg-surface-hover">
      <img
        alt={alt}
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        src={src}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent md:bg-gradient-to-r"></div>
    </div>
  );
}

interface ProjectCardContentProps {
  project: Project;
}

export function ProjectCardContent({ project }: ProjectCardContentProps) {
  return (
    <div className="flex-1 p-6 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.status && (
            <span
              className={cn(
                "text-[10px] font-mono border px-2 py-0.5 rounded",
                project.status === "FINISHED"
                  ? "border-green-500/30 text-green-400 bg-green-500/10"
                  : "border-yellow-500/30 text-yellow-400 bg-yellow-500/10",
              )}
            >
              {project.status === "FINISHED" ? "FINISHED" : "BETA"}
            </span>
          )}
          {project.startedAt && (
            <span className="text-[10px] font-mono border px-2 py-0.5 rounded border-surface-border text-text-muted bg-surface/50 ml-2">
              {new Date(project.startedAt).getFullYear()}
            </span>
          )}
        </div>
        <p className="text-text-secondary text-sm leading-relaxed mb-4">
          {project.preview?.description ||
            "A high-fidelity project leveraging modern web technologies."}
        </p>
      </div>

      {/* Buttons */}
      {/* <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/5">
        <button className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary text-primary-light hover:text-white border border-primary/30 rounded text-xs font-bold font-mono transition-all">
          <Code className="size-3.5" />
          SOURCE_CODE
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 rounded text-xs font-bold font-mono transition-all">
          <Eye className="size-3.5" />
          LIVE_FEED
        </button>
      </div> */}
      <div className="flex text-xs text-text-muted group-hover:text-primary transition-colors">
        Read More <ChevronRight className="size-4" />
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const iconName = project.iconName || "Briefcase";
  const Icon = ICON_MAP[iconName] || Code;
  const image = project.preview?.image;

  return (
    <Card>
      {/* Image Section - Conditionally Rendered */}
      {image ? (
        <ProjectCardImage src={image} alt={`${project.title} thumbnail`} />
      ) : null}

      {/* Content Section */}
      <ProjectCardContent project={project} />
    </Card>
  );
}

