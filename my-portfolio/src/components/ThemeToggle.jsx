import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ isDark, onToggle }) => {
  const handleToggle = () => {
    onToggle();
    // Fallback: toggle .dark class directly
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  };
  return (
    <button
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="
        p-2 rounded-full
        bg-primary-bg dark:bg-primary-bg-dark
        text-primary-text dark:text-primary-text-dark
        hover:bg-primary-secondary dark:hover:bg-primary-secondary-dark
        transition-colors duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-accent dark:focus:ring-primary-accent-dark
        shadow-sm
      "
    >
      {isDark ? (
        <Sun
          size={20}
          className="text-primary-accent dark:text-primary-accent-alt transition-colors duration-300"
        />
      ) : (
        <Moon
          size={20}
          className="text-primary-accent dark:text-primary-accent-alt transition-colors duration-300"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
