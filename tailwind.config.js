/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Brand colours. Change a value here and it updates everywhere.
      // Example usage: bg-navy, text-brand, border-line, bg-ice
      colors: {
        navy: {
          DEFAULT: "#071d36", // main dark blue
          light: "#0d2c4d",
          dark: "#041426", // footer
        },
        brand: {
          DEFAULT: "#2e78b7", // main blue (links, highlights)
          dark: "#315f87",
          light: "#a9c9e3",
        },
        ice: "#eaf4fb", // very light blue (icon boxes)
        soft: "#f6f9fc", // light section background
        ink: "#17283a", // body text
        muted: "#617184", // grey text
        line: "#dce5ed", // borders
        gold: "#c79a4b", // small accent line
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 18px 50px rgba(7, 29, 54, 0.10)",
      },
    },
  },
  plugins: [],
};
