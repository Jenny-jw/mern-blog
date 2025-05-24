/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#E6FFFD",
        lightText: "#5E5E5E",
        lightAccent: "#FFE6E8",
        lightFooter: "#FF858E",
        darkBg: "#5E5E5E",
        darkText: "#E6FFFD",
      },
      fontFamily: {
        sourceHanSerif: ["SourceHanSerifTC", "serif"],
      },
    },
  },
  plugins: [],
};
