import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About.jsx';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Testimonials from './sections/Testimonials';
import FunFacts from './sections/FunFacts';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  // ✅ Toggle dark mode class on <html> only
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');

    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const renderSection = () => {
    switch (currentSection) {
      case 'hero': return <Hero key="hero" />;
      case 'about': return <About key="about" onSectionChange={setCurrentSection} />;
      case 'projects': return <Projects key="projects" onSectionChange={setCurrentSection} />;
      case 'skills': return <Skills key="skills" />;
      case 'experience': return <Experience key="experience" onSectionChange={setCurrentSection} />;
      case 'testimonials': return <Testimonials key="testimonials" onSectionChange={setCurrentSection} />;
      case 'funfacts': return <FunFacts key="funfacts" onSectionChange={setCurrentSection} />;
      case 'contact': return <Contact key="contact" />;
      default: return <Hero key="hero" />;
    }
  };

  // Scroll to top smoothly on section change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  return (
    <div
      className="
        min-h-screen flex flex-col justify-between
        bg-gradient-to-b from-white to-blue-50 text-primary-text
        dark:bg-gradient-to-b from-blue-900 to-blue-800 dark:text-primary-text-dark
        transition-colors duration-500 ease-in-out
      "
    >
      {/* Navbar stays fixed and unaffected by dark mode */}
      <Navbar
        onSectionChange={setCurrentSection}
        activeSection={currentSection}
        isDark={isDark}
        onToggle={toggleTheme}
      />

      {/* Page sections — structure and spacing stable */}
      <main className="flex-grow flex items-center justify-center pt-16 sm:pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full"
            style={{ perspective: 1200 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onSectionChange={setCurrentSection} />
    </div>
  );
}
