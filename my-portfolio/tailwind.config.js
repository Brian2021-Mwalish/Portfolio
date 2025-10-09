/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via `.dark` class
  theme: {
    extend: {
      // Colors are defined in CSS for Tailwind v4
    },
  },
  plugins: [],
};
