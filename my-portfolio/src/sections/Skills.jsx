import React from 'react';

const skills = {
  Frontend: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
  Backend: ['Django', 'Node.js', 'REST APIs', 'PostgreSQL', 'SQLite'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Linux', 'Figma', 'Postman'],
};

const Skills = () => {
  return (
    <section id="skills" className="w-full bg-neutral-50 dark:bg-blue-950 py-20 md:py-[80px] px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-primary mb-12 tracking-tight leading-tight">
          Skills & Tools
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, items], index) => (
            <div
              key={index}
              className="bg-white dark:bg-blue-900 p-8 rounded-2xl shadow-lg border border-primary/10 flex flex-col items-center"
            >
              <h3 className="text-2xl font-bold text-accent mb-4 tracking-tight">
                {category}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-accent/10 text-accent font-medium text-base px-4 py-1.5 rounded-full border border-accent/20 hover:bg-accent/20 transition"
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
