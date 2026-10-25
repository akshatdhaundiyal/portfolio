"use client";

import React from "react";
import { motion } from "framer-motion";
import ChalkAnnotation from "@/components/chalk/ChalkAnnotation";

interface MetricItem {
  value: string;
  label: string;
  sublabel: string;
  color: string;
}

const metrics: MetricItem[] = [
  {
    value: "+$12M",
    label: "Recovered Audit Exposure",
    sublabel: "Annualized GLM pricing lift @ EXL",
    color: "#10b981",
  },
  {
    value: "<85ms",
    label: "p95 Inference Latency",
    sublabel: "Quantized NLP on Google Vertex AI",
    color: "#06b6d4",
  },
  {
    value: "100%",
    label: "On-Device Privacy",
    sublabel: "Local YOLOv8 photo memory intelligence",
    color: "#f43f5e",
  },
  {
    value: "Sub-100ms",
    label: "Real-Time Face Retraining",
    sublabel: "Zero-cloud edge IPC vector search",
    color: "#f59e0b",
  },
];

export default function KineticMetricStrip() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-[#14161f] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Subtle background grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Verified Production Impact &amp; Metrics</span>
            </span>
            <span className="font-handwritten text-sm text-amber-200/90 -rotate-1 hidden sm:inline-block">
              auditable unit economics
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {metrics.map((m, idx) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-1.5"
              >
                <div className="inline-block">
                  <ChalkAnnotation
                    type="circle"
                    color={m.color}
                    trigger="inView"
                    padding={6}
                    strokeWidth={2.4}
                  >
                    <span
                      className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight inline-block"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </span>
                  </ChalkAnnotation>
                </div>

                <h4 className="font-serif font-bold text-sm text-white pt-1">
                  {m.label}
                </h4>

                <p className="font-sans text-xs text-neutral-400 leading-snug">
                  {m.sublabel}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
