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
  { label: "Python" },
  { label: "Django" },
  { label: "React" },
  { label: "PostgreSQL" },
  { label: "Docker" },
  { label: "AWS" },
  { label: "FastAPI" },
  { label: "Node.js" },
  { label: "REST APIs" },
  { label: "Git" },
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

const recentWork = [
  "Built scalable REST APIs with Django",
  "Deployed microservices on AWS ECS",
  "Optimised PostgreSQL query performance",
  "Shipped 10+ production applications",
];

const credentials = ["Open Source", "Problem Solver", "System Thinker"];

const techIcons = [
  { src: reactLogo,   alt: "React"   },
  { src: pythonLogo,  alt: "Python"  },
  { src: fastapiLogo, alt: "FastAPI" },
  { src: dockerLogo,  alt: "Docker"  },
  { src: awsLogo,     alt: "AWS"     },
];

// ─── TYPING EFFECT ────────────────────────────────────────────────────────────

const TypingTitle = () => {
  const [tIdx, setTIdx]           = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [blink, setBlink]         = useState(true);

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
    <span className="h-typed">
      {displayed}
      <span className="h-caret" style={{ opacity: blink ? 1 : 0 }}>|</span>
    </span>
  );
};

// ─── STACK CHIP ───────────────────────────────────────────────────────────────

const StackChip = ({ label }) => (
  <motion.span
    whileHover={{ y: -2 }}
    transition={{ type: 'spring', stiffness: 400 }}
    className="h-chipTag"
  >
    {label}
  </motion.span>
);

// ─── AVAILABILITY DOT ─────────────────────────────────────────────────────────

const StatusDot = () => (
  <span className="h-statusDotWrap">
    <span className="h-statusDotPulse" />
    <span className="h-statusDotCore" />
  </span>
);

// ─── SIGNATURE PHOTO FRAME ────────────────────────────────────────────────────
// The brand's hexagon motif, carried into the portrait itself: two offset
// hex "shadow" layers behind a hex-clipped photo, like a mis-registered print.

const HexPortrait = () => (
  <div className="h-photoWrap">
    <div className="h-hexGhost h-hexGhost--orange" aria-hidden="true" />
    <div className="h-hexGhost h-hexGhost--purple" aria-hidden="true" />
    <motion.div
      className="h-hexPhoto"
      whileHover={{ scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <img src={ownerImage} alt="Brian Mwalish — Software Engineer" />
    </motion.div>

    <div className="h-photoTag">
      <div>
        <p className="h-photoTag-name">Brian Mwalish</p>
        <p className="h-photoTag-loc">Eldoret, KE</p>
      </div>
      <div className="h-photoTag-status">
        <StatusDot />
        <span>Available</span>
      </div>
    </div>
  </div>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────

const Hero = ({ onSectionChange }) => {
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
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes hexDrift {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-60px, 60px) rotate(6deg); }
        }
        @keyframes dotPulse {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes hexBreath {
          0%, 100% { transform: translate(var(--gx), var(--gy)) rotate(var(--gr)); }
          50%      { transform: translate(calc(var(--gx) * 0.6), calc(var(--gy) * 0.6)) rotate(calc(var(--gr) * -1)); }
        }

        *, *::before, *::after { box-sizing: border-box; }

        :root {
          --ink: #1B1130;
          --purple: #5B21B6;
          --purple-2: #8B5CF6;
          --orange: #F97316;
          --paper: #FAF9F7;
          --paper-2: #F1EEFB;
          --line: #E7E1F4;
          --orange-tint: #FDE0C7;
          --slate: #6B6478;
          --hex: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }

        .h-root {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          background-color: var(--paper);
          min-height: 100dvh;
          color: var(--ink);
          position: relative;
          overflow: hidden;
        }

        /* Ambient geometric backdrop */
        .h-hexLayer {
          position: absolute;
          top: 8%;
          right: -80px;
          width: 340px;
          height: 300px;
          background-color: var(--paper-2);
          clip-path: var(--hex);
          animation: hexDrift 26s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }
        .h-glowPurple {
          position: absolute; bottom: 6%; left: -70px;
          width: 150px; height: 150px;
          background-color: var(--purple);
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
          pointer-events: none; z-index: 0;
        }
        .h-glowOrange {
          position: absolute; top: -40px; left: 46%;
          width: 90px; height: 90px;
          background-color: var(--orange);
          clip-path: var(--hex);
          pointer-events: none; z-index: 0;
        }

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
          padding: 22px 0 16px;
          border-bottom: 1px solid var(--line);
          gap: 12px;
          flex-wrap: wrap;
        }
        .h-logo {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .h-logo span { color: var(--orange); }

        .h-tagline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          letter-spacing: 0.16em;
          color: var(--slate);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .h-tagline b { color: var(--purple); font-weight: 500; }
        .h-tagline .sep { color: var(--orange); }

        .h-status {
          display: flex; align-items: center; gap: 8px;
          white-space: nowrap;
        }
        .h-status span {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          letter-spacing: 0.06em;
          color: var(--ink);
        }

        /* ── MAIN GRID ── */
        .h-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 56px;
          align-items: center;
          padding: 48px 0 40px;
        }

        .h-left { display: flex; flex-direction: column; gap: 22px; }

        .h-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--orange);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .h-eyebrow::before {
          content: '';
          width: 22px; height: 1px;
          background-color: var(--orange);
          display: inline-block;
        }

        .h-name {
          font-family: 'Fraunces', Georgia, serif;
          font-optical-sizing: auto;
          font-size: clamp(3rem, 6.6vw, 5.2rem);
          font-weight: 600;
          color: var(--ink);
          line-height: 0.98;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .h-name-accent {
          font-style: italic;
          font-weight: 400;
          color: var(--purple);
        }

        .h-title-row {
          display: flex; align-items: center; gap: 10px;
          min-height: 30px;
        }
        .h-title-prompt {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          color: var(--slate);
          letter-spacing: 0.04em;
        }
        .h-title-text {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.25rem);
        }
        .h-typed { color: var(--purple); }
        .h-caret { color: var(--orange); font-weight: 600; }

        .h-bio {
          font-size: 0.95rem;
          font-weight: 300;
          color: var(--slate);
          line-height: 1.8;
          max-width: 520px;
        }

        .h-sec {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--purple);
          margin-bottom: 10px;
        }

        /* Metrics */
        .h-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          border: 1px solid var(--line);
          border-radius: 6px;
          overflow: hidden;
          background-color: var(--line);
        }
        .h-metric {
          background-color: #FFFFFF;
          padding: 16px 10px;
          text-align: center;
        }
        .h-metric-val {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(1.3rem, 2.4vw, 1.7rem);
          color: var(--ink);
          display: block;
          line-height: 1;
        }
        .h-metric-lbl {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.54rem;
          color: var(--slate);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          display: block;
          margin-top: 5px;
        }

        .h-stack { display: flex; flex-wrap: wrap; gap: 8px; }
        .h-chipTag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          color: var(--ink);
          padding: 6px 12px;
          background-color: #FFFFFF;
          border: 1px solid var(--line);
          clip-path: polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px);
          letter-spacing: 0.01em;
          cursor: default;
          user-select: none;
          white-space: nowrap;
        }

        .h-interests { display: flex; flex-wrap: wrap; gap: 8px; }
        .h-interest {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          color: var(--purple);
          border: 1px solid #D6C6F5;
          background-color: var(--paper-2);
          padding: 4px 10px;
          border-radius: 3px;
          letter-spacing: 0.03em;
        }

        .h-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .h-btn-p {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          background-color: var(--purple);
          color: #fff;
          padding: 12px 22px;
          border-radius: 4px;
          border: 1.5px solid var(--purple);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.18s, border-color 0.18s, transform 0.15s;
          cursor: pointer;
          white-space: nowrap;
        }
        .h-btn-p:hover { background-color: #4C1D95; border-color: #4C1D95; transform: translateY(-1px); }
        .h-btn-p:focus-visible, .h-btn-o:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 2px;
        }

        .h-btn-o {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          background-color: transparent;
          color: var(--ink);
          padding: 12px 22px;
          border-radius: 4px;
          border: 1.5px solid var(--line);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: border-color 0.18s, color 0.18s, transform 0.15s;
          cursor: pointer;
          white-space: nowrap;
        }
        .h-btn-o:hover { border-color: var(--orange); color: var(--orange); transform: translateY(-1px); }

        /* ── RIGHT PANEL ── */
        .h-right { display: flex; flex-direction: column; gap: 14px; }

        /* Signature element — hex-clipped portrait with offset "misprint" layers */
        .h-photoWrap {
          position: relative;
          padding: 16px 18px 0;
        }
        .h-hexGhost {
          position: absolute;
          top: 16px; left: 18px; right: 18px;
          aspect-ratio: 0.86 / 1;
          clip-path: var(--hex);
          animation: hexBreath 9s ease-in-out infinite;
        }
        .h-hexGhost--orange {
          --gx: 12px; --gy: 12px; --gr: 5deg;
          background-color: var(--orange);
          transform: translate(var(--gx), var(--gy)) rotate(var(--gr));
          z-index: 0;
        }
        .h-hexGhost--purple {
          --gx: 6px; --gy: -6px; --gr: -3deg;
          background-color: var(--purple);
          opacity: 0.92;
          transform: translate(var(--gx), var(--gy)) rotate(var(--gr));
          animation-delay: -3s;
          z-index: 1;
        }
        .h-hexPhoto {
          position: relative;
          z-index: 2;
          aspect-ratio: 0.86 / 1;
          clip-path: var(--hex);
          background-color: #FFFFFF;
          overflow: hidden;
        }
        .h-hexPhoto img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }

        .h-photoTag {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 11px 14px;
          border: 1px solid var(--line);
          border-radius: 4px;
          background-color: #FFFFFF;
        }
        .h-photoTag-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--ink);
        }
        .h-photoTag-loc {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          color: var(--slate);
          margin-top: 2px;
        }
        .h-photoTag-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          color: var(--slate);
          white-space: nowrap;
        }

        /* Recent-work recap */
        .h-logcard {
          border: 1px solid var(--line);
          border-radius: 4px;
          overflow: hidden;
          background-color: #FFFFFF;
        }
        .h-logcard-head {
          padding: 10px 14px;
          border-bottom: 1px solid var(--line);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--purple);
        }
        .h-logcard-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 9px; }
        .h-logline {
          display: flex; gap: 9px;
          font-family: 'Inter', sans-serif;
          font-size: 0.76rem;
          color: var(--ink);
          line-height: 1.4;
        }
        .h-logline::before {
          content: '';
          width: 5px; height: 5px;
          margin-top: 6px;
          border-radius: 50%;
          background-color: var(--orange);
          flex-shrink: 0;
        }

        .h-cred {
          border: 1px solid var(--line);
          border-radius: 4px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
          background-color: var(--paper-2);
        }
        .h-cred-item { display: flex; align-items: center; gap: 6px; }
        .h-cred-dot { color: var(--purple); font-size: 0.5rem; }
        .h-cred-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          color: var(--ink);
        }

        .h-statusDotWrap { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 10px; height: 10px; }
        .h-statusDotPulse {
          position: absolute; width: 10px; height: 10px; border-radius: 50%;
          background-color: var(--orange-tint);
          animation: dotPulse 1.8s cubic-bezier(0,0,0.2,1) infinite;
        }
        .h-statusDotCore { width: 6px; height: 6px; border-radius: 50%; background-color: var(--orange); position: relative; z-index: 1; }

        /* ── FOOTER ── */
        .h-foot {
          border-top: 1px solid var(--line);
          padding: 13px 0 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }
        .h-foot-icons { display: flex; align-items: center; gap: 14px; }
        .h-foot-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          color: var(--slate);
          letter-spacing: 0.16em;
        }
        .h-foot-copy { display: flex; align-items: center; gap: 8px; }
        .h-foot-sep { width: 1px; height: 10px; background-color: var(--line); }
        .h-foot-txt {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          color: var(--slate);
        }

        /* ─── RESPONSIVE ──────────────────────────────────── */

        @media (max-width: 900px) {
          .h-grid { grid-template-columns: 1fr; gap: 34px; padding: 34px 0 26px; }
          .h-right { flex-direction: row; flex-wrap: wrap; align-items: flex-start; }
          .h-photoWrap { flex: 1 1 220px; min-width: 0; }
          .h-logcard { flex: 1 1 240px; min-width: 0; }
          .h-cred { width: 100%; }
          .h-metrics { grid-template-columns: repeat(2, 1fr); }
          .h-tagline { display: none; }
        }

        @media (max-width: 640px) {
          .h-shell { padding: 0 16px; }
          .h-name { font-size: clamp(2.4rem, 13vw, 3.2rem); }
          .h-right { flex-direction: column; }
          .h-metrics { grid-template-columns: repeat(2, 1fr); }
          .h-btns { gap: 8px; }
          .h-btn-p, .h-btn-o { padding: 11px 16px; font-size: 0.72rem; }
          .h-foot { flex-direction: column; align-items: flex-start; }
        }

        @media (max-width: 360px) {
          .h-name { font-size: 2rem; }
          .h-stack { gap: 5px; }
          .h-interests { gap: 5px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .h-hexLayer, .h-hexGhost, .h-statusDotPulse { animation: none; }
        }
      `}</style>

      <section className="h-root">
        <div className="h-hexLayer" aria-hidden="true" />
        <div className="h-glowPurple" aria-hidden="true" />
        <div className="h-glowOrange" aria-hidden="true" />

        <div className="h-shell">

          {/* ── TOP BAR ── */}
          <header className="h-bar">
            <div className="h-logo">Mwalish<span>.dev</span></div>

            <div className="h-tagline">
              <b>CODE</b><span className="sep">·</span><b>DESIGN</b><span className="sep">·</span><b>INNOVATE</b>
            </div>

            <div className="h-status">
              <StatusDot />
              <span>Open to work</span>
            </div>
          </header>

          {/* ── MAIN GRID ── */}
          <motion.div className="h-grid" variants={stagger} initial="hidden" animate="show">

            {/* ── LEFT ── */}
            <div className="h-left">

              <motion.div variants={fadeUp}>
                <p className="h-eyebrow">Software Engineer · Eldoret, Kenya</p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <h1 className="h-name">
                  Brian<br />
                  Mwa<span className="h-name-accent">lish</span>
                </h1>
              </motion.div>

              <motion.div variants={fadeUp} className="h-title-row">
                <span className="h-title-prompt">Currently:</span>
                <span className="h-title-text">
                  <TypingTitle />
                </span>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="h-bio">
                  I develop scalable systems, intelligent software solutions,
                  and modern applications with a focus on software architecture,
                  cloud infrastructure, machine learning, backend engineering, automation,
                  and emerging technologies. Passionate about building secure, high-performance,
                  and data-driven solutions using modern software engineering principles.
                </p>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="h-sec">Engineering Metrics</p>
                <div className="h-metrics">
                  {metrics.map((m, i) => (
                    <div key={i} className="h-metric">
                      <span className="h-metric-val">{m.value}</span>
                      <span className="h-metric-lbl">{m.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="h-sec">Tech Stack</p>
                <div className="h-stack">
                  {stack.map((t, i) => <StackChip key={i} label={t.label} />)}
                </div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <p className="h-sec">Interested In</p>
                <div className="h-interests">
                  {interests.map((t, i) => (
                    <span key={i} className="h-interest">{t}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="h-btns">
                <a
                  href="https://github.com/Brian2021-Mwalish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-btn-p"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.79.55C20.22 21.4 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                  </svg>
                  GitHub Profile
                </a>
                <a href="/BRIAN%20CV.pdf" download="BRIAN CV.pdf" className="h-btn-o">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 10v6m0 0l-3-3m3 3l3-3M7 19H5a2 2 0 01-2-2V7a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2h-2"/>
                  </svg>
                  Resume / CV
                </a>
                <a
                  href="#projects"
                  className="h-btn-o"
                  onClick={(e) => {
                    e.preventDefault();
                    onSectionChange && onSectionChange('projects');
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                  View Projects
                </a>
              </motion.div>

            </div>

            {/* ── RIGHT ── */}
            <motion.div className="h-right" variants={fadeIn}>

              <HexPortrait />

              <div className="h-logcard">
                <div className="h-logcard-head">Recent Work</div>
                <div className="h-logcard-body">
                  {recentWork.map((line, i) => (
                    <div key={i} className="h-logline">{line}</div>
                  ))}
                </div>
              </div>

              <div className="h-cred">
                {credentials.map((t, i) => (
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
                  style={{ width: 20, height: 20, opacity: 0.4, cursor: 'pointer' }}
                  whileHover={{ opacity: 1, scale: 1.25 }}
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