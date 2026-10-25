"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { chalkConfig } from "./chalkConfig";

export interface ChalkSectionHeadingProps {
  title: string;
  symbol?: string;
  symbolColor?: string;
  note?: string;
  actionLink?: {
    href: string;
    label: string;
  };
  className?: string;
}

export default function ChalkSectionHeading({
  title,
  symbol = "▶",
  symbolColor,
  note,
  actionLink,
  className = "",
}: ChalkSectionHeadingProps) {
  const effectiveSymbolColor = symbolColor || chalkConfig.colors.vermilion;

  return (
    <div
      className={`flex items-center justify-between border-b border-black/10 dark:border-white/[0.08] pb-4 mb-8 ${className}`}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          <span>{title} </span>
          <span style={{ color: effectiveSymbolColor }}>{symbol}</span>
        </h2>

        {note && (
          <span className="hidden sm:inline-block font-handwritten text-lg text-neutral-500 dark:text-neutral-400 -rotate-1 select-none">
            {note}
          </span>
        )}
      </div>

      {actionLink && (
        <Link
          href={actionLink.href}
          className="inline-flex items-center gap-1.5 font-mono text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors shrink-0 group"
        >
          <span>{actionLink.label}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
