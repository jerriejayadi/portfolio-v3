"use client";

import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineContent,
} from "@/components/atoms/Timeline";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Building2,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Download,
} from "lucide-react";
import { Markdown } from "@/components/atoms/Markdown";

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: { start: string; end?: string };
  description: string;
  skills: string[];
  current?: boolean;
  companyLogo?: string;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatPeriod(period: Experience["period"]) {
  const start = formatDate(period.start);
  const end = period.end ? formatDate(period.end) : "Present";
  return `${start} — ${end}`;
}

import { useState, useRef, useEffect } from "react";
import { Button } from "../atoms/Button";
import Link from "next/link";

function ExpandableDescription({ content }: { content: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(
        textRef.current.scrollHeight > textRef.current.clientHeight,
      );
    }
  }, [content]);

  return (
    <div className="flex flex-col items-start mb-4">
      <div
        ref={textRef}
        className={cn(
          "text-sm text-text-secondary leading-relaxed transition-all",
          !isExpanded && "line-clamp-3 max-h-[4.5rem] overflow-hidden",
        )}
      >
        <Markdown>{content}</Markdown>
      </div>
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary hover:text-primary-light hover:underline text-xs mt-1 font-medium flex items-center gap-0.5"
        >
          {isExpanded ? (
            <>
              Show Less <ChevronUp className="size-3" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="size-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

export function CareerLogTimeline({ data = [] }: { data?: Experience[] }) {
  return (
    <Timeline className="relative">
      {data.map((exp) => (
        <TimelineItem key={exp.id}>
          <div className="flex gap-4 w-full">
            <TimelineConnector isActive={exp.current}>
              {exp.companyLogo ? (
                <img
                  src={exp.companyLogo}
                  alt={exp.company}
                  className="object-cover w-full h-full rounded-[100%]"
                />
              ) : (
                <Briefcase className="size-4" />
              )}
            </TimelineConnector>

            <TimelineContent>
              <div className="flex flex-col justify-between gap-2 mb-2">
                <div>
                  <h3
                    className={cn(
                      "text-lg font-bold flex items-center gap-2 shrink-0 ",
                      exp.current ? "text-primary" : "text-text-primary",
                    )}
                  >
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-text-secondary mt-0.5">
                    <Building2 className="size-3.5" />

                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-text-muted font-mono bg-surface-hover/50 px-2 py-1 rounded border border-surface-border/30 w-fit text-nowrap">
                  <Calendar className="size-3" />
                  {formatPeriod(exp.period)}
                </div>
              </div>

              <ExpandableDescription content={exp.description} />

              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="neutral"
                    className="bg-surface text-text-secondary border-surface-border"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </TimelineContent>
          </div>
        </TimelineItem>
      ))}

      {/* End Node */}
      <TimelineItem>
        <div className="flex gap-4">
          <TimelineConnector isEnd />
          <div className="pt-2 text-sm text-text-muted/50 font-mono">
            {"// Initializing career.exe..."}
          </div>
        </div>
      </TimelineItem>
      <div className="sticky bottom-4 right-4  flex justify-end">
        <Link href="/CV - Tjiauw Jerrie Jayadi.pdf" download>
          <Button
            icon={Download}
            variant="primary"
            className="w-fit  h-auto aspect-square rounded-[100%]!"
          />
        </Link>
      </div>
    </Timeline>
  );
}

