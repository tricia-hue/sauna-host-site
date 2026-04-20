import type { Config } from "tailwindcss";

/**
 * Revivery brand tokens.
 * Colors, typography, and spacing are mapped directly from the Revivery brand manual.
 * See /sessions/awesome-wonderful-bardeen/mnt/.claude/skills/revivery-brand/SKILL.md for source of truth.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Revivery canonical brand palette — exact hex values from the brand manual.
        // The manual defines four colors only; extended variants were removed in the
        // brand audit (see BRAND_NOTES.md). Use opacity modifiers (e.g. `text-gold/70`)
        // for shading instead of named variants.
        teal: "#395b5e",
        "blue-black": "#2e393f",
        gold: "#ad8d4c",
        peach: "#f4dfc8",
      },
      fontFamily: {
        // Primary: ABC Arizona Sans. Fallback chain kept wide until the
        // licensed webfont file is placed in /public/fonts and wired up in layout.tsx.
        sans: [
          "'ABC Arizona Sans'",
          "'Inter'",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        display: [
          "'ABC Arizona Sans'",
          "'Inter'",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      letterSpacing: {
        // Brand manual spec: +250 on display headlines
        display: "0.25em",
        heading: "0.1em",
      },
      fontSize: {
        // Custom display sizes for premium, magazine-feel typography
        "display-xl": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "0.95" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4.5rem)", { lineHeight: "1" }],
        "display-md": ["clamp(1.75rem, 3.5vw, 2.75rem)", { lineHeight: "1.05" }],
      },
      maxWidth: {
        prose: "65ch",
        "prose-wide": "72ch",
      },
      spacing: {
        "section": "clamp(4rem, 10vw, 8rem)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out both",
        "fade-in": "fadeIn 1.2s ease-out both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
