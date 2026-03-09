import React, { useRef, useState } from 'react';

const Projects = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const projects = [
    {
      title: 'Liquidity-Funding',
      description: 'A modern investment platform enabling seamless funding and investment management. Features include real-time dashboards, M-Pesa integration, context-aware tracking, and a referral rewards system.',
      tech: ['React', 'Django', 'Vite', 'JavaScript', 'Tailwind CSS'],
      live: 'https://liquiinvestke.co.ke',
      github: 'https://github.com/Brian2021-Mwalish/Digital-Liquidity-Fund-Platform-.git',
      category: 'Full-Stack',
      num: '01',
      accent: '#E63946',
      features: ['M-Pesa Payment Integration', 'Real-Time Dashboard', 'Investment Tracking', 'Referral Program', 'Modern UI'],
    },
    {
      title: 'Home-Map Hub',
      description: 'A modern house leasing platform connecting tenants, landlords, and agents. Property discovery through interactive maps, online bookings, secure payments, messaging, and reviews.',
      tech: ['TypeScript', 'React', 'Leaflet.js', 'Django REST', 'Tailwind CSS'],
      live: 'https://home-leasing.vercel.app/',
      github: 'https://github.com/Brian2021-Mwalish/HomeLeasing.git',
      category: 'Full-Stack',
      num: '02',
      accent: '#2563EB',
      features: ['Map-Based Search', 'Property Listings', 'Online Booking', 'Secure Payments', 'In-App Messaging', 'Reviews & Ratings'],
    },
    {
      title: 'Prime Trades',
      description: 'Advanced administrative control panel for managing customer loyalty tiers, comprehensive engagement analytics, and automated loyalty action triggers with manual override capabilities.',
      tech: ['TypeScript', 'Django', 'Chart.js', 'Redux'],
      live: 'https://www.primetrades.app',
      github: 'https://github.com/Brian2021-Mwalish/Prime-Trade.git',
      category: 'Dashboard / Analytics',
      num: '03',
      accent: '#16A34A',
      features: ['Analytics Dashboard', 'Tier Management', 'Auto Actions', 'Data Visualization'],
    },
    {
      title: 'Smart Reservation System',
      description: 'A powerful platform to optimize restaurant operations with intelligent table reservation, automated workflows, and real-time monitoring. Smart booking algorithms and dynamic staff dashboards.',
      tech: ['React', 'Django', 'PostgreSQL', 'Tailwind CSS'],
      live: 'https://restaurant-app-demo.vercel.app',
      github: 'https://github.com/Brian2021-Mwalish/Reservation-System.git',
      category: 'Full-Stack',
      num: '04',
      accent: '#D97706',
      features: ['Smart Real-Time Updates', 'Admin Dashboard', 'Customer Loyalty', 'Fully Responsive'],
    },
    {
      title: 'Loyalty Dashboard',
      description: 'Advanced administrative control panel for managing customer loyalty tiers, comprehensive engagement analytics visualization, and automated loyalty action triggers with manual override.',
      tech: ['React', 'Django REST', 'Chart.js', 'Redux'],
      live: '',
      github: 'https://github.com/Brian2021-Mwalish/loyalty-dashboard',
      category: 'Dashboard / Analytics',
      num: '05',
      accent: '#E63946',
      features: ['Analytics Dashboard', 'Tier Management', 'Auto Actions', 'Data Visualization'],
    },
  ];

  const collabItems = [
    'Payment integration (M-Pesa, Stripe)',
    'SMS notification systems',
    'Backend design & Figma prototyping',
    'Frontend interface development',
    'Backend API (Django / REST Framework)',
    'Database design (PostgreSQL)',
    'System architecture planning',
    'Deployment & server configuration',
    'Git-based team collaboration',
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        .proj-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #F7F5F0;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .proj-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 47px,
            #E2DDD5 47px,
            #E2DDD5 48px
          );
          pointer-events: none;
          z-index: 0;
        }
        .proj-accent-bar {
          position: absolute;
          top: 0; left: 0;
          width: 8px;
          height: 100%;
          background-color: #1A1A2E;
          z-index: 2;
        }
        .proj-inner {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 80px 48px 80px 72px;
        }
        .proj-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        .proj-section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #1A1A2E;
          color: #F7F5F0;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 2px;
          margin-bottom: 16px;
        }
        .proj-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 900;
          color: #1A1A2E;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .proj-heading span { color: #E63946; }
        .proj-subtext {
          font-size: 1rem;
          color: #4B4A56;
          line-height: 1.75;
          max-width: 380px;
          margin: 20px 0 0;
          align-self: flex-end;
        }
        .proj-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 48px;
        }
        .proj-divider-line {
          height: 2px;
          background-color: #1A1A2E;
          flex: 0 0 48px;
        }
        .proj-divider-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background-color: #E63946;
        }
        .proj-divider-text {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9A9590;
        }

        /* COLLAB */
        .collab-card {
          background-color: #1A1A2E;
          color: #F7F5F0;
          border-radius: 4px;
          border: 2px solid #1A1A2E;
          box-shadow: 8px 8px 0 #E63946;
          padding: 40px 48px;
          margin-bottom: 72px;
          position: relative;
          overflow: hidden;
        }
        .collab-card::after {
          content: 'COLLAB';
          position: absolute;
          right: -8px; top: 16px;
          font-family: 'Playfair Display', serif;
          font-size: 5.5rem;
          font-weight: 900;
          color: rgba(255,255,255,0.04);
          letter-spacing: -2px;
          pointer-events: none;
          user-select: none;
        }
        .collab-icon-wrap {
          width: 56px; height: 56px;
          background-color: #E63946;
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-bottom: 20px;
        }
        .collab-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.9rem;
          font-weight: 700;
          color: #F7F5F0;
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }
        .collab-sub {
          font-size: 0.95rem;
          color: #A8A4A0;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 0 28px;
        }
        .collab-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px 20px;
        }
        .collab-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
          color: #C8C4C0;
          line-height: 1.5;
        }
        .collab-arrow { color: #E63946; font-size: 0.8rem; flex-shrink: 0; margin-top: 2px; }

        /* GRID */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 28px;
          margin-bottom: 72px;
        }

        /* CARD */
        .proj-card {
          background-color: #FFFFFF;
          border: 2px solid #1A1A2E;
          border-radius: 4px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
          cursor: pointer;
          min-height: 480px;
        }
        .proj-card:hover { transform: translateY(-6px); }
        .card-num {
          position: absolute;
          top: 14px; right: 18px;
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem;
          font-weight: 900;
          color: #F0EDE8;
          line-height: 1;
          letter-spacing: -3px;
          pointer-events: none;
          user-select: none;
        }
        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 8px;
        }
        .card-category {
          display: inline-block;
          background-color: #1A1A2E;
          color: #F7F5F0;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
        }
        .card-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 500;
          color: #9A9590;
        }
        .card-status-dot { width: 7px; height: 7px; border-radius: 50%; }
        .card-accent-bar { height: 3px; border-radius: 2px; margin-bottom: 18px; width: 36px; }
        .card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.55rem;
          font-weight: 700;
          color: #1A1A2E;
          margin: 0 0 12px;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }
        .card-desc {
          font-size: 0.88rem;
          color: #4B4A56;
          line-height: 1.7;
          margin: 0 0 20px;
          flex: 1;
        }
        .card-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px 12px;
          margin-bottom: 20px;
        }
        .card-feat-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 0.78rem;
          color: #4B4A56;
          line-height: 1.4;
        }
        .card-feat-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        .card-tech-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1.5px solid #E8E4DC;
        }
        .card-tech-pill {
          background-color: #F0EDE8;
          color: #1A1A2E;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 3px 10px;
          border-radius: 2px;
          border: 1px solid #D1CDC4;
        }
        .card-btns { display: flex; gap: 10px; margin-top: auto; }
        .card-btn-live {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background-color: #1A1A2E;
          color: #F7F5F0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 11px 18px;
          border-radius: 2px;
          text-decoration: none;
          border: 2px solid #1A1A2E;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }
        .card-btn-live:hover { background-color: #E63946; border-color: #E63946; }
        .card-btn-gh {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background-color: transparent;
          color: #1A1A2E;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 11px 18px;
          border-radius: 2px;
          text-decoration: none;
          border: 2px solid #1A1A2E;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }
        .card-btn-gh:hover { background-color: #1A1A2E; color: #F7F5F0; }

        /* CTA */
        .proj-cta {
          background-color: #1A1A2E;
          border-radius: 4px;
          border: 2px solid #1A1A2E;
          box-shadow: 8px 8px 0 #E63946;
          padding: 56px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
        }
        .proj-cta::after {
          content: '→';
          position: absolute;
          right: 180px; top: 50%;
          transform: translateY(-50%);
          font-family: 'Playfair Display', serif;
          font-size: 10rem;
          font-weight: 900;
          color: rgba(255,255,255,0.03);
          pointer-events: none;
          user-select: none;
        }
        .cta-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          color: #F7F5F0;
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }
        .cta-sub {
          font-size: 0.95rem;
          color: #A8A4A0;
          line-height: 1.65;
          max-width: 440px;
          margin: 0;
        }
        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background-color: #E63946;
          color: #F7F5F0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 16px 36px;
          border-radius: 2px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 4px 4px 0 #F7F5F0;
        }
        .cta-btn:hover {
          opacity: 0.92;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #F7F5F0;
        }

        /* Corner decorative number */
        .proj-corner-num {
          position: absolute;
          top: 32px; right: 48px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(5rem, 12vw, 10rem);
          font-weight: 900;
          color: #E2DDD5;
          line-height: 1;
          user-select: none;
          pointer-events: none;
          z-index: 1;
          letter-spacing: -0.04em;
        }

        @media (max-width: 900px) {
          .proj-inner { padding: 60px 24px 60px 40px; }
          .proj-grid { grid-template-columns: 1fr; }
          .collab-card { padding: 32px 24px; }
          .proj-cta { padding: 40px 32px; }
        }
        @media (max-width: 600px) {
          .proj-inner { padding: 48px 16px 48px 28px; }
          .proj-heading { font-size: 2.8rem; }
          .card-features { grid-template-columns: 1fr; }
          .proj-cta::after { display: none; }
        }
      `}</style>

      <section className="proj-root" ref={sectionRef} id="projects">
        <div className="proj-accent-bar" />
        <div className="proj-corner-num" aria-hidden="true">02</div>

        <div className="proj-inner">

          {/* Header */}
          <div className="proj-header">
            <div>
              <div className="proj-section-label">
                <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#22C55E', display: 'inline-block' }} />
                Portfolio · {projects.length} Projects
              </div>
              <h2 className="proj-heading">
                Featured<br />
                <span>Projects</span>
              </h2>
            </div>
            <p className="proj-subtext">
              Full-stack solutions built with modern technologies — from investment platforms to restaurant management systems.
            </p>
          </div>

          <div className="proj-divider">
            <div className="proj-divider-line" />
            <div className="proj-divider-dot" />
            <span className="proj-divider-text">Recent Work</span>
          </div>

          {/* Collab Card */}
          <div className="collab-card">
            <div className="collab-icon-wrap">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#F7F5F0" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="collab-title">Collaborative Development Experience</h3>
            <p className="collab-sub">
              Collaborated with multiple engineers on applications and platforms across business, booking, institutional, and SME domains.
            </p>
            <div className="collab-grid">
              {collabItems.map((item, i) => (
                <div key={i} className="collab-item">
                  <span className="collab-arrow">▸</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="proj-grid">
            {projects.map((project, index) => (
              <div
                key={index}
                className="proj-card"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  boxShadow: hoveredIndex === index
                    ? `6px 6px 0 ${project.accent}`
                    : '4px 4px 0 #D1CDC4',
                }}
              >
                <div className="card-num">{project.num}</div>

                <div className="card-top">
                  <span className="card-category">{project.category}</span>
                  <div className="card-status">
                    <span className="card-status-dot" style={{ backgroundColor: project.live ? '#22C55E' : '#D97706' }} />
                    {project.live ? 'Live' : 'In Dev'}
                  </div>
                </div>

                <div className="card-accent-bar" style={{ backgroundColor: project.accent }} />

                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>

                <div className="card-features">
                  {project.features.map((f, i) => (
                    <div key={i} className="card-feat-item">
                      <div className="card-feat-dot" style={{ backgroundColor: project.accent }} />
                      {f}
                    </div>
                  ))}
                </div>

                <div className="card-tech-row">
                  {project.tech.map((t, i) => (
                    <span key={i} className="card-tech-pill">{t}</span>
                  ))}
                </div>

                <div className="card-btns">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="card-btn-live">
                      View Live
                      <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-btn-gh">
                    GitHub
                    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="proj-cta">
            <div>
              <h3 className="cta-heading">Interested in Working Together?</h3>
              <p className="cta-sub">
                I'm always open to discussing new projects and opportunities. Let's create something amazing together.
              </p>
            </div>
            <button className="cta-btn" onClick={() => onSectionChange('contact')}>
              Let's Connect
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

        </div>
      </section>
    </>
  );
};

export default Projects;