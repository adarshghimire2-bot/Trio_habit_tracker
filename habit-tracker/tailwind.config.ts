import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./context/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F2EFE7",
        "paper-dark": "#E6E1D4",
        ink: "#232A2E",
        "ink-soft": "#5C6660",
        void: "#B8B2A2",
        teal: {
          DEFAULT: "#2A7F7B",
          soft: "#DCEBE9",
        },
        amber: {
          DEFAULT: "#B4791A",
          soft: "#F1E4CC",
        },
        plum: {
          DEFAULT: "#7C4A8A",
          soft: "#EBE0EE",
        },
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(35,42,46,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(35,42,46,0.05) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-cell": "24px 24px",
      },
      keyframes: {
        stamp: {
          "0%": { transform: "scale(1.6)", opacity: "0" },
          "60%": { transform: "scale(0.9)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        stamp: "stamp 260ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
