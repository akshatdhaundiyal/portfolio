"use client";

import React, { useState, ReactNode } from "react";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight, Activity, Terminal } from "lucide-react";
import type { ProjectItem } from "@/lib/data/projects";
import ChalkCard from "@/components/chalk/ChalkCard";
import ChalkMetricBadge from "@/components/chalk/ChalkMetricBadge";
import ChalkButton from "@/components/chalk/ChalkButton";
import MediaChronicleBlueprint from "@/components/chalk/diagrams/MediaChronicleBlueprint";
import ActuarialGlmBlueprint from "@/components/chalk/diagrams/ActuarialGlmBlueprint";
import ClaimsNlpBlueprint from "@/components/chalk/diagrams/ClaimsNlpBlueprint";

interface SlateProjectCardProps {
  project: ProjectItem;
  blueprintSlot?: ReactNode;
  caseStudyUrl?: string;
}

export default function SlateProjectCard({
  project,
  blueprintSlot,
  caseStudyUrl,
}: SlateProjectCardProps) {
  const [activeTab, setActiveTab] = useState<"blueprint" | "impact">("blueprint");

  // Determine the primary deep-dive destination
  const effectiveCaseStudyUrl =
    caseStudyUrl ||
    (project.slug === "frequency-severity-pricing-model"
      ? "/blog/audit-recommender-glms-case-study"
      : project.slug === "claims-text-analytics-vertex-ai"
      ? "/blog/form-follows-function-applied-ml"
      : undefined);

  const renderBlueprint = () => {
    if (blueprintSlot) {
      return blueprintSlot;
    }

    switch (project.slug) {
      case "media-chronicle":
        return <MediaChronicleBlueprint />;
      case "frequency-severity-pricing-model":
        return <ActuarialGlmBlueprint />;
      case "claims-text-analytics-vertex-ai":
        return <ClaimsNlpBlueprint />;
      default:
        return (
          <div className="p-8 text-center text-neutral-500 dark:text-neutral-400 font-mono text-xs border border-dashed border-black/15 dark:border-white/10 rounded-xl bg-black/[0.02] dark:bg-black/20">
            [Schematic diagram compilation in progress]
          </div>
        );
    }
  };

  return (
    <ChalkCard
      variant="slate"
      accentColor={project.accentColor}
      cornerTicks
      className="my-8"
    >
      <div className="p-6 sm:p-8 space-y-6">
        {/* Card Header: Category, Role, and Metric Callout */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2.5 font-mono text-xs">
              <span
                className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${project.accentColor}18`,
                  color: project.accentColor || "#f43f5e",
                }}
              >
                {project.category}
              </span>
              <span className="text-neutral-400 dark:text-neutral-500">•</span>
              <span className="text-neutral-600 dark:text-neutral-400">
                {project.organization ? `${project.organization} // ` : ""}
                {project.period}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight mt-1">
              {project.title}
            </h3>

            {project.subtitle && (
              <p className="font-serif italic text-sm text-neutral-600 dark:text-neutral-400">
                {project.subtitle}
              </p>
            )}
          </div>

          {/* Sketched Metric Badge */}
          {project.metricValue && (
            <div className="shrink-0">
              <ChalkMetricBadge
                value={project.metricValue}
                label={project.metricLabel || "Metric Impact"}
                accentColor={project.accentColor}
                shape="circle"
              />
            </div>
          )}
        </div>

        {/* View Switcher: Chalk Blueprint vs Executive Impact */}
        <div className="flex items-center gap-2 border-b border-black/10 dark:border-white/[0.08] pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("blueprint")}
            className={`font-mono text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "blueprint"
                ? "bg-black/10 dark:bg-white/10 text-neutral-900 dark:text-white font-semibold border border-black/15 dark:border-white/15"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-amber-500 dark:text-amber-300" />
            <span>System Blueprint</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("impact")}
            className={`font-mono text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "impact"
                ? "bg-black/10 dark:bg-white/10 text-neutral-900 dark:text-white font-semibold border border-black/15 dark:border-white/15"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-300" />
            <span>Executive Narrative &amp; Tradeoffs</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "blueprint" ? (
          <div className="transition-all duration-300">
            {renderBlueprint()}
          </div>
        ) : (
          <div className="space-y-4 text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed font-sans">
            <p>{project.summary}</p>
            {project.context && (
              <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm italic">
                Context: {project.context}
              </p>
            )}

            {project.learntThat && (
              <div className="p-3.5 rounded-xl bg-black/[0.03] dark:bg-black/20 border border-black/10 dark:border-white/5 font-serif italic text-amber-800 dark:text-amber-200/90 text-xs sm:text-sm">
                &ldquo;{project.learntThat}&rdquo;
              </div>
            )}
          </div>
        )}

        {/* Tech Stack Pills & Action Links */}
        <div className="pt-4 border-t border-black/10 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/10 dark:border-white/[0.08] text-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <ChalkButton
                href={project.githubUrl}
                external
                variant="ghost"
                icon={<Github className="w-3.5 h-3.5" />}
              >
                Source Code
              </ChalkButton>
            )}

            {effectiveCaseStudyUrl ? (
              <ChalkButton
                href={effectiveCaseStudyUrl}
                variant="primary"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Read Case Study
              </ChalkButton>
            ) : project.liveUrl ? (
              <ChalkButton
                href={project.liveUrl}
                external
                variant="primary"
                icon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                Launch Demo
              </ChalkButton>
            ) : null}
          </div>
        </div>
      </div>
    </ChalkCard>
  );
}
