import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ onSectionChange }) => {
  const [navOpen, setNavOpen] = useState(false);

  const links = [
    { name: 'Home', section: 'hero' },
    { name: 'About', section: 'about' },
    { name: 'Projects', section: 'projects' },
    { name: 'Experience', section: 'experience' },
    { name: 'Contact', section: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-primary-bg text-primary-text z-50 shadow-lg">
      <div className="max-w-[90rem] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold text-primary-accent tracking-wide">
          Mwalish
        </h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-10">
          {links.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => onSectionChange(link.section)}
                className="text-primary-text hover:text-primary-accent hover:scale-105 transition duration-300 ease-in-out text-lg font-medium focus:outline-none"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="text-primary-text focus:outline-none"
            aria-label="Toggle navigation"
          >
            {navOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {navOpen && (
        <ul className="md:hidden bg-primary-bg px-6 pt-4 pb-6 space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => {
                  onSectionChange(link.section);
                  setNavOpen(false);
                }}
                className="block w-full text-left text-primary-text hover:text-primary-accent hover:pl-2 transition-all duration-300 text-base font-medium"
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
