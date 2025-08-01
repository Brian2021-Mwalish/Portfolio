import React from 'react';

const About = () => {
  return (
    <section
      id="about"
      className="bg-blue-800 text-white min-h-screen py-20 px-6 md:px-20 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-navy-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy-highlight/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="bg-gradient-glass backdrop-blur-xl border border-navy-glass/20 p-12 md:p-16 rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-700 ease-smooth">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-navy-glass via-navy-accent to-navy-highlight bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-navy-accent to-navy-highlight mx-auto rounded-full"></div>
          </div>

          <div className="space-y-8 text-center md:text-left">
            {/* Introduction */}
            <div className="group">
              <p className="text-xl md:text-2xl text-navy-text leading-relaxed">
                Hi! I'm <span className="font-bold text-navy-highlight relative inline-block">
                  Brian Mwalish
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-navy-highlight transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </span>, a passionate{' '}
                <span className="text-navy-accent font-semibold">Software Engineer</span>{' '}
                focused on building full-stack web applications that solve real problems.
              </p>
            </div>

            {/* Skills */}
            <div className="group">
              <p className="text-lg md:text-xl text-navy-text leading-relaxed">
                I specialize in technologies like{' '}
                <span className="inline-flex flex-wrap gap-2 items-center">
                  {['React', 'Tailwind CSS', 'Django', 'PostgreSQL', 'Node.js'].map((tech, index) => (
                    <span
                      key={tech}
                      className="bg-navy-secondary/30 text-navy-accent px-3 py-1 rounded-full text-sm font-medium hover:bg-navy-accent/20 transition-colors duration-300 border border-navy-accent/20"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </span>
                . Whether working on frontend design or backend logic, I aim to create fast, scalable, and accessible solutions.
              </p>
            </div>

            {/* Motivation */}
            <div className="bg-navy-secondary/20 p-6 rounded-2xl border border-navy-accent/20">
              <p className="text-lg md:text-xl text-navy-text leading-relaxed">
                I love transforming ideas into functional and intuitive interfaces. My motivation comes from solving tough challenges and continuously growing through learning.
              </p>
            </div>

            {/* Differentiator */}
            <div className="group">
              <p className="text-lg md:text-xl text-navy-text leading-relaxed">
                I bring a <span className="text-navy-highlight font-semibold">strong eye for detail</span>, a{' '}
                <span className="text-navy-accent font-semibold">user-first mindset</span>, and a{' '}
                <span className="text-navy-highlight font-semibold">collaborative spirit</span> to every project. 
                I believe in writing clean code and building products that matter.
              </p>
            </div>

            {/* Call to action */}
            <div className="bg-gradient-to-r from-navy-accent/10 to-navy-highlight/10 p-8 rounded-2xl border border-navy-glass/30 text-center">
              <p className="text-xl md:text-2xl text-navy-text leading-relaxed mb-6">
                I'm open to new opportunities — freelance or full-time — where I can help build innovative digital experiences and work with amazing teams.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-navy-accent hover:bg-navy-highlight text-navy-primary font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Get In Touch
                </button>
                <button className="border-2 border-navy-accent text-navy-accent hover:bg-navy-accent hover:text-navy-primary font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1">
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;