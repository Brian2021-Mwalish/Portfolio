import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const contactChannels = [
  {
    num: '01',
    label: 'Email',
    value: 'brianmwalish@gmail.com',
    sub: 'Best for project proposals & detailed enquiries',
    link: 'mailto:brianmwalish@gmail.com',
    accent: '#E63946',
    action: 'Send Email',
    cmd: 'mailto',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: '02',
    label: 'Mobile',
    value: '+254 714 137 834',
    sub: 'WhatsApp preferred for quick messages',
    link: 'tel:+254714137834',
    accent: '#22C55E',
    action: 'Call Now',
    cmd: 'tel',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    num: '03',
    label: 'LinkedIn',
    value: 'linkedin.com/in/brianmwalish',
    sub: 'Connect professionally & view endorsements',
    link: 'https://linkedin.com/in/brianmwalish',
    accent: '#38BDF8',
    action: 'View Profile',
    cmd: 'open --url',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    num: '04',
    label: 'GitHub',
    value: 'github.com/Brian2021-Mwalish',
    sub: 'Explore repositories & open-source contributions',
    link: 'https://github.com/Brian2021-Mwalish',
    accent: '#A78BFA',
    action: 'View Code',
    cmd: 'open --url',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    q: 'What types of projects do you take on?',
    a: 'Full-stack web applications, REST API backends, dashboard & analytics tools, payment integrations (M-Pesa, Stripe), and SaaS MVPs. Both greenfield builds and existing-codebase improvements.',
  },
  {
    q: 'What is your typical project timeline?',
    a: 'A focused MVP usually takes 3–6 weeks. Larger platforms with integrations typically run 8–16 weeks. I provide a detailed scope estimate after our initial call.',
  },
  {
    q: 'Are you open to full-time roles?',
    a: 'Yes — I am actively considering full-time and long-term contract positions alongside freelance engagements. Feel free to reach out with details.',
  },
  {
    q: 'What does your tech stack look like?',
    a: 'React / TypeScript on the frontend, Django & Django REST Framework on the backend, PostgreSQL for data, and AWS / Vercel for deployment. I adapt to team stacks as needed.',
  },
];

const stats = [
  { value: '24h',  label: 'Response Time',       color: '#E63946' },
  { value: '10+',  label: 'Happy Clients',        color: '#22C55E' },
  { value: '5+',   label: 'Projects Delivered',   color: '#38BDF8' },
  { value: '3+',   label: 'Years Experience',     color: '#A78BFA' },
];

// ─── COPY BUTTON ──────────────────────────────────────────────────────────────

const CopyBtn = ({ text }) => {
  const [state, setState] = useState('idle');
  const handle = useCallback((e) => {
    e.preventDefault(); e.stopPropagation();
    navigator.clipboard.writeText(text).then(() => {
      setState('copied'); setTimeout(() => setState('idle'), 1800);
    }).catch(() => {
      setState('err'); setTimeout(() => setState('idle'), 1800);
    });
  }, [text]);

  return (
    <button onClick={handle} title="Copy to clipboard" style={{
      background: state === 'copied' ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${state === 'copied' ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}`,
      borderRadius: 2,
      padding: '3px 8px', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.1em',
      color: state === 'copied' ? '#22C55E' : '#6B7280',
      transition: 'all 0.2s', fontFamily: "'Fira Code', monospace",
      flexShrink: 0,
    }}>
      {state === 'copied' ? '✓ COPIED' : state === 'err' ? '✕ FAIL' : 'COPY'}
    </button>
  );
};

// ─── STATUS DOT ───────────────────────────────────────────────────────────────

const StatusDot = () => (
  <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 10, height: 10 }}>
    <span style={{
      position: 'absolute', width: 10, height: 10, borderRadius: '50%',
      backgroundColor: '#22C55E', opacity: 0.3,
      animation: 'cPing 1.5s cubic-bezier(0,0,0.2,1) infinite',
    }} />
    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#22C55E', position: 'relative', zIndex: 1 }} />
  </span>
);

// ─── TERM LINE ────────────────────────────────────────────────────────────────

const TermLine = ({ prompt = '$', dim, children }) => (
  <div style={{ display: 'flex', gap: 8, fontFamily: "'Fira Code', monospace", fontSize: '0.7rem', lineHeight: 1.7 }}>
    <span style={{ color: dim ? '#374151' : '#22C55E', flexShrink: 0 }}>{prompt}</span>
    <span style={{ color: '#9CA3AF' }}>{children}</span>
  </div>
);

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────

const FaqItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, padding: '16px 0', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.6rem', fontWeight: 600, color: '#E63946',
            letterSpacing: '0.06em', flexShrink: 0,
          }}>0{index + 1}</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.88rem', fontWeight: 500, color: '#E6EDF3',
          }}>{item.q}</span>
        </div>
        <span style={{
          width: 20, height: 20, borderRadius: 2,
          border: '1px solid rgba(230,57,70,0.3)',
          background: open ? 'rgba(230,57,70,0.15)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.2s',
          fontSize: 14, color: open ? '#E63946' : '#6B7280', lineHeight: 1,
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <div style={{
        maxHeight: open ? 160 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(.22,1,.36,1)',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.82rem', color: '#8B949E', lineHeight: 1.75,
          padding: '0 0 16px 28px', margin: 0,
        }}>{item.a}</p>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const Contact = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', type: '', message: '' });
  const [formState, setFormState] = useState('idle');

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormState('sending');
    const subject = encodeURIComponent(`[Portfolio] ${formData.type || 'Enquiry'} from ${formData.name}`);
    const body = encodeURIComponent(`Hi Brian,\n\nMy name is ${formData.name}.\n\n${formData.message}\n\n— ${formData.name}\n${formData.email}`);
    setTimeout(() => {
      window.location.href = `mailto:brianmwalish@gmail.com?subject=${subject}&body=${body}`;
      setFormState('sent');
      setTimeout(() => setFormState('idle'), 3000);
    }, 600);
  };

  const projectTypes = ['Full-Stack Web App', 'API / Backend', 'Dashboard / Analytics', 'UI / UX Design', 'Consultation', 'Full-Time Role', 'Other'];

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap');

        @keyframes cPing {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes cGrid {
          0%   { background-position: 0 0; }
          100% { background-position: 0 40px; }
        }
        @keyframes cScan {
          0%   { transform: translateY(-5%); }
          100% { transform: translateY(110vh); }
        }
        @keyframes cSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes cTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .c-root {
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
          background-color: #0D1117;
          min-height: 100vh;
          color: #E6EDF3;
          position: relative;
          overflow: hidden;
        }
        .c-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(230,57,70,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: cGrid 6s linear infinite;
          pointer-events: none; z-index: 0;
        }
        .c-root::after {
          content: '';
          position: absolute; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.04) 50%, transparent 100%);
          animation: cScan 9s linear infinite;
          pointer-events: none; z-index: 1;
        }

        .c-glow-r { position: absolute; top: -120px; left: -80px; width: 500px; height: 500px; border-radius: 50%; background: radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .c-glow-b { position: absolute; bottom: -80px; right: -60px; width: 380px; height: 380px; border-radius: 50%; background: radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%); pointer-events: none; z-index: 0; }

        .c-shell {
          position: relative; z-index: 10;
          max-width: 1180px; margin: 0 auto;
          padding: 0 24px;
        }

        /* ── TOP BAR ── */
        .c-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 0 14px;
          border-bottom: 1px solid rgba(230,57,70,0.14);
          gap: 12px; flex-wrap: wrap;
        }
        .c-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.05rem; color: #E6EDF3;
        }
        .c-logo span { color: #E63946; }
        .c-chip {
          font-family: 'Fira Code', monospace;
          font-size: 0.62rem; color: #6B7280;
          padding: 3px 8px;
          border: 1px solid rgba(107,114,128,0.18); border-radius: 2px;
          letter-spacing: 0.06em; white-space: nowrap;
          text-decoration: none; background: none;
        }
        .c-section-label {
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #E63946; margin-bottom: 9px;
        }

        /* ── HERO HEADER ── */
        .c-header {
          padding: 52px 0 36px;
          display: flex; align-items: flex-end;
          justify-content: space-between; gap: 32px; flex-wrap: wrap;
        }
        .c-heading {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(3rem, 6.5vw, 5.2rem);
          font-weight: 400; color: #E6EDF3;
          line-height: 0.92; letter-spacing: -0.03em; margin: 0;
        }
        .c-heading em { color: #E63946; font-style: italic; }
        .c-header-right {
          max-width: 340px;
        }
        .c-header-sub {
          font-size: 0.88rem; font-weight: 300;
          color: #8B949E; line-height: 1.8; margin: 0 0 16px;
        }
        .c-avail {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid rgba(34,197,94,0.25); border-radius: 3px;
          padding: 6px 12px;
          background: rgba(34,197,94,0.06);
        }
        .c-avail-text {
          font-family: 'Fira Code', monospace;
          font-size: 0.62rem; color: #22C55E; letter-spacing: 0.08em;
        }

        /* ── STATS ── */
        .c-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; margin-bottom: 52px;
          border: 1px solid rgba(230,57,70,0.14); border-radius: 4px;
          overflow: hidden; background: rgba(230,57,70,0.07);
        }
        .c-stat {
          background: #0D1117; padding: 18px 12px; text-align: center;
        }
        .c-stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          display: block; line-height: 1; margin-bottom: 4px;
        }
        .c-stat-lbl {
          font-family: 'Fira Code', monospace;
          font-size: 0.52rem; color: #6B7280;
          letter-spacing: 0.1em; text-transform: uppercase; display: block;
        }

        /* ── TICKER ── */
        .c-ticker {
          overflow: hidden;
          border-top: 1px solid rgba(230,57,70,0.14);
          border-bottom: 1px solid rgba(230,57,70,0.14);
          background: rgba(230,57,70,0.04);
          margin-bottom: 52px; padding: 10px 0;
        }
        .c-ticker-track {
          display: flex; animation: cTicker 20s linear infinite; width: max-content;
        }
        .c-ticker-item {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 0 28px; font-family: 'Fira Code', monospace;
          font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #6B7280; white-space: nowrap;
        }
        .c-ticker-dot { width: 4px; height: 4px; border-radius: '50%'; background: #E63946; flex-shrink: 0; }

        /* ── MAIN GRID ── */
        .c-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 32px; margin-bottom: 56px; align-items: start;
        }

        /* ── CHANNEL CARD ── */
        .c-ch {
          border: 1px solid rgba(255,255,255,0.06); border-radius: 4px;
          padding: 18px 20px; margin-bottom: 10px;
          display: flex; align-items: flex-start; gap: 14px;
          text-decoration: none; color: inherit;
          background: rgba(22,27,34,0.6);
          position: relative; overflow: hidden;
          transition: border-color 0.25s, background 0.25s, transform 0.25s cubic-bezier(.22,1,.36,1);
          cursor: pointer;
        }
        .c-ch:last-child { margin-bottom: 0; }
        .c-ch:hover { transform: translateX(4px); background: rgba(22,27,34,0.9); }
        .c-ch-num {
          position: absolute; top: 8px; right: 12px;
          font-family: 'DM Serif Display', serif;
          font-size: 2.4rem; font-weight: 400;
          color: rgba(255,255,255,0.03); line-height: 1;
          pointer-events: none; user-select: none;
        }
        .c-ch-icon {
          width: 36px; height: 36px; border-radius: 3px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; border: 1px solid;
          transition: background 0.2s;
        }
        .c-ch-lbl {
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase; color: #6B7280; margin-bottom: 2px;
        }
        .c-ch-val {
          font-family: 'DM Serif Display', serif;
          font-size: 0.95rem; color: #E6EDF3;
          margin-bottom: 3px; word-break: break-all;
        }
        .c-ch-sub { font-size: 0.75rem; color: #6B7280; line-height: 1.4; }
        .c-ch-action {
          font-family: 'Fira Code', monospace;
          font-size: 0.62rem; font-weight: 500; letter-spacing: 0.06em;
          margin-top: 6px; display: inline-flex; align-items: center; gap: 5px;
        }

        /* ── LOCATION ── */
        .c-loc {
          border: 1px solid rgba(255,255,255,0.06); border-radius: 4px;
          padding: 18px 20px; margin-top: 10px;
          display: flex; align-items: flex-start; gap: 14px;
          background: rgba(22,27,34,0.6);
        }

        /* ── TERM CARD ── */
        .c-termcard {
          border: 1px solid rgba(230,57,70,0.13); border-radius: 4px;
          overflow: hidden; background: #0D1117;
          margin-bottom: 12px;
        }
        .c-win-bar {
          display: flex; align-items: center; gap: 5px;
          padding: 7px 12px; background: #161B22;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .c-dot { width: 9px; height: 9px; border-radius: '50%'; }
        .c-win-lbl {
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem; color: #6B7280; margin-left: 5px;
        }
        .c-term-body { padding: 12px 16px; display: flex; flex-direction: column; gap: 2px; }

        /* ── FORM ── */
        .c-form-card {
          border: 1px solid rgba(230,57,70,0.18); border-radius: 4px;
          background: #161B22; padding: 32px 36px;
          position: relative; overflow: hidden;
        }
        .c-form-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem; color: #E6EDF3;
          margin: 0 0 4px; letter-spacing: -0.02em;
        }
        .c-form-sub {
          font-family: 'Fira Code', monospace;
          font-size: 0.65rem; color: #6B7280; margin: 0 0 24px;
        }
        .c-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .c-form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
        .c-form-lbl {
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase; color: #6B7280;
        }
        .c-form-input {
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: #E6EDF3;
          background: #0D1117; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 3px; padding: 10px 12px;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%; box-sizing: border-box;
        }
        .c-form-input:focus { border-color: rgba(230,57,70,0.5); box-shadow: 0 0 0 3px rgba(230,57,70,0.08); }
        .c-form-input::placeholder { color: #374151; }
        .c-form-select {
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: #E6EDF3;
          background: #0D1117; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 3px; padding: 10px 12px;
          outline: none; width: 100%; box-sizing: border-box; cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          transition: border-color 0.2s;
        }
        .c-form-select:focus { border-color: rgba(230,57,70,0.5); }
        .c-form-textarea {
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem; color: #E6EDF3;
          background: #0D1117; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 3px; padding: 10px 12px;
          outline: none; width: 100%; box-sizing: border-box;
          resize: vertical; min-height: 110px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .c-form-textarea:focus { border-color: rgba(230,57,70,0.5); box-shadow: 0 0 0 3px rgba(230,57,70,0.08); }
        .c-form-textarea::placeholder { color: #374151; }
        .c-char { font-family: 'Fira Code', monospace; font-size: 0.58rem; color: #374151; text-align: right; margin-top: 3px; }
        .c-form-btn {
          width: 100%; padding: 13px 24px;
          background: #E63946; color: #fff;
          font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          border: 1.5px solid #E63946; border-radius: 3px;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.15s, opacity 0.2s;
          margin-top: 6px;
        }
        .c-form-btn:hover:not(:disabled) { background: #C62833; transform: translateY(-1px); }
        .c-form-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .c-form-btn.sent { background: #22C55E; border-color: #22C55E; }

        /* ── FAQ ── */
        .c-faq-card {
          border: 1px solid rgba(255,255,255,0.06); border-radius: 4px;
          background: rgba(22,27,34,0.6); padding: 28px 32px; margin-top: 12px;
        }
        .c-faq-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem; color: #E6EDF3; margin: 0 0 4px;
        }

        /* ── BOTTOM CTA ── */
        .c-cta {
          border: 1px solid rgba(230,57,70,0.18); border-radius: 4px;
          background: #161B22; padding: 48px 44px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 40px; flex-wrap: wrap; margin-bottom: 0;
          position: relative; overflow: hidden;
        }
        .c-cta::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(230,57,70,0.5), transparent);
        }
        .c-cta-heading {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.5rem, 3vw, 2.2rem); color: #E6EDF3;
          margin: 0 0 8px; letter-spacing: -0.02em;
        }
        .c-cta-sub { font-size: 0.88rem; font-weight: 300; color: #8B949E; line-height: 1.7; max-width: 420px; margin: 0; }
        .c-cta-btns { display: flex; gap: 10px; flex-wrap: wrap; flex-shrink: 0; }
        .c-btn-p {
          display: inline-flex; align-items: center; gap: 7px;
          background: #E63946; color: #fff;
          font-family: 'Syne', sans-serif; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 24px; border-radius: 3px; border: 1.5px solid #E63946;
          text-decoration: none; cursor: pointer;
          transition: background 0.18s, transform 0.15s;
        }
        .c-btn-p:hover { background: #C62833; transform: translateY(-1px); }
        .c-btn-o {
          display: inline-flex; align-items: center; gap: 7px;
          background: transparent; color: #8B949E;
          font-family: 'Syne', sans-serif; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 12px 24px; border-radius: 3px; border: 1.5px solid rgba(139,148,158,0.22);
          text-decoration: none; cursor: pointer;
          transition: border-color 0.18s, color 0.18s, transform 0.15s;
        }
        .c-btn-o:hover { border-color: #E63946; color: #E63946; transform: translateY(-1px); }

        /* ── FOOTER ── */
        .c-foot {
          border-top: 1px solid rgba(230,57,70,0.09);
          padding: 11px 0 20px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 8px; margin-top: 40px;
        }
        .c-foot-txt {
          font-family: 'Fira Code', monospace;
          font-size: 0.56rem; color: #374151;
        }

        @media (max-width: 960px) {
          .c-grid { grid-template-columns: 1fr; }
          .c-form-row { grid-template-columns: 1fr; }
          .c-stats { grid-template-columns: repeat(2, 1fr); }
          .c-cta { padding: 36px 28px; }
        }
        @media (max-width: 600px) {
          .c-shell { padding: 0 16px; }
          .c-heading { font-size: 2.8rem; }
          .c-header { padding: 40px 0 28px; }
          .c-form-card { padding: 24px 20px; }
          .c-faq-card { padding: 20px; }
        }
      `}</style>

      <section className="c-root" id="contact">
        <div className="c-glow-r" aria-hidden="true" />
        <div className="c-glow-b" aria-hidden="true" />

        <div className="c-shell">

          {/* ── TOP BAR ── */}
          <div className="c-bar">
            <div className="c-logo">Brian<span>.</span>dev</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="c-chip">section_03</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <StatusDot />
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.62rem', color: '#22C55E' }}>available</span>
            </div>
          </div>

          {/* ── HEADER ── */}
          <motion.div
            className="c-header"
            variants={stagger} initial="hidden" whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp}>
              <div style={{ marginBottom: 12 }}>
                <TermLine prompt="$">whoami --section contact</TermLine>
              </div>
              <h2 className="c-heading">
                Let's Work<br />
                <em>Together</em>
              </h2>
            </motion.div>
            <motion.div className="c-header-right" variants={fadeUp}>
              <p className="c-header-sub">
                Have a project in mind, want to collaborate, or just want to say hello?
                I'm a message away — and I respond fast.
              </p>
              <div className="c-avail">
                <StatusDot />
                <span className="c-avail-text">open_to_work · Eldoret, KE · EAT (UTC+3)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── STATS ── */}
          <motion.div
            className="c-stats"
            style={{ marginBottom: 0 }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="c-stat">
                <span className="c-stat-val" style={{ color: s.color }}>{s.value}</span>
                <span className="c-stat-lbl">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── TICKER ── */}
          <div className="c-ticker" style={{ marginTop: 32 }}>
            <div className="c-ticker-track">
              {[...Array(2)].map((_, ri) =>
                ['Open for Freelance', 'Available for Full-Time', 'Based in Eldoret KE', 'Remote-Ready', 'Fast Responder', 'Clean Code Advocate', 'M-Pesa Integration', 'Full-Stack Developer', 'React + Django'].map((t, i) => (
                  <span key={`${ri}-${i}`} className="c-ticker-item">
                    <span className="c-ticker-dot" style={{ borderRadius: '50%' }} />
                    {t}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="c-grid">

            {/* ── LEFT: Channels + Terminal ── */}
            <motion.div
              variants={stagger} initial="hidden" whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div variants={fadeUp}>
                <p className="c-section-label">// reach_me_on</p>
                {contactChannels.map((ch, i) => (
                  <motion.a
                    key={i}
                    href={ch.link}
                    target={ch.link?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="c-ch"
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      borderColor: hoveredCard === i ? `${ch.accent}30` : 'rgba(255,255,255,0.06)',
                      animationDelay: `${i * 0.06}s`,
                    }}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <div className="c-ch-num">{ch.num}</div>
                    <div
                      className="c-ch-icon"
                      style={{
                        background: `${ch.accent}12`,
                        borderColor: `${ch.accent}30`,
                        color: ch.accent,
                      }}
                    >
                      {ch.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="c-ch-lbl">{ch.label}</div>
                      <div className="c-ch-val">{ch.value}</div>
                      <div className="c-ch-sub">{ch.sub}</div>
                      <span className="c-ch-action" style={{ color: ch.accent }}>
                        <span style={{ opacity: 0.5 }}>$</span> {ch.cmd} {ch.action} →
                      </span>
                    </div>
                    <CopyBtn text={ch.value} />
                  </motion.a>
                ))}
              </motion.div>

              {/* Terminal card */}
              <motion.div variants={fadeUp} style={{ marginTop: 10 }}>
                <div className="c-termcard">
                  <div className="c-win-bar" aria-hidden="true">
                    <span className="c-dot" style={{ backgroundColor: '#FF5F57', borderRadius: '50%' }} />
                    <span className="c-dot" style={{ backgroundColor: '#FEBC2E', borderRadius: '50%' }} />
                    <span className="c-dot" style={{ backgroundColor: '#28C840', borderRadius: '50%' }} />
                    <span className="c-win-lbl">contact_info.sh</span>
                  </div>
                  <div className="c-term-body">
                    <TermLine prompt="$">cat location.txt</TermLine>
                    <TermLine prompt="›" dim>Eldoret, Kenya · EAT (UTC+3)</TermLine>
                    <TermLine prompt="›" dim>Remote-first · Open to relocation</TermLine>
                    <TermLine prompt="$">echo $AVAILABILITY</TermLine>
                    <TermLine prompt="›" dim>Freelance ✓  Full-Time ✓  Contract ✓</TermLine>
                    <TermLine prompt="$">_</TermLine>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Form + FAQ ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              {/* Form */}
              <div className="c-form-card">
                <div className="c-win-bar" style={{ margin: '-32px -36px 24px', padding: '7px 14px' }} aria-hidden="true">
                  <span className="c-dot" style={{ backgroundColor: '#FF5F57', borderRadius: '50%' }} />
                  <span className="c-dot" style={{ backgroundColor: '#FEBC2E', borderRadius: '50%' }} />
                  <span className="c-dot" style={{ backgroundColor: '#28C840', borderRadius: '50%' }} />
                  <span className="c-win-lbl">compose_message.jsx</span>
                </div>
                <h3 className="c-form-title">Send a Message</h3>
                <p className="c-form-sub">// your mail client will open with everything pre-filled</p>

                <div className="c-form-row">
                  <div className="c-form-group" style={{ marginBottom: 0 }}>
                    <label className="c-form-lbl">name *</label>
                    <input className="c-form-input" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" autoComplete="off" />
                  </div>
                  <div className="c-form-group" style={{ marginBottom: 0 }}>
                    <label className="c-form-lbl">email *</label>
                    <input className="c-form-input" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" autoComplete="off" />
                  </div>
                </div>

                <div className="c-form-group">
                  <label className="c-form-lbl">project_type</label>
                  <select className="c-form-select" name="type" value={formData.type} onChange={handleChange}>
                    <option value="">Select a category…</option>
                    {projectTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="c-form-group">
                  <label className="c-form-lbl">message *</label>
                  <textarea className="c-form-textarea" name="message" value={formData.message} onChange={handleChange} placeholder="Hi Brian, I'd like to discuss…" maxLength={600} />
                  <div className="c-char">{formData.message.length} / 600</div>
                </div>

                <button
                  className={`c-form-btn${formState === 'sent' ? ' sent' : ''}`}
                  onClick={handleSubmit}
                  disabled={formState === 'sending' || !formData.name || !formData.email || !formData.message}
                >
                  {formState === 'sending' ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'cSpin 1s linear infinite' }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round" />
                      </svg>
                      Opening Mail Client…
                    </>
                  ) : formState === 'sent' ? (
                    <>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Mail Client Opened ✓
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </>
                  )}
                </button>
              </div>

              {/* FAQ */}
              <div className="c-faq-card">
                <p className="c-section-label">// common_questions</p>
                <h3 className="c-faq-title">Quick Answers</h3>
                <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.62rem', color: '#6B7280', margin: '4px 0 20px' }}>
                  before we talk
                </p>
                {faqs.map((item, i) => <FaqItem key={i} item={item} index={i} />)}
              </div>
            </motion.div>
          </div>

          {/* ── BOTTOM CTA ── */}
          <motion.div
            className="c-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="c-cta-heading">Ready to Start?</h3>
              <p className="c-cta-sub">Every great project starts with a conversation. Let's build something that makes an impact.</p>
            </div>
            <div className="c-cta-btns">
              <a href="mailto:brianmwalish@gmail.com" className="c-btn-p">
                Email Me
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="/BRIAN%20CV.pdf" download="BRIAN CV.pdf" className="c-btn-o">
                Download CV
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M7 19H5a2 2 0 01-2-2V7a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2h-2" /></svg>
              </a>
            </div>
          </motion.div>

          {/* ── FOOTER ── */}
          <footer className="c-foot">
            <span className="c-foot-txt">© 2025 Brian Mwalish · Software Engineer · Eldoret KE</span>
            <span className="c-foot-txt">brian.dev · section_03/contact</span>
          </footer>

        </div>
      </section>
    </>
  );
};

export default Contact;