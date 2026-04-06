import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07080D",
        surface: "#0D0F18",
        "surface-2": "#131520",
        border: "#1E2235",
        "border-light": "#252840",
        blue: {
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          electric: "#2D7FFF",
          bright: "#4D9FFF",
        },
        cyan: {
          400: "#22D3EE",
          500: "#06B6D4",
          glow: "#00D4FF",
        },
        violet: {
          400: "#A78BFA",
          500: "#8B5CF6",
          deep: "#7B2FBE",
        },
        text: {
          primary: "#F0F2FF",
          secondary: "#9AA0C4",
          muted: "#5A6080",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-brand":
          "linear-gradient(135deg, #2D7FFF 0%, #00D4FF 50%, #7B2FBE 100%)",
        "gradient-hero":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(45,127,255,0.18) 0%, transparent 70%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(45,127,255,0.06) 0%, rgba(0,212,255,0.04) 100%)",
        "gradient-glow":
          "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(45,127,255,0.12) 0%, transparent 70%)",
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(45,127,255,0.25)",
        "glow-cyan": "0 0 30px rgba(0,212,255,0.2)",
        "glow-sm": "0 0 15px rgba(45,127,255,0.15)",
        card: "0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(30,34,53,0.8)",
        "card-hover":
          "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(45,127,255,0.2)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulse_glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        pulse_glow: "pulse_glow 3s ease-in-out infinite",
        scan: "scan 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
