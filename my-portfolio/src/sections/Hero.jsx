import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ownerImage from '../assets/brian.png';
import reactLogo from "../assets/react.png";
import pythonLogo from "../assets/python.png";
import fastapiLogo from "../assets/fastapi.png";
import dockerLogo from "../assets/docker.png";
import awsLogo from "../assets/aws.png";

// ========================================
// Sub-Components
// ========================================

const Particle = ({ delay }) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-primary rounded-full opacity-60"
      initial={{
        x: Math.random() * windowSize.width,
        y: windowSize.height + 100,
        scale: 0
      }}
      animate={{
        y: -100,
        scale: [0, 1, 0],
        opacity: [0, 0.6, 0]
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

const CodeSnippet = ({ code, delay, x, y }) => (
  <motion.div
    className="absolute text-primary/20 font-mono text-xs sm:text-sm pointer-events-none hidden sm:block"
    style={{ left: x, top: y }}
    initial={{ opacity: 0, y: 20 }}
    animate={{
      opacity: [0, 0.3, 0],
      y: [20, -20, -40],
      rotate: [0, 2, -2, 0]
    }}
    transition={{
      duration: 6,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {code}
  </motion.div>
);

const Wave = ({ delay, opacity, speed }) => (
  <motion.div
    className="absolute bottom-0 left-0 w-full overflow-hidden"
    style={{ opacity }}
    initial={{ y: 0 }}
    animate={{
      y: [0, -20, 0],
    }}
    transition={{
      duration: speed,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg
      className="relative block w-full h-20 sm:h-32 lg:h-40"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,60 C300,100 600,20 900,60 C1050,80 1200,40 1200,60 L1200,120 L0,120 Z"
        fill="currentColor"
        className="text-primary/10"
      />
    </svg>
  </motion.div>
);

// ========================================
// Main Hero Component
// ========================================

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTech, setCurrentTech] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  
  const techStack = ["React.js", "Django", "Node.js", "PostgreSQL", "AWS", "Docker"];
  const codeSnippets = [
    "const solve = () => {",
    "import React from 'react';",
    "def optimize(data):",
    "SELECT * FROM users",
    "docker build -t app .",
    "git commit -m 'feat'",
    "async function fetch()",
    "class Algorithm {"
  ];

  const techIcons = [
    { src: reactLogo, alt: "React" },
    { src: pythonLogo, alt: "Python" },
    { src: fastapiLogo, alt: "FastAPI" },
    { src: dockerLogo, alt: "Docker" },
    { src: awsLogo, alt: "AWS" }
  ];

  // ========================================
  // Effects
  // ========================================

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // ========================================
  // Animation Variants
  // ========================================

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -30 },
    show: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };



  // ========================================
  // Render
  // ========================================

  return (
    <section className="relative w-full min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: mousePosition.x * (windowSize.width > 768 ? 0.02 : 0.01),
            y: mousePosition.y * (windowSize.width > 768 ? 0.02 : 0.01),
          }}
          transition={{ type: "spring", damping: 50 }}
          style={{
            left: windowSize.width > 768 ? '10%' : '5%',
            top: windowSize.width > 768 ? '20%' : '10%'
          }}
        />
        <motion.div
          className="absolute w-40 h-40 sm:w-64 sm:h-64 lg:w-80 lg:h-80 bg-gradient-to-r from-accent/15 to-primary/15 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: mousePosition.x * (windowSize.width > 768 ? -0.01 : -0.005),
            y: mousePosition.y * (windowSize.width > 768 ? -0.01 : -0.005),
          }}
          transition={{ type: "spring", damping: 50 }}
          style={{
            right: windowSize.width > 768 ? '10%' : '5%',
            bottom: windowSize.width > 768 ? '20%' : '10%'
          }}
        />

        {/* Floating Particles */}
        {[...Array(windowSize.width > 768 ? 15 : 8)].map((_, i) => (
          <Particle key={i} delay={i * 0.5} />
        ))}

        {/* Code Snippets */}
        {codeSnippets.map((code, i) => (
          <CodeSnippet
            key={i}
            code={code}
            delay={i * 0.8}
            x={`${Math.random() * 80 + 10}%`}
            y={`${Math.random() * 60 + 20}%`}
          />
        ))}

        {/* Animated Waves */}
        <Wave delay={0} opacity={0.3} speed={8} />
        <Wave delay={2} opacity={0.2} speed={10} />
        <Wave delay={4} opacity={0.1} speed={12} />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center w-full py-12 sm:py-16 lg:py-20">
          
          {/* Text Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
            <motion.div variants={itemVariants}>
              <motion.span
                className="inline-block px-3 py-2 sm:px-4 sm:py-2 bg-primary/20 text-primary rounded-full text-xs sm:text-sm font-medium border border-primary/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                ✨ Welcome to my digital space
              </motion.span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4 sm:space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-primary" style={{letterSpacing: '-0.03em'}}>
                Brian Mwalish
              </h1>
              <div className="text-lg sm:text-xl md:text-2xl font-semibold text-accent mt-2 mb-1">
                Full-Stack Software Engineer
              </div>
              <p className="text-base sm:text-lg text-primary-secondary max-w-lg leading-relaxed mb-2">
                Building modern, scalable web applications with a focus on clean code, reliability, and seamless user experience.
              </p>
              <div className="flex flex-wrap gap-2 items-center text-base sm:text-lg">
                <span className="text-primary font-medium">Key Tech:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTech}
                    className="text-accent font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {techStack[currentTech]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="pt-4">
                <a
                  href="#projects"
                  className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:bg-accent transition-all duration-200 text-lg sm:text-xl"
                >
                  View Projects
                </a>
              </div>
            </motion.div>
              <motion.a
                href="https://github.com/Brian2021-Mwalish"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 sm:px-8 sm:py-4 border-2 border-primary/50 text-primary font-semibold rounded-xl backdrop-blur-sm hover:bg-primary/10 transition-all duration-300 text-center"
                whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center gap-2">
                  View My Work
                  <motion.svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ y: 2 }}
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </motion.svg>
                </span>
              </motion.a>

              <motion.a
                href="/Brian%20Mwalish%20Cv.pdf"
                download="Brian Mwalish CV.pdf"
                className="group px-6 py-3 sm:px-8 sm:py-4 border-2 border-primary/50 text-primary font-semibold rounded-xl backdrop-blur-sm hover:bg-primary/10 transition-all duration-300 text-center"
                whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary))' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center gap-2">
                  Download Resume
                  <motion.svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    whileHover={{ y: 2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </motion.svg>
                </span>
              </motion.a>

            {/* Tech Icons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-6 sm:pt-8"
            >
              <span className="text-xs sm:text-sm text-black font-medium">TECHNOLOGIES</span>
              <div className="flex gap-3 sm:gap-4 flex-wrap">
                {techIcons.map((tech, i) => (
                  <motion.img
                    key={i}
                    src={tech.src}
                    alt={tech.alt}
                    className="w-6 h-6 sm:w-8 sm:h-8 opacity-60 hover:opacity-100 cursor-pointer"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          {/* End of Text Content */}
          {/* Image Section */}
          <motion.div
            variants={imageVariants}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-xl sm:blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              {/* Image Container */}
              <motion.div
                className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] lg:w-88 lg:h-[480px] xl:w-96 xl:h-[500px] rounded-2xl overflow-hidden border border-primary/20 backdrop-blur-sm shadow-2xl"
                whileHover={{
                  y: windowSize.width > 768 ? -10 : -5,
                  rotateY: windowSize.width > 768 ? 5 : 2,
                  rotateX: windowSize.width > 768 ? 2 : 1,
                  scale: windowSize.width > 768 ? 1.02 : 1.01
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={ownerImage}
                  alt="Brian Mwalish - Software Engineer"
                  className="w-full h-full object-contain object-center bg-gradient-to-b from-white to-brown-500"
                />
                {/* Floating Badge */}
                <motion.div
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-1 bg-green-500/90 text-white text-xs sm:text-sm font-medium rounded-full backdrop-blur-sm"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✓ Available for hire
                </motion.div>
                {/* Decorative Corner Elements */}
                <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-t-2 border-primary/50 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 border-r-2 border-b-2 border-accent/50 rounded-br-2xl" />
              </motion.div>
              {/* Additional Glow Ring */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
      {/* Bottom Spacer */}
      <div className="h-16 sm:h-20 lg:h-24" />
    </section>
  );
};

export default Hero;
