"use client";

import React, { useState } from "react";
import ChalkCard from "@/components/chalk/ChalkCard";
import ChalkSectionHeading from "@/components/chalk/ChalkSectionHeading";
import ChalkMetricBadge from "@/components/chalk/ChalkMetricBadge";
import ChalkButton from "@/components/chalk/ChalkButton";
import ChalkAnnotation from "@/components/chalk/ChalkAnnotation";
import { chalkConfig } from "@/components/chalk/chalkConfig";
import { ArrowRight, Sparkles, Terminal, Activity, FileText } from "lucide-react";

export default function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<"primitives" | "tokens">("primitives");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Header Banner */}
      <div className="space-y-4 border-b border-black/10 dark:border-white/10 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-mono text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>LIVING COMPONENT SHOWCASE // CHALK DESIGN SYSTEM</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Chalk Design System &amp; Primitives.
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Interactive gallery of centralized chalk primitives. Upgrades made in{" "}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-[#d94e34]">
            components/chalk/chalkConfig.ts
          </code>{" "}
          instantly propagate across every component displayed below and across the entire website.
        </p>

        {/* View Switcher */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab("primitives")}
            className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "primitives"
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Component Primitives
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tokens")}
            className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "tokens"
                ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            Tokens &amp; Configuration
          </button>
        </div>
      </div>

      {activeTab === "primitives" ? (
        <div className="space-y-16">
          {/* 1. ChalkCard Variants */}
          <section className="space-y-6">
            <ChalkSectionHeading
              title="1. ChalkCard Containers"
              symbol="■"
              symbolColor={chalkConfig.colors.vermilion}
              note="strict variant API with corner ticks"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChalkCard variant="slate" cornerTicks interactive>
                <div className="p-6 space-y-3">
                  <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                    Variant: "slate" (Default)
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                    Obsidian Blackboard Surface
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                    Deep slate panel with technical corner tick marks and smooth hover elevation.
                  </p>
                </div>
              </ChalkCard>

              <ChalkCard variant="blueprint" cornerTicks>
                <div className="p-6 space-y-3">
                  <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                    Variant: "blueprint"
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                    Schematic Grid Canvas
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                    Dashed boundary with grid pattern background, purpose-built for architecture diagrams.
                  </p>
                </div>
              </ChalkCard>

              <ChalkCard variant="callout" accentColor={chalkConfig.colors.cyan}>
                <div className="p-6 space-y-3">
                  <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
                    Variant: "callout" (Cyan Accent)
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                    Left-Bordered Annotation Card
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                    Accented boundary highlighting key technical takeaways and architectural decisions.
                  </p>
                </div>
              </ChalkCard>

              <ChalkCard variant="interactive" accentColor={chalkConfig.colors.emerald}>
                <div className="p-6 space-y-3">
                  <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
                    Variant: "interactive"
                  </div>
                  <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                    Clickable Action Card
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                    Reacts to cursor hover with border luminance and subtle translation.
                  </p>
                </div>
              </ChalkCard>
            </div>
          </section>

          {/* 2. Section Headings */}
          <section className="space-y-6">
            <ChalkSectionHeading
              title="2. ChalkSectionHeading"
              symbol="▶"
              symbolColor={chalkConfig.colors.amber}
              note="editorial headers with margin notes"
              actionLink={{ href: "#", label: "Example Link" }}
            />
            <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Combines high-contrast serif typography, accent glyphs, and handwritten Caveat cursive notes.
            </p>
          </section>

          {/* 3. Metric Badges & Annotations */}
          <section className="space-y-6">
            <ChalkSectionHeading
              title="3. ChalkMetricBadge & Text Annotations"
              symbol="✎"
              symbolColor={chalkConfig.colors.emerald}
              note="sketched statistical highlights"
            />

            <div className="flex flex-wrap items-center gap-6">
              <ChalkMetricBadge
                value="+$12M"
                label="Commercial Audit Recovery"
                accentColor={chalkConfig.colors.emerald}
                shape="circle"
              />

              <ChalkMetricBadge
                value="<85ms"
                label="Inference Latency SLA"
                accentColor={chalkConfig.colors.cyan}
                shape="box"
              />

              <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-2">
                <span className="font-mono text-xs text-neutral-500 block mb-1">
                  Inline ChalkAnnotation Examples:
                </span>
                <p className="text-sm text-neutral-800 dark:text-neutral-200">
                  We engineered{" "}
                  <ChalkAnnotation type="circle" color={chalkConfig.colors.vermilion} trigger="mount">
                    two-stage GLMs
                  </ChalkAnnotation>{" "}
                  with{" "}
                  <ChalkAnnotation type="underline" color={chalkConfig.colors.amber} trigger="mount">
                    sub-100ms latency
                  </ChalkAnnotation>{" "}
                  and{" "}
                  <ChalkAnnotation type="box" color={chalkConfig.colors.cyan} trigger="mount">
                    auditable unit economics
                  </ChalkAnnotation>.
                </p>
              </div>
            </div>
          </section>

          {/* 4. ChalkButtons */}
          <section className="space-y-6">
            <ChalkSectionHeading
              title="4. ChalkButton CTAs"
              symbol="⁕"
              symbolColor={chalkConfig.colors.indigo}
              note="hand-drawn interactive triggers"
            />

            <div className="flex flex-wrap items-center gap-4">
              <ChalkButton variant="primary" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Primary Action Button
              </ChalkButton>

              <ChalkButton variant="secondary" icon={<Terminal className="w-3.5 h-3.5" />}>
                Secondary Code Button
              </ChalkButton>

              <ChalkButton variant="ghost" icon={<FileText className="w-3.5 h-3.5" />}>
                Ghost Link Button
              </ChalkButton>
            </div>
          </section>
        </div>
      ) : (
        /* Configuration Tokens Tab */
        <div className="space-y-8">
          <ChalkCard variant="blueprint" cornerTicks>
            <div className="p-6 space-y-4">
              <h3 className="font-serif text-xl font-bold text-neutral-900 dark:text-white">
                Global Design System Config (chalkConfig.ts)
              </h3>
              <pre className="p-4 rounded-xl bg-black/40 text-emerald-400 font-mono text-xs overflow-x-auto border border-white/10">
                {JSON.stringify(chalkConfig, null, 2)}
              </pre>
            </div>
          </ChalkCard>
        </div>
      )}
    </div>
  );
}
