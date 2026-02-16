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
    if (saved) return saved === 'dark';
    // Fallback: check .dark class on html
    return document.documentElement.classList.contains('dark');
  });

  // Sync .dark class and state on mount and theme change
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Listen for .dark class changes (in case toggled outside React)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hasDark = document.documentElement.classList.contains('dark');
      setIsDark(hasDark);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    // Fallback: toggle .dark class directly
    const root = document.documentElement;
    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'hero': return <div className="py-20 md:py-[80px] bg-white dark:bg-blue-900"><Hero key="hero" /></div>;
      case 'about': return <div className="py-20 md:py-[80px] bg-neutral-50 dark:bg-blue-950"><About key="about" onSectionChange={setCurrentSection} /></div>;
      case 'projects': return <div className="py-20 md:py-[80px] bg-white dark:bg-blue-900"><Projects key="projects" onSectionChange={setCurrentSection} /></div>;
      case 'skills': return <div className="py-20 md:py-[80px] bg-neutral-50 dark:bg-blue-950"><Skills key="skills" /></div>;
      case 'experience': return <div className="py-20 md:py-[80px] bg-white dark:bg-blue-900"><Experience key="experience" onSectionChange={setCurrentSection} /></div>;
      case 'testimonials': return <div className="py-20 md:py-[80px] bg-neutral-50 dark:bg-blue-950"><Testimonials key="testimonials" onSectionChange={setCurrentSection} /></div>;
      case 'funfacts': return <div className="py-20 md:py-[80px] bg-white dark:bg-blue-900"><FunFacts key="funfacts" onSectionChange={setCurrentSection} /></div>;
      case 'contact': return <div className="py-20 md:py-[80px] bg-neutral-50 dark:bg-blue-950"><Contact key="contact" /></div>;
      default: return <div className="py-20 md:py-[80px] bg-white dark:bg-blue-900"><Hero key="hero" /></div>;
    }
  };

  // Scroll to top smoothly on section change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  return (
    <div
      className="min-h-screen flex flex-col justify-between font-sans text-primary-text dark:text-primary-text-dark transition-colors duration-500 ease-in-out bg-neutral-50 dark:bg-blue-950"
      style={{
        '--primary': '#2563eb',
        '--accent': '#06b6d4',
        '--radius': '16px',
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
      }}
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
