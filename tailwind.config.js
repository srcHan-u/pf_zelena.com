/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx,js,jsx}',
    './src/components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
      },
      fontFamily: {
        "neue-met": ['Neue Metana', 'sans-serif'],
        "neue-mon": ['Neue Montreal', 'sans-serif'],
        work: ['Work Sans', 'sans-serif'],
        wingdings: ['Wingdings'],
      },
    },
  },
  plugins: [],
}
