import { cn } from "@/lib/utils";
import Image from "next/image";
import { Badge } from "@/components/atoms/Badge";

interface HoverCardProps {
  image?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  tags?: { label: string; variant?: "primary" | "neutral" }[];
  position?:
    | "left"
    | "right"
    | "top"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "bottom";
  /** Interaction mode: "hover" uses CSS peer-hover, "toggle" uses JS visibility */
  mode?: "hover" | "toggle";
  /** For toggle mode — controls visibility via JS */
  visible?: boolean;
  /** Custom content rendered inside the card shell. Overrides title/description/image. */
  children?: React.ReactNode;
  className?: string;
}

export function HoverCard({
  image,
  imageAlt = "",
  title,
  description,
  tags = [],
  position = "left",
  mode = "hover",
  visible = false,
  children,
  className,
}: HoverCardProps) {
  const positionClasses: Record<string, string> = {
    left: "right-[110%] top-1/2 -translate-y-1/2 origin-right",
    right: "left-[110%] top-1/2 -translate-y-1/2 origin-left",
    top: "bottom-[110%] left-1/2 -translate-x-1/2 origin-top",
    "top-left": "bottom-[110%] right-0 origin-bottom-right",
    "top-right": "bottom-[110%] left-0 origin-bottom-left",
    "bottom-left": "top-[110%] right-0 origin-top-right",
    "bottom-right": "top-[110%] left-0 origin-top-left",
    bottom: "top-[110%] left-1/2 -translate-x-1/2 origin-top",
  };

  const isHover = mode === "hover";

  return (
    <div
      className={cn(
        "absolute w-64 z-30 transition-all duration-300",
        positionClasses[position],
        isHover
          ? "opacity-0 scale-90 pointer-events-none peer-hover:opacity-100 peer-hover:scale-100 peer-hover:pointer-events-auto"
          : visible
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none",
        className,
      )}
    >
      {children ? (
        children
      ) : (
        <div className="bg-surface/95 backdrop-blur-xl border border-surface-border p-3 rounded-lg shadow-2xl transition-colors duration-300">
          {image && (
            <div className="h-28 w-full rounded bg-surface-hover mb-3 overflow-hidden relative">
              <Image src={image} alt={imageAlt} fill className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-2 left-2 text-white text-xs font-bold">
                {title}
              </span>
            </div>
          )}
          {!image && title && (
            <h4 className="text-text-primary text-sm font-bold">{title}</h4>
          )}
          {tags.length > 0 && (
            <div className="flex gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag.label} variant={tag.variant}>
                  {tag.label}
                </Badge>
              ))}
            </div>
          )}
          {description && (
            <p className="text-xs text-text-muted leading-tight">
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

