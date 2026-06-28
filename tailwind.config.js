export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class", // enables dark mode toggle
  theme: {
    extend: {
      colors: {
        indigo: { 500: "#6366f1" },
        purple: { 500: "#a855f7" },
        pink: { 500: "#ec4899" },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
