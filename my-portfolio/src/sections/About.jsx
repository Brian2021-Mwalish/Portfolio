// src/sections/About.jsx
import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      className="bg-navy-900 text-white py-16 px-6 md:px-20"
    >
      <div className="max-w-3xl mx-auto text-center bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-white">About Me</h2>
        
        <p className="text-lg text-indigo-100 leading-relaxed">
          Hello! I'm <span className="font-semibold text-cyan-300">Brian Mwalish</span>, a passionate Software Engineer specializing in building full-stack web applications using modern technologies like{' '}
          <span className="text-cyan-200">React, Tailwind, Django, PostgreSQL, and Node.js</span>.
        </p>

        <p className="mt-4 text-lg text-indigo-100 leading-relaxed">
          I love solving real-world problems with clean, efficient code. My focus is on creating scalable, user-friendly, and accessible digital experiences. Whether it’s frontend UI/UX or backend API logic, I aim to craft seamless systems that deliver value.
        </p>

        <p className="mt-4 text-lg text-indigo-100 leading-relaxed">
          Beyond code, I'm a strong believer in collaboration, continuous learning, and bringing ideas to life through innovation and curiosity.
        </p>
      </div>
    </section>
  );
};

export default About;
