import type { Config } from "tailwindcss";

/**
 * "Botanical Editorial" design system — 2026 redesign.
 * Single source of truth for colors, type, radius, shadows.
 *
 * Heritage: the site's original Newsreader + Manrope pairing (see README),
 * refined. Warm bone canvas, deep-forest ink, ONE locked accent (terracotta)
 * for every interactive emphasis. Sage and clay are neutral decoration only.
 *
 * Shape lock: pill = interactive controls only, 28/20px concentric shells =
 * surfaces (double-bezel), 16px = inputs, arch = the portrait motif only.
 * Z scale: content 0, raised 10, sticky nav 40, mobile menu 50, grain 60,
 * skip-link 70.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // ── Botanical palette (retuned) ──
        alabaster: "#F7F5EF", // warm bone canvas
        paper: "#FCFBF8", // raised panel white (warm-tinted)
        forest: "#243029", // deep forest ink — primary text/buttons
        sage: "#8C9A84", // decorative tint only (vines, soft blobs)
        clay: "#DDD4C6", // neutral secondary surface
        "clay-soft": "#F0EDE6", // soft fills / inputs alt
        stone: "#E5E1D6", // hairline borders
        terracotta: "#BC6449", // THE accent — links, hovers, focus, active
        "terracotta-deep": "#9F5238", // accent text on light (AA 5.2)
        "terracotta-soft": "#F4E6DC", // accent tint surface

        // Supporting tones (text hierarchy)
        "forest-soft": "#4A564E", // secondary body text (AA 7.2)
        "forest-mute": "#6E7B72", // captions / meta (AA 4.6)

        // Semantic (muted, botanical-friendly)
        success: "#5F7F61",
        "success-soft": "#E4EBE2",
        error: "#B4544A",
        "error-soft": "#F5E2DD",
        "error-deep": "#8F3D35",

        // ── Aliases so legacy class names keep working ──
        primary: "#243029",
        "on-primary": "#F7F5EF",
        ink: "#243029",
        body: "#4A564E",
        mute: "#6E7B72",
        hairline: "#E5E1D6",
        "hairline-strong": "#CFC8BA",
        canvas: "#FFFFFF",
        "canvas-soft": "#F7F5EF",
        "canvas-soft-2": "#F0EDE6",
        link: "#243029",
        "link-deep": "#BC6449",
        "link-bg-soft": "#F4E6DC",
        warning: "#C9A24B",
        "warning-soft": "#F3EAD2",
        "warning-deep": "#8A6C25",
        "sage-deep": "#5F6D57", // kept for decorative tints
      },
      fontFamily: {
        // Newsreader (editorial display serif, heritage) + Manrope (UI/body)
        // + Geist Mono (real mono this time — eyebrows, meta, code)
        serif: ["var(--font-newsreader)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-manrope)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["60px", { lineHeight: "1.06", letterSpacing: "-0.03em", fontWeight: "560" }],
        "display-lg": ["44px", { lineHeight: "1.08", letterSpacing: "-0.025em", fontWeight: "560" }],
        "display-md": ["32px", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "540" }],
        "display-sm": ["24px", { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "540" }],
        "body-lg": ["18px", { lineHeight: "1.7", letterSpacing: "0px" }],
        "body-md": ["16px", { lineHeight: "1.65", letterSpacing: "0px" }],
        "body-sm": ["14px", { lineHeight: "1.55", letterSpacing: "0px" }],
        caption: ["11px", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        code: ["14px", { lineHeight: "1.6", letterSpacing: "0px" }],
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
        "4xl": "64px",
        "5xl": "96px",
        "6xl": "128px",
        section: "192px",
      },
      borderRadius: {
        none: "0px",
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "16px", // inputs
        xl: "20px", // bezel core
        "2xl": "28px", // bezel shell
        "3xl": "24px",
        arch: "9999px",
        pill: "9999px",
        full: "9999px",
      },
      maxWidth: {
        page: "80rem",
        content: "768px",
        prose: "68ch",
      },
      boxShadow: {
        // Forest-hued, heavily diffused — never pure black at low opacity.
        soft: "0 1px 2px rgba(36, 48, 41, 0.04), 0 4px 14px rgba(36, 48, 41, 0.04)",
        medium:
          "0 2px 4px rgba(36, 48, 41, 0.04), 0 14px 34px -10px rgba(36, 48, 41, 0.10)",
        large:
          "0 2px 6px rgba(36, 48, 41, 0.05), 0 26px 52px -14px rgba(36, 48, 41, 0.14)",
        bezel: "inset 0 1px 0 rgba(255, 255, 255, 0.7)",
        // Legacy aliases → mapped onto the same ladder
        "level-1": "0 1px 2px rgba(36, 48, 41, 0.04), 0 4px 14px rgba(36, 48, 41, 0.04)",
        "level-2": "0 1px 2px rgba(36, 48, 41, 0.04), 0 4px 14px rgba(36, 48, 41, 0.04)",
        "level-3": "0 2px 4px rgba(36, 48, 41, 0.04), 0 14px 34px -10px rgba(36, 48, 41, 0.10)",
        "level-4": "0 2px 6px rgba(36, 48, 41, 0.05), 0 26px 52px -14px rgba(36, 48, 41, 0.14)",
        "level-5": "0 2px 6px rgba(36, 48, 41, 0.05), 0 26px 52px -14px rgba(36, 48, 41, 0.14)",
        xl: "0 2px 6px rgba(36, 48, 41, 0.05), 0 26px 52px -14px rgba(36, 48, 41, 0.14)",
      },
      transitionTimingFunction: {
        organic: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "menu-item": {
          "0%": { opacity: "0", transform: "translateY(26px)", filter: "blur(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "menu-item": "menu-item 0.65s cubic-bezier(0.32, 0.72, 0, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
