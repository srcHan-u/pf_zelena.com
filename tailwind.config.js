console.log("Loading Tailwind CSS configuration...");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#ECECEC",
        tertiary: "rgba(0, 0, 0, 0.2)",
        quaternary: "#F1F1F1",
      },
      fontFamily: {
        "neue-met": ["Neue Metana", "sans-serif"],
        "neue-mon": ["Neue Montreal", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
        wingdings: ["Wingdings"],
      },
    },
  },
  plugins: [],
};
