import typography from "@tailwindcss/typography";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: ["translate-y-0", "-translate-y-full"],
  theme: {
    extend: {
      colors: {
        lightBg: "#E6FFFD",
        lightText: "#2e2e2e",
        lightAccent: "#FFE6E8",
        lightFooter: "#FF858E", //#FFB3B9
        darkBg: "#2e2e2e",
        darkText: "#E6FFFD",
        darkButton: "#b3fff9",
      },
      fontFamily: {
        kouzan: ["KouzanBrushFont", "cursive"],
        sourceHanSerif: ["SourceHanSerifTC", "serif"],
        notoSerif: ["Noto Serif TC", "serif"],
      },
      typography: {
        left: {
          css: {
            p: { textAlign: "left" },
          },
        },
      },
    },
  },
  plugins: [typography],
};
