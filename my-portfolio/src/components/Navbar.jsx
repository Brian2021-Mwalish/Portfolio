import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-navy-900 text-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-400">Mwalish</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-cyan-400 transition duration-300"
              >
                {link.name}
              </a>
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
              <a
                href={link.href}
                className="block text-white hover:text-cyan-400"
                onClick={() => setNavOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
