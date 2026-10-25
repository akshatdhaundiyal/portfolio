/**
 * Centralized Chalk Design System Configuration
 * Single source of truth for roughness, stroke weights, animation durations,
 * and chalk palette colors across all components and pages.
 */
export const chalkConfig = {
  strokeWidth: {
    thin: 1.5,
    normal: 2.2,
    bold: 3.2,
  },
  roughness: {
    subtle: 0.8,
    handDrawn: 1.5,
    sketchy: 2.2,
  },
  durations: {
    fast: 0.25,
    normal: 0.45,
    slow: 0.75,
  },
  colors: {
    vermilion: "#d94e34",
    emerald: "#10b981",
    amber: "#f59e0b",
    cyan: "#06b6d4",
    indigo: "#6366f1",
    chalkWhite: "#f3f4f6",
    chalkMuted: "#9ca3af",
    slateSurface: "#14161f",
    slateSurfaceHover: "#1c1e2b",
    canvasDark: "#0c0d12",
  },
  gritFilterId: "chalk-grit",
} as const;

export type ChalkColorKey = keyof typeof chalkConfig.colors;
