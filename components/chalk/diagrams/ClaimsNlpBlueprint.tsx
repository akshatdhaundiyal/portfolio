"use client";

import React from "react";
import { motion } from "framer-motion";
import ChalkSchematicFrame from "../ChalkSchematicFrame";

export default function ClaimsNlpBlueprint() {
  return (
    <ChalkSchematicFrame
      title="Architecture: Sub-100ms Vertex AI NLP Ingestion"
      badge="CLOUD ARCHITECTURE"
      badgeColor="#06b6d4"
    >
      {(redrawKey) => (
        <svg
          key={redrawKey}
          viewBox="0 0 570 260"
          className="w-full h-auto max-h-[300px]"
          filter="url(#chalk-grit)"
        >
          {/* Note Document Frame */}
          <g>
            <motion.rect
              x="20"
              y="35"
              width="150"
              height="115"
              rx="6"
              fill="rgba(255,255,255,0.02)"
              stroke="#cbd5e1"
              strokeWidth="1.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
            <text x="32" y="60" fill="#94a3b8" fontSize="10" fontFamily="monospace" fontWeight="bold">
              Adjuster Notes (Raw)
            </text>
            <text x="32" y="80" fill="#fef08a" fontSize="9" fontFamily="monospace">
              &quot;...attorney retained...&quot;
            </text>
            <text x="32" y="98" fill="#7dd3fc" fontSize="9" fontFamily="monospace">
              &quot;...third-party liability...&quot;
            </text>
            <text x="32" y="118" fill="#f43f5e" fontSize="9" fontFamily="monospace">
              [PII scrubbed]
            </text>
            {/* Animated Laser Scanning Beam */}
            <motion.line
              x1="22"
              y1="40"
              x2="168"
              y2="40"
              stroke="#06b6d4"
              strokeWidth="2"
              animate={{ y1: [40, 145, 40], y2: [40, 145, 40] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            />
          </g>

          {/* Arrow 1 -> 2 */}
          <motion.path
            d="M 175 90 L 220 90"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          />

          {/* Quantized Transformer / FastAPI Container */}
          <g>
            <motion.rect
              x="225"
              y="30"
              width="165"
              height="125"
              rx="10"
              fill="rgba(6,182,212,0.08)"
              stroke="#06b6d4"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            />
            <text x="238" y="55" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
              Google Vertex AI
            </text>
            <text x="238" y="75" fill="#f3f4f6" fontSize="11" fontFamily="sans-serif">
              Quantized BERT (Int8)
            </text>
            <text x="238" y="95" fill="#86efac" fontSize="10" fontFamily="monospace">
              FastAPI Container
            </text>
            <text x="238" y="115" fill="#9ca3af" fontSize="9" fontFamily="monospace">
              Auto-Scaling Endpoints
            </text>
            <text x="238" y="135" fill="#fef08a" fontSize="9" fontFamily="monospace">
              Pre-warmed Replicas
            </text>
          </g>

          {/* Arrow 2 -> SLA */}
          <motion.path
            d="M 395 90 L 440 90"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 1 }}
          />

          {/* SLA Stopwatch & Telemetry Box */}
          <g>
            <motion.circle
              cx="490"
              cy="90"
              r="40"
              fill="rgba(16,185,129,0.08)"
              stroke="#10b981"
              strokeWidth="2.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            />
            <text x="490" y="85" fill="#86efac" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              &lt;85ms
            </text>
            <text x="490" y="105" fill="#9ca3af" fontSize="9" fontFamily="monospace" textAnchor="middle">
              p95 Latency
            </text>
          </g>

          {/* Annotation at bottom */}
          <text
            x="200"
            y="210"
            fill="#fef08a"
            fontSize="14"
            fontFamily="cursive"
            fontStyle="italic"
            textAnchor="middle"
          >
            &ldquo;Eliminated 10-second cold start spikes on morning batch processing.&rdquo;
          </text>
        </svg>
      )}
    </ChalkSchematicFrame>
  );
}
