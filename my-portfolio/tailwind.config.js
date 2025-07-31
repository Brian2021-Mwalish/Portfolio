/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          800: '#1e40af', // vibrant navy blue
          900: '#1e3a8a', // deeper navy blue
        },
      },
    },
  },
  plugins: [],
};
