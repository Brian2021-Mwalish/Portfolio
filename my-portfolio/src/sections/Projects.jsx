import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = [
    {
      title: 'Restaurant Reservation System',
      description: 'A comprehensive full-stack application featuring intelligent table booking, dynamic staff dashboards, customer loyalty rewards program, and real-time table status monitoring with live updates.',
      tech: ['React', 'Django', 'PostgreSQL', 'Tailwind CSS'],
      live: 'https://restaurant-app-demo.vercel.app',
      github: 'https://github.com/Brian2021-Mwalish/restaurant-reservation-system',
      category: 'Full-Stack',
      gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
      bgGradient: 'from-emerald-900/20 to-teal-900/20',
      features: ['Real-time Updates', 'Admin Dashboard', 'Loyalty System', 'Responsive Design']
    },
    {
      title: 'AI Chatbot Interface',
      description: 'An sophisticated conversational AI assistant powered by OpenAI API, featuring intelligent typing indicators, enhanced user experience patterns, and support for multiple conversation flows with context awareness.',
      tech: ['React', 'OpenAI API', 'Vite', 'JavaScript'],
      live: 'https://mwalish-chatbot.vercel.app',
      github: 'https://github.com/Brian2021-Mwalish/ai-chatbot',
      category: 'AI/Frontend',
      gradient: 'from-purple-500 via-pink-500 to-rose-500',
      bgGradient: 'from-purple-900/20 to-pink-900/20',
      features: ['OpenAI Integration', 'Context Awareness', 'Real-time Chat', 'Modern UI']
    },
    {
      title: 'Loyalty Dashboard',
      description: 'Advanced administrative control panel designed for managing customer loyalty tiers, comprehensive engagement analytics visualization, and automated loyalty action triggers with manual override capabilities.',
      tech: ['React', 'Django REST', 'Chart.js', 'Redux'],
      live: '',
      github: 'https://github.com/Brian2021-Mwalish/loyalty-dashboard',
      category: 'Dashboard/Analytics',
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
      bgGradient: 'from-blue-900/20 to-indigo-900/20',
      features: ['Analytics Dashboard', 'Tier Management', 'Auto Actions', 'Data Visualization']
    },
  ];

  // Simple animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const projectVariants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const ProjectCard = ({ project, index }) => {
    return (
      <motion.div
        variants={projectVariants}
        className="group relative"
        onMouseEnter={() => setHoveredProject(index)}
        onMouseLeave={() => setHoveredProject(null)}
      >
        {/* Card Container */}
        <div className={`relative bg-gradient-to-br ${project.bgGradient} backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full transition-all duration-300 hover:border-white/20 hover:shadow-xl`}>
          
          {/* Subtle hover gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 hover:opacity-[0.03] transition-opacity duration-300 rounded-2xl`} />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`inline-block px-3 py-1 bg-gradient-to-r ${project.gradient} text-white text-xs font-medium rounded-full mb-4`}>
                  {project.category}
                </span>
                
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${project.live ? 'bg-green-400' : 'bg-yellow-400'} shadow-lg`} />
                <span className="text-xs text-gray-400">
                  {project.live ? 'Live' : 'In Development'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6 flex-grow text-base">
              {project.description}
            </p>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center text-sm text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-auto">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 bg-gradient-to-r ${project.gradient} text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]`}
                >
                  <span className="flex items-center justify-center gap-2">
                    View Live
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </a>
              )}
              
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white/10 border-2 border-white/20 text-white font-semibold py-3 px-6 rounded-xl text-center hover:bg-white/15 hover:border-white/30 transition-all duration-200 backdrop-blur-sm hover:scale-[1.02]"
              >
                <span className="flex items-center justify-center gap-2">
                  GitHub
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl top-1/4 left-1/4" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl bottom-1/4 right-1/4" />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div 
          variants={projectVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work in full-stack development, featuring modern technologies 
            and innovative solutions to real-world problems.
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mt-8" />
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          variants={projectVariants}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 max-w-2xl mx-auto hover:bg-cyan-500/[0.12] transition-colors duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-gray-300 mb-6 text-base leading-relaxed">
              I'm always open to discussing new projects and opportunities. 
              Let's create something amazing together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Let's Connect
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;