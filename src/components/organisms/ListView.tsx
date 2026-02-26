"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { DataTable, ColumnDef } from "./DataTable";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CareerLogTimeline } from "./CareerLogTimeline";
import { Badge } from "@/components/atoms/Badge";
import {
  MapPin,
  Terminal,
  Code2,
  Rocket,
  FlaskConical,
  FileText,
  Eye,
  Code,
} from "lucide-react";

const ICON_MAP = {
  Rocket: Rocket,
  FlaskConical: FlaskConical,
  FileText: FileText,
  Eye: Eye,
};

// Mock data imported from @/data/mockData

import { Experience } from "./CareerLogTimeline";

import { PortfolioItem } from "@/types";
import Link from "next/link";

export function ListView({
  experiences = [],
  items = [],
}: {
  experiences?: Experience[];
  items?: PortfolioItem[];
}) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("ALL");
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 6;

  // Filter Categories
  const filters = [
    { label: "ALL", value: "ALL" },
    { label: "PROJECTS", value: "Project" },
    { label: "LABS", value: "Lab" },
    { label: "THOUGHTS", value: "Thought" },
  ];

  // Derived State: Filtered & Sorted Items
  const filteredItems = React.useMemo(() => {
    let currentItems = [...items];

    // 1. Search (Same logic)
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      currentItems = currentItems.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerQuery) ||
          (item.techStack &&
            item.techStack.some((tech) =>
              tech.toLowerCase().includes(lowerQuery),
            )) ||
          item.type.toLowerCase().includes(lowerQuery),
      );
    }

    // 2. Filter (Same logic)
    if (activeFilter !== "ALL") {
      currentItems = currentItems.filter((item) => item.type === activeFilter);
    }

    // 3. Sort (Same logic)
    if (sortConfig) {
      currentItems.sort((a, b) => {
        // @ts-expect-error - dynamic access for simple sort
        const aValue = a[sortConfig.key];
        // @ts-expect-error - dynamic access
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return currentItems;
  }, [searchQuery, activeFilter, sortConfig, items]);

  // Pagination Logic (Same logic)
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handlers (Same logic)
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleFilter = (value: string) => {
    setActiveFilter(value);
    setCurrentPage(1);
  };

  // Columns Configuration
  const columns: ColumnDef<PortfolioItem>[] = [
    {
      header: "Name",
      accessorKey: "title",
      sortKey: "title",
      className: "col-span-12 sm:col-span-5 md:col-span-4",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "p-2 rounded border border-surface-border transition-colors",
              "bg-surface",
              item.iconColor,
              item.hoverBorder,
            )}
          >
            {(() => {
              const IconComponent = item.iconName
                ? ICON_MAP[item.iconName]
                : Code;
              return <IconComponent className="size-[18px]" />;
            })()}
          </div>
          <div>
            <h3
              className={cn(
                "text-sm font-bold text-text-primary transition-colors",
                item.hoverColor,
              )}
            >
              {item.title}
            </h3>
            <p className="text-[10px] text-text-secondary font-mono block">
              {item.path}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "type",
      sortKey: "type",
      className: "col-span-2 hidden md:flex items-center",
      cell: (item) => (
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-[10px] font-mono uppercase",
            item.badgeColor,
          )}
        >
          {item.type}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      sortKey: "status",
      className: "col-span-3 md:col-span-2 hidden sm:flex items-center",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <span
            className={cn("size-1.5 rounded-full", item.statusColor)}
          ></span>
          <span className="text-xs text-text-secondary font-mono">
            {item.status}
          </span>
        </div>
      ),
    },
    {
      header: "Tech Stack",
      className: "col-span-2 hidden md:flex items-center",
      cell: (item) => (
        <div className="flex items-center gap-1 text-[10px] text-text-muted font-mono">
          {item.techStack?.map((tech, i) => (
            <span key={tech}>
              {tech}
              {i < (item.techStack?.length || 0) - 1 ? "," : ""}
            </span>
          ))}
        </div>
      ),
    },
    {
      header: "Last Commit",
      accessorKey: "lastCommit",
      sortKey: "lastCommit",
      align: "right",
      className:
        "col-span-4 md:col-span-2 hidden sm:flex items-center justify-end",
      cellClassName: "text-right font-mono text-xs text-text-muted",
    },
  ];

  // Hover Preview Extra Renderer
  const renderRowExtra = (item: PortfolioItem) => {
    if (!item.preview) return null;
    return (
      <div className="telemetry-preview hidden absolute left-[60%] top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-300 opacity-0 translate-x-4">
        <div className="w-64 bg-background-main/95 backdrop-blur-xl border border-surface-border rounded-lg shadow-2xl p-3">
          <div className="flex items-center justify-between mb-2 border-b border-surface-border/50 pb-2">
            <span
              className={cn("text-[10px] font-mono uppercase", item.iconColor)}
            >
              {item.preview.title}
            </span>
            <span
              className={cn("size-1.5 rounded-full", item.preview.statusColor)}
            ></span>
          </div>
          {item.preview.image ? (
            <div className="h-28 w-full rounded bg-surface-hover mb-2 overflow-hidden border border-surface-border">
              <Image
                alt={`${item.title} preview`}
                fill
                className="object-cover opacity-80"
                src={item.preview.image}
                loader={({ src }) => src}
              />
            </div>
          ) : (
            item.preview.content && (
              <div className="p-2 bg-background-main/80 rounded border border-surface-border mb-2">
                <p className="font-mono text-[10px] text-text-muted italic">
                  {item.preview.content}
                </p>
              </div>
            )
          )}

          <p className="text-[10px] text-text-muted leading-relaxed font-mono">
            {item.preview.description}
          </p>
        </div>
      </div>
    );
  };

  // Navigation Handler
  const router = useRouter();

  const handleRowClick = (item: PortfolioItem) => {
    if (item.type === "Project") {
      router.push(item.path);
    } else if (item.type === "Thought") {
      router.push(item.path);
    } else if (item.type === "Lab") {
      // Optional: Handle Lab items or default navigation
      router.push(item.path);
    }
  };

  return (
    <div className="relative z-10 flex flex-col h-full w-full bg-background-main ">
      <main className="flex-1 h-full relative overflow-hidden  flex flex-col md:flex-row">
        <div className="flex flex-col overflow-auto w-full md:w-[25%] h-full bg-surface/30 order-1">
          {/* Profile Header */}
          <div className="flex flex-col items-center  p-6  gap-4 shrink-0">
            <Link href="/profile" className="relative group ">
              {/* Glow backdrop */}
              <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse-slow" />

              {/* Avatar circle */}
              <div className="relative size-32 md:size-40 rounded-full bg-surface border-2 border-primary shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105">
                <Image
                  src="/images/profile.jpg"
                  alt="Developer Portrait"
                  fill
                  className="object-cover opacity-100 group-hover:opacity-100 transition-opacity"
                  priority
                />
              </div>

              {/* Orbiting rings */}
              <div className="absolute -inset-1 border border-primary/30 rounded-full animate-spin-slow" />
              <div className="absolute -inset-4 border border-dashed border-surface-border/50 rounded-full animate-spin-slow-reverse" />
            </Link>

            <Link href="/profile" className="text-center space-y-1">
              <h2 className="text-base font-bold text-text-primary">
                Jerrie Jayadi
              </h2>
              <div className="flex items-center justify-center gap-2 text-xs text-primary font-mono bg-primary/10 px-3 py-1 rounded-full w-fit mx-auto border border-primary/20">
                <Terminal className="size-3.5" />
                <span>Frontend Engineer</span>
              </div>
            </Link>

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

          {/* Timeline Scroll Area */}
        </div>
        <div className="flex-1 flex flex-col h-full overflow-auto border- md:border-x border-surface-border order-3 md:order-2">
          <DataTable>
            {/* Toolbar */}
            <DataTable.Toolbar
              searchValue={searchQuery}
              onSearchChange={handleSearch}
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={handleFilter}
              searchPlaceholder="Search directory..."
            ></DataTable.Toolbar>

            {/* Data-Driven Content */}
            <DataTable.Content
              data={paginatedItems}
              columns={columns}
              sortConfig={sortConfig}
              onSort={handleSort}
              renderRowExtra={renderRowExtra}
              onRowClick={handleRowClick}
            />

            {/* Footer / Pagination */}
            <DataTable.Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </DataTable>
        </div>

        {/* Sidebar */}
        {/* <div className="hidden lg:flex w-80 flex-col border-l border-surface-border bg-background-main/50 backdrop-blur-sm z-20">
          <div className="p-4 border-b border-surface-border">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest font-mono">
              System Status
            </h3>
          </div>
          <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-surface p-3 rounded border border-surface-border">
                  <span className="block text-2xl font-bold text-text-primary mb-1">
                    12
                  </span>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider font-mono">
                    Active Nodes
                  </span>
                </div>
                <div className="bg-surface p-3 rounded border border-surface-border">
                  <span className="block text-2xl font-bold text-primary mb-1">
                    98%
                  </span>
                  <span className="text-[10px] text-text-secondary uppercase tracking-wider font-mono">
                    Uptime
                  </span>
                </div>
              </div>
              <div className="w-full bg-surface rounded-full h-1.5 mb-2 overflow-hidden border border-surface-border">
                <div
                  className="bg-linear-to-r from-primary to-purple-500 h-1.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-text-secondary">
                <span>Storage Usage</span>
                <span>750MB / 1GB</span>
              </div>
            </div>
            <div className="mb-8">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest font-mono mb-4">
                Activity Log
              </h4>
              <div className="space-y-4">
                <div className="relative pl-4 border-l border-surface-border">
                  <div className="absolute -left-[3px] top-1.5 size-1.5 bg-primary rounded-full"></div>
                  <p className="text-xs text-text-primary mb-0.5">
                    Updated dependencies
                  </p>
                  <p className="text-[10px] text-text-secondary font-mono">
                    Today, 09:42 AM
                  </p>
                </div>
                <div className="relative pl-4 border-l border-surface-border">
                  <div className="absolute -left-[3px] top-1.5 size-1.5 bg-green-500 rounded-full"></div>
                  <p className="text-xs text-text-primary mb-0.5">
                    Deployed &#39;SaaS Dashboard&#39;
                  </p>
                  <p className="text-[10px] text-text-secondary font-mono">
                    Yesterday, 14:20 PM
                  </p>
                </div>
                <div className="relative pl-4 border-l border-surface-border">
                  <div className="absolute -left-[3px] top-1.5 size-1.5 bg-slate-600 rounded-full"></div>
                  <p className="text-xs text-text-primary mb-0.5">
                    Archived &#39;Legacy Blog&#39;
                  </p>
                  <p className="text-[10px] text-text-secondary font-mono">
                    Oct 24, 2023
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#0d0d1a] border border-surface-border rounded p-3 font-mono text-[10px]">
              <div className="flex gap-1.5 mb-2 opacity-50">
                <div className="size-2 rounded-full bg-red-500"></div>
                <div className="size-2 rounded-full bg-yellow-500"></div>
                <div className="size-2 rounded-full bg-green-500"></div>
              </div>
              <div className="text-slate-300">
                <span className="text-primary">user@garden</span>:~$ status
                <br />
                <span className="text-green-400">
                  ✔ All systems operational
                </span>
                <br />
                <span className="text-slate-500">Scanning directories...</span>
                <br />
                <span className="text-slate-500">9 items found.</span>
                <br />
                <span className="text-primary">user@garden</span>:~$
                <span className="animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div> */}
        <div className="overflow-y-auto  custom-scrollbar bg-background-main/30 w-full md:w-[25%] order-2 md:order-3">
          <div className="p-2 sticky top-0 z-20 bg-linear-to-b from-background-main/90 to-transparent">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest font-mono ">
              Career Timeline
            </h3>
          </div>
          <div className="p-2">
            <CareerLogTimeline data={experiences} />
          </div>
        </div>
      </main>
    </div>
  );
}

