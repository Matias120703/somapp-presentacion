import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-blue":    "#2F7DF6",
        "brand-blue-2":  "#1955D8",
        "brand-dark":    "#050B14",
        "brand-surface": "#0B1320",
      },
      animation: {
        "float": "floatY 6s ease-in-out infinite",
      },
      keyframes: {
        floatY: {
          "0%, 100%": { transform: "translateY(0px)"   },
          "50%":       { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
