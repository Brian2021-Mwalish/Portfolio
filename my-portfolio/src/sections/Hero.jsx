import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ownerImage from '../assets/brian.png';
import reactLogo from "../assets/react.png";
import pythonLogo from "../assets/python.png";
import fastapiLogo from "../assets/fastapi.png";
import dockerLogo from "../assets/docker.png";
import awsLogo from "../assets/aws.png";


// Animated background particles
const Particle = ({ delay }) => (
  <motion.div
    className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
    initial={{ 
      x: Math.random() * window.innerWidth, 
      y: window.innerHeight + 100,
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

// Floating code snippets
const CodeSnippet = ({ code, delay, x, y }) => (
  <motion.div
    className="absolute text-cyan-300 font-mono text-sm opacity-20 pointer-events-none"
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

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTech, setCurrentTech] = useState(0);
  
  const techStack = [
    "React.js",
    "Django",
    "Node.js", 
    "PostgreSQL",
    "AWS",
    "Docker"
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", damping: 50 }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl"
          animate={{
            x: mousePosition.x * -0.01,
            y: mousePosition.y * -0.01,
          }}
          transition={{ type: "spring", damping: 50 }}
          style={{ right: '10%', bottom: '20%' }}
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
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
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <motion.span 
                className="inline-block px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                 Welcome to my digital space
              </motion.span>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="text-white">I'm </span>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Brian
                </span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Mwalish
                </motion.span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-2 text-xl lg:text-2xl text-gray-300">
                <span>I craft digital experiences with</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTech}
                    className="text-cyan-400 font-bold"
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
              className="text-lg text-gray-400 max-w-xl leading-relaxed"
            >
              Full-stack software engineer passionate about building scalable applications 
              and solving complex problems. I turn ideas into reality through clean code, 
              innovative solutions, and seamless user experiences.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-xl overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download
                className="group px-8 py-4 border-2 border-cyan-500/50 text-cyan-400 font-semibold rounded-xl backdrop-blur-sm hover:bg-cyan-500/10 transition-all duration-300"
                whileHover={{ scale: 1.05, borderColor: 'rgb(6 182 212)' }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Download Resume
                  <motion.svg
                    className="w-5 h-5"
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
  className="flex items-center gap-6 pt-8"
>
  <span className="text-sm text-gray-500 font-medium">TECHNOLOGIES</span>
  <div className="flex gap-4">
    {[
      { src: reactLogo, alt: "React" },
      { src: pythonLogo, alt: "Python" },
      { src: fastapiLogo, alt: "FastAPI" },
      { src: dockerLogo, alt: "Docker" },
      { src: awsLogo, alt: "AWS" }
    ].map((tech, i) => (
      <motion.img
        key={i}
        src={tech.src}
        alt={tech.alt}
        className="w-8 h-8 opacity-60 hover:opacity-100 cursor-pointer"
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
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Image Container */}
              <motion.div
                className="relative w-80 h-96 lg:w-96 lg:h-[500px] rounded-2xl overflow-hidden border border-cyan-500/20 backdrop-blur-sm"
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  rotateX: 2
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={ownerImage}
                  alt="Brian Mwalish - Software Engineer"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <motion.div
                  className="absolute top-4 right-4 px-3 py-1 bg-green-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🟢 Available for hire
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;