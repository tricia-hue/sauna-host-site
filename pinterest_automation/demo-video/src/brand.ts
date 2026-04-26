// Revivery brand constants — colors, typography, layout
// Source: BRAND_NOTES.md + revivery-brand skill

export const brand = {
  // Primary colors
  teal: "#395b5e",
  blueBlack: "#2e393f",
  gold: "#ad8d4c",
  peach: "#f4dfc8",

  // Functional shades derived from brand
  blueBlackDeep: "#222b30", // background variant
  goldMuted: "#856a37",
  peachSoft: "#fbf2e6",
  textOnDark: "#f4dfc8", // peach reads beautifully on blue-black

  // Code/terminal colors
  codeBg: "#1a2226",
  codeText: "#f4dfc8",
  codeMuted: "#7c8f96",
  codeAccent: "#ad8d4c",
  codeGreen: "#9bbf8a",
  codeRed: "#d57b6a",
} as const;

export const fonts = {
  // ABC Arizona Sans is the brand font but it's licensed.
  // Use Inter (Google Font) as a close-enough fallback for the demo.
  display: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  mono: '"JetBrains Mono", "SF Mono", Menlo, monospace',
};

export const spacing = {
  page: 120,
  section: 80,
  block: 40,
  tight: 16,
};
