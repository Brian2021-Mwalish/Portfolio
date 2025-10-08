/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via `.dark` class
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'primary-bg': '#FFFFFF',
        'primary-bg-dark': '#000080',

        // Text
        'primary-text': '#0F172A',
        'primary-text-dark': '#FFFFFF',

        // Accents
        'primary-accent': '#06B6D4',
        'primary-accent-dark': '#000080',
        'primary-accent-alt': '#3B82F6',
        'primary-accent-alt-dark': '#1E3A8A',

        // Secondary / supporting colors
        'primary-secondary': '#64748B',
        'primary-secondary-dark': '#94A3B8',

        // Highlights (buttons, active states)
        'primary-highlight': '#1E40AF',
        'primary-highlight-dark': '#3B82F6',
      },
    },
  },
  plugins: [],
};
