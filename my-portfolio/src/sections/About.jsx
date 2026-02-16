import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import reactLogo from "../assets/react.png";
import pythonLogo from "../assets/python.png";
import fastapiLogo from "../assets/fastapi.png";
import dockerLogo from "../assets/docker.png";
import awsLogo from "../assets/aws.png";
// Add these imports if you have these logos in your assets
// import nodejsLogo from "../assets/nodejs.png";
// import postgresqlLogo from "../assets/postgresql.png";
// import tailwindLogo from "../assets/tailwind.png";

const About = ({ onSectionChange }) => {
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Skills data with actual logos and descriptions
  const skills = [
    {
      name: 'React',
      logo: reactLogo,
      level: 95,
      color: 'bg-blue-500',
      description: 'Building dynamic user interfaces'
    },
    {
      name: 'Python',
      logo: pythonLogo,
      level: 90,
      color: 'bg-green-500',
      description: 'Backend development & automation'
    },
    {
      name: 'FastAPI',
      logo: fastapiLogo,
      level: 88,
      color: 'bg-teal-500',
      description: 'High-performance API development'
    },
    {
      name: 'Docker',
      logo: dockerLogo,
      level: 82,
      color: 'bg-blue-600',
      description: 'Containerization & deployment'
    },
    {
      name: 'AWS',
      logo: awsLogo,
      level: 75,
      color: 'bg-orange-500',
      description: 'Cloud infrastructure & services'
    },
    {
      name: 'PostgreSQL',
      logo: null, // Use placeholder or add logo to assets
      level: 85,
      color: 'bg-blue-700',
      description: 'Database design & optimization'
    }
  ];

  // Values/principles with professional icons
  const values = [
    {
      title: 'Detail-Oriented',
      description: 'Every pixel matters. I believe in crafting polished experiences that users love.',
      color: 'bg-blue-500'
    },
    {
      title: 'Collaborative',
      description: 'Great software is built by great teams. I thrive in collaborative environments.',
      color: 'bg-cyan-500'
    },
    {
      title: 'Innovation-Driven',
      description: 'Always exploring new technologies and methodologies to solve problems better.',
      color: 'bg-emerald-500'
    },
    {
      title: 'Growth Mindset',
      description: 'Continuous learning is key. Every challenge is an opportunity to improve.',
      color: 'bg-orange-500'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const skillVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: { duration: 1.5, delay: 0.5, ease: "easeOut" }
    })
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-primary-bg py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-cyan-500/10 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", damping: 50 }}
          style={{ left: '10%', top: '20%' }}
        />
        <motion.div
          className="absolute w-48 h-48 sm:w-80 sm:h-80 bg-emerald-500/8 rounded-full blur-2xl sm:blur-3xl"
          animate={{
            x: mousePosition.x * -0.015,
            y: mousePosition.y * -0.015,
          }}
          transition={{ type: "spring", damping: 50 }}
          style={{ right: '15%', bottom: '25%' }}
        />

        {/* Floating elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-cyan-400/30 rounded-full hidden sm:block"
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
            style={{
              left: `${15 + i * 12}%`,
              top: '80%',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-slate-700">
              About Me
            </span>
          </motion.h2>
          <motion.div
            className="w-16 sm:w-24 h-1 bg-cyan-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Story */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-primary-secondary/5 backdrop-blur-xl border border-primary-secondary/10 rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-primary-secondary/[0.08] transition-all duration-500 group"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-primary-text mb-3 sm:mb-4 group-hover:text-primary-accent transition-colors">
                Hello, I'm Brian Mwalish
              </h3>
              <p className="text-primary-secondary text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                I'm a passionate <span className="text-primary-accent font-semibold">Full-Stack Software Engineer</span> who
                loves turning complex problems into elegant solutions. With a strong foundation in both
                frontend and backend technologies, I create digital experiences that are not just functional,
                but delightful to use.
              </p>
              <p className="text-primary-secondary text-base sm:text-lg leading-relaxed">
                My journey in software development started with curiosity and has evolved into a deep passion
                for building scalable applications that make a real impact. I believe great software is born
                from the intersection of <span className="text-primary-accent font-semibold">technical excellence</span>,
                <span className="text-primary-accent font-semibold"> user empathy</span>, and
                <span className="text-primary-accent font-semibold"> creative problem-solving</span>.
              </p>
            </motion.div>

            {/* Values Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl border-2 border-yellow-400 dark:border-yellow-300 rounded-xl p-4 sm:p-6 cursor-pointer group hover:scale-105 transition-all duration-300"
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setActiveCard(index)}
                  onHoverEnd={() => setActiveCard(null)}
                >
                  <div className="flex items-center mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                      <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${value.color}`} />
                    </div>
                    <h4 className={`font-semibold text-base sm:text-lg text-${value.color.split('-')[1]}-500`}>
                      {value.title}
                    </h4>
                  </div>
                  <p className="text-primary-secondary text-xs sm:text-sm group-hover:text-primary-text transition-colors">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl border-2 border-yellow-400 dark:border-yellow-300 rounded-2xl p-4 sm:p-6 lg:p-8"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center mr-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-cyan-500" />
                </div>
                Technical Skills
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                {skills.map((skill, index) => (
                  <motion.div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        {skill.logo ? (
                          <img 
                            src={skill.logo} 
                            alt={skill.name}
                            className="w-6 h-6 sm:w-8 sm:h-8 mr-3 opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <div className="w-6 h-6 sm:w-8 sm:h-8 mr-3 rounded bg-gray-500 opacity-80" />
                        )}
                        <div>
                          <span className="text-primary-text font-medium text-sm sm:text-base block">{skill.name}</span>
                          <span className="text-primary-secondary text-xs hidden sm:block">{skill.description}</span>
                        </div>
                      </div>
                      <span className="text-cyan-400 font-semibold text-sm sm:text-base">{skill.level}%</span>
                    </div>
                    
                    <div className="h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${skill.color} rounded-full relative`}
                        variants={skillVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        custom={skill.level}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-full"
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{
                            duration: 2,
                            delay: index * 0.1 + 1,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              variants={itemVariants}
              className="bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-4 sm:p-6 lg:p-8 text-center"
            >
              <h3 className="text-xl sm:text-2xl font-bold text-primary-text mb-3 sm:mb-4">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-primary-secondary mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                I'm always excited about new opportunities to create innovative solutions.
                Whether it's a challenging project or an interesting collaboration, I'd love to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <motion.button
                  onClick={() => onSectionChange('contact')}
                  className="bg-cyan-500 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group text-sm sm:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Get In Touch
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => onSectionChange('projects')}
                  className="border-2 border-cyan-500/50 text-cyan-400 font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl backdrop-blur-sm hover:bg-cyan-500/10 hover:border-cyan-500 transition-all duration-300 text-sm sm:text-base"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>


      </motion.div>
    </section>
  );
};

export default About;