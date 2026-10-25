import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Compass, ExternalLink } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import Hero3DBackground from "@/components/background/Hero3DBackground";
import SlateProjectCard from "@/components/chalk/SlateProjectCard";
import OtherWorkList from "@/components/OtherWorkList";
import BlogCard from "@/components/BlogCard";
import ChalkCard from "@/components/chalk/ChalkCard";
import ChalkSectionHeading from "@/components/chalk/ChalkSectionHeading";
import ChalkButton from "@/components/chalk/ChalkButton";
import { getAllProjects } from "@/lib/projects";
import { getAllBlogs } from "@/lib/blogs";
import { getWorkspaceSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Akshat Dhaundiyal | AI Product Strategy & Applied ML Systems",
  description:
    "Executive portfolio of Akshat Dhaundiyal: Lead Data Scientist & MBA Candidate. Bridging commercial strategy, unit economics, and deep machine learning architectures.",
};

export const revalidate = 60; // Enable ISR caching with 60s revalidation

export default async function HomePage() {
  const [projects, latestBlogs, settings] = await Promise.all([
    getAllProjects(),
    getAllBlogs({ status: "published" }),
    getWorkspaceSettings(),
  ]);

  // The 3 Core Flagship Architectures (Edge Vision, Enterprise ML, Cloud Inference)
  const flagshipProjects = [
    projects.find((p) => p.slug === "media-chronicle"),
    projects.find((p) => p.slug === "frequency-severity-pricing-model"),
    projects.find((p) => p.slug === "claims-text-analytics-vertex-ai"),
  ].filter(Boolean) as typeof projects;

  const otherWorkProjects = projects.filter((p) => p.section === "other-work");

  return (
    <div className="relative space-y-20 sm:space-y-28 pb-24">
      {/* 3D Neural-Terrain & Chalk Dust Background */}
      <Hero3DBackground />

      {/* 1. Punchy Hero Section */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* 2. Featured Systems Index (All 3 core architectures with live blueprints & deep-dive CTAs) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChalkSectionHeading
          title="Featured Systems"
          symbol="▶"
          symbolColor="#d94e34"
          note="production machine learning architectures"
          actionLink={{ href: "/work", label: "All Works" }}
        />

        <div className="space-y-8">
          {flagshipProjects.map((project) => (
            <SlateProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* 3. Exploratory Works (Curated 2 items) */}
      {otherWorkProjects.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <OtherWorkList projects={otherWorkProjects} limit={2} />
        </section>
      )}

      {/* 4. Selected Technical Papers & System Dispatches */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <ChalkSectionHeading
          title="Writing & Papers"
          symbol="✎"
          symbolColor="#06b6d4"
          note="mathematical modeling & MLOps dispatches"
          actionLink={{ href: "/blog", label: "Read All" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestBlogs.slice(0, 2).map((blog) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
      </section>

      {/* 5. Executive Snapshot (Concise, punchy replacement for 4-paragraph bio dump) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ChalkCard variant="slate" cornerTicks accentColor="#d94e34">
          <div className="p-8 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/[0.08] pb-4">
              <div className="flex items-center gap-3">
                <span className="traditional-seal text-xs font-bold">AD</span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  Executive Snapshot <span className="text-[#d94e34]">⌘</span>
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                  ● MIT Manipal DSP
                </span>
                <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-500/20">
                  MBA Candidate
                </span>
              </div>
            </div>

            {/* 2-Sentence Punchy Positioning */}
            <div className="font-sans text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-3">
              <p>
                Lead Data Scientist and MBA candidate bridging commercial unit economics with production machine learning systems. Former Lead Analytics Architect at <strong>EXL Service</strong>, engineering actuarial GLM triage engines that recovered <strong className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">+$12M</strong> in commercial exposure and sub-100ms NLP threat detection microservices on Google Vertex AI.
              </p>
              <p className="italic font-serif text-neutral-600 dark:text-neutral-400 text-sm">
                &ldquo;I believe the best machine learning models are the ones that make it to production, earn the trust of human underwriters, and deliver verifiable ROI.&rdquo;
              </p>
            </div>

            {/* Quick Navigation Action Strip */}
            <div className="pt-4 border-t border-black/10 dark:border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-600 dark:text-neutral-400">
                <a
                  href={settings.linkedinUrl || "https://linkedin.com/in/akshatdhaundiyal"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <span>•</span>
                <a
                  href={`https://github.com/${settings.githubUsername || "akshatdhaundiyal"}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <span>•</span>
                <a
                  href={`mailto:${settings.contactEmail || "akshatdhaundiyal@gmail.com"}`}
                  className="text-[#d94e34] hover:underline font-semibold"
                >
                  {settings.contactEmail || "akshatdhaundiyal@gmail.com"}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <ChalkButton href="/about" variant="secondary" icon={<Compass className="w-3.5 h-3.5" />}>
                  Full Story &amp; Toolchain
                </ChalkButton>
                <ChalkButton href="/resume" variant="primary" icon={<FileText className="w-3.5 h-3.5" />}>
                  Official CV
                </ChalkButton>
              </div>
            </div>
          </div>
        </ChalkCard>
      </section>
    </div>
  );
}
