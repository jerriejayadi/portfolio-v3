import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "hover";
}

export function Card({
  children,
  className,
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "group relative bg-[#131326]/60 border border-primary/30 rounded-xl overflow-hidden hover:border-primary/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(17,17,212,0.15)] flex flex-col md:flex-row",
        className,
      )}
      {...props}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/50 group-hover:bg-primary transition-colors"></div>
      {children}
    </div>
  );
}

