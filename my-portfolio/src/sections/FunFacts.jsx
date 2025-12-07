import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const FunFacts = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [currentFact, setCurrentFact] = useState(0);

  const funFacts = [
    {
      icon: '🚀',
      title: 'Code Marathon',
      fact: 'I once coded for 24 hours straight during a hackathon and built a full-stack app from scratch!',
      color: 'bg-red-500'
    },
    {
      icon: '💻',
      title: 'Code Enthusiast',
      fact: 'I love writing clean, efficient code and solving complex algorithms. Coding is my passion!',
      color: 'bg-blue-500'
    },
    {
      icon: '🎵',
      title: 'Music Lover',
      fact: 'I code better with lo-fi hip hop beats playing in the background. Music helps me focus!',
      color: 'bg-purple-500'
    },
    {
      icon: '🌍',
      title: 'World Explorer',
      fact: 'I\'ve lived in 3 different countries and speak 4 languages. Cultural diversity inspires my creative solutions!',
      color: 'bg-green-500'
    },
    {
      icon: '📚',
      title: 'Lifelong Learner',
      fact: 'I read at least 2 technical books per month and love staying updated with the latest tech trends.',
      color: 'bg-blue-500'
    },
    {
      icon: '🎮',
      title: 'Gaming Enthusiast',
      fact: 'When I\'m not coding, you\'ll find me playing strategy games or exploring virtual worlds.',
      color: 'bg-indigo-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="funfacts"
      className="relative min-h-screen bg-primary-bg py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-pink-500/5 rounded-full blur-3xl top-1/4 left-1/4" />
        <div className="absolute w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl bottom-1/4 right-1/4" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-pink-400">
              Fun Facts About Me
            </span>
          </h2>
          <p className="text-xl text-primary-secondary max-w-3xl mx-auto leading-relaxed">
            Beyond the code and coffee, here are some interesting tidbits that make me who I am.
          </p>
          <div className="w-24 h-1 bg-pink-500 mx-auto rounded-full mt-8" />
        </motion.div>

        {/* Featured Fact */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <motion.div
            key={currentFact}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <div className={`w-20 h-20 ${funFacts[currentFact].color} rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6`}>
              {funFacts[currentFact].icon}
            </div>
            <h3 className="text-2xl font-bold text-primary-text mb-4">
              {funFacts[currentFact].title}
            </h3>
            <p className="text-primary-secondary leading-relaxed text-lg">
              {funFacts[currentFact].fact}
            </p>
          </motion.div>

          {/* Fact Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {funFacts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFact(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentFact ? 'bg-pink-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Facts Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {funFacts.map((fact, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300 group cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => setCurrentFact(index)}
            >
              <div className={`w-12 h-12 ${fact.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {fact.icon}
              </div>
              <h4 className="font-semibold text-primary-text mb-2">
                {fact.title}
              </h4>
              <p className="text-primary-secondary text-sm leading-relaxed">
                {fact.fact}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <div className="bg-pink-500/10 backdrop-blur-xl border border-pink-500/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary-text mb-4">
              Want to Know More?
            </h3>
            <p className="text-primary-secondary mb-6 leading-relaxed">
              These are just a few fun facts. Let's connect and discover what else we have in common!
            </p>
            <button
              onClick={() => onSectionChange('contact')}
              className="inline-flex items-center gap-2 bg-pink-500 text-primary-text font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Let's Chat
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FunFacts;
