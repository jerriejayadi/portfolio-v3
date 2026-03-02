"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/atoms/Badge";
import { Markdown } from "@/components/atoms/Markdown";
import { MapPin, Terminal, Code2, ChevronLeft } from "lucide-react";

interface ProfileViewProps {
  content?: string;
}

export function ProfileView({ content }: ProfileViewProps) {
  return (
    <div className="relative z-10 flex flex-col h-full w-full bg-background-main">
      <main className="flex-1 h-full relative overflow-hidden flex flex-col md:flex-row">
        {/* ── Left sidebar: profile card ── */}
        <div className="flex flex-col overflow-auto w-full md:w-[25%] h-full bg-surface/30 order-1">
          <div className="flex flex-col items-center p-6 gap-4 shrink-0">
            {/* Avatar */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse-slow" />
              <div className="relative size-32 md:size-40 rounded-full bg-surface border-2 border-primary shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105">
                <Image
                  src="/images/profile.jpg"
                  alt="Developer Portrait"
                  fill
                  className="object-cover opacity-100 group-hover:opacity-100 transition-opacity"
                  priority
                />
              </div>
              <div className="absolute -inset-1 border border-primary/30 rounded-full animate-spin-slow" />
              <div className="absolute -inset-4 border border-dashed border-surface-border/50 rounded-full animate-spin-slow-reverse" />
            </div>

            {/* Name & Role */}
            <div className="text-center space-y-1">
              <h2 className="text-base font-bold text-text-primary">
                Jerrie Jayadi
              </h2>
              <div className="flex items-center justify-center gap-2 text-xs text-primary font-mono bg-primary/10 px-3 py-1 rounded-full w-fit mx-auto border border-primary/20">
                <Terminal className="size-3.5" />
                <span>Frontend Engineer</span>
              </div>
            </div>

            {/* Location & Status */}
            <div className="flex flex-col gap-2 text-xs text-text-secondary w-full px-2">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-text-muted" />
                <span>Surabaya, Indonesia</span>
              </div>
              <div className="flex items-center gap-2 ml-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>Delivering complex apps</span>
              </div>
            </div>

            {/* Bio / Comment Block */}
            <div className="w-full bg-surface-hover/30 rounded p-3 text-xs font-mono text-text-muted border border-surface-border/50">
              <span className="text-text-muted/60">{"/**"}</span>
              <br />
              <span className="text-text-muted/60">
                {" * 3+ years experience in Logistics & Fintech."}
              </span>
              <br />
              <span className="text-text-muted/60">
                {" * Specialized in dashboards & real-time systems."}
              </span>
              <br />
              <span className="text-text-muted/60">
                {" * React, Next.js, and TypeScript expert."}
              </span>
              <br />
              <span className="text-text-muted/60">{" */"}</span>
            </div>

            {/* Skills */}
            <div className="w-full">
              <div className="flex items-center gap-2 text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
                <Code2 className="size-3.5" />
                <span>Core Stack</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind",
                  "Redux",
                  "Zustand",
                  "Google Maps API",
                ].map((skill) => (
                  <Badge
                    key={skill}
                    variant="neutral"
                    className="text-[10px] py-0.5 px-2"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Right content area: markdown ── */}
        <div
          className={cn(
            "flex-1 flex flex-col h-full overflow-auto border-x border-surface-border order-2",
          )}
        >
          <div className="w-full mx-auto p-6 md:p-10 overflow-y-auto custom-scrollbar">
            {content ? (
              <article className="prose dark:prose-invert prose-headings:font-mono prose-p:font-sans prose-a:text-primary max-w-none">
                <Markdown>{content}</Markdown>
              </article>
            ) : (
              <div className="flex items-center justify-center h-full text-text-muted font-mono text-sm">
                <p>
                  {
                    "// No content yet. Add content from Sanity Studio → Profile."
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

