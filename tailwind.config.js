/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/app/**/*.{ts,tsx,js,jsx}"],
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

// 'sm': '640px',
// => @media (min-width: 640px) { ... }

// 'md': '768px',
// => @media (min-width: 768px) { ... }

// 'lg': '1024px',
// => @media (min-width: 1024px) { ... }

// 'xl': '1280px',
// => @media (min-width: 1280px) { ... }
