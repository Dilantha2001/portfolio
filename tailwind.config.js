/** @type {import('tailwindcss').Config} */
module.exports = {
  // Use class strategy so you can toggle dark mode programmatically (e.g. ThemeProvider).
  darkMode: 'class',

  // include TS/TSX files and other templates so Tailwind picks up all utilities
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        // keep your existing named color plus any semantic tokens if you want
        nightSky: "#0d1117",
        primary: "#A695E7",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        surface: "var(--surface)",
        border: "var(--border)",
        muted: "var(--muted)",
        // add more semantic tokens as needed
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 35s linear infinite",
        marqueeRight: "marqueeRight 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp"), require('@tailwindcss/typography')],
};
