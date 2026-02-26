import Image from "next/image";
import { cn } from "@/lib/utils";

interface SkillSatelliteProps {
  label: string | React.ReactNode;
  /** Optional image source for an icon (e.g. an SVG in /public) */
  icon?: string;
  /** Alt text for the icon image */
  iconAlt?: string;
  className?: string;
}

export function SkillSatellite({
  label,
  icon,
  iconAlt,
  className,
}: SkillSatelliteProps) {
  return (
    <div
      className={cn(
        "size-10 bg-surface border border-surface-border rounded-full flex items-center justify-center text-[10px] font-mono text-text-secondary shadow-md transition-colors duration-300",
        className,
      )}
    >
      {icon ? (
        <Image
          src={icon}
          alt={iconAlt ?? String(label)}
          width={24}
          height={24}
          className="object-contain"
        />
      ) : (
        label
      )}
    </div>
  );
}

