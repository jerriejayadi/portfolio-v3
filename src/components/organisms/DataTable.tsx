"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ChevronsUpDown,
} from "lucide-react";

/* ─── Root ───────────────────────────────────────────────────────── */

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DataTableRoot({ className, children, ...props }: DataTableProps) {
  return (
    <div
      className={cn(
        "relative z-10 flex flex-col h-full w-full bg-background-main overflow-hidden",
        className,
      )}
      {...props}
    >
      <main className="flex-1 relative overflow-hidden flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-surface-border">
          {children}
        </div>
      </main>
    </div>
  );
}

/* ─── Toolbar ────────────────────────────────────────────────────── */

interface DataTableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: { label: string; value: string }[];
  activeFilter?: string;
  onFilterChange?: (value: string) => void;
}

function DataTableToolbar({
  className,
  children,
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filters,
  activeFilter,
  onFilterChange,
  ...props
}: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b border-surface-border bg-surface/30",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
        {onSearchChange && (
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary text-lg size-[18px]!" />
            <input
              className="pl-9 pr-4 py-1.5 bg-background-main border border-surface-border rounded-md text-sm text-text-primary focus:ring-1 focus:ring-primary focus:border-primary outline-none w-64 font-mono placeholder:text-text-secondary"
              placeholder={searchPlaceholder}
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {filters && filters.length > 0 && (
          <>
            <div className="h-6 w-px bg-surface-border hidden sm:block"></div>
            <div className="flex gap-2 text-xs font-mono overflow-x-auto no-scrollbar  md:max-w-none">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => onFilterChange?.(filter.value)}
                  className={cn(
                    "px-2 py-1 rounded transition-colors whitespace-nowrap",
                    activeFilter === filter.value
                      ? "bg-primary/20 text-primary-light border border-primary/30"
                      : "hover:bg-surface text-text-muted",
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {children}
    </div>
  );
}

/* ─── Header ─────────────────────────────────────────────────────── */

interface DataTableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DataTableHeader({
  className,
  children,
  ...props
}: DataTableHeaderProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-12 px-6 py-3 border-b border-surface-border bg-surface/50 text-xs font-mono text-text-muted uppercase tracking-wider sticky top-0 z-20",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Column Header ──────────────────────────────────────────────── */

interface DataTableColumnHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  sortKey?: string;
  sortConfig?: { key: string; direction: "asc" | "desc" } | null;
  onSort?: (key: string) => void;
  align?: "left" | "right" | "center";
}

function DataTableColumnHeader({
  className,
  children,
  sortKey,
  sortConfig,
  onSort,
  align = "left",
  ...props
}: DataTableColumnHeaderProps) {
  const isSorted = sortConfig?.key === sortKey;
  const isAsc = isSorted && sortConfig?.direction === "asc";
  // const isDesc = isSorted && sortConfig?.direction === "desc"; // unused

  return (
    <div
      className={cn(
        "flex items-center gap-2 cursor-pointer hover:text-text-primary transition-colors select-none",
        {
          "justify-end": align === "right",
          "justify-center": align === "center",
          "justify-start": align === "left",
        },
        className,
      )}
      onClick={() => sortKey && onSort?.(sortKey)}
      {...props}
    >
      <span>{children}</span>
      {sortKey && (
        <span className="flex items-center">
          {isSorted ? (
            isAsc ? (
              <ArrowUp className="size-3.5" />
            ) : (
              <ArrowDown className="size-3.5" />
            )
          ) : (
            <ChevronsUpDown className="size-3.5 text-text-muted/30" />
          )}
        </span>
      )}
    </div>
  );
}

interface DataTableColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  mobileSpan?: number;
  children: React.ReactNode;
}

function DataTableColumn({
  className,
  children,
  // span = 2, // unused
  // mobileSpan = 12, // unused
  ...props
}: DataTableColumnProps) {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
}

/* ─── Body ───────────────────────────────────────────────────────── */

interface DataTableBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DataTableBody({ className, children, ...props }: DataTableBodyProps) {
  return (
    <div
      className={cn("overflow-y-auto custom-scrollbar flex-1 pb-10", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Row ────────────────────────────────────────────────────────── */

interface DataTableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function DataTableRow({ className, children, ...props }: DataTableRowProps) {
  return (
    <div
      className={cn(
        "group row-hover-effect grid grid-cols-12 px-6 py-4 border-b border-surface-border hover:bg-white/5 dark:hover:bg-white/5 transition-colors items-center cursor-pointer relative",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Cell ───────────────────────────────────────────────────────── */

interface DataTableCellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: "left" | "right" | "center";
}

function DataTableCell({
  className,
  children,
  align = "left",
  ...props
}: DataTableCellProps) {
  return (
    <div
      className={cn(
        {
          "text-right": align === "right",
          "text-center": align === "center",
          "text-left": align === "left",
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ─── Pagination / Footer ────────────────────────────────────────── */

interface DataTablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

function DataTablePagination({
  className,
  children,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  ...props
}: DataTablePaginationProps) {
  // Calculate displayed range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

  const renderPaginationButtons = () => {
    if (!onPageChange) return null;

    const buttons = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={cn(
            "size-7 flex items-center justify-center rounded border text-xs font-mono transition-colors",
            currentPage === i
              ? "bg-primary text-white border-primary"
              : "bg-surface border-surface-border text-text-muted hover:text-text-primary hover:border-primary/50",
          )}
        >
          {i}
        </button>,
      );
    }
    return buttons;
  };

  return (
    <div
      className={cn(
        "px-6 py-3 border-t border-surface-border bg-surface/30 flex items-center justify-between",
        className,
      )}
      {...props}
    >
      {children || (
        <>
          <span className="text-xs text-text-secondary font-mono">
            {totalItems
              ? `Showing ${startItem}-${endItem} of ${totalItems}`
              : `Page ${currentPage} of ${totalPages}`}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="size-7 flex items-center justify-center rounded bg-surface border border-surface-border text-text-muted hover:text-text-primary hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="size-[14px]!" />
            </button>
            {renderPaginationButtons()}
            <button
              onClick={() =>
                onPageChange?.(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="size-7 flex items-center justify-center rounded bg-surface border border-surface-border text-text-muted hover:text-text-primary hover:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="size-[14px]!" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Data-Driven Integration ────────────────────────────────────── */

export interface ColumnDef<T> {
  header: React.ReactNode;
  accessorKey?: keyof T; // Optional if using custom cell renderer without specific accessor
  cell?: (item: T) => React.ReactNode;
  className?: string; // Applied to both header and cell
  headerClassName?: string;
  cellClassName?: string;
  sortKey?: string;
  align?: "left" | "right" | "center";
}

interface DataTableContentProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  sortConfig?: { key: string; direction: "asc" | "desc" } | null;
  onSort?: (key: string) => void;
  renderRowExtra?: (item: T) => React.ReactNode;
  onRowClick?: (item: T) => void;
}

function DataTableContent<T extends { id: string | number }>({
  data,
  columns,
  sortConfig,
  onSort,
  renderRowExtra,
  onRowClick,
}: DataTableContentProps<T>) {
  return (
    <>
      <DataTableHeader>
        {columns.map((col, index) => (
          <DataTableColumnHeader
            key={col.sortKey || index}
            className={cn(col.className, col.headerClassName)}
            sortKey={col.sortKey}
            sortConfig={sortConfig}
            onSort={onSort}
            align={col.align}
          >
            {col.header}
          </DataTableColumnHeader>
        ))}
      </DataTableHeader>
      <DataTableBody>
        {data.map((item) => (
          <DataTableRow key={item.id} onClick={() => onRowClick?.(item)}>
            {columns.map((col, index) => (
              <DataTableCell
                key={index}
                align={col.align}
                className={cn(col.className, col.cellClassName)}
              >
                {col.cell
                  ? col.cell(item)
                  : col.accessorKey
                    ? (item[col.accessorKey] as React.ReactNode)
                    : null}
              </DataTableCell>
            ))}
            {renderRowExtra?.(item)}
          </DataTableRow>
        ))}
      </DataTableBody>
    </>
  );
}

/* ─── Export ─────────────────────────────────────────────────────── */

export const DataTable = Object.assign(DataTableRoot, {
  Toolbar: DataTableToolbar,
  Header: DataTableHeader,
  ColumnHeader: DataTableColumnHeader,
  Column: DataTableColumn, // Optional helper, but standard divs work too if grid classes are used directly
  Body: DataTableBody,
  Row: DataTableRow,
  Cell: DataTableCell,
  Pagination: DataTablePagination,
  Content: DataTableContent,
});

