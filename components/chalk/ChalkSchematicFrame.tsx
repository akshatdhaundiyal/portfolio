"use client";

import React, { useState } from "react";
import { RotateCcw } from "lucide-react";

interface ChalkSchematicFrameProps {
  title: string;
  badge?: string;
  badgeColor?: string;
  children: (key: number) => React.ReactNode;
  className?: string;
}

export default function ChalkSchematicFrame({
  title,
  badge = "BLUEPRINT",
  badgeColor = "#38bdf8",
  children,
  className = "",
}: ChalkSchematicFrameProps) {
  const [redrawKey, setRedrawKey] = useState(0);

  return (
    <div
      className={`relative rounded-xl bg-[#14161f] border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Blackboard Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#0f1118]/80 text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20 border border-white/30" />
          <span
            className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider"
            style={{ backgroundColor: `${badgeColor}20`, color: badgeColor }}
          >
            {badge}
          </span>
          <span className="text-neutral-400 font-medium hidden sm:inline-block">
            {title}
          </span>
        </div>

        <button
          onClick={() => setRedrawKey((k) => k + 1)}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer select-none group text-[11px]"
          title="Erase and redraw blueprint"
        >
          <RotateCcw className="w-3 h-3 group-hover:-rotate-90 transition-transform duration-300 text-amber-300" />
          <span className="font-handwritten text-xs text-amber-200">Redraw</span>
        </button>
      </div>

      {/* Blueprint Canvas */}
      <div className="p-4 sm:p-6 select-none relative">
        {children(redrawKey)}
      </div>
    </div>
  );
}
