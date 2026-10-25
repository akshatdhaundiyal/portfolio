"use client";

import React from "react";
import ChalkAnnotation from "./ChalkAnnotation";
import { chalkConfig } from "./chalkConfig";

export interface ChalkMetricBadgeProps {
  value: string;
  label?: string;
  accentColor?: string;
  shape?: "circle" | "box";
  className?: string;
}

export default function ChalkMetricBadge({
  value,
  label,
  accentColor,
  shape = "circle",
  className = "",
}: ChalkMetricBadgeProps) {
  const effectiveColor = accentColor || chalkConfig.colors.emerald;

  return (
    <div
      className={`inline-flex flex-col items-start sm:items-end bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 p-3 rounded-xl ${className}`}
    >
      {label && (
        <span className="font-mono text-[10px] uppercase text-neutral-500 dark:text-neutral-400 tracking-wider mb-1">
          {label}
        </span>
      )}
      <div className="my-0.5">
        <ChalkAnnotation
          type={shape}
          color={effectiveColor}
          trigger="inView"
          padding={4}
          strokeWidth={chalkConfig.strokeWidth.normal}
        >
          <span className="font-mono text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
            {value}
          </span>
        </ChalkAnnotation>
      </div>
    </div>
  );
}
