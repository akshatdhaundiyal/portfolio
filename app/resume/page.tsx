import React from "react";
import Link from "next/link";
import {
  FileText,
  Mail,
  Linkedin,
  Github,
  MapPin,
  GraduationCap,
  Briefcase,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Award,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import PrintResumeButton from "@/components/resume/PrintResumeButton";

export const metadata = {
  title: "Executive Resume | Akshat Dhaundiyal",
  description:
    "Curriculum Vitae of Akshat Dhaundiyal: Lead Data Scientist, MBA Candidate, Applied ML Engineer, and AI Product Strategist.",
};

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 print:py-0 print:px-0 print:max-w-none text-neutral-900 dark:text-[#ece5d8]">
      
      {/* Top Action Toolbar (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6 print:hidden">
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-mono text-xs">
            <FileText className="w-3.5 h-3.5" />
            <span>OFFICIAL CURRICULUM VITAE // 2026</span>
          </div>
        </div>

        <PrintResumeButton />
      </div>

      {/* Main Resume Sheet Container */}
      <article className="bg-white dark:bg-[#16171b] print:bg-transparent print:border-none border border-black/10 dark:border-white/10 rounded-2xl sm:rounded-3xl p-8 sm:p-12 shadow-xl print:shadow-none space-y-10 transition-colors">
        
        {/* Header Section */}
        <header className="border-b border-black/10 dark:border-white/10 pb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-neutral-900 dark:text-white">
                Akshat Dhaundiyal
              </h1>
              <p className="text-base sm:text-lg font-mono text-[#d94e34] dark:text-[#f87171] mt-1 font-medium">
                AI Product Management (Technical / AI PM) · Senior Applied ML Engineering
              </p>
            </div>

            <div className="font-mono text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5 sm:text-right">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>India · Open to Global / Relocation</span>
            </div>
          </div>

          {/* Contact Metadata Bar */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-neutral-600 dark:text-neutral-400 pt-2">
            <a
              href="mailto:akshatdhaundiyal@gmail.com"
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#d94e34]" />
              <span>akshatdhaundiyal@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/akshatdhaundiyal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>linkedin.com/in/akshatdhaundiyal</span>
            </a>
            <a
              href="https://github.com/akshatdhaundiyal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>github.com/akshatdhaundiyal</span>
            </a>
          </div>

          {/* Executive Summary */}
          <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 pt-2 font-sans">
            Data Scientist pursuing an MBA, blending <strong>Digital Signal Processing (DSP)</strong> mathematical rigor with <strong>commercial unit economics</strong>. Battle-tested delivering <strong>+$12M</strong> in premium adjustments with compound actuarial GLMs at EXL Service and orchestrating cloud/edge AI systems on Google Vertex AI. Positioned for high-leverage roles leading Technical AI Product Management and Applied ML Engineering.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-3">
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#1f2026] border border-black/5 dark:border-white/5">
              <div className="font-mono text-lg font-bold text-[#d94e34] dark:text-[#f87171]">+$12M</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase">Annual GLM Recovery</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#1f2026] border border-black/5 dark:border-white/5">
              <div className="font-mono text-lg font-bold text-indigo-600 dark:text-indigo-400">70%</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase">NLP Underwriting Speedup</div>
            </div>
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#1f2026] border border-black/5 dark:border-white/5">
              <div className="font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400">&lt;100ms</div>
              <div className="text-[11px] font-mono text-neutral-500 uppercase">On-Device Edge YOLO</div>
            </div>
          </div>
        </header>

        {/* Professional Experience Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-black/10 dark:border-white/10 pb-2">
            <Briefcase className="w-4 h-4" />
            <span>Professional Experience & Systems Delivered</span>
          </div>

          <div className="space-y-8">
            {/* Experience Item 1: EXL Service */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                    Lead Data Scientist & Analytics Architect
                  </h3>
                  <div className="font-mono text-xs text-[#d94e34] font-medium">
                    EXL Service · Insurance & Actuarial AI Practice
                  </div>
                </div>
                <div className="font-mono text-xs text-neutral-500">2023 — Present</div>
              </div>

              <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                <li>
                  Architected and deployed enterprise compound Generalized Linear Models (Poisson frequency × Gamma severity) for commercial property casualty underwriting, unlocking <strong>+$12M in annual premium adjustments</strong>.
                </li>
                <li>
                  Engineered automated NLP triage pipeline on <strong>Google Vertex AI</strong> utilizing fine-tuned transformer architectures to extract unstructured claimant injury severity, reducing triage cycle duration by <strong>70%</strong>.
                </li>
                <li>
                  Authored end-to-end model governance whitepapers complying with strict US state regulatory filing standards, ensuring zero black-box bias and full statistical auditability.
                </li>
                <li>
                  Directed cross-functional sprints across actuaries, software engineers, and underwriting executives to align algorithmic output with commercial loss-ratio targets.
                </li>
              </ul>
            </div>

            {/* Experience Item 2: Media Chronicle & Edge Vision Appliance */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                    Applied AI Systems Architect (Founding Engineer)
                  </h3>
                  <div className="font-mono text-xs text-cyan-600 dark:text-cyan-400 font-medium">
                    Media Chronicle · Privacy-First Edge Vision
                  </div>
                </div>
                <div className="font-mono text-xs text-neutral-500">2024</div>
              </div>

              <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                <li>
                  Built an autonomous local-first biometric indexing system utilizing <strong>YOLOv8</strong> and quantized on-device embeddings, delivering <strong>sub-100ms real-time recognition</strong> with zero cloud egress cost.
                </li>
                <li>
                  Formulated privacy-preserving local edge caching layer eliminating vendor lock-in and minimizing consumer hardware overhead.
                </li>
              </ul>
            </div>

            {/* Experience Item 3: WashQueue IoT Platform */}
            <div className="space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-900 dark:text-white">
                    Full-Stack Systems Engineer
                  </h3>
                  <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    WashQueue Smart Appliance & Platform
                  </div>
                </div>
                <div className="font-mono text-xs text-neutral-500">2024</div>
              </div>

              <ul className="list-disc list-outside pl-5 space-y-1.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans">
                <li>
                  Implemented low-latency telemetry streaming using <strong>FastAPI, WebSockets, and Redis</strong> for real-time appliance state synchronization across 500+ simulated nodes.
                </li>
                <li>
                  Engineered containerized deployment topology with Docker and automated CI/CD GitHub Actions pipelines.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education & Credentials Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-black/10 dark:border-white/10 pb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Education & Strategic Credentials</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#1a1b20] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>MBA CANDIDATE</span>
                <span>2024 — 2026</span>
              </div>
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                Master of Business Administration (MBA)
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                Concentration in Technology Product Strategy, Commercial Unit Economics, Go-To-Market Execution, and Financial Modeling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 dark:bg-[#1a1b20] border border-black/5 dark:border-white/5 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-neutral-500">
                <span>UNDERGRADUATE</span>
                <span>2019 — 2023</span>
              </div>
              <h4 className="text-base font-semibold text-neutral-900 dark:text-white">
                B.Tech in Electronics & Communication
              </h4>
              <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
                Manipal Institute of Technology (MIT) · Minor in DSP
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                Rigorous grounding in Digital Signal Processing (DSP), Stochastic Processes, Linear Algebra, and Statistical Inference.
              </p>
            </div>
          </div>
        </section>

        {/* Technical & Strategic Toolchain */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 border-b border-black/10 dark:border-white/10 pb-2">
            <Cpu className="w-4 h-4" />
            <span>Technical & Strategic Toolchain</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 font-sans text-xs">
            <div className="space-y-2">
              <div className="font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider text-[11px]">
                Machine Learning & Vision
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                PyTorch, YOLOv8, Google Vertex AI, Hugging Face Transformers, Actuarial GLMs (Poisson / Gamma), Scikit-Learn, XGBoost, SpaCy.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider text-[11px]">
                Full-Stack Systems
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Next.js 15 (App Router), React 19, TypeScript, FastAPI (Python), WebSockets, PostgreSQL, Prisma ORM, Docker, Cloud Run.
              </p>
            </div>

            <div className="space-y-2">
              <div className="font-mono font-bold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider text-[11px]">
                Product & Commercial
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                AI Product Discovery, Unit Economics & Cost Calibrations, PRD Authoring, Regulated Underwriting Governance, GTM Strategy.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Technical Writing & Publications */}
        <section className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-2">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              <BookOpen className="w-4 h-4" />
              <span>Published System Papers</span>
            </div>
            <Link
              href="/blog"
              className="font-mono text-xs text-[#d94e34] hover:underline flex items-center gap-1 print:hidden"
            >
              <span>Read Papers</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-2 text-xs text-neutral-700 dark:text-neutral-300 font-sans">
            <p>
              • <strong>Actuarial GLM Compound Modeling:</strong> Recovering +$12M in Non-Standard Property Casualty Books via Poisson-Gamma Optimization.
            </p>
            <p>
              • <strong>Sub-100ms Edge Biometric Inference:</strong> Zero-Cloud Local Computer Vision Pipeline Calibrated for IoT Constraints.
            </p>
            <p>
              • <strong>The Unit Economics of Production AI:</strong> Overcoming Inference Margin Erosion in Enterprise LLM Deployments.
            </p>
          </div>
        </section>

      </article>

      {/* Footer Navigation Back to Overview */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-500 pt-4 print:hidden">
        <Link href="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
          ← Return to Overview
        </Link>
        <Link href="/work" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
          Explore Case Studies →
        </Link>
      </div>

    </div>
  );
}
