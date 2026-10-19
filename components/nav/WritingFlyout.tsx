import React from "react";

export default function WritingFlyout() {
  return (
    <div className="absolute left-full ml-2.5 top-1/2 -translate-y-1/2 pointer-events-none z-40 animate-doodle-flyout-right flex items-center gap-1.5 whitespace-nowrap">
      <div className="relative flex items-center">
        {/* Hand-Drawn Open Notebook / Dispatch Doodle */}
        <svg
          viewBox="0 0 54 44"
          className="w-10 h-8 sm:w-11 sm:h-9 text-neutral-800 dark:text-[#ece5d8] overflow-visible"
        >
          {/* Left page outline */}
          <path
            d="M 27,6 C 20,4 12,5 6,7 L 6,36 C 12,34 20,33 27,35 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Right page outline */}
          <path
            d="M 27,6 C 34,4 42,5 48,7 L 48,36 C 42,34 34,33 27,35 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center binding line */}
          <path d="M 27,6 L 27,35" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          {/* Writing scribbles */}
          <path d="M 11,15 L 22,14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 11,21 L 20,20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 32,14 L 43,15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 32,20 L 41,21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Floating Pencil / Quill Doodle on right */}
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4 text-[#d94e34] absolute -right-3 -top-2 overflow-visible"
        >
          <path
            d="M 3,21 L 7,20 L 20,7 L 17,4 L 4,17 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M 14,7 L 17,10" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </div>
    </div>
  );
}
