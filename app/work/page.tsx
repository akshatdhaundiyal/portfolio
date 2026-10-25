import React from "react";
import WorkListClient from "./WorkListClient";
import { getAllProjects } from "@/lib/projects";
import { Layers } from "lucide-react";

export const revalidate = 0;

export const metadata = {
  title: "Case Studies & Systems | Akshat Dhaundiyal",
  description:
    "Executive strategic case studies and active engineering prototypes by Akshat Dhaundiyal.",
};

export default async function WorkPage() {
  const allProjects = await getAllProjects();

  const flagshipProjects = allProjects.filter(
    (p) => p.section === "recently-made" || p.section === "currently-cooking"
  );
  const otherProjects = allProjects.filter((p) => p.section === "other-work");

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* Top Banner */}
      <div className="space-y-4 border-b border-black/10 dark:border-white/[0.08] pb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs">
          <Layers className="w-3.5 h-3.5" />
          <span>PORTFOLIO DIRECTORY // BLUEPRINTS &amp; CASE STUDIES</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Strategic Works &amp; Systems.
        </h1>

        <p className="font-sans text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed">
          Tactile blackboard schematics and interactive artifacts documenting production machine learning systems, enterprise unit economics, and computer vision appliances.
        </p>
      </div>

      {/* Interactive Category-Filtered List */}
      <WorkListClient
        flagshipProjects={flagshipProjects}
        otherProjects={otherProjects}
      />
    </div>
  );
}
