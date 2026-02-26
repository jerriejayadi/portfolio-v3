"use client";

import { ContentView } from "@/components/organisms/ContentView";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <ContentView title="not-found.tsx">
      <div className="p-6 w-full font-mono text-sm">
        <div className="flex items-center gap-2 mb-2 text-text-primary">
          <ChevronRight className="size-4 text-primary shrink-0" />
          redirect to <span className="break-all text-yellow-500">{pathname}</span>
        </div>
        <p className="text-red-400">zsh: command not found</p>
      </div>
    </ContentView>
  );
}

