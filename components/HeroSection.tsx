"use client";

import React, { useState, useEffect } from "react";
import ChalkAnnotation from "@/components/chalk/ChalkAnnotation";
import ChalkBadge from "@/components/chalk/ChalkBadge";
import ChalkArrow from "@/components/chalk/ChalkArrow";

const rotatingAdjectives = [
  "auditable",
  "high-ROI",
  "statistically sound",
  "cost-calibrated",
  "human-centric",
  "transparent",
];

const dynamicRoles = [
  "Applied Machine Learning Architecture",
  "Commercial Product Strategy & Unit Economics",
  "Auditable Enterprise Systems (+$12M Impact)",
  "Data Science Rigor & Mathematical Soundness",
  "MBA Candidate @ High-Leverage AI Systems",
];

export default function HeroSection() {
  const [adjectiveIndex, setAdjectiveIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  // Rotating kinetic headline adjective
  useEffect(() => {
    const interval = setInterval(() => {
      setAdjectiveIndex((prev) => (prev + 1) % rotatingAdjectives.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  // Rotating dynamic craft / role ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % dynamicRoles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Live Timezone Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTime(timeString);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-6 sm:pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* 1. Dynamic Greeting */}
      <div className="text-center pb-8 sm:pb-12 space-y-4 select-none">
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
          <span>Hi, I am </span>
          <span className="relative inline-block group cursor-pointer">
            <ChalkAnnotation
              type="underline"
              color="#d94e34"
              trigger="inView"
              strokeWidth={3.2}
              duration={0.65}
              padding={6}
            >
              <span className="relative z-10 text-neutral-900 dark:text-[#f4ede2] group-hover:text-[#d94e34] dark:group-hover:text-[#d94e34] transition-colors">
                Akshat Dhaundiyal
              </span>
            </ChalkAnnotation>

            {/* Playful Floating Hand-Drawn Annotation on Hover */}
            <span className="absolute -top-7 sm:-top-8 right-0 font-handwritten text-sm sm:text-base text-[#d94e34] font-bold rotate-6 opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap pointer-events-none">
              (yes, that&apos;s me! ☻)
            </span>
          </span>
          <span className="text-[#d94e34]">.</span>
        </h1>

        {/* Dynamic Kinetic Subtitle / Role Ticker */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans">
          <span className="font-handwritten text-lg sm:text-xl text-[#d94e34] rotate-[-2deg]">
            bridging
          </span>
          <div className="h-8 sm:h-9 overflow-visible inline-flex items-center">
            <ChalkAnnotation
              key={roleIndex}
              type="box"
              color="#f59e0b"
              trigger="mount"
              strokeWidth={1.8}
              duration={0.35}
              padding={4}
            >
              <span className="font-mono text-xs sm:text-sm font-semibold px-2.5 py-1 rounded bg-black/5 dark:bg-white/[0.06] border border-black/10 dark:border-white/[0.08] text-neutral-800 dark:text-neutral-200 inline-block">
                {dynamicRoles[roleIndex]}
              </span>
            </ChalkAnnotation>
          </div>
        </div>
      </div>

      {/* Visual Separator */}
      <div className="w-full flex items-center justify-center pb-8 sm:pb-10">
        <div className="w-24 h-px bg-black/10 dark:bg-white/10" />
      </div>

      {/* 2. Thesis Statement & Availability Badges */}
      <div className="text-center space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/[0.04] border border-black/10 dark:border-white/[0.08] text-xs font-mono text-neutral-800 dark:text-neutral-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>India (GMT +5:30) {currentTime && `• ${currentTime}`}</span>
          </div>

          <ChalkBadge color="#10b981" trigger="mount" rotation={-1.5}>
            ● LIVE SYSTEMS
          </ChalkBadge>

          <ChalkBadge color="#d94e34" trigger="mount" rotation={1.5}>
            MBA CANDIDATE
          </ChalkBadge>
        </div>

        {/* High-Contrast Editorial Sentence with Animated Chalk Circle on Rotating Adjective */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-tight text-neutral-900 dark:text-white leading-[1.25]">
          Software &amp; AI systems should be{" "}
          <span className="inline-block min-w-[210px] sm:min-w-[280px]">
            <ChalkAnnotation
              key={adjectiveIndex}
              type="circle"
              color="#d94e34"
              trigger="mount"
              strokeWidth={2.6}
              duration={0.4}
              padding={10}
            >
              <span className="font-handwritten text-4xl sm:text-6xl text-[#d94e34] inline-block -rotate-1">
                {rotatingAdjectives[adjectiveIndex]}.
              </span>
            </ChalkAnnotation>
          </span>
        </h2>

        {/* 1-Sentence High-Impact Value Proposition */}
        <p className="max-w-2xl mx-auto text-neutral-600 dark:text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
          Designing and deploying auditable machine learning systems where mathematical rigor meets commercial unit economics, operational adoption, and verifiable business ROI.
        </p>

        {/* Subtle Indicator to Explore Work */}
        <div className="pt-4 flex flex-col items-center justify-center text-xs font-mono text-neutral-500 dark:text-neutral-400 gap-1.5 select-none">
          <span className="font-handwritten text-base text-[#d94e34]">explore flagship architectures below</span>
          <span className="text-[#d94e34] animate-bounce">↓</span>
        </div>
      </div>
    </section>
  );
}
