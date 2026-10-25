"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ChalkSchematicFrame from "../ChalkSchematicFrame";

export default function MediaChronicleBlueprint() {
  return (
    <ChalkSchematicFrame
      title="Architecture: Local Multi-Modal Vision"
      badge="COMPUTER VISION"
      badgeColor="#f43f5e"
    >
      {(redrawKey) => (
        <>
        <svg
          key={redrawKey}
          viewBox="0 0 560 260"
          className="w-full h-auto max-h-[300px]"
          filter="url(#chalk-grit)"
        >
          {/* Node 1: Local Photos Ingestion */}
          <g>
            <motion.rect
              x="20"
              y="40"
              width="130"
              height="80"
              rx="8"
              fill="rgba(255,255,255,0.03)"
              stroke="#f3f4f6"
              strokeWidth="1.8"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
            <text x="35" y="70" fill="#f3f4f6" fontSize="12" fontFamily="monospace" fontWeight="bold">
              Local Library
            </text>
            <text x="35" y="90" fill="#9ca3af" fontSize="10" fontFamily="sans-serif">
              Raw Photos / Video
            </text>
            <text x="35" y="105" fill="#f43f5e" fontSize="9" fontFamily="monospace">
              Zero-Cloud Sandbox
            </text>
          </g>

          {/* Animated Arrow 1 -> 2 */}
          <motion.path
            d="M 155 80 L 210 80"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <polygon points="210,76 218,80 210,84" fill="#fef08a" />

          {/* Node 2: YOLOv8 Face Detection & Quantized ONNX */}
          <g>
            <motion.rect
              x="220"
              y="25"
              width="170"
              height="110"
              rx="10"
              fill="rgba(244,63,94,0.08)"
              stroke="#f43f5e"
              strokeWidth="2.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            {/* Animated Face Bounding Box simulation */}
            <motion.rect
              x="235"
              y="40"
              width="45"
              height="45"
              rx="4"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            <circle cx="257" cy="58" r="12" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
            <text x="290" y="55" fill="#fff" fontSize="12" fontFamily="monospace" fontWeight="bold">
              YOLOv8.0n
            </text>
            <text x="290" y="72" fill="#86efac" fontSize="10" fontFamily="monospace">
              Sub-100ms
            </text>
            <text x="235" y="105" fill="#fef08a" fontSize="10" fontFamily="sans-serif">
              Quantized ONNX (Int8)
            </text>
            <text x="235" y="120" fill="#9ca3af" fontSize="9" fontFamily="monospace">
              Dynamic Batch Retraining
            </text>
          </g>

          {/* Animated Arrow 2 -> 3 */}
          <motion.path
            d="M 395 80 L 440 80"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          />
          <polygon points="440,76 448,80 440,84" fill="#fef08a" />

          {/* Node 3: Local Vector Index & UI */}
          <g>
            <motion.rect
              x="450"
              y="35"
              width="100"
              height="90"
              rx="8"
              fill="rgba(134,239,172,0.06)"
              stroke="#86efac"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
            />
            <text x="462" y="65" fill="#86efac" fontSize="11" fontFamily="monospace" fontWeight="bold">
              Face Vector
            </text>
            <text x="462" y="82" fill="#fff" fontSize="10" fontFamily="monospace">
              256-dim index
            </text>
            <text x="462" y="105" fill="#9ca3af" fontSize="9" fontFamily="sans-serif">
              Instant Search
            </text>
          </g>

          {/* Handwritten Annotation Callout at Bottom */}
          <motion.path
            d="M 305 140 Q 305 190 230 200"
            fill="none"
            stroke="#fef08a"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          />
          <text
            x="240"
            y="225"
            fill="#fef08a"
            fontSize="14"
            fontFamily="cursive"
            fontStyle="italic"
            textAnchor="middle"
          >
            &ldquo;Zero cloud dependencies. Runs 100% on laptop CPU/GPU.&rdquo;
          </text>
        </svg>

        <div className="mt-3 pt-2.5 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-400">Shipped as Air-Gapped Desktop Appliance</span>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all font-sans font-medium text-[11px]"
          >
            <span>Acquire License (v1) →</span>
          </Link>
        </div>
        </>
      )}
    </ChalkSchematicFrame>
  );
}
