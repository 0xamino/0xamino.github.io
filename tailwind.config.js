/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enables manual dark mode
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // blue accent
        darkBg: '#0f172a',  // slate dark background
      },
    },
  },
  plugins: [],
}
