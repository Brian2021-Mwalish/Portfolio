import React from 'react';

const skills = {
  Frontend: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
  Backend: ['Django', 'Node.js', 'REST APIs', 'PostgreSQL', 'SQLite'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Linux', 'Figma', 'Postman'],
};

const Skills = () => {
  return (
    <section id="skills" className="w-full bg-navy-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Skills & Tools
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={index}
              className="bg-navy-800 p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-cyan-700 text-white text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
