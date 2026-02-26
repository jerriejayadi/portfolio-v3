import { cn } from "@/lib/utils";

interface StatusDotProps {
  color?: "green" | "red" | "yellow";
  pulse?: boolean;
  className?: string;
}

export function StatusDot({
  color = "green",
  pulse = true,
  className,
}: StatusDotProps) {
  const colorMap = {
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  return (
    <span
      className={cn(
        "block size-2 rounded-full",
        colorMap[color],
        pulse && "animate-pulse",
        className,
      )}
    />
  );
}

