"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { chalkConfig } from "./chalkConfig";

export interface ChalkButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  accentColor?: string;
  icon?: ReactNode;
  external?: boolean;
  className?: string;
}

export default function ChalkButton({
  children,
  href,
  onClick,
  variant = "secondary",
  accentColor,
  icon,
  external = false,
  className = "",
}: ChalkButtonProps) {
  const effectiveAccent = accentColor || chalkConfig.colors.vermilion;

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-mono text-xs font-semibold px-4 py-2 rounded-xl transition-all duration-200 select-none cursor-pointer group";

  const variantStyles = {
    primary:
      "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md hover:shadow-lg hover:-translate-y-0.5",
    secondary:
      "bg-black/[0.04] dark:bg-white/[0.06] text-neutral-800 dark:text-neutral-200 border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 hover:bg-black/[0.08] dark:hover:bg-white/[0.1] hover:-translate-y-0.5",
    ghost:
      "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]",
  };

  const combinedClass = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClass}>
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={combinedClass}>
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
