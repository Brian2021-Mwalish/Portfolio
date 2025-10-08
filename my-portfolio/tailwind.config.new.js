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
        'primary-bg': '#FFFFFF',
        'primary-bg-dark': '#000080',
        'primary-text': '#0F172A',
        'primary-text-dark': '#FFFFFF',
        'primary-accent': '#06B6D4',
        'primary-accent-dark': '#000080',
        'primary-accent-alt': '#3B82F6',
        'primary-accent-alt-dark': '#1E3A8A',
        'primary-secondary': '#64748B',
        'primary-secondary-dark': '#94A3B8',
        'primary-highlight': '#1E40AF',
        'primary-highlight-dark': '#3B82F6'
      }
    },
  },
  plugins: [],
}
