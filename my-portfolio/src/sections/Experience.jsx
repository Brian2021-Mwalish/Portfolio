import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const experiences = [
    {
      role: 'Full Stack Developer',
      company: 'TechNova Solutions',
      period: 'Jan 2023 – Present',
      duration: '1+ years',
      type: 'Full-time',
      location: 'Remote',
      details: [
        'Built and maintained scalable web applications using React, Django, and PostgreSQL',
        'Improved application performance by 30% through efficient API design and database optimization',
        'Led a small team of developers, implementing agile practices and weekly code reviews',
        'Collaborated with cross-functional teams to deliver high-quality software solutions'
      ],
      technologies: ['React', 'Django', 'PostgreSQL', 'REST APIs', 'Git', 'AWS'],
      achievements: [
        'Performance optimization: 30% improvement',
        'Team leadership: 3-5 developers',
        'Code review implementation'
      ],
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-900/20 to-teal-900/20'
    },
    {
      role: 'Frontend Developer Intern',
      company: 'Creative Softworks',
      period: 'Aug 2022 – Dec 2022',
      duration: '5 months',
      type: 'Internship',
      location: 'Hybrid',
      details: [
        'Developed reusable UI components using React and Tailwind CSS for multiple projects',
        'Collaborated closely with designers to translate Figma designs into responsive web pages',
        'Contributed to accessibility improvements, ensuring WCAG 2.1 compliance across applications',
        'Participated in daily standups and sprint planning sessions using Scrum methodology'
      ],
      technologies: ['React', 'Tailwind CSS', 'JavaScript', 'Figma', 'HTML5', 'CSS3'],
      achievements: [
        'WCAG 2.1 compliance implementation',
        '10+ reusable components created',
        'Cross-browser compatibility'
      ],
      gradient: 'from-blue-500 to-purple-500',
      bgGradient: 'from-blue-900/20 to-purple-900/20'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl top-1/4 right-1/4" />
        <div className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/6 to-pink-500/6 rounded-full blur-3xl bottom-1/3 left-1/4" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            My journey in software development, from internship to full-stack leadership roles.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mt-8" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500" />

          {/* Experience Items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } gap-8`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full border-4 border-slate-800 z-10" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className={`bg-gradient-to-br ${exp.bgGradient} backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 hover:shadow-xl transition-all duration-300`}>
                    
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className={`px-3 py-1 bg-gradient-to-r ${exp.gradient} text-white text-xs font-medium rounded-full`}>
                          {exp.type}
                        </span>
                        <span className="text-sm text-gray-400">{exp.duration}</span>
                        <span className="text-sm text-gray-400">• {exp.location}</span>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                        {exp.role}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-gray-300">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v7.5" />
                        </svg>
                        <span className="font-semibold">{exp.company}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{exp.period}</span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {exp.details.map((detail, i) => (
                          <li key={i} className="flex items-start text-gray-300">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-white/10 text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                        Key Achievements
                      </h4>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-300">
                            <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Professional Skills Summary
            </h3>
            <p className="text-gray-300">
              Skills developed and refined through professional experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Full-Stack Development</h4>
              <p className="text-sm text-gray-400">React, Django, PostgreSQL, REST APIs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Team Leadership</h4>
              <p className="text-sm text-gray-400">Agile practices, code reviews, mentoring</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-white mb-2">Performance Optimization</h4>
              <p className="text-sm text-gray-400">Database optimization, API efficiency</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-slate-800/80 to-blue-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready for New Opportunities
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm always interested in challenging roles where I can contribute my experience 
              in full-stack development and team leadership.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Get In Touch
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;