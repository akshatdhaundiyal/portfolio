import React from "react";
import Link from "next/link";
import ChalkCard from "@/components/chalk/ChalkCard";
import ChalkSectionHeading from "@/components/chalk/ChalkSectionHeading";
import ChalkButton from "@/components/chalk/ChalkButton";
import ChalkAnnotation from "@/components/chalk/ChalkAnnotation";
import {
  ArrowUpRight,
  BookOpen,
  Headphones,
  Laptop,
  Heart,
  Compass,
  FileText,
  MapPin,
  Sparkles,
  Coffee,
  Activity,
  Layers,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";

export const metadata = {
  title: "About & Shelf | Akshat Dhaundiyal",
  description: "Personal origin, digital bookshelf, off-duty curiosities, gear, and life outside code by Akshat Dhaundiyal.",
};

// =========================================================================
// [CUSTOMIZE]: Digital Bookshelf & Media Diet
// Add or edit your favorite books, essays, and podcasts below!
// =========================================================================
const shelfBooks = [
  {
    title: "Thinking in Systems: A Primer",
    author: "Donella H. Meadows",
    category: "Systems & Mental Models",
    note: "The definitive guide on feedback loops, leverage points, and non-linear dynamics.",
    status: "Recommended",
  },
  {
    title: "Antifragile: Things That Gain from Disorder",
    author: "Nassim Nicholas Taleb",
    category: "Stochastics & Risk",
    note: "Why stress-testing and convex payoffs matter more than predictive forecasts.",
    status: "Reread Often",
  },
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    category: "Distributed Systems",
    note: "The bible of storage engines, partition tolerance, and consensus invariants.",
    status: "Reference",
  },
  {
    title: "The Design of Everyday Things",
    author: "Don Norman",
    category: "Human-Centric Design",
    note: "Affordances, signifiers, and why human errors are usually poor system design.",
    status: "Core Philosophy",
  },
];

const podcastsAndMedia = [
  {
    name: "Acquired",
    hosts: "Ben Gilbert & David Rosenthal",
    genre: "Company Strategy & Playbooks",
    highlight: "Deep multi-hour dissections of enterprise tech economics and founding stories.",
  },
  {
    name: "Dwarkesh Podcast",
    hosts: "Dwarkesh Patel",
    genre: "Deep AI & Macro Systems",
    highlight: "Unusually rigorous technical interviews with leading researchers and engineers.",
  },
  {
    name: "Hardcore History",
    hosts: "Dan Carlin",
    genre: "Long-Form History",
    highlight: "Sweeping epics on the fragility of human institutions under extreme pressure.",
  },
];

// =========================================================================
// [CUSTOMIZE]: Off-Duty Curiosities & Gear Grid
// Add or edit your favorite hardware, sports, hobbies, or gear below!
// =========================================================================
const gearAndHobbies = [
  {
    title: "Edge AI & Hardware Tinkering",
    icon: Laptop,
    accentColor: "#f43f5e",
    tag: "TINKERING",
    description: "Experimenting with quantized YOLOv8 models on low-power Raspberry Pi & Jetson boards. Obsessed with local-first devices that run zero-cloud intelligence.",
  },
  {
    title: "Endurance & Distance Running",
    icon: Activity,
    accentColor: "#10b981",
    tag: "FITNESS",
    description: "Early morning 10k road and trail runs. The ultimate offline reset for processing complex architectural decisions without a screen in sight.",
  },
  {
    title: "Analog Audio & Mechanical Gear",
    icon: Headphones,
    accentColor: "#6366f1",
    tag: "AUDIO & SETUP",
    description: "Custom mechanical keyboard builds (tactile switches with brass plates) and high-fidelity open-back planar headphones for marathon deep work sessions.",
  },
  {
    title: "Coffee & Pour-Over Rituals",
    icon: Coffee,
    accentColor: "#f59e0b",
    tag: "DAILY RITUAL",
    description: "Dialing in light-roast single-origin beans with a manual burr grinder and V60 dripper. The tactile transition ritual from sleep into deep focus.",
  },
];

// =========================================================================
// Institutional Milestones (Concise Professional Anchor)
// =========================================================================
const institutionalMilestones = [
  {
    stage: "01",
    period: "2019 — 2023",
    role: "B.Tech in Electronics & Communication",
    institution: "Manipal Institute of Technology (MIT)",
    accentColor: "#06b6d4",
    icon: GraduationCap,
    takeaway: "Rigorous training in discrete signal processing, stochastic modeling, and hardware systems in the coastal town of Manipal.",
  },
  {
    stage: "02",
    period: "2023 — 2024",
    role: "Lead Analytics Architect",
    institution: "EXL Service",
    accentColor: "#6366f1",
    icon: Briefcase,
    takeaway: "Engineered two-stage actuarial GLMs recovering +$12M in audit exposure and sub-100ms NLP inference microservices on Vertex AI.",
  },
  {
    stage: "03",
    period: "2024 — Present",
    role: "Master of Business Administration (MBA)",
    institution: "Graduate Business Candidate",
    accentColor: "#10b981",
    icon: Award,
    takeaway: "Deepening mastery over tech product strategy, unit economics, go-to-market execution, and financial modeling.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-20">
      
      {/* 1. Warm Personal Introduction */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORIGIN STORY &amp; LIFE OUTSIDE THE TERMINAL</span>
          </span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>India (GMT +5:30)</span>
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight">
          Hi, I am Akshat. <br />
          <span className="font-handwritten text-3xl sm:text-5xl text-[#d94e34] -rotate-1 inline-block pt-1">
            engineer, student, runner &amp; curious mind.
          </span>
        </h1>

        <div className="font-sans text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4 max-w-3xl">
          <p>
            While most of my portfolio showcases machine learning equations, actuarial GLM pricing models, and inference pipelines, I believe technology is only interesting because of the humans behind it and the problems it solves.
          </p>
          <p>
            I grew up fascinated by how things work under the hood. That curiosity led me to study <strong>Digital Signal Processing</strong> at MIT Manipal, where I spent late nights debugging stochastic Fourier transforms and circuit boards. In the professional world, I discovered that the most rewarding part of building systems isn&apos;t just writing clean code—it&apos;s crafting tools that make people more capable, earn their trust, and deliver genuine business value.
          </p>
          <p>
            Outside the terminal, you&apos;ll usually find me logging kilometers on morning road runs, dialing in light-roast pour-over coffee, tinkering with localized AI appliances, or getting lost in long-form books on systems thinking and history.
          </p>
        </div>
      </section>

      {/* 2. Institutional Chapters (Concise Career Timeline Anchor) */}
      <section className="space-y-6">
        <ChalkSectionHeading
          title="Institutional Chapters"
          symbol="▶"
          symbolColor="#6366f1"
          note="where I studied & worked"
          actionLink={{ href: "/resume", label: "Full Official CV" }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {institutionalMilestones.map((m) => {
            const Icon = m.icon;
            return (
              <ChalkCard
                key={m.stage}
                variant="slate"
                accentColor={m.accentColor}
                cornerTicks
                className="flex flex-col justify-between"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${m.accentColor}18`,
                        color: m.accentColor,
                      }}
                    >
                      {m.period}
                    </span>
                    <Icon className="w-4 h-4 text-neutral-400" />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                      {m.role}
                    </h3>
                    <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      {m.institution}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed pt-2 border-t border-black/10 dark:border-white/[0.06]">
                    {m.takeaway}
                  </p>
                </div>
              </ChalkCard>
            );
          })}
        </div>
      </section>

      {/* 3. The Digital Bookshelf & Media Diet */}
      <section className="space-y-6">
        <ChalkSectionHeading
          title="The Digital Bookshelf"
          symbol="✎"
          symbolColor="#f59e0b"
          note="books & podcasts shaping my thinking"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {shelfBooks.map((book) => (
            <ChalkCard
              key={book.title}
              variant="interactive"
              className="p-5 sm:p-6 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-semibold">
                    {book.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.05] text-[10px] font-mono text-neutral-500">
                    {book.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                    {book.title}
                  </h4>
                  <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 mt-0.5">
                    by {book.author}
                  </p>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed pt-1">
                  &ldquo;{book.note}&rdquo;
                </p>
              </div>
            </ChalkCard>
          ))}
        </div>

        {/* Favorite Long-Form Podcasts */}
        <div className="pt-2">
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-3">
            Audio &amp; Long-Form Media Diet:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {podcastsAndMedia.map((pod) => (
              <div
                key={pod.name}
                className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-1.5"
              >
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-neutral-900 dark:text-white">
                  <Headphones className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{pod.name}</span>
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                  {pod.hosts} • {pod.genre}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans pt-1">
                  {pod.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Off-Duty Curiosities & Gear */}
      <section className="space-y-6">
        <ChalkSectionHeading
          title="Off-Duty Curiosities &amp; Gear"
          symbol="⁕"
          symbolColor="#10b981"
          note="what fuels creative energy outside tech"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {gearAndHobbies.map((item) => {
            const Icon = item.icon;
            return (
              <ChalkCard
                key={item.title}
                variant="slate"
                accentColor={item.accentColor}
                cornerTicks
                className="p-6 space-y-3"
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${item.accentColor}18`,
                      color: item.accentColor,
                    }}
                  >
                    {item.tag}
                  </span>
                  <Icon className="w-4 h-4" style={{ color: item.accentColor }} />
                </div>

                <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  {item.description}
                </p>
              </ChalkCard>
            );
          })}
        </div>
      </section>

      {/* 5. Daily Rituals & Principles */}
      <section className="space-y-6">
        <ChalkSectionHeading
          title="Personal Operating Principles"
          symbol="⌘"
          symbolColor="#d94e34"
          note="simple rules I try to live by"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <ChalkCard variant="callout" accentColor="#d94e34" className="p-6 space-y-2">
            <span className="font-mono text-xs text-[#d94e34] font-bold uppercase">
              01 // DEEP WORK BLOCKS
            </span>
            <h4 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
              Defend Morning Focus
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              No meetings or reactive messaging before 11 AM. The quiet morning hours belong to high-leverage math, writing, and hard engineering problems.
            </p>
          </ChalkCard>

          <ChalkCard variant="callout" accentColor="#10b981" className="p-6 space-y-2">
            <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase">
              02 // OFFLINE BALANCE
            </span>
            <h4 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
              Motion Over Stagnation
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              When stuck on an architectural edge-case, staring harder at the screen rarely helps. A 10km run or a long walk untangles thoughts effortlessly.
            </p>
          </ChalkCard>

          <ChalkCard variant="callout" accentColor="#06b6d4" className="p-6 space-y-2">
            <span className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-bold uppercase">
              03 // ZERO VANITY
            </span>
            <h4 className="font-serif font-bold text-base text-neutral-900 dark:text-white">
              Form Follows Function
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
              Systems and life should be stripped of superfluous ornamentation. Clear thinking, simple baseline solutions, and authentic relationships beat posturing every time.
            </p>
          </ChalkCard>
        </div>
      </section>

      {/* 6. Professional Callout Strip */}
      <section className="pt-4 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-serif font-bold text-base text-neutral-900 dark:text-white block">
            Looking for formal engineering credentials &amp; impact metrics?
          </span>
          <span className="font-sans text-xs text-neutral-500 dark:text-neutral-400">
            Check the executive resume for complete employment history and publications.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <ChalkButton href="/work" variant="secondary" icon={<Layers className="w-3.5 h-3.5" />}>
            View Systems
          </ChalkButton>
          <ChalkButton href="/resume" variant="primary" icon={<FileText className="w-3.5 h-3.5" />}>
            Official CV
          </ChalkButton>
        </div>
      </section>

    </div>
  );
}
