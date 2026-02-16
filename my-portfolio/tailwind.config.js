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
        background: '#0B1120',      // Deep midnight blue
        section: '#111827',         // Dark slate
        primary: '#2563EB',         // Strong blue
        accent: '#22D3EE',          // Electric cyan
        text: {
          DEFAULT: '#F8FAFC',       // Primary text
          secondary: '#94A3B8',     // Secondary text
        },
      },
      borderRadius: {
        xl: '16px',
        lg: '12px',
      },
      boxShadow: {
        soft: '0 4px 24px 0 rgba(34, 211, 238, 0.08)',
      },
    },
  },
  plugins: [],
};
