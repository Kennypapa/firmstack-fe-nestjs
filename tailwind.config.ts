import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./stores/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "rgb(51 136 255 / <alpha-value>)",
          foreground: "#ffffff",
          light: "rgb(123 191 255 / <alpha-value>)",
        },
        navy: "rgb(34 46 77 / <alpha-value>)",
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
      },
      fontFamily: {
        onest: ["Onest", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
