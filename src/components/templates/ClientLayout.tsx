"use client";

import { Header } from "@/components/organisms/Header";
import { usePathname } from "next/navigation";
import { useViewMode } from "@/hooks/useViewMode";
import { useEffect } from "react";

import { Suspense } from "react";
import { Footer } from "../organisms/Footer";

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentView, setView } = useViewMode();

  useEffect(() => {
    if (pathname === "/") {
      if (currentView === "detail") setView("map");
    } else if (
      (pathname.startsWith("/projects") ||
        pathname.startsWith("/thoughts") ||
        pathname.startsWith("/profile") ||
        pathname.startsWith("/labs")) &&
      currentView !== "detail"
    ) {
      setView("detail");
    }
  }, [pathname, setView, currentView]);

  return (
    <div className="flex flex-col h-full">
      <div className="pointer-events-auto relative z-20">
        {!pathname.startsWith("/studio") && (
          <Header
            view={currentView}
            onViewChange={(view) => setView(view as "map" | "list")}
          />
        )}
      </div>
      <main className="flex-1 relative  h-full overflow-auto">{children}</main>
      {!pathname.startsWith("/studio") && <Footer />}
    </div>
  );
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </Suspense>
  );
}

