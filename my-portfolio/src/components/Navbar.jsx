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
    <nav className="fixed top-0 left-0 w-full bg-navy-900 text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-400">Mwalish</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {links.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => onSectionChange(link.section)}
                className="hover:text-cyan-400 transition duration-300 bg-transparent border-none outline-none cursor-pointer text-white"
                style={{ background: 'none' }}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setNavOpen(!navOpen)}>
            {navOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <ul className="md:hidden bg-navy-800 px-6 pb-4 space-y-4">
          {links.map((link) => (
            <li key={link.name}>
              <button
                onClick={() => {
                  onSectionChange(link.section);
                  setNavOpen(false);
                }}
                className="block text-white hover:text-cyan-400 bg-transparent border-none outline-none cursor-pointer w-full text-left"
                style={{ background: 'none' }}
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
