import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Experience = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const experiences = [
    {
      role: 'Fullstack Software Developer',
      company: 'Lish AI Labs',
      period: 'May 2025 – Aug 2025',
      duration: '3 months',
      type: 'Full-time',
      location: 'Remote',
      details: [
        'Developed and maintained fullstack web applications with integrated AI-powered features',
        'Collaborated with engineering team to enhance system performance and user experience',
        'Implemented modern web technologies and best practices for scalable applications',
        'Contributed to the development lifecycle from design to deployment'
      ],
      technologies: ['React', 'Django', 'PostgreSQL', 'AI Integration', 'REST APIs', 'Git'],
      achievements: [
        'Successfully developed AI-integrated web applications',
        'Enhanced system performance and user experience',
        'Full development lifecycle contribution'
      ],
      solidColor: 'bg-emerald-500',
      bgSolid: 'bg-emerald-900/20'
    },
    {
      role: 'Educational Outreach Mentor',
      company: 'University of Eastern Africa Baraton Young Mentorship Program',
      period: 'Oct 2024 – Apr 2025',
      duration: '6 months',
      type: 'Volunteering',
      location: 'On-site',
      details: [
        'Taught children aged 6-10 years basic keyboarding skills, Windows accessories, and file exploration',
        'Instructed children aged 11-16 years in simple programming using Scratch programming language',
        'Developed engaging curriculum to make learning computer skills enjoyable and accessible',
        'Mentored young students in digital literacy and basic programming concepts'
      ],
      technologies: ['Scratch Programming', 'Windows OS', 'Basic Computer Skills', 'Educational Tools'],
      achievements: [
        'Successfully taught 20+ children computer skills',
        'Developed comprehensive curriculum for different age groups',
        'Improved digital literacy among young students'
      ],
      solidColor: 'bg-blue-500',
      bgSolid: 'bg-blue-900/20'
    },
    {
      role: 'Graphic Designer',
      company: 'Kariki Farm Molo',
      period: 'Jul 2022 – Aug 2022',
      duration: '1 month',
      type: 'Freelance',
      location: 'On-site',
      details: [
        'Designed various animations and graphics for internal company advertisements',
        'Created visually appealing content to enhance brand communication',
        'Utilized design software to produce professional marketing materials',
        'Collaborated with team to understand requirements and deliver creative solutions'
      ],
      technologies: ['Adobe Creative Suite', 'Animation Software', 'Graphic Design Tools', 'Branding'],
      achievements: [
        'Created multiple advertisement animations',
        'Enhanced internal company branding',
        'Delivered professional design solutions'
      ],
      solidColor: 'bg-pink-500',
      bgSolid: 'bg-pink-900/20'
    }
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
      className="relative min-h-screen bg-primary-bg py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl top-1/4 right-1/4" />
        <div className="absolute w-80 h-80 bg-pink-500/4 rounded-full blur-3xl bottom-1/3 left-1/4" />
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
            <span className="bg-primary-accent bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>
          <p className="text-xl text-primary-secondary max-w-3xl mx-auto leading-relaxed">
            My journey in technology, from graphic design and educational outreach to full-stack development.
          </p>
          <div className="w-24 h-1 bg-primary-accent mx-auto rounded-full mt-8" />
        </motion.div>

        {/* Experience Items */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white backdrop-blur-xl border border-primary-secondary/10 rounded-2xl p-8 hover:border-primary-secondary/20 hover:shadow-xl transition-all duration-300"
            >
                    
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span className={`px-3 py-1 ${exp.solidColor} text-primary-text text-xs font-medium rounded-full`}>
                          {exp.type}
                        </span>
                        <span className="text-sm text-primary-secondary">{exp.duration}</span>
                        <span className="text-sm text-primary-secondary">• {exp.location}</span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-primary-text mb-2">
                        {exp.role}
                      </h3>

                      <div className="flex items-center gap-2 text-primary-secondary">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H7m2 0v-5a2 2 0 012-2h2a2 2 0 012 2v5m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v7.5" />
                        </svg>
                        <span className="font-semibold">{exp.company}</span>
                        <span className="text-primary-secondary">•</span>
                        <span className="text-primary-secondary">{exp.period}</span>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-primary-secondary mb-3 uppercase tracking-wider">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {exp.details.map((detail, i) => (
                          <li key={i} className="flex items-start text-primary-secondary">
                            <div className="w-2 h-2 bg-primary-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-primary-secondary mb-3 uppercase tracking-wider">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-primary-secondary/10 text-primary-text text-sm px-3 py-1.5 rounded-lg border border-primary-secondary/20 backdrop-blur-sm hover:bg-primary-secondary/15 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div className="bg-primary-secondary/5 rounded-xl p-4 border border-primary-secondary/10">
                      <h4 className="text-sm font-semibold text-primary-secondary mb-3 uppercase tracking-wider">
                        Key Achievements
                      </h4>
                      <div className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center text-sm text-primary-secondary">
                            <svg className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-20 bg-primary-accent/10 backdrop-blur-xl border border-primary-accent/20 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary-text mb-4">
              Professional Skills Summary
            </h3>
            <p className="text-primary-secondary">
              Skills developed and refined through professional experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-primary-text mb-2">Full-Stack Development</h4>
              <p className="text-sm text-primary-secondary">React, Django, PostgreSQL, REST APIs</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-primary-text mb-2">Team Leadership</h4>
              <p className="text-sm text-primary-secondary">Agile practices, code reviews, mentoring</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-primary-text mb-2">Performance Optimization</h4>
              <p className="text-sm text-primary-secondary">Database optimization, API efficiency</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="bg-primary-accent/10 backdrop-blur-xl border border-primary-accent/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary-text mb-4">
              Ready for New Opportunities
            </h3>
            <p className="text-primary-secondary mb-6 leading-relaxed">
              I'm always interested in challenging roles where I can contribute my experience
              in full-stack development and team leadership.
            </p>
            <button
              onClick={() => onSectionChange('contact')}
              className="inline-flex items-center gap-2 bg-primary-accent text-primary-text font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Get In Touch
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;