"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownProps {
  children: string;
  className?: string;
}

export function Markdown({ children, className }: MarkdownProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // --- Typography ---
          h1: ({ ...props }) => (
            <h1
              className="text-3xl font-bold text-text-primary mt-8 mb-4 max-w-full wrap-break-word"
              {...props}
            />
          ),
          h2: ({ ...props }) => (
            <h2
              className="text-2xl font-bold text-text-primary mt-6 mb-3 max-w-full wrap-break-word border-b border-surface-border pb-2"
              {...props}
            />
          ),
          h3: ({ ...props }) => (
            <h3
              className="text-xl font-bold text-text-primary mt-4 mb-2 max-w-full wrap-break-word"
              {...props}
            />
          ),
          h4: ({ ...props }) => (
            <h4
              className="text-lg font-bold text-text-primary mt-4 mb-2 max-w-full wrap-break-word"
              {...props}
            />
          ),
          h5: ({ ...props }) => (
            <h5
              className="text-base font-bold text-text-primary mt-4 mb-2 max-w-full wrap-break-word"
              {...props}
            />
          ),
          h6: ({ ...props }) => (
            <h6
              className="text-sm font-bold text-text-primary mt-4 mb-2 max-w-full wrap-break-word uppercase tracking-wide"
              {...props}
            />
          ),
          p: ({ ...props }) => (
            <p
              className="text-text-secondary leading-relaxed mb-4 wrap-break-word"
              {...props}
            />
          ),
          strong: ({ ...props }) => (
            <strong className="font-bold text-text-primary" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-text-muted" {...props} />
          ),
          del: ({ ...props }) => (
            <del className="line-through text-text-muted/70" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="border-l-4 border-primary/50 pl-4 py-1 my-4 italic text-text-muted bg-surface rounded-r"
              {...props}
            />
          ),

          // --- Lists ---
          ul: ({ ...props }) => (
            <ul
              className="list-disc list-outside mb-4 ml-5 text-text-secondary space-y-1"
              {...props}
            />
          ),
          ol: ({ ...props }) => (
            <ol
              className="list-decimal list-outside mb-4 ml-5 text-text-secondary space-y-1"
              {...props}
            />
          ),
          li: ({ ...props }) => <li className="pl-1" {...props} />,

          // --- Code ---
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: ({ className, ...props }: any) => {
            const isInline = !className;
            return isInline ? (
              <code
                className="bg-surface-hover text-primary-light px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              />
            ) : (
              <code className={cn("text-sm font-mono", className)} {...props} />
            );
          },
          pre: ({ ...props }) => (
            <pre
              className="bg-surface text-text-secondary p-4 rounded-lg overflow-x-auto my-4 border border-surface-border custom-scrollbar"
              {...props}
            />
          ),

          // --- Links & Media ---
          a: ({ ...props }) => (
            <a
              className="text-primary hover:text-primary-light hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),
          img: ({ ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="rounded-lg border border-surface-border my-6 max-w-full h-auto mx-auto shadow-lg"
              alt={props.alt || "Markdown image"}
              {...props}
            />
          ),

          // --- Tables (GFM) ---
          table: ({ ...props }) => (
            <div className="overflow-x-auto my-6 rounded-lg border border-surface-border">
              <table className="w-full text-left text-sm" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead
              className="bg-surface-hover text-text-primary border-b border-surface-border"
              {...props}
            />
          ),
          tbody: ({ ...props }) => (
            <tbody className="divide-y divide-surface-border" {...props} />
          ),
          tr: ({ ...props }) => (
            <tr
              className="hover:bg-surface-hover/50 transition-colors"
              {...props}
            />
          ),
          th: ({ ...props }) => (
            <th
              className="px-4 py-3 font-semibold uppercase tracking-wider text-xs"
              {...props}
            />
          ),
          td: ({ ...props }) => (
            <td className="px-4 py-3 text-text-secondary" {...props} />
          ),

          // --- Misc ---
          hr: ({ ...props }) => (
            <hr className="my-8 border-surface-border" {...props} />
          ),
          br: ({ ...props }) => <br className="my-2" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}

