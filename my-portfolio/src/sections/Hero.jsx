import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import ownerImage from '../assets/brian.png';
import reactLogo from "../assets/react.png";
import pythonLogo from "../assets/python.png";
import fastapiLogo from "../assets/fastapi.png";
import dockerLogo from "../assets/docker.png";
import awsLogo from "../assets/aws.png";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const titles = [
  "Full Stack Engineer",
  "Backend Systems Builder",
  "API & Cloud Architect",
  "Software Engineer",
];

const stack = [
  { label: "Python",     color: "#3B82F6" },
  { label: "Django",     color: "#22C55E" },
  { label: "React",      color: "#38BDF8" },
  { label: "PostgreSQL", color: "#A78BFA" },
  { label: "Docker",     color: "#60A5FA" },
  { label: "AWS",        color: "#F97316" },
  { label: "FastAPI",    color: "#34D399" },
  { label: "Node.js",    color: "#86EFAC" },
  { label: "REST APIs",  color: "#FCA5A5" },
  { label: "Git",        color: "#FB923C" },
];

const metrics = [
  { value: "10+",  label: "Production Projects" },
  { value: "3+",   label: "Years Experience"    },
  { value: "REST", label: "API Development"     },
  { value: "99%",  label: "Uptime Systems"      },
];

const interests = [
  "Scalable Systems",
  "Cloud Infrastructure",
  "Backend Engineering",
  "API Design",
  "DevOps",
];

const techIcons = [
  { src: reactLogo,   alt: "React"   },
  { src: pythonLogo,  alt: "Python"  },
  { src: fastapiLogo, alt: "FastAPI" },
  { src: dockerLogo,  alt: "Docker"  },
  { src: awsLogo,     alt: "AWS"     },
];

// ─── TYPING EFFECT ────────────────────────────────────────────────────────────

const TypingTitle = () => {
  const [tIdx, setTIdx]         = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink]       = useState(true);

  useEffect(() => {
    const b = setInterval(() => setBlink(v => !v), 530);
    return () => clearInterval(b);
  }, []);

  useEffect(() => {
    const current = titles[tIdx];
    let t;
    if (!deleting) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
      } else {
        t = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
      } else {
        setDeleting(false);
        setTIdx(i => (i + 1) % titles.length);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, tIdx]);

  return (
    <span style={{ fontFamily: "'Fira Code', monospace", color: '#22C55E', fontSize: 'inherit' }}>
      {displayed}
      <span style={{ opacity: blink ? 1 : 0, color: '#E63946' }}>|</span>
    </span>
  );
};

// ─── STACK BADGE ──────────────────────────────────────────────────────────────

const StackBadge = ({ label, color }) => (
  <motion.span
    whileHover={{ scale: 1.07, y: -2 }}
    transition={{ type: 'spring', stiffness: 400 }}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '4px 10px',
      borderRadius: 3,
      border: `1px solid ${color}30`,
      backgroundColor: `${color}12`,
      fontFamily: "'Fira Code', monospace",
      fontSize: '0.7rem',
      color,
      letterSpacing: '0.02em',
      cursor: 'default',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    }}
  >
    <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
    {label}
  </motion.span>
);

// ─── STATUS DOT ───────────────────────────────────────────────────────────────

const StatusDot = () => (
  <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 10, height: 10 }}>
    <span style={{
      position: 'absolute', width: 10, height: 10, borderRadius: '50%',
      backgroundColor: '#22C55E', opacity: 0.3,
      animation: 'heroPing 1.5s cubic-bezier(0,0,0.2,1) infinite',
    }} />
    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#22C55E', position: 'relative', zIndex: 1 }} />
  </span>
);

// ─── TERM LINE ────────────────────────────────────────────────────────────────

const TermLine = ({ prompt = '$', dimPrompt, children }) => (
  <div style={{ display: 'flex', gap: 8, fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', lineHeight: 1.65 }}>
    <span style={{ color: dimPrompt ? '#374151' : '#22C55E', flexShrink: 0 }}>{prompt}</span>
    <span style={{ color: '#9CA3AF' }}>{children}</span>
  </div>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
  const fadeUp  = {
    hidden: { opacity: 0, y: 22 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };
  const fadeIn = {
    hidden: { opacity: 0, x: 30 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=Fira+Code:wght@400;500&display=swap');

        @keyframes heroPing {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes heroGrid {
          0%   { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        @keyframes heroScan {
          0%   { transform: translateY(-5%); }
          100% { transform: translateY(110vh); }
        }

        *, *::before, *::after { box-sizing: border-box; }

        .h-root {
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
          background-color: #0D1117;
          min-height: 100dvh;
          color: #E6EDF3;
          position: relative;
          overflow: hidden;
        }

        /* Animated dot grid */
        .h-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(230,57,70,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: heroGrid 6s linear infinite;
          pointer-events: none;
          z-index: 0;
        }

        /* Subtle scanline */
        .h-root::after {
          content: '';
          position: absolute; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.05) 50%, transparent 100%);
          animation: heroScan 9s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        /* Glows */
        .h-glow-r { position: absolute; top: -140px; left: -100px; width: 550px; height: 550px; border-radius: 50%; background: radial-gradient(circle, rgba(230,57,70,0.07) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .h-glow-b { position: absolute; top: -60px; right: -60px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(26,26,46,0.55) 0%, transparent 70%); pointer-events: none; z-index: 0; }

        /* ── SHELL ── */
        .h-shell {
          position: relative; z-index: 10;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          min-height: 100dvh;
        }

        /* ── TOP BAR ── */
        .h-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0 14px;
          border-bottom: 1px solid rgba(230,57,70,0.14);
          gap: 12px;
          flex-wrap: wrap;
        }
        .h-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.05rem;
          color: #E6EDF3;
          white-space: nowrap;
        }
        .h-logo span { color: #E63946; }

        .h-nav {
          display: flex; gap: 6px; flex-wrap: wrap;
        }
        .h-chip {
          font-family: 'Fira Code', monospace;
          font-size: 0.62rem;
          color: #6B7280;
          padding: 3px 8px;
          border: 1px solid rgba(107,114,128,0.18);
          border-radius: 2px;
          letter-spacing: 0.06em;
          white-space: nowrap;
          text-decoration: none;
        }
        .h-chip:hover { border-color: rgba(230,57,70,0.4); color: #E63946; }

        .h-status {
          display: flex; align-items: center; gap: 7px;
          white-space: nowrap;
        }
        .h-status span {
          font-family: 'Fira Code', monospace;
          font-size: 0.62rem;
          color: #22C55E;
        }

        /* ── MAIN GRID ── */
        .h-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 52px;
          align-items: center;
          padding: 44px 0 36px;
        }

        /* ── LEFT STACK ── */
        .h-left { display: flex; flex-direction: column; gap: 22px; }

        /* Name */
        .h-name {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(3rem, 7vw, 5.6rem);
          font-weight: 400;
          color: #E6EDF3;
          line-height: 0.92;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .h-name-accent { color: #E63946; font-style: italic; }

        /* Title row */
        .h-title-row {
          display: flex; align-items: center; gap: 10px;
          min-height: 30px;
        }
        .h-title-prompt {
          font-family: 'Fira Code', monospace;
          font-size: 0.65rem;
          color: '#4B5563';
          letter-spacing: 0.04em;
        }
        .h-title-text { font-size: clamp(0.95rem, 2vw, 1.2rem); }

        /* Bio */
        .h-bio {
          font-size: 0.9rem;
          font-weight: 300;
          color: #8B949E;
          line-height: 1.82;
          max-width: 520px;
        }

        /* Section label */
        .h-sec {
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #E63946;
          margin-bottom: 9px;
        }

        /* Metrics grid */
        .h-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          border: 1px solid rgba(230,57,70,0.14);
          border-radius: 4px;
          overflow: hidden;
          background-color: rgba(230,57,70,0.07);
        }
        .h-metric {
          background-color: #0D1117;
          padding: 14px 10px;
          text-align: center;
        }
        .h-metric-val {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.35rem, 2.5vw, 1.85rem);
          color: #E6EDF3;
          display: block;
          line-height: 1;
        }
        .h-metric-lbl {
          font-family: 'Fira Code', monospace;
          font-size: 0.52rem;
          color: #6B7280;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: block;
          margin-top: 4px;
        }

        /* Stack wrap */
        .h-stack { display: flex; flex-wrap: wrap; gap: 6px; }

        /* Interests */
        .h-interests { display: flex; flex-wrap: wrap; gap: 6px; }
        .h-interest {
          font-family: 'Fira Code', monospace;
          font-size: 0.6rem;
          color: '#6B7280';
          border: 1px solid rgba(107,114,128,0.2);
          padding: 3px 9px;
          border-radius: 2px;
          letter-spacing: 0.04em;
          color: #6B7280;
        }

        /* Buttons */
        .h-btns { display: flex; gap: 9px; flex-wrap: wrap; }
        .h-btn-p {
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background-color: #E63946;
          color: #fff;
          padding: 11px 20px;
          border-radius: 3px;
          border: 1.5px solid #E63946;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: background-color 0.18s, transform 0.15s;
          cursor: pointer;
          white-space: nowrap;
        }
        .h-btn-p:hover { background-color: #C62833; transform: translateY(-1px); }

        .h-btn-o {
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background-color: transparent;
          color: #8B949E;
          padding: 11px 20px;
          border-radius: 3px;
          border: 1.5px solid rgba(139,148,158,0.22);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          transition: border-color 0.18s, color 0.18s, transform 0.15s;
          cursor: pointer;
          white-space: nowrap;
        }
        .h-btn-o:hover { border-color: #E63946; color: #E63946; transform: translateY(-1px); }

        /* ── RIGHT PANEL ── */
        .h-right { display: flex; flex-direction: column; gap: 13px; }

        /* Image card */
        .h-imgcard {
          position: relative;
          border: 1px solid rgba(230,57,70,0.18);
          border-radius: 6px;
          overflow: hidden;
          background-color: #161B22;
        }
        .h-win-bar {
          display: flex; align-items: center; gap: 5px;
          padding: 7px 12px;
          background-color: #161B22;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .h-dot { width: 9px; height: 9px; border-radius: 50%; }
        .h-win-label {
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem;
          color: #6B7280;
          margin-left: 5px;
        }
        .h-imgcard img {
          width: 100%;
          height: 248px;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: grayscale(18%);
          transition: filter 0.4s;
        }
        .h-imgcard:hover img { filter: grayscale(0%); }
        .h-img-overlay {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 20px 13px 13px;
          background: linear-gradient(to top, rgba(13,17,23,0.9) 0%, transparent 100%);
          display: flex; align-items: flex-end; justify-content: space-between;
        }
        .h-overlay-name {
          font-family: 'DM Serif Display', serif;
          font-size: 1rem;
          color: #E6EDF3;
        }
        .h-overlay-loc {
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem;
          color: #6B7280;
          margin-top: 2px;
        }

        /* Terminal card */
        .h-termcard {
          border: 1px solid rgba(230,57,70,0.13);
          border-radius: 6px;
          overflow: hidden;
          background-color: #0D1117;
        }
        .h-term-body { padding: 11px 14px; display: flex; flex-direction: column; gap: 2px; }

        /* Cred bar */
        .h-cred {
          border: 1px solid rgba(230,57,70,0.1);
          border-radius: 4px;
          padding: 9px 13px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          background-color: rgba(22,27,34,0.55);
        }
        .h-cred-item { display: flex; align-items: center; gap: 5px; }
        .h-cred-dot { color: #E63946; font-size: 0.5rem; }
        .h-cred-text {
          font-family: 'Fira Code', monospace;
          font-size: 0.6rem;
          color: #6B7280;
        }

        /* ── FOOTER BAR ── */
        .h-foot {
          border-top: 1px solid rgba(230,57,70,0.09);
          padding: 11px 0 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .h-foot-icons { display: flex; align-items: center; gap: 13px; }
        .h-foot-label {
          font-family: 'Fira Code', monospace;
          font-size: 0.56rem;
          color: #374151;
          letter-spacing: 0.16em;
        }
        .h-foot-copy {
          display: flex; align-items: center; gap: 8px;
        }
        .h-foot-sep { width: 1px; height: 10px; background-color: rgba(107,114,128,0.25); }
        .h-foot-txt {
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem;
          color: #374151;
        }

        /* ─── RESPONSIVE ──────────────────────────────────── */

        /* Tablet ≤ 900px */
        @media (max-width: 900px) {
          .h-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 32px 0 24px;
          }
          .h-right {
            flex-direction: row;
            flex-wrap: wrap;
          }
          .h-imgcard { flex: 1 1 220px; min-width: 0; }
          .h-termcard { flex: 1 1 220px; min-width: 0; }
          .h-cred { width: 100%; }
          .h-metrics { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile ≤ 640px */
        @media (max-width: 640px) {
          .h-shell { padding: 0 16px; }
          .h-nav { display: none; }
          .h-name { font-size: clamp(2.4rem, 13vw, 3.2rem); }
          .h-right { flex-direction: column; }
          .h-metrics { grid-template-columns: repeat(2, 1fr); }
          .h-btns { gap: 8px; }
          .h-btn-p, .h-btn-o { padding: 10px 15px; font-size: 0.68rem; }
          .h-foot { flex-direction: column; align-items: flex-start; }
        }

        /* Tiny ≤ 360px */
        @media (max-width: 360px) {
          .h-name { font-size: 2rem; }
          .h-stack { gap: 4px; }
          .h-interests { gap: 4px; }
        }
      `}</style>

      <section className="h-root">
        <div className="h-glow-r" aria-hidden="true" />
        <div className="h-glow-b" aria-hidden="true" />

        <div className="h-shell">

          {/* ── TOP BAR ── */}
          <header className="h-bar">
            <div className="h-logo">Brian<span>.</span>dev</div>

            <nav className="h-nav" aria-label="Quick navigation" />

            <div className="h-status">
              <StatusDot />
              <span>open_to_work</span>
            </div>
          </header>

          {/* ── MAIN GRID ── */}
          <motion.div
            className="h-grid"
            variants={stagger}
            initial="hidden"
            animate="show"
          >

            {/* ── LEFT ── */}
            <div className="h-left">

              {/* whoami prompt */}
              <motion.div variants={fadeUp}>
                <TermLine prompt="$">whoami</TermLine>
              </motion.div>

              {/* Name */}
              <motion.div variants={fadeUp}>
                <h1 className="h-name">
                  Brian<br />
                  Mwa<span className="h-name-accent">lish</span>
                </h1>
              </motion.div>

              {/* Typing title */}
              <motion.div variants={fadeUp} className="h-title-row">
                <span style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '0.65rem',
                  color: '#4B5563',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                }}>
                  role:
                </span>
                <span className="h-title-text">
                  <TypingTitle />
                </span>
              </motion.div>

              {/* Bio */}
              <motion.div variants={fadeUp}>
                <p className="h-bio">
                  {'> '} I develop scalable systems, intelligent software solutions,
                  and modern applications with a focus on software architecture,
                  cloud infrastructure, machine learning, backend engineering, automation,
                  and emerging technologies. Passionate about building secure, high-performance,
                  and data-driven solutions using modern software engineering principles
                  and technologies.
                </p>
              </motion.div>

              {/* Metrics */}
              <motion.div variants={fadeUp}>
                <p className="h-sec">// engineering metrics</p>
                <div className="h-metrics">
                  {metrics.map((m, i) => (
                    <div key={i} className="h-metric">
                      <span className="h-metric-val">{m.value}</span>
                      <span className="h-metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Stack */}
              <motion.div variants={fadeUp}>
                <p className="h-sec">// tech stack</p>
                <div className="h-stack">
                  {stack.map((t, i) => <StackBadge key={i} label={t.label} color={t.color} />)}
                </div>
              </motion.div>

              {/* Interests */}
              <motion.div variants={fadeUp}>
                <p className="h-sec">// interested in</p>
                <div className="h-interests">
                  {interests.map((t, i) => (
                    <span key={i} className="h-interest">{t}</span>
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="h-btns">
                <a
                  href="https://github.com/Brian2021-Mwalish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-btn-p"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.79.55C20.22 21.4 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                  </svg>
                  GitHub Profile
                </a>
                <a href="/BRIAN%20CV.pdf" download="BRIAN CV.pdf" className="h-btn-o">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 10v6m0 0l-3-3m3 3l3-3M7 19H5a2 2 0 01-2-2V7a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2h-2"/>
                  </svg>
                  Resume / CV
                </a>
                <a href="#projects" className="h-btn-o">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                  View Projects
                </a>
              </motion.div>

            </div>

            {/* ── RIGHT ── */}
            <motion.div className="h-right" variants={fadeIn}>

              {/* Photo — IDE window style */}
              <div className="h-imgcard">
                <div className="h-win-bar" aria-hidden="true">
                  <span className="h-dot" style={{ backgroundColor: '#FF5F57' }} />
                  <span className="h-dot" style={{ backgroundColor: '#FEBC2E' }} />
                  <span className="h-dot" style={{ backgroundColor: '#28C840' }} />
                  <span className="h-win-label">brian_mwalish.jpg</span>
                </div>
                <img src={ownerImage} alt="Brian Mwalish — Software Engineer" />
                <div className="h-img-overlay">
                  <div>
                    <p className="h-overlay-name">Brian Mwalish</p>
                    <p className="h-overlay-loc">Eldoret, KE · Available</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <StatusDot />
                    <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.58rem', color: '#22C55E' }}>online</span>
                  </div>
                </div>
              </div>

              {/* Terminal README */}
              <div className="h-termcard">
                <div className="h-win-bar" aria-hidden="true">
                  <span className="h-dot" style={{ backgroundColor: '#FF5F57' }} />
                  <span className="h-dot" style={{ backgroundColor: '#FEBC2E' }} />
                  <span className="h-dot" style={{ backgroundColor: '#28C840' }} />
                  <span className="h-win-label">README.md</span>
                </div>
                <div className="h-term-body">
                  <TermLine prompt="$">git log --oneline --author="Brian"</TermLine>
                  <TermLine prompt="›" dimPrompt>Built scalable REST APIs with Django</TermLine>
                  <TermLine prompt="›" dimPrompt>Deployed microservices on AWS ECS</TermLine>
                  <TermLine prompt="›" dimPrompt>Optimised PostgreSQL query performance</TermLine>
                  <TermLine prompt="›" dimPrompt>Shipped 10+ production applications</TermLine>
                  <TermLine prompt="$">_</TermLine>
                </div>
              </div>

              {/* Credibility bar */}
              <div className="h-cred">
                {['Open Source', 'Problem Solver', 'System Thinker'].map((t, i) => (
                  <div key={i} className="h-cred-item">
                    <span className="h-cred-dot">◆</span>
                    <span className="h-cred-text">{t}</span>
                  </div>
                ))}
              </div>

            </motion.div>

          </motion.div>

          {/* ── FOOTER ── */}
          <footer className="h-foot">
            <div className="h-foot-icons">
              <span className="h-foot-label">STACK</span>
              {techIcons.map((t, i) => (
                <motion.img
                  key={i}
                  src={t.src}
                  alt={t.alt}
                  style={{ width: 19, height: 19, opacity: 0.35, filter: 'grayscale(65%)', cursor: 'pointer' }}
                  whileHover={{ opacity: 1, scale: 1.3, filter: 'grayscale(0%)' }}
                  transition={{ type: 'spring', stiffness: 400 }}
                />
              ))}
            </div>
            <div className="h-foot-copy">
              <span className="h-foot-txt">© 2025 Brian Mwalish</span>
              <span className="h-foot-sep" />
              <span className="h-foot-txt">Software Engineer · Eldoret KE</span>
            </div>
          </footer>

        </div>
      </section>
    </>
  );
};

export default Hero;