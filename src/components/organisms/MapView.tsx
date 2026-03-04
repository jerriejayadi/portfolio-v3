"use client";

import { useState } from "react";
import { TerminalCard } from "@/components/organisms/TerminalCard";
import { TerminalModal } from "@/components/molecules/TerminalModal";
import { CareerLogTimeline } from "@/components/organisms/CareerLogTimeline";
import { ProfileHub } from "@/components/organisms/ProfileHub";
import { GardenNode } from "@/components/organisms/GardenNode";
import { ConnectorLines } from "@/components/organisms/ConnectorLines";
import { DataPoint } from "@/components/atoms/DataPoint";
import {
  Rocket,
  Brain,
  BookOpen,
  User,
  Briefcase,
  FlaskConical,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useViewport } from "@/hooks/useViewport";

import { Experience } from "@/components/organisms/CareerLogTimeline";

/** Shared About content used in both the inline card and the mobile modal */
function AboutContent() {
  return (
    <>
      {/* Code block 1: Developer object */}
      <div className="mb-4">
        <span className="text-text-muted">
          {"// Welcome to my digital garden."}
        </span>
        <br />
        <span className="text-primary">const</span>{" "}
        <span className="text-amber-600 dark:text-yellow-300">Developer</span> ={" "}
        {"{"}
        <div className="ml-5">
          {"  "}name:{" "}
          <span className="text-green-600 dark:text-green-400">{`'Jerrie Jayadi'`}</span>
          ,
          <br />
          {"  "}role:{" "}
          <span className="text-green-600 dark:text-green-400">{`'Front-End Developer'`}</span>
          ,
          <br />
          {"  "}location:{" "}
          <span className="text-green-600 dark:text-green-400">{`'Surabaya, Indonesia'`}</span>
          ,
          <br />
          {"  "}status:{" "}
          <span className="text-green-600 dark:text-green-400">{`'Giving my best'`}</span>
          <br />
        </div>
        {"}"};
      </div>

      {/* Code block 2: Comment */}
      <div className="mb-4">
        <span className="text-text-muted">
          {"/**"}
          <br />
          {" * 3+ years experience in Logistics & Fintech."}
          <br />
          {" * Specialized in dashboards & real-time systems."}
          <br />
          {" * React, Next.js, and TypeScript expert."}
          <br />
          {" */"}
        </span>
      </div>

      {/* Code block 3: Init call */}
      <div className="flex gap-2 mt-4">
        <span className="text-primary">await</span>{" "}
        <span className="text-amber-600 dark:text-yellow-300">init</span>(
        <span className="text-green-600 dark:text-green-400">{`'exploration_mode'`}</span>
        );<span className="animate-pulse">_</span>
      </div>

      {/* Redirection to Profile */}
      <div className="mt-8 pt-4 border-t border-surface-border/50 flex justify-end">
        <Link
          href="/profile"
          className="group flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-hover border border-surface-border hover:border-primary/50 text-text-primary text-xs font-mono rounded transition-all duration-300"
        >
          View Full Profile
          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </>
  );
}

export function MapView({ experiences = [] }: { experiences?: Experience[] }) {
  const router = useRouter();
  const { isMobile, isViewport } = useViewport();
  const [showCareerLog, setShowCareerLog] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="relative z-10 flex flex-col h-[85vh] w-full">
      {/* Main canvas */}
      <main className="flex-1 relative overflow-hidden" id="garden-canvas">
        {/* Connector lines */}
        <ConnectorLines />

        {/* Mini map */}
        {/* <MiniMap /> */}

        {/* Central profile hub */}
        <ProfileHub />

        {/* ─── Garden Nodes ──────────────────────────── */}

        {/* About (top center) — inline card on desktop, modal on mobile */}
        <GardenNode
          icon={User}
          label="About"
          position="top-[15%] left-[45%]"
          size="md"
          hoverColor="hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] "
          animation="float"
          interactionMode={isMobile ? "toggle" : "hover"}
          onClick={isMobile ? () => setShowAboutModal(true) : undefined}
          {...(!isMobile && {
            hoverCard: { position: "bottom-right" as const },
            customContent: (onClose: () => void) => (
              <TerminalCard
                className="z-50"
                filename="profile.js"
                onClose={onClose}
              >
                <AboutContent />
              </TerminalCard>
            ),
          })}
          className="z-50"
        />

        {/* Projects (top right) */}
        <GardenNode
          icon={Rocket}
          label="Projects"
          position="top-[25%] left-[80%]"
          size="lg"
          hoverColor="hover:border-primary hover:shadow-[0_0_20px_rgba(17,17,212,0.5)]"
          animation="float-delayed"
          onClick={() => router.push("/projects")}
          hoverCard={{
            image: "/images/project-dashboard.jpg",
            imageAlt: "Dashboard interface screenshot",
            title: "Projects",
            description:
              "List of projects I've worked on, study cases and how I solve it as Front end Engineers",
            position: "left",
          }}
        />

        <GardenNode
          icon={Rocket}
          label="Projects"
          position="top-[25%] left-[80%]"
          size="lg"
          hoverColor="hover:border-primary hover:shadow-[0_0_20px_rgba(17,17,212,0.5)]"
          animation="float-delayed"
          onClick={() => router.push("/projects")}
          hoverCard={{
            image: "/images/project-preview.png",
            imageAlt: "Dashboard interface screenshot",
            title: "Projects",
            description:
              "List of projects I've worked on, study cases and how I solve it as Front end Engineers",
            position: isViewport("xl") ? "left" : "bottom",
          }}
        />
        <GardenNode
          icon={FlaskConical}
          label="Labs"
          position="-bottom-[2%] left-[50%]"
          size="lg"
          hoverColor="hover:border-primary hover:shadow-[0_0_20px_rgba(17,17,212,0.5)]"
          animation="float-delayed"
          onClick={() => router.push("/labs")}
          hoverCard={{
            image: "/images/labs-preview.png",
            imageAlt: "Dashboard interface screenshot",
            title: "Labs",
            description:
              "This is a list of my personal projects where I experiment stuffs or develop my random ideas.",
            position: isViewport("xl") ? "top" : "top",
          }}
        />

        {/* Skills (top left) */}
        <GardenNode
          icon={Brain}
          label="Skills"
          position="top-[30%] left-[20%]"
          size="md"
          hoverColor="hover:border-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.3)]"
          animation="float"
          satellites={[
            {
              label: "Next.js",
              icon: "/images/nextjs-icon.svg",
              className: "-top-10 -left-10 md:-top-12 md:left-4 bg-white",
            },
            {
              label: "TS",
              icon: "/images/Typescript.svg",
              className: "-top-16 left-4 md:-top-1 md:left-20",
            },
            {
              label: "React",
              icon: "/images/react.svg",
              className: "-top-8 left-16 md:-top-4 md:-left-12",
            },
          ]}
          interactionMode={isMobile ? "toggle" : "hover"}
        />

        {/* Thoughts (bottom left) */}
        <GardenNode
          icon={BookOpen}
          label="Thoughts"
          position="top-[75%] left-[25%]"
          size="sm"
          hoverColor="hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]"
          animation="float-delayed"
          onClick={() => router.push("/thoughts")}
          hoverCard={{
            image: "/images/lab-fluid-sim.jpg",
            imageAlt: "Abstract fluid simulation with neon colors",
            title: "Thoughts",
            description:
              "Sharing my random thoughts, ideas, hobbies, Jesus Christ, and many more",
            position: isViewport("xl") ? "left" : "top",
          }}
        />

        {/* Labs (bottom right) -> Career Log */}
        <GardenNode
          icon={Briefcase}
          label="Career Log"
          position="top-[70%] left-[75%]"
          size="md"
          hoverColor="hover:border-purple-400 hover:shadow-[0_0_20px_rgba(192,132,252,0.3)]"
          animation="float"
          onClick={() => setShowCareerLog(true)}
          hoverCard={{
            image: "/images/lab-fluid-sim.jpg",
            imageAlt: "Abstract fluid simulation with neon colors",
            title: "Access Career Log",
            description: "My professional journey a.k.a. CV.",
            position: isViewport("xl") ? "right" : "top",
          }}
        />

        {/* Decorative floating data points */}
        <DataPoint className="absolute top-[20%] left-[40%]">+34.05</DataPoint>
        <DataPoint className="absolute top-[60%] left-[10%]">#FF052</DataPoint>
        <DataPoint className="absolute bottom-[20%] right-[30%]">
          COORD: X-99
        </DataPoint>
      </main>

      {/* About modal (mobile only) */}
      <TerminalModal
        open={showAboutModal}
        onClose={() => setShowAboutModal(false)}
        filename="profile.js"
      >
        <AboutContent />
      </TerminalModal>

      <TerminalModal
        open={showCareerLog}
        onClose={() => setShowCareerLog(false)}
        filename="career_log.json"
        className="  p-0"
      >
        <CareerLogTimeline data={experiences} />
      </TerminalModal>
    </div>
  );
}

