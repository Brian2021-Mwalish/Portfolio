import React from 'react';
import ownerImage from '../assets/brian.jpg'; // Place your image in src/assets/

const Hero = () => {
  return (
    <section className="w-full h-screen bg-blue-800 flex items-center justify-center px-6">
      <div className="max-w-4xl mx-auto text-center text-white flex flex-col md:flex-row items-center gap-8">
        
        {/* Image Section */}
        <img
          src={ownerImage}
          alt="Brian Mwalish"
          className="w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
        />

        {/* Text Section */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-cyan-400">Brian Mwalish</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Full-Stack Software Engineer
          </h2>
          <p className="text-md md:text-lg text-gray-300 mb-8">
            I specialize in building modern web applications using React, Django, and REST APIs.
            I love solving real-world problems with clean code, scalable architecture, and intuitive UX.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <a
              href="/resume.pdf"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-lg transition"
              download
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="border-2 border-cyan-500 hover:bg-cyan-500 hover:text-white text-cyan-400 font-semibold py-2 px-6 rounded-lg transition"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
