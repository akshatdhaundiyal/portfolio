"use client";

import React, { useState } from "react";
import type { ProjectItem } from "@/lib/data/projects";
import SlateProjectCard from "@/components/chalk/SlateProjectCard";
import OtherWorkList from "@/components/OtherWorkList";
import ChalkSectionHeading from "@/components/chalk/ChalkSectionHeading";

interface WorkListClientProps {
  flagshipProjects: ProjectItem[];
  otherProjects: ProjectItem[];
}

const filterCategories = [
  "All Systems",
  "Enterprise AI",
  "Applied ML & Vision",
  "NLP & Cloud",
  "IoT & Edge",
] as const;

export default function WorkListClient({
  flagshipProjects,
  otherProjects,
}: WorkListClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Systems");

  const filteredFlagships = flagshipProjects.filter((project) => {
    if (selectedCategory === "All Systems") return true;
    if (selectedCategory === "Enterprise AI")
      return project.category.toLowerCase().includes("enterprise");
    if (selectedCategory === "Applied ML & Vision")
      return (
        project.category.toLowerCase().includes("vision") ||
        project.category.toLowerCase().includes("applied ml")
      );
    if (selectedCategory === "NLP & Cloud")
      return (
        project.category.toLowerCase().includes("nlp") ||
        project.category.toLowerCase().includes("cloud")
      );
    if (selectedCategory === "IoT & Edge")
      return (
        project.category.toLowerCase().includes("edge") ||
        project.category.toLowerCase().includes("iot")
      );
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-black/10 dark:border-white/[0.08] pb-4">
        {filterCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-xs px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                isActive
                  ? "bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold shadow-sm"
                  : "bg-black/[0.03] dark:bg-white/[0.04] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-black/10 dark:border-white/10"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filtered Flagship Artifacts */}
      <section className="space-y-8">
        <ChalkSectionHeading
          title="Flagship Architectures"
          symbol="▶"
          symbolColor="#d94e34"
          note={`showing ${filteredFlagships.length} verified system${filteredFlagships.length === 1 ? "" : "s"}`}
        />

        {filteredFlagships.length > 0 ? (
          <div className="space-y-10">
            {filteredFlagships.map((project) => (
              <SlateProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-neutral-500 font-mono text-xs border border-dashed border-black/10 dark:border-white/10 rounded-xl">
            No projects found in this category filter.
          </div>
        )}
      </section>

      {/* Exploratory Other Work Section */}
      {otherProjects.length > 0 && selectedCategory === "All Systems" && (
        <section className="pt-4">
          <OtherWorkList projects={otherProjects} />
        </section>
      )}
    </div>
  );
}
