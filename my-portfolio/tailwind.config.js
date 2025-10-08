/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          bg: {
            DEFAULT: '#FFFFFF',
            dark: '#000080'
          },
          text: {
            DEFAULT: '#0F172A',
            dark: '#FFFFFF'
          },
          accent: {
            DEFAULT: '#06B6D4',
            dark: '#000080'
          },
          'accent-alt': {
            DEFAULT: '#3B82F6',
            dark: '#1E3A8A'
          },
          secondary: {
            DEFAULT: '#64748B',
            dark: '#94A3B8'
          },
          highlight: {
            DEFAULT: '#1E40AF',
            dark: '#3B82F6'
          }
        }
      }
    },
  },
  plugins: [],
}
