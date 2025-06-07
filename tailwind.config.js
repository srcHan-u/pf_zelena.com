console.log("Loading Tailwind CSS configuration...");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    // Include all files in the src directory with specified extensions
    // You can add more directories or file patterns as needed
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "100%",
        md: "100%",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
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
