import React from 'react';

const projects = [
  {
    title: 'Restaurant Reservation System',
    description:
      'A full-stack app for table booking, staff dashboards, loyalty rewards, and real-time table status.',
    tech: ['React', 'Django', 'PostgreSQL', 'Tailwind'],
    live: 'https://restaurant-app-demo.vercel.app',
    github: 'https://github.com/Brian2021-Mwalish/restaurant-reservation-system',
  },
  {
    title: 'AI Chatbot Interface',
    description:
      'An intelligent assistant powered by OpenAI API, with typing indicators, UX enhancements, and multiple conversation flows.',
    tech: ['React', 'OpenAI API', 'Vite'],
    live: 'https://mwalish-chatbot.vercel.app',
    github: 'https://github.com/Brian2021-Mwalish/ai-chatbot',
  },
  {
    title: 'Loyalty Dashboard (Admin)',
    description:
      'Admin panel to manage customer tiers, view engagement stats, and apply loyalty actions manually or automatically.',
    tech: ['React', 'Django REST', 'Chart.js'],
    live: '',
    github: 'https://github.com/Brian2021-Mwalish/loyalty-dashboard',
  },
];

const Projects = () => {
  return (
    <section id="projects" className="w-full bg-navy-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-navy-800 p-6 rounded-xl shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-cyan-700 text-xs px-2 py-1 rounded-full text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    Live
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
