"use client";

import React, { useState } from "react";
import { Printer, Download, Check, Share2, Mail, ExternalLink } from "lucide-react";

export default function PrintResumeButton() {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5 print:hidden">
      <button
        onClick={handlePrint}
        type="button"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d94e34] hover:bg-[#c23f26] text-white font-mono text-xs font-semibold shadow-md transition-all cursor-pointer active:scale-95"
      >
        <Printer className="w-3.5 h-3.5" />
        <span>Print / Save as PDF</span>
      </button>

      <button
        onClick={handleCopyLink}
        type="button"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 font-mono text-xs transition-all cursor-pointer"
        title="Copy resume link to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-emerald-600 dark:text-emerald-400">Copied Link!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Link</span>
          </>
        )}
      </button>

      <a
        href="mailto:akshatdhaundiyal@gmail.com?subject=Opportunity%20Discussion%20-%20Akshat%20Dhaundiyal"
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 font-mono text-xs transition-all"
      >
        <Mail className="w-3.5 h-3.5" />
        <span>Contact Directly</span>
      </a>
    </div>
  );
}
