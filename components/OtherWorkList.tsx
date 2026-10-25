"use client";

import React, { useState } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "@/lib/data/projects";
import ChalkCard from "@/components/chalk/ChalkCard";
import ChalkSectionHeading from "@/components/chalk/ChalkSectionHeading";
import ChalkButton from "@/components/chalk/ChalkButton";

interface OtherWorkListProps {
  projects: ProjectItem[];
  limit?: number;
}

export default function OtherWorkList({ projects, limit }: OtherWorkListProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className="relative w-full max-w-4xl mx-auto my-14">
      {/* Section Header */}
      <ChalkSectionHeading
        title="Other Work"
        symbol="⁕"
        symbolColor="#d94e34"
        note="exploratory prototypes & IoT appliances"
      />

      {/* Clean Editorial List */}
      <div className="space-y-4">
        {displayedProjects.map((item) => {
          return (
            <ChalkCard
              key={item.id}
              variant="interactive"
              className="p-5 sm:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-[#d94e34] transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 border border-black/10 dark:border-white/[0.06]">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                    {item.summary || item.subtitle}
                  </p>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/[0.03] text-neutral-700 dark:text-neutral-400 font-mono text-[10px] border border-black/10 dark:border-white/[0.06]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Side: Metric & Repo Link */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 shrink-0">
                  {item.metricValue && (
                    <div className="sm:text-right">
                      <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400 block">
                        {item.metricValue}
                      </span>
                      {item.metricLabel && (
                        <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 block">
                          {item.metricLabel}
                        </span>
                      )}
                    </div>
                  )}

                  {item.githubUrl && (
                    <ChalkButton
                      href={item.githubUrl}
                      external
                      variant="secondary"
                      icon={<Github className="w-3.5 h-3.5" />}
                    >
                      Code
                    </ChalkButton>
                  )}
                </div>
              </div>
            </ChalkCard>
          );
        })}
      </div>
    </section>
  );
}
