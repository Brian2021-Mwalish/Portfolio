// src/sections/About.jsx
import React from 'react';

const About = () => {
  return (
    <section id="about" className="bg-gray-100 py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-navy-900 mb-6">About Me</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Hello! I'm <span className="font-semibold text-navy-800">Brian Mwalish</span>, a passionate Software Engineer specializing in building full-stack web applications using modern technologies like <span className="text-navy-700">React, Tailwind, Django, PostgreSQL, and Node.js</span>. 
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          I love solving real-world problems with clean, efficient code. My focus is on creating scalable, user-friendly, and accessible digital experiences. Whether it’s frontend UI/UX or backend API logic, I aim to craft seamless systems that deliver value.
        </p>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Beyond code, I'm a strong believer in collaboration, continuous learning, and bringing ideas to life through innovation and curiosity.
        </p>
      </div>
    </section>
  );
};

export default About;
