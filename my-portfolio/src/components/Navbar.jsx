import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import logoImage from "/Kraftrix Africa.png";

const Navbar = ({ onSectionChange, activeSection, isDark, onToggle }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const links = [
    { name: 'Home', section: 'hero' },
    { name: 'Projects', section: 'projects' },
    { name: 'Contact', section: 'contact' },
  ];

  const aboutDropdown = [
    { name: 'About', section: 'about' },
    { name: 'Experience', section: 'experience' },
    { name: 'Testimonials', section: 'testimonials' },
    { name: 'Fun Facts', section: 'funfacts' },
  ];

  const handleClick = (section) => {
    onSectionChange(section);
    setNavOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-blue-100 dark:bg-blue-900 text-primary-text dark:text-primary-text-dark shadow-lg backdrop-blur-md transition-colors duration-500">
      <div className="max-w-[90rem] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleClick('hero')}>
          <motion.img
            src={logoImage}
            alt="Kraftrix Africa Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border border-primary/30 shadow-md"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-text dark:text-primary-text-dark">
            Kraftrix Africa Technologies
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-around flex-1 max-w-md">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleClick(link.section)}
              className={`text-base font-medium transition-colors duration-300 ${
                activeSection === link.section
                  ? 'text-primary-accent dark:text-primary-accent-dark'
                  : 'text-primary-text dark:text-primary-text-dark hover:text-primary-accent dark:hover:text-primary-accent-dark'
              }`}
            >
              {link.name}
            </button>
          ))}

          {/* About Me Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center space-x-1 text-base font-medium transition-colors duration-300 ${
                aboutDropdown.some(item => item.section === activeSection)
                  ? 'text-primary-accent dark:text-primary-accent-dark'
                  : 'text-primary-text dark:text-primary-text-dark hover:text-primary-accent dark:hover:text-primary-accent-dark'
              }`}
            >
              <span>About Me</span>
              <motion.div
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full mt-2 w-48 bg-blue-100 dark:bg-blue-900 rounded-lg shadow-lg border border-primary-secondary/20 py-2 z-50"
                >
                  {aboutDropdown.map((item, index) => (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      onClick={() => {
                        handleClick(item.section);
                        setDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                        activeSection === item.section
                          ? 'bg-primary-accent text-white dark:bg-primary-accent dark:text-white'
                          : 'text-primary-text dark:text-primary-text-dark hover:bg-primary-accent/10 dark:hover:bg-primary-accent-dark/20'
                      }`}
                    >
                      {item.name}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Theme Toggle and Hamburger */}
        <div className="flex items-center space-x-4">
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="md:hidden text-primary-text dark:text-primary-text-dark focus:outline-none"
            aria-label="Toggle navigation"
          >
            {navOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Sidebar Backdrop */}
      {navOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setNavOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-100 dark:bg-blue-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          navOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-primary-secondary/20">
          <span className="text-lg font-bold text-primary-text dark:text-primary-text-dark">Menu</span>
          <button
            onClick={() => setNavOpen(false)}
            className="text-primary-text dark:text-primary-text-dark focus:outline-none"
            aria-label="Close navigation"
          >
            <X size={24} />
          </button>
        </div>
        <ul className="px-6 py-6 space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => handleClick(link.section)}
                className={`
                  block w-full text-left text-base font-medium px-4 py-2 rounded-lg bg-blue-200 dark:bg-blue-700
                  ${
                    activeSection === link.section
                      ? 'bg-primary-accent text-white dark:bg-primary-accent dark:text-white shadow-md'
                      : 'text-primary-text dark:text-primary-text-dark hover:bg-primary-accent/10 dark:hover:bg-primary-accent-dark/20 hover:text-primary-accent dark:hover:text-primary-accent-dark'
                  }
                  focus:outline-none
                  active:scale-95 active:shadow-inner
                  transition-all duration-300
                `}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
