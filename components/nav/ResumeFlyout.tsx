import React from "react";

export default function ResumeFlyout() {
  return (
    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 pointer-events-none z-40 flex flex-col items-center whitespace-nowrap transition-all duration-150">
      <div className="relative flex items-center">
        {/* Hand-Drawn Diploma / Scroll / Wax Seal Doodle */}
        <svg
          viewBox="0 0 52 46"
          className="w-10 h-9 sm:w-11 sm:h-10 text-neutral-800 dark:text-[#ece5d8] overflow-visible"
        >
          {/* Rolled Certificate Outline */}
          <rect
            x="6"
            y="8"
            width="36"
            height="26"
            rx="3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          {/* Ribbon / Hanging Badge */}
          <path
            d="M 14,8 L 14,38 L 19,33 L 24,38 L 24,8"
            fill="none"
            stroke="#d94e34"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Certificate text lines */}
          <path d="M 27,15 L 37,15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 27,20 L 35,20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 27,25 L 38,25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Small Star / Seal ✦ */}
          <circle cx="19" cy="22" r="2.5" fill="#d94e34" />
        </svg>

        {/* Tactile Mini Pill: "PDF" */}
        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#d94e34] text-white font-bold ml-0.5 shadow-sm">
          PDF
        </span>
      </div>
    </div>
  );
}
