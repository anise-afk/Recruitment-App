import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#10131A",
        muted: "#5B6472",
        faint: "#8B93A1",
        canvas: "#F6F7FA",
        surface: "#FFFFFF",
        line: "#E3E6EB",
        signal: {
          DEFAULT: "#0E8F7E",
          dark: "#0A6E61",
          light: "#E4F4F1",
        },
        amber: {
          DEFAULT: "#D98A2B",
          light: "#FBEEDC",
        },
        rose: {
          DEFAULT: "#C4493B",
          light: "#F9E9E7",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        lg: "10px",
      },
    },
  },
  plugins: [],
};
export default config;
