
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Page Content */}
      <Navbar />
      <main className="flex-grow">
        <section id="hero" className="py-10">
          <Hero />
        </section>

        <section id="about" className="py-10">
          <About />
        </section>

        <section id="projects" className="py-10">
          <Projects />
        </section>

        <section id="skills" className="py-10">
          <Skills />
        </section>

        <section id="experience" className="py-10">
          <Experience />
        </section>

        <section id="contact" className="py-10">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
