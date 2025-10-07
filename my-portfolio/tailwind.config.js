/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#FFFFFF',
          text: '#0F172A',
          accent: '#06B6D4',
          'accent-alt': '#3B82F6',
          secondary: '#64748B',
          highlight: '#1E40AF'
        }
      }
    },
  },
  plugins: [],
}
