// ============================================================
// AI-Native PM Design System — Design Tokens (JS / ESM)
// Apple-inspired. Generated from tokens.json (SSOT).
// Usage (app dev):
//   import { tokens, color, typography } from "./tokens.js";
//   element.style.background = color.surface.parchment;
// ============================================================

export const color = {
  brand: {
    actionBlue: "#0066cc",
    focusBlue: "#0071e3",
    skyLinkBlue: "#2997ff",
  },
  ink: { default: "#1d1d1f", muted80: "#333333", muted48: "#7a7a7a" },
  surface: {
    canvas: "#ffffff",
    parchment: "#f5f5f7",
    pearl: "#fafafc",
    tile1: "#272729",
    tile2: "#2a2a2c",
    tile3: "#252527",
    black: "#000000",
    chipTranslucent: "rgba(210, 210, 215, 0.64)",
  },
  text: { onPrimary: "#ffffff", onDark: "#ffffff", body: "#1d1d1f", bodyMuted: "#cccccc" },
  line: { dividerSoft: "#f0f0f0", hairline: "#e0e0e0" },
};

export const font = {
  family: {
    display: '"SF Pro Display", system-ui, -apple-system, "Inter", sans-serif',
    text: '"SF Pro Text", system-ui, -apple-system, "Inter", sans-serif',
    mono: '"SF Mono", ui-monospace, Consolas, monospace',
  },
  // ladder is 300 / 400 / 600 / 700 — 500 is intentionally absent
  weight: { light: 300, regular: 400, semibold: 600, bold: 700 },
};

export const typography = {
  heroDisplay: { size: "56px", weight: 600, lineHeight: 1.07, letterSpacing: "-0.28px", family: font.family.display },
  displayLg:   { size: "40px", weight: 600, lineHeight: 1.1,  letterSpacing: "0",        family: font.family.display },
  displayMd:   { size: "34px", weight: 600, lineHeight: 1.47, letterSpacing: "-0.374px", family: font.family.text },
  lead:        { size: "28px", weight: 400, lineHeight: 1.14, letterSpacing: "0.196px",  family: font.family.display },
  leadAiry:    { size: "24px", weight: 300, lineHeight: 1.5,  letterSpacing: "0",        family: font.family.text },
  tagline:     { size: "21px", weight: 600, lineHeight: 1.19, letterSpacing: "0.231px",  family: font.family.display },
  bodyStrong:  { size: "17px", weight: 600, lineHeight: 1.24, letterSpacing: "-0.374px", family: font.family.text },
  body:        { size: "17px", weight: 400, lineHeight: 1.47, letterSpacing: "-0.374px", family: font.family.text },
  caption:     { size: "14px", weight: 400, lineHeight: 1.43, letterSpacing: "-0.224px", family: font.family.text },
  finePrint:   { size: "12px", weight: 400, lineHeight: 1.0,  letterSpacing: "-0.12px",  family: font.family.text },
};

export const radius = { none: "0px", xs: "5px", sm: "8px", md: "11px", lg: "18px", pill: "9999px", full: "9999px" };

export const spacing = { xxs: "4px", xs: "8px", sm: "12px", md: "17px", lg: "24px", xl: "32px", xxl: "48px", section: "80px" };

export const shadow = { product: "3px 5px 30px 0 rgba(0, 0, 0, 0.22)" };

export const effect = { backdropBlur: "saturate(180%) blur(20px)", pressScale: "scale(0.95)" };

export const breakpoint = {
  smallPhone: 419, phone: 640, tabletPortrait: 734, tabletLandscape: 833, smallDesktop: 1068, desktop: 1440,
};

export const tokens = { color, font, typography, radius, spacing, shadow, effect, breakpoint };
export default tokens;
