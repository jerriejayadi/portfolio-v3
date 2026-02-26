import { cn } from "@/lib/utils";
import { TreePine } from "lucide-react";
import Link from "next/link";

interface LogoProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Logo({
  title = "<JerrieJayadi />",
  subtitle = "v2.4.0 • System Online",
  className,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-3 text-text-primary transition-colors duration-300",
        className,
      )}
    >
      <div className="size-8 flex items-center justify-center bg-primary rounded-lg text-white shrink-0 shadow-lg shadow-primary/25">
        <TreePine className="size-4" />
      </div>
      <div className="hidden md:block">
        <h2 className="text-text-primary text-lg font-bold leading-tight tracking-tight">
          {title}
        </h2>
        <p className="text-xs text-text-muted">{subtitle}</p>
      </div>
    </Link>
  );
}
