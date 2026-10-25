"use client";

import React, { ReactNode } from "react";
import { chalkConfig } from "./chalkConfig";

export type ChalkCardVariant = "slate" | "blueprint" | "interactive" | "callout";

export interface ChalkCardProps {
  children: ReactNode;
  variant?: ChalkCardVariant;
  accentColor?: string;
  cornerTicks?: boolean;
  interactive?: boolean;
  className?: string;
  id?: string;
  onClick?: () => void;
}

export default function ChalkCard({
  children,
  variant = "slate",
  accentColor,
  cornerTicks = false,
  interactive = false,
  className = "",
  id,
  onClick,
}: ChalkCardProps) {
  const effectiveAccent = accentColor || chalkConfig.colors.vermilion;

  // Base card surface & border styling
  const variantStyles: Record<ChalkCardVariant, string> = {
    slate:
      "bg-white dark:bg-[#14161f] border border-black/10 dark:border-white/10 shadow-lg dark:shadow-2xl",
    blueprint:
      "bg-neutral-50 dark:bg-[#10121a] border border-dashed border-black/20 dark:border-white/15 bg-desk-pattern shadow-xl",
    interactive:
      "bg-white dark:bg-[#14161f] border border-black/10 dark:border-white/10 hover:border-black/25 dark:hover:border-white/25 shadow-md hover:shadow-xl dark:hover:shadow-cyan-500/5 transition-all duration-300",
    callout:
      "bg-white dark:bg-[#14161f] border-l-4 border-t border-r border-b border-black/10 dark:border-white/10 shadow-lg",
  };

  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden transition-colors ${
        variantStyles[variant]
      } ${interactive ? "cursor-pointer group" : ""} ${className}`}
      style={{
        borderLeftColor: variant === "callout" ? effectiveAccent : undefined,
      }}
    >
      {/* Top subtle accent bar if accentColor is specified */}
      {accentColor && variant !== "callout" && (
        <div
          className="h-1 w-full"
          style={{ backgroundColor: effectiveAccent }}
        />
      )}

      {/* Tactile chalk corner tick marks */}
      {cornerTicks && (
        <>
          <span className="absolute top-2 left-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 select-none pointer-events-none">
            ┌
          </span>
          <span className="absolute top-2 right-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 select-none pointer-events-none">
            ┐
          </span>
          <span className="absolute bottom-2 left-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 select-none pointer-events-none">
            └
          </span>
          <span className="absolute bottom-2 right-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 select-none pointer-events-none">
            ┘
          </span>
        </>
      )}

      {children}
    </div>
  );
}
