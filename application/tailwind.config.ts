import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        grid: "grid 15s linear infinite",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: "1",
            transform: "translate(-50%, -40%) scale(1.2)",
          },
        },
        glow: {
          "0%": {
            textShadow: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
            filter: "brightness(1)",
          },
          "100%": {
            textShadow: "0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor",
            filter: "brightness(1.2)",
          },
        },
        grid: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-60px)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
