"use client";

import { Logo } from "@/components/atoms/Logo";
import { IconButton } from "@/components/atoms/IconButton";
import { NavToggleGroup } from "@/components/molecules/NavToggleGroup";
import {
  Network,
  List,
  TerminalSquare,
  Mail,
  Sun,
  Moon,
  X,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../atoms/Button";
import { useRouter } from "next/navigation";

interface HeaderProps {
  view?: "map" | "list" | "detail" | string;
  onViewChange?: (view: "map" | "list" | string) => void;
}

export function Header({ view = "map", onViewChange }: HeaderProps) {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const navItems = [
    { icon: Network, label: "Map View", value: "map" },
    { icon: List, label: "List View", value: "list" },
    // { icon: List, label: "Detail View", value: "detail" },
  ];

  const handleCommand = (value: string) => {
    if (value === "list" && onViewChange) {
      onViewChange("list");
    } else if (value === "map" && onViewChange) {
      onViewChange("map");
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between whitespace-nowrap px-6 py-4 border-b border-surface-border bg-background-main/80 backdrop-blur-md transition-colors duration-300">
      <Logo />
      {view !== "detail" && (
        <NavToggleGroup
          items={navItems}
          value={view}
          onCommand={handleCommand}
        />
      )}

      <div className="flex gap-3">
        {view !== "detail" ? (
          <>
            <Button
              icon={mounted && theme === "light" ? Moon : Sun}
              variant="outline"
              onClick={toggleTheme}
              className="w- md:w-fit"
            >
              <span className="hidden md:flex">
                {mounted ? (theme === "light" ? "Dark" : "Light") : "Theme"}
              </span>
            </Button>
            {/* <Button
              icon={TerminalSquare}
              variant="outline"
              className="hidden sm:flex"
            >
              <span className="hidden md:flex">Terminal</span>
            </Button> */}
            <Button icon={Mail} variant="primary">
              <span className="hidden md:flex">Contact</span>
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              router.back();
            }}
            className="hover:bg-white/20"
            variant="outline"
          >
            Exit
          </Button>
        )}
      </div>
    </header>
  );
}
