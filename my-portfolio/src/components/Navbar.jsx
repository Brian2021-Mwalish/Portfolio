import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onSectionChange, activeSection, isDark, onToggle }) => {
  const [navOpen, setNavOpen] = useState(false);

  const links = [
    { name: 'Home', section: 'hero' },
    { name: 'About', section: 'about' },
    { name: 'Projects', section: 'projects' },
    { name: 'Experience', section: 'experience' },
    { name: 'Contact', section: 'contact' },
  ];

  const handleClick = (section) => {
    onSectionChange(section);
    setNavOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-100 dark:bg-blue-900 text-primary-text dark:text-primary-text-dark shadow-lg backdrop-blur-md transition-colors duration-500">
      <div className="max-w-[90rem] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-2xl md:text-3xl font-bold text-primary-accent dark:text-primary-accent-dark tracking-wide cursor-pointer hover:text-primary-highlight dark:hover:text-primary-highlight-dark transition-colors duration-300"
          onClick={() => handleClick('hero')}
        >
          LISHNOVA TECH
        </h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleClick(link.section)}
              className={`
                relative px-4 py-2 rounded-lg text-lg font-medium
                transition-all duration-300
                ${
                  activeSection === link.section
                    ? 'bg-primary-accent text-white dark:bg-primary-accent-dark dark:text-white shadow-md'
                    : 'text-primary-text dark:text-primary-text-dark hover:bg-primary-accent/10 dark:hover:bg-primary-accent-dark/20 hover:text-primary-accent dark:hover:text-primary-accent-dark'
                }
                focus:outline-none
                active:scale-95 active:shadow-inner
              `}
            >
              {link.name}
              {/* Optional animated underline */}
              <span
                className={`
                  absolute left-0 -bottom-1 h-1 bg-primary-highlight dark:bg-primary-highlight-dark transition-all duration-300
                  ${activeSection === link.section ? 'w-full' : 'w-0'}
                `}
              />
            </button>
          ))}
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="text-primary-text dark:text-primary-text-dark focus:outline-none"
            aria-label="Toggle navigation"
          >
            {navOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          navOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="bg-blue-100 dark:bg-blue-900 px-6 pt-4 pb-6 space-y-4 border-t border-primary-secondary/20">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleClick(link.section)}
              className={`
                block w-full text-left text-base font-medium px-4 py-2 rounded-lg
                ${
                  activeSection === link.section
                    ? 'bg-primary-accent text-white dark:bg-primary-accent-dark dark:text-white shadow-md'
                    : 'text-primary-text dark:text-primary-text-dark hover:bg-primary-accent/10 dark:hover:bg-primary-accent-dark/20 hover:text-primary-accent dark:hover:text-primary-accent-dark'
                }
                focus:outline-none
                active:scale-95 active:shadow-inner
                transition-all duration-300
              `}
            >
              {link.name}
            </button>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
