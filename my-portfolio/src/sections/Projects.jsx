import React, { useRef } from 'react';

const Projects = ({ onSectionChange }) => {
  const sectionRef = useRef(null);


  const projects = [
    {
      title: 'Liquidity-Funding',
      description: 'A modern investment platform enabling seamless funding and investment management. Features include real-time dashboards, M-Pesa integration, context-aware tracking, and a referral rewards system for enhanced user engagement.',
      tech: ['React', 'Django', 'Vite', 'JavaScript', 'Tailwind CSS'],
      live: 'https://liquiinvestke.co.ke',
      github: 'https://github.com/Brian2021-Mwalish/Digital-Liquidity-Fund-Platform-.git',
      category: 'Full-stack',
      solidColor: 'bg-purple-500',
      bgSolid: 'bg-purple-900/20',
      features: ['M-Pesa Payment Integration', 'Real-Time Dashboard', 'Investment Tracking', 'Referral Program', 'Modern UI']
    },
    {
      title: 'Home-Map Hub',
      description: 'A modern house leasing platform that connects tenants, landlords, and agents. It enables property discovery through interactive maps, online bookings, secure payments, messaging, and reviews for efficient rental management.',
      tech: ['TypeScript', 'React', 'Leaflet.js', 'Django REST Framework', 'Tailwind CSS'],
      live: 'https://home-leasing.vercel.app/',
      github: 'https://github.com/Brian2021-Mwalish/HomeLeasing.git',
      category: 'Full-stack',
      solidColor: 'bg-green-500',
      bgSolid: 'bg-green-900/20',
      features: ['Interactive Map-Based Property Search', 'Property Listings & Management', 'Online Booking & Lease Requests', 'Secure Payments & Rent Tracking', 'In-App Messaging', 'Reviews & Ratings System', 'Role-Based Dashboards']
    },
    {
      title: 'Prime Trades',
      description: 'Advanced administrative control panel designed for managing customer loyalty tiers, comprehensive engagement analytics visualization, and automated loyalty action triggers with manual override capabilities.',
      tech: ['TypeScript', 'Django', 'Chart.js', 'Redux'],
      live: 'https://www.primetrades.app',
      github: 'https://github.com/Brian2021-Mwalish/Prime-Trade.git',
      category: 'Dashboard/Analytics',
      solidColor: 'bg-blue-500',
      bgSolid: 'bg-blue-900/20',
      features: ['Analytics Dashboard', 'Tier Management', 'Auto Actions', 'Data Visualization']
    },
    {
      title: 'Smart Reservation & Optimization System',
      description: 'A powerful full-stack platform designed to optimize restaurant operations with intelligent table reservation, automated workflows, and real-time monitoring. The system includes smart booking algorithms, dynamic staff dashboards, customer loyalty rewards, and live table status updates for seamless restaurant management.',
      tech: ['React', 'Django', 'PostgreSQL', 'Tailwind CSS'],
      live: 'https://restaurant-app-demo.vercel.app',
      github: 'https://github.com/Brian2021-Mwalish/Reservation-System.git',
      category: 'Full-Stack',
      solidColor: 'bg-emerald-500',
      bgSolid: 'bg-emerald-900/20',
      features: ['Smart Real-Time Updates', 'Advanced Admin Dashboard', 'Customer Loyalty System', 'Fully Responsive Design']
    },
    {
      title: 'AI Chatbot Interface',
      description: 'An sophisticated conversational AI assistant powered by OpenAI API, featuring intelligent typing indicators, enhanced user experience patterns, and support for multiple conversation flows with context awareness.',
      tech: ['React', 'OpenAI API', 'Vite', 'JavaScript'],
      live: 'https://mwalish-chatbot.vercel.app',
      github: 'https://github.com/Brian2021-Mwalish/ai-chatbot',
      category: 'AI/Frontend',
      solidColor: 'bg-purple-500',
      bgSolid: 'bg-purple-900/20',
      features: ['OpenAI Integration', 'Context Awareness', 'Real-time Chat', 'Modern UI']
    },
    {
      title: 'Loyalty Dashboard',
      description: 'Advanced administrative control panel designed for managing customer loyalty tiers, comprehensive engagement analytics visualization, and automated loyalty action triggers with manual override capabilities.',
      tech: ['React', 'Django REST', 'Chart.js', 'Redux'],
      live: '',
      github: 'https://github.com/Brian2021-Mwalish/loyalty-dashboard',
      category: 'Dashboard/Analytics',
      solidColor: 'bg-blue-500',
      bgSolid: 'bg-blue-900/20',
      features: ['Analytics Dashboard', 'Tier Management', 'Auto Actions', 'Data Visualization']
    },
    {
      title: 'Sokoni Kenya',
      description: 'A responsive e-commerce website for local products, built with clean, user-friendly layouts and a focus on product discovery and conversion.',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      live: 'https://www.sokonikenya.co.ke/',
      github: '',
      category: 'Web Development',
      solidColor: 'bg-rose-500',
      bgSolid: 'bg-rose-900/20',
      features: ['Responsive UI', 'Product Catalog', 'Fast Navigation', 'Conversion-Focused Design']
    }
  ];



  const ProjectCard = ({ project, index }) => {
    return (
      <div className="relative">
        {/* Card Container */}
        <div className={`relative ${project.bgSolid} backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full`}>
          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`inline-block px-3 py-1 ${project.solidColor} text-primary-text text-xs font-medium rounded-full mb-4`}>
                  {project.category}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold text-primary-text mb-2">
                  {project.title}
                </h3>
              </div>
              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${project.live ? 'bg-green-400' : 'bg-yellow-400'} shadow-lg`} />
                <span className="text-xs text-primary-secondary">
                  {project.live ? 'Live' : 'In Development'}
                </span>
              </div>
            </div>
            {/* Description */}
            <p className="text-primary-secondary leading-relaxed mb-6 flex-grow text-base">
              {project.description}
            </p>
            {/* Features */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-primary-secondary mb-3 uppercase tracking-wider">
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center text-sm text-primary-secondary"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
            {/* Tech Stack */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-primary-secondary mb-3 uppercase tracking-wider">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-white/10 text-primary-text text-sm px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-sm"
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
                  className={`flex-1 ${project.solidColor} text-primary-text font-semibold py-3 px-6 rounded-xl text-center shadow-lg`}
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
                className="flex-1 bg-white/10 border-2 border-white/20 text-primary-text font-semibold py-3 px-6 rounded-xl text-center backdrop-blur-sm"
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
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen bg-primary-bg py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl top-1/4 left-1/4" />
        <div className="absolute w-80 h-80 bg-purple-500/5 rounded-full blur-3xl bottom-1/4 right-1/4" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Collaborative Development Experience Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-violet-600 via-cyan-500 to-blue-500 p-1 rounded-3xl shadow-xl">
            <div className="bg-white dark:bg-primary-bg rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 shadow-lg mb-6 md:mb-0">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-cyan-500 to-blue-500 mb-4">Collaborative Development Experience</h3>
                <p className="text-lg text-primary-secondary mb-4">I have collaborated with multiple engineers on the development of various web applications and websites across different domains including business platforms, booking systems, institutional systems, and SME digital solutions.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base text-primary-text">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Backend API development (Django / REST Framework)</li>
                    <li>Database design and optimization (PostgreSQL)</li>
                    <li>Frontend integration</li>
                  </ul>
                  <ul className="list-disc list-inside space-y-1">
                    <li>System architecture planning</li>
                    <li>Deployment and server configuration</li>
                    <li>Git-based team collaboration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-cyan-400">
              Featured Projects
            </span>
          </h2>

          <p className="text-xl text-primary-secondary max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work in full-stack development, featuring modern technologies
            and innovative solutions to real-world problems.
          </p>

          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full mt-8" />
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-cyan-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 max-w-2xl mx-auto hover:bg-cyan-500/[0.12] transition-colors duration-300">
            <h3 className="text-2xl font-bold text-primary-text mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-primary-secondary mb-6 text-base leading-relaxed">
              I'm always open to discussing new projects and opportunities.
              Let's create something amazing together.
            </p>
            <button
              onClick={() => onSectionChange('contact')}
              className="inline-flex items-center gap-2 bg-cyan-500 text-primary-text font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
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
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;