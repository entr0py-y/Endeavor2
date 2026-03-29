import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "var(--bg-base)",
          surface: "var(--bg-surface)",
          elevated: "var(--bg-elevated)",
          subtle: "var(--bg-subtle)",
        },
        accent: {
          primary: "var(--accent-primary)",
          dim: "var(--accent-dim)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
          dim: "var(--text-dim)",
        },
        border: {
          DEFAULT: "var(--border)",
          hover: "var(--border-hover)",
          strong: "var(--border-strong)",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["56px", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["40px", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "display-md": ["28px", { lineHeight: "1.2", letterSpacing: "-0.03em" }],
        "body-lg": ["20px", { lineHeight: "1.5" }],
        "body-md": ["16px", { lineHeight: "1.6" }],
        "body-sm": ["14px", { lineHeight: "1.5" }],
        "label-xs": ["12px", { lineHeight: "1.4", letterSpacing: "0.12em" }],
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "4px",
      },
      maxWidth: {
        container: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
