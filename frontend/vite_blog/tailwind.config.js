/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#c7efff",
        lightText: "#5E5E5E",
        lightAccent: "#fff2f2",
        darkBg: "#5E5E5E",
        darkText: "#c7efff",
      },
    },
  },
  plugins: [],
};
