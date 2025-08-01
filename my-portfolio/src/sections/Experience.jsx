// src/sections/Experience.jsx
import React from 'react';

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'TechNova Solutions',
    period: 'Jan 2023 – Present',
    details: [
      'Built and maintained scalable web applications using React, Django, and PostgreSQL.',
      'Improved app performance by 30% through efficient API design and database optimization.',
      'Led a small team of developers, implementing agile practices and weekly code reviews.'
    ],
  },
  {
    role: 'Frontend Developer Intern',
    company: 'Creative Softworks',
    period: 'Aug 2022 – Dec 2022',
    details: [
      'Developed reusable UI components using React and Tailwind CSS.',
      'Collaborated closely with designers to translate Figma designs into responsive pages.',
      'Contributed to accessibility improvements, ensuring WCAG 2.1 compliance.'
    ],
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="bg-blue-800 text-white py-16 px-6 md:px-20"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Experience
        </h2>
        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 border border-white/20"
            >
              <h3 className="text-2xl font-semibold text-white">{exp.role}</h3>
              <p className="text-indigo-200 font-medium">{exp.company} · {exp.period}</p>
              <ul className="mt-4 list-disc list-inside text-indigo-100 space-y-2">
                {exp.details.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
