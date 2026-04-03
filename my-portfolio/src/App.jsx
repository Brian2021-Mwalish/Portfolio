import React, { useState } from 'react';
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


  const renderSection = () => {
    switch (currentSection) {
      case 'hero': return <div className="py-20 md:py-[80px] bg-white"><Hero key="hero" onSectionChange={setCurrentSection} /></div>;
      case 'about': return <div className="py-20 md:py-[80px] bg-neutral-50"><About key="about" onSectionChange={setCurrentSection} /></div>;
      case 'projects': return <div className="py-20 md:py-[80px] bg-white"><Projects key="projects" onSectionChange={setCurrentSection} /></div>;
      case 'skills': return <div className="py-20 md:py-[80px] bg-neutral-50"><Skills key="skills" /></div>;
      case 'experience': return <div className="py-20 md:py-[80px] bg-white"><Experience key="experience" onSectionChange={setCurrentSection} /></div>;
      case 'testimonials': return <div className="py-20 md:py-[80px] bg-neutral-50"><Testimonials key="testimonials" onSectionChange={setCurrentSection} /></div>;
      case 'funfacts': return <div className="py-20 md:py-[80px] bg-white"><FunFacts key="funfacts" onSectionChange={setCurrentSection} /></div>;
      case 'contact': return <div className="py-20 md:py-[80px] bg-neutral-50"><Contact key="contact" /></div>;
      default: return <div className="py-20 md:py-[80px] bg-white"><Hero key="hero" /></div>;
    }
  };

  // Scroll to top smoothly on section change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentSection]);

  return (
    <div
      className="min-h-screen flex flex-col justify-between font-sans text-primary-text transition-colors duration-500 ease-in-out bg-neutral-50"
      style={{
        '--primary': '#2563eb',
        '--accent': '#06b6d4',
        '--radius': '16px',
        fontFamily: 'Inter',
      }}
    >
      {/* Navbar stays fixed */}
      <Navbar
        onSectionChange={setCurrentSection}
        activeSection={currentSection}
      />

      {/* Page sections — updated padding for new navbar height */}
      <main className="flex-grow flex items-center justify-center pt-[92px]">
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

