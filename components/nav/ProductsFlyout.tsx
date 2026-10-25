import React from "react";

export default function ProductsFlyout() {
  return (
    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 pointer-events-none z-40 flex flex-col items-center whitespace-nowrap transition-all duration-150">
      <div className="relative">
        {/* Hand-Drawn Physical Product Luggage/Price Tag */}
        <svg
          viewBox="0 0 54 60"
          className="w-9 h-11 sm:w-10 sm:h-12 text-neutral-800 dark:text-[#ece5d8] overflow-visible"
        >
          {/* String Loop */}
          <path d="M 27,0 C 27,6 23,10 27,12" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          {/* Tag Outline */}
          <path
            d="M 21,12 L 33,12 L 45,24 L 45,54 L 9,54 L 9,24 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Tag Eyelet Hole */}
          <circle cx="27" cy="18" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          {/* Tactile Currency / Barcode Lines */}
          <line x1="16" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="1.6" strokeDasharray="3 2" />
          <line x1="16" y1="40" x2="38" y2="40" stroke="currentColor" strokeWidth="1.6" strokeDasharray="2 3" />
          <line x1="16" y1="46" x2="32" y2="46" stroke="currentColor" strokeWidth="1.6" />
        </svg>

        {/* Chalk Sparkle Accent */}
        <svg
          viewBox="0 0 16 16"
          className="w-3.5 h-3.5 text-[#d94e34] absolute -right-3 top-3 overflow-visible select-none animate-doodle-drop-spring"
        >
          <path d="M 8,0 L 8,16 M 0,8 L 16,8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}
