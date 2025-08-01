
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About.jsx';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [currentSection, setCurrentSection] = useState('hero');

  const renderSection = () => {
    switch (currentSection) {
      case 'hero':
        return <Hero />;
      case 'about':
        return <About />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'experience':
        return <Experience />;
      case 'contact':
        return <Contact />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-blue-900 text-white">
      {/* Page Content */}
      <Navbar onSectionChange={setCurrentSection} />
      <main className="flex-grow flex items-center justify-center">
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
      <Footer />
    </div>
  );
}
