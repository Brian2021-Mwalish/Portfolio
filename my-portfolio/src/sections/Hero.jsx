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
  // Event Handlers
  // ========================================

  const scrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
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

            <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">


              <motion.div
                className="text-sm sm:text-base text-black font-medium tracking-wider uppercase"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Full-Stack Developer
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="text-black">
                  Brian
                </span>
                <br />
                <motion.span
                  className="text-black"
                >
                  Mwalish
                </motion.span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg lg:text-xl xl:text-2xl text-black">
                <span>I craft digital experiences with</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTech}
                    className="text-primary font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {techStack[currentTech]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base lg:text-lg text-black max-w-xl leading-relaxed"
            >
              Full-stack software engineer passionate about building scalable applications
              and solving complex problems. I turn ideas into reality through clean code,
              innovative solutions, and seamless user experiences.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
            >
              <motion.a
                href="#projects"
                onClick={scrollToProjects}
                className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold rounded-xl overflow-hidden text-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="/ENG. Mwalish CV.pdf"
                download
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
            </motion.div>

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
