/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via `.dark` class
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
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Arial',
          'Helvetica',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        serif: [
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],
        mono: [
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        background: '#ffffff',      // White background
        section: '#f3f4f6',         // Light gray section
        primary: '#2563EB',         // Strong blue (keep for accent)
        accent: '#22D3EE',          // Electric cyan (keep for accent)
        text: {
          DEFAULT: '#222222',       // Dark text
          secondary: '#555555',     // Medium text
        },
        blue: '#2563EB',
        green: '#22C55E',
        red: '#EF4444',
        yellow: '#FACC15',
        orange: '#FB923C',
        purple: '#8B5CF6',
        pink: '#EC4899',
        gray: '#6B7280',
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
