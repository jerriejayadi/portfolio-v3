import { Plus, Minus, LocateFixed } from "lucide-react";

export function MiniMap() {
  return (
    <div className="absolute bottom-6 right-6 z-30 flex flex-col gap-2">
      {/* Mini map display */}
      <div className="bg-surface/90 backdrop-blur border border-surface-border p-2 rounded-lg shadow-xl w-32 h-32 relative overflow-hidden cursor-crosshair transition-colors duration-300">
        <div className="absolute inset-0 bg-primary/5" />

        {/* Center dot (current position) */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

        {/* Node dots */}
        <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-text-secondary rounded-full" />
        <div className="absolute top-[25%] left-[80%] w-1.5 h-1.5 bg-text-secondary rounded-full" />
        <div className="absolute bottom-[25%] left-[25%] w-1.5 h-1.5 bg-text-secondary rounded-full" />
        <div className="absolute bottom-[30%] left-[75%] w-1.5 h-1.5 bg-text-secondary rounded-full" />

        {/* Label */}
        <span className="absolute bottom-1 right-2 text-[10px] text-text-muted font-mono">
          NAV_SAT_01
        </span>
      </div>

      {/* Zoom controls */}
      <div className="flex justify-end gap-2">
        <button className="size-8 bg-surface hover:bg-surface-border text-text-primary rounded flex items-center justify-center border border-surface-border transition-colors">
          <Plus className="size-4" />
        </button>
        <button className="size-8 bg-surface hover:bg-surface-border text-text-primary rounded flex items-center justify-center border border-surface-border transition-colors">
          <Minus className="size-4" />
        </button>
        <button className="size-8 bg-surface hover:bg-surface-border text-text-primary rounded flex items-center justify-center border border-surface-border transition-colors">
          <LocateFixed className="size-4" />
        </button>
      </div>
    </div>
  );
}

