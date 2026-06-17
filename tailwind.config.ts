import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        bg: "#F8F8F6",
        canvas: "#FFFFFF",
        ink: "#0D0D0D",
        muted: "#767676",
        faint: "#B0B0B0",
        accent: "#1A1AFF",
        "accent-soft": "#EAEAFF",
        "accent-mid": "#4B4BFF",
        border: "rgba(13,13,13,0.09)",
        "border-strong": "rgba(13,13,13,0.18)",
        surface: "rgba(13,13,13,0.03)",
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
        "2xl": "28px",
      },
      animation: {
        "fade-up": "fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-in": "slideIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        "count-up": "countUp 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        countUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        "card-hover": "0 2px 8px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",
        accent: "0 4px 20px rgba(26,26,255,0.2)",
        input: "0 0 0 3px rgba(26,26,255,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
