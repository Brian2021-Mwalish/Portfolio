import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ownerImage from '../assets/brian.png';
import reactLogo from "../assets/react.png";
import pythonLogo from "../assets/python.png";
import fastapiLogo from "../assets/fastapi.png";
import dockerLogo from "../assets/docker.png";
import awsLogo from "../assets/aws.png";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const roles = [
  "Application Solutions Specialist",
  "AI Enthusiast",
  "UI/UX Designer",
  "Problem Solver",
];

const ROLE_ACCENT_COLORS = ["#E63946", "#2563EB", "#16A34A", "#D97706"];

const techStack = ["React.js", "Django", "Node.js", "PostgreSQL", "AWS", "Docker"];

const codeSnippets = [
  "const solve = () => {",
  "import React from 'react';",
  "def optimize(data):",
  "SELECT * FROM users",
  "docker build -t app .",
  "async function fetch()",
];

const techIcons = [
  { src: reactLogo, alt: "React" },
  { src: pythonLogo, alt: "Python" },
  { src: fastapiLogo, alt: "FastAPI" },
  { src: dockerLogo, alt: "Docker" },
  { src: awsLogo, alt: "AWS" },
];

// ─── ANIMATED ROLES TICKER ───────────────────────────────────────────────────

const AnimatedRole = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ height: 42, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.1rem, 2.2vw, 1.55rem)',
            fontWeight: 700,
            fontStyle: 'italic',
            color: ROLE_ACCENT_COLORS[index],
            letterSpacing: '0.01em',
            display: 'block',
          }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

// ─── FLOATING CODE SNIPPETS ───────────────────────────────────────────────────

const FloatingSnippet = ({ code, delay, x, y }) => (
  <motion.div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      fontFamily: "'Fira Code', 'Courier New', monospace",
      fontSize: '0.7rem',
      color: '#C0C0C0',
      pointerEvents: 'none',
      userSelect: 'none',
    }}
    initial={{ opacity: 0 }}
    animate={{ opacity: [0, 0.22, 0], y: [0, -30] }}
    transition={{ duration: 7, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    {code}
  </motion.div>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const [techIndex, setTechIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTechIndex(i => (i + 1) % techStack.length), 2000);
    return () => clearInterval(t);
  }, []);

  // Stagger container
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 36 },
    show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Fira+Code:wght@400&display=swap');

        .hero-root {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          background-color: #F7F5F0;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }

        /* ─── RULED BACKGROUND ─── */
        .hero-root::before {
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

        .hero-accent-bar {
          position: absolute;
          top: 0; left: 0;
          width: 8px;
          height: 100%;
          background-color: #1A1A2E;
          z-index: 2;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 48px 0 72px;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
          width: 100%;
          padding: 80px 0;
        }

        /* ─── NAME ─── */
        .hero-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3.2rem, 7vw, 6.5rem);
          font-weight: 900;
          color: #1A1A2E;
          line-height: 0.95;
          letter-spacing: -0.03em;
          margin: 0 0 4px;
        }
        .hero-name span {
          color: #E63946;
        }

        /* ─── DIVIDER ─── */
        .hero-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .hero-divider-line {
          height: 2px;
          background-color: #1A1A2E;
          flex: 0 0 48px;
        }
        .hero-divider-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background-color: #E63946;
          flex-shrink: 0;
        }

        /* ─── BADGE ─── */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #1A1A2E;
          color: #F7F5F0;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 2px;
          margin-bottom: 24px;
        }
        .hero-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background-color: #22C55E;
          display: inline-block;
        }

        /* ─── BIO ─── */
        .hero-bio {
          font-size: 1rem;
          color: #4B4A56;
          line-height: 1.75;
          max-width: 420px;
          margin: 20px 0 28px;
        }

        /* ─── TECH MARQUEE ─── */
        .hero-tech-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 32px;
          font-size: 0.85rem;
          color: #4B4A56;
          font-weight: 500;
        }
        .hero-tech-chip {
          background-color: #1A1A2E;
          color: #F7F5F0;
          padding: 3px 12px;
          border-radius: 2px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          min-width: 110px;
          text-align: center;
        }

        /* ─── BUTTONS ─── */
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #1A1A2E;
          color: #F7F5F0;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 14px 32px;
          border-radius: 2px;
          text-decoration: none;
          border: 2px solid #1A1A2E;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }
        .hero-btn-primary:hover {
          background-color: #E63946;
          border-color: #E63946;
        }

        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background-color: transparent;
          color: #1A1A2E;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 14px 32px;
          border-radius: 2px;
          text-decoration: none;
          border: 2px solid #1A1A2E;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }
        .hero-btn-secondary:hover {
          background-color: #1A1A2E;
          color: #F7F5F0;
        }

        /* ─── TECH ICONS ─── */
        .hero-icons-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding-top: 32px;
          border-top: 1.5px solid #D1CDC4;
          margin-top: 12px;
        }
        .hero-icons-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9A9590;
        }

        /* ─── IMAGE SIDE ─── */
        .hero-image-wrap {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
        }

        .hero-image-frame {
          position: relative;
          width: clamp(260px, 28vw, 400px);
          aspect-ratio: 3/4;
        }

        /* Shadow block */
        .hero-image-shadow {
          position: absolute;
          bottom: -12px;
          right: -12px;
          width: 100%;
          height: 100%;
          background-color: #1A1A2E;
          border-radius: 4px;
          z-index: 0;
        }

        .hero-image-inner {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          overflow: hidden;
          border: 3px solid #1A1A2E;
          background-color: #E8E4DC;
        }

        .hero-image-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        /* Available badge on image */
        .hero-avail-badge {
          position: absolute;
          bottom: -20px;
          left: -24px;
          z-index: 3;
          background-color: #22C55E;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 2px;
          border: 2px solid #fff;
          white-space: nowrap;
          box-shadow: 4px 4px 0 #1A1A2E;
        }

        /* Stats card */
        .hero-stats-card {
          position: absolute;
          top: -20px;
          right: -28px;
          z-index: 3;
          background-color: #E63946;
          color: #fff;
          padding: 14px 18px;
          border-radius: 4px;
          border: 2px solid #1A1A2E;
          box-shadow: 4px 4px 0 #1A1A2E;
          text-align: center;
          min-width: 90px;
        }
        .hero-stats-num {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
          display: block;
        }
        .hero-stats-label {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.9;
          display: block;
          margin-top: 2px;
        }

        /* ─── CORNER NUMBER ─── */
        .hero-corner-num {
          position: absolute;
          top: 32px;
          right: 48px;
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

        /* ─── RESPONSIVE ─── */
        @media (max-width: 900px) {
          .hero-content { padding: 0 24px 0 40px; }
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 60px 0 40px;
          }
          .hero-image-wrap { justify-content: center; }
          .hero-corner-num { font-size: 5rem; right: 16px; }
        }
        @media (max-width: 600px) {
          .hero-content { padding: 0 16px 0 28px; }
          .hero-name { font-size: 3rem; }
          .hero-btn-primary, .hero-btn-secondary { padding: 12px 20px; font-size: 0.85rem; }
        }
      `}</style>

      <section className="hero-root">
        {/* Left accent bar */}
        <div className="hero-accent-bar" />

        {/* Large decorative number */}
        <div className="hero-corner-num" aria-hidden="true">01</div>

        {/* Floating code snippets */}
        {codeSnippets.map((code, i) => (
          <FloatingSnippet
            key={i}
            code={code}
            delay={i * 1.1}
            x={`${15 + (i * 12) % 65}%`}
            y={`${10 + (i * 17) % 75}%`}
          />
        ))}

        <div className="hero-content">
          <motion.div
            className="hero-grid"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* ── LEFT: TEXT ── */}
            <div>
              {/* Badge */}
              <motion.div variants={item}>
                <span className="hero-badge">
                  <span className="hero-badge-dot" />
                  Available for hire · Eldoret, KE
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1 variants={item} className="hero-name">
                Brian<br />
                Mwa<span>lish</span>
              </motion.h1>

              {/* Divider */}
              <motion.div variants={item} className="hero-divider">
                <div className="hero-divider-line" />
                <div className="hero-divider-dot" />
                <AnimatedRole />
              </motion.div>

              {/* Bio */}
              <motion.p variants={item} className="hero-bio">
                Building modern, scalable applications with a focus on clean
                code, reliability, and seamless user experience.
              </motion.p>

              {/* Tech ticker */}
              <motion.div variants={item} className="hero-tech-row">
                <span>Currently working with:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={techIndex}
                    className="hero-tech-chip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    {techStack[techIndex]}
                  </motion.span>
                </AnimatePresence>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={item}
                style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
              >
                <a
                  href="https://github.com/Brian2021-Mwalish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-btn-primary"
                >
                  View Projects
                </a>
                <a
                  href="/Brian%20Mwalish%20Cv.pdf"
                  download="Brian Mwalish CV.pdf"
                  className="hero-btn-secondary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 10v6m0 0l-3-3m3 3l3-3M7 19H5a2 2 0 01-2-2V7a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2h-2"/>
                  </svg>
                  Download CV
                </a>
              </motion.div>

              {/* Tech Icons */}
              <motion.div variants={item} className="hero-icons-row">
                <span className="hero-icons-label">Stack</span>
                {techIcons.map((tech, i) => (
                  <motion.img
                    key={i}
                    src={tech.src}
                    alt={tech.alt}
                    style={{ width: 28, height: 28, opacity: 0.55, cursor: 'pointer', filter: 'grayscale(40%)' }}
                    whileHover={{ opacity: 1, scale: 1.2, filter: 'grayscale(0%)' }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  />
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT: IMAGE ── */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 60 },
                show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="hero-image-wrap"
            >
              <div className="hero-image-frame">
                {/* Offset shadow */}
                <div className="hero-image-shadow" />

                {/* Image */}
                <motion.div
                  className="hero-image-inner"
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <img
                    src={ownerImage}
                    alt="Brian Mwalish – Software Engineer"
                  />
                </motion.div>

                {/* Available badge */}
                <motion.div
                  className="hero-avail-badge"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  ✓ Available for hire
                </motion.div>

                {/* Stats card */}
                <motion.div
                  className="hero-stats-card"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <span className="hero-stats-num">3+</span>
                  <span className="hero-stats-label">Years Exp.</span>
                </motion.div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;