"use client";

import React from "react";
import { motion } from "framer-motion";
import ChalkSchematicFrame from "../ChalkSchematicFrame";

export default function ActuarialGlmBlueprint() {
  return (
    <ChalkSchematicFrame
      title="Architecture: Two-Stage Actuarial GLM Triage"
      badge="ENTERPRISE ML"
      badgeColor="#6366f1"
    >
      {(redrawKey) => (
        <svg
          key={redrawKey}
          viewBox="0 0 580 270"
          className="w-full h-auto max-h-[310px]"
          filter="url(#chalk-grit)"
        >
          {/* Node 1: Influx of Policies */}
          <g>
            <motion.rect
              x="15"
              y="55"
              width="120"
              height="75"
              rx="6"
              fill="rgba(255,255,255,0.03)"
              stroke="#9ca3af"
              strokeWidth="1.6"
              strokeDasharray="3 3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
            <text x="25" y="82" fill="#f3f4f6" fontSize="11" fontFamily="monospace" fontWeight="bold">
              Policy Influx
            </text>
            <text x="25" y="100" fill="#9ca3af" fontSize="10" fontFamily="sans-serif">
              $100M+ Volume
            </text>
            <text x="25" y="115" fill="#6366f1" fontSize="9" fontFamily="monospace">
              Commercial Lines
            </text>
          </g>

          {/* Arrow 1 -> Stage 1 */}
          <motion.path
            d="M 140 92 L 180 92"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          />

          {/* Stage 1: Binomial GLM */}
          <g>
            <motion.rect
              x="185"
              y="45"
              width="145"
              height="95"
              rx="8"
              fill="rgba(99,102,241,0.08)"
              stroke="#6366f1"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            />
            <text x="195" y="70" fill="#a5b4fc" fontSize="10" fontFamily="monospace" fontWeight="bold">
              STAGE 1: BINOMIAL
            </text>
            <text x="195" y="88" fill="#f3f4f6" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
              P(Adjustment)
            </text>
            <text x="195" y="106" fill="#9ca3af" fontSize="9" fontFamily="monospace">
              Logit Link Function
            </text>
            <text x="195" y="124" fill="#86efac" fontSize="9" fontFamily="monospace">
              Transparent Betas
            </text>
          </g>

          {/* Arrow Stage 1 -> Stage 2 */}
          <motion.path
            d="M 335 92 L 375 92"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />

          {/* Stage 2: Gamma GLM */}
          <g>
            <motion.rect
              x="380"
              y="45"
              width="140"
              height="95"
              rx="8"
              fill="rgba(217,78,52,0.08)"
              stroke="#d94e34"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
            />
            <text x="390" y="70" fill="#fca5a5" fontSize="10" fontFamily="monospace" fontWeight="bold">
              STAGE 2: GAMMA
            </text>
            <text x="390" y="88" fill="#f3f4f6" fontSize="11" fontFamily="sans-serif" fontWeight="bold">
              E[Recoverable $]
            </text>
            <text x="390" y="106" fill="#9ca3af" fontSize="9" fontFamily="monospace">
              Log Link Severity
            </text>
            <text x="390" y="124" fill="#fef08a" fontSize="9" fontFamily="monospace">
              EAV Matrix
            </text>
          </g>

          {/* Big Output Circle: +$12M */}
          <g>
            <motion.path
              d="M 450 145 Q 450 195 380 205"
              fill="none"
              stroke="#86efac"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            />
            {/* Hand-drawn circle around +$12M */}
            <motion.ellipse
              cx="290"
              cy="210"
              rx="85"
              ry="32"
              fill="none"
              stroke="#86efac"
              strokeWidth="2.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 1.5 }}
            />
            <text x="290" y="215" fill="#86efac" fontSize="18" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              +$12M Lift
            </text>
            <text x="290" y="235" fill="#9ca3af" fontSize="9" fontFamily="monospace" textAnchor="middle">
              Annual Recovered Exposure
            </text>
          </g>

          {/* Underwriter Trust Callout */}
          <text
            x="80"
            y="215"
            fill="#fef08a"
            fontSize="13"
            fontFamily="cursive"
            fontStyle="italic"
          >
            &ldquo;Actuaries trusted the GLM coefficients over black-box trees.&rdquo;
          </text>
        </svg>
      )}
    </ChalkSchematicFrame>
  );
}
