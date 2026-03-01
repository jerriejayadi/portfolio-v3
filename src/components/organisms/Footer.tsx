import { StatusDot } from "@/components/atoms/StatusDot";

export function Footer() {
  return (
    <footer className="bg-surface/90 border-t border-surface-border px-6 py-2 flex justify-between items-center text-[10px] md:text-xs text-text-muted font-mono z-20 backdrop-blur-sm transition-colors duration-300">
      <div className="flex gap-4">
        <span className="flex items-center gap-1.5">
          <StatusDot color="green" />
          API: Connected
        </span>
        <span className="hidden md:inline">Latency: 12ms</span>
      </div>

      <div className="flex gap-4">
        <a
          href="https://github.com/jerriejayadi"
          className="hover:text-primary transition-colors"
        >
          Github
        </a>
        <a
          href="https://linkedin.com/in/jerriejayadi"
          className="hover:text-primary transition-colors"
        >
          LinkedIn
        </a>{" "}
        <a
          href="https://x.com/t_jerriejayadi"
          className="hover:text-primary transition-colors"
        >
          X
        </a>
      </div>

      <div className="hidden md:block">
        Last commit: <span className="text-slate-300">2 hours ago</span>
      </div>
    </footer>
  );
}

