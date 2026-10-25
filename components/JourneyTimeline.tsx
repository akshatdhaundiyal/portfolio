"use client";

import React from "react";
import { Compass, Cpu, Milestone, Sparkles } from "lucide-react";
import ChalkCard from "@/components/chalk/ChalkCard";
import ChalkSectionHeading from "@/components/chalk/ChalkSectionHeading";

export default function JourneyTimeline() {
  const stages = [
    {
      number: "01",
      badge: "ENGINEERING CORE",
      title: "Hands-on Data Scientist & Systems Builder",
      period: "2019 — 2024",
      accentColor: "#06b6d4",
      description:
        "Rooted in Electronics & Communication (DSP Minor) at Manipal Institute of Technology (MIT). Shipped production actuarial GLM systems recovering +$12M annually and containerized BERT NLP pipelines on Google Vertex AI at EXL Service.",
      highlights: [
        "Frequency-Severity statistical models & Expected Audit Value matrices",
        "Sub-100ms BERT transformer inference on Vertex AI endpoints",
        "On-device YOLO computer vision & localized IoT telemetry appliances",
      ],
      icon: Cpu,
    },
    {
      number: "02",
      badge: "STRATEGY & DISCOVERY",
      title: "MBA Candidate: Tech Strategy & Unit Economics",
      period: "2024 — Present",
      accentColor: "#6366f1",
      description:
        "Bridging technical execution with commercial acumen. Deepening capabilities in AI product discovery, unit economics, market sizing, financial modeling, and go-to-market (GTM) execution.",
      highlights: [
        "Inference cost vs. latency trade-off modeling and cloud unit economics",
        "Product Requirement Documents (PRDs) and user feedback loops",
        "Enterprise stakeholder alignment & regulatory auditability frameworks",
      ],
      icon: Compass,
    },
    {
      number: "03",
      badge: "THE INTERSECTION",
      title: "AI Product Management & Technical Strategy",
      period: "Future Direction",
      accentColor: "#10b981",
      description:
        "Operating as the bilingual translation layer between machine learning engineering teams and executive leadership. Converting ambiguous business problems into rigorous, high-ROI AI architectures.",
      highlights: [
        "Translating commercial goals into measurable ML loss functions & metrics",
        "Prioritizing AI roadmaps by customer impact and compute feasibility",
        "Leading high-velocity cross-functional engineering and design pods",
      ],
      icon: Sparkles,
    },
  ];

  return (
    <section className="space-y-8">
      <ChalkSectionHeading
        title="The Journey & Trajectory"
        symbol="▶"
        symbolColor="#6366f1"
        note="deliberate progression from DSP to commercial strategy"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <ChalkCard
              key={stage.number}
              variant="slate"
              accentColor={stage.accentColor}
              cornerTicks
              interactive
              className="flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7 space-y-5">
                {/* Stage Header */}
                <div className="flex items-center justify-between font-mono text-xs">
                  <span
                    className="px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${stage.accentColor}18`,
                      color: stage.accentColor,
                    }}
                  >
                    STAGE {stage.number} // {stage.badge}
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400 text-[11px] font-mono">
                    {stage.period}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-[#d94e34] dark:group-hover:text-cyan-300 transition-colors">
                  {stage.title}
                </h3>

                {/* Narrative Description */}
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  {stage.description}
                </p>

                {/* Key Bullet Highlights */}
                <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400 pt-3 border-t border-black/10 dark:border-white/[0.06]">
                  {stage.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: stage.accentColor }} className="font-bold select-none">
                        •
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ChalkCard>
          );
        })}
      </div>
    </section>
  );
}
