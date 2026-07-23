import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const contactChannels = [
  {
    label: 'Email',
    value: 'brianmwalish@gmail.com',
    sub: 'Best for project proposals & detailed enquiries',
    link: 'mailto:brianmwalish@gmail.com',
    action: 'Send Email',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Mobile',
    value: '+254 714 137 834',
    sub: 'WhatsApp preferred for quick messages',
    link: 'tel:+254714137834',
    action: 'Call Now',
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/brianmwalish',
    sub: 'Connect professionally & view endorsements',
    link: 'https://linkedin.com/in/brianmwalish',
    action: 'View Profile',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/Brian2021-Mwalish',
    sub: 'Explore repositories & open-source contributions',
    link: 'https://github.com/Brian2021-Mwalish',
    action: 'View Code',
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
  { value: '24h', label: 'Response Time' },
  { value: '10+', label: 'Happy Clients' },
  { value: '5+', label: 'Projects Delivered' },
  { value: '3+', label: 'Years Experience' },
];

const projectTypes = ['Full-Stack Web App', 'API / Backend', 'Dashboard / Analytics', 'UI / UX Design', 'Consultation', 'Full-Time Role', 'Other'];

// ─── STATUS DOT ───────────────────────────────────────────────────────────────

const StatusDot = () => (
  <span className="ct-statusDotWrap">
    <span className="ct-statusDotPulse" />
    <span className="ct-statusDotCore" />
  </span>
);

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
    <button onClick={handle} title="Copy to clipboard" className={`ct-copyBtn ct-copyBtn--${state}`}>
      {state === 'copied' ? 'Copied' : state === 'err' ? "Couldn't copy" : 'Copy'}
    </button>
  );
};

// ─── FAQ ITEM ─────────────────────────────────────────────────────────────────

const FaqItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="ct-faqItem">
      <button onClick={() => setOpen(o => !o)} className="ct-faqQ">
        <div className="ct-faqQLeft">
          <span className="ct-faqNum">0{index + 1}</span>
          <span className="ct-faqQText">{item.q}</span>
        </div>
        <span className={`ct-faqToggle${open ? ' open' : ''}`}>{open ? '−' : '+'}</span>
      </button>
      <div className="ct-faqAWrap" style={{ maxHeight: open ? 160 : 0 }}>
        <p className="ct-faqA">{item.a}</p>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const Contact = () => {
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

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        @keyframes hexDrift {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-60px, 60px) rotate(6deg); }
        }
        @keyframes dotPulse { 75%, 100% { transform: scale(2.4); opacity: 0; } }
        @keyframes ctSpin { to { transform: rotate(360deg); } }

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

        .ct-root {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          background-color: var(--paper);
          min-height: 100vh;
          color: var(--ink);
          position: relative;
          overflow: hidden;
        }

        .ct-hexLayer {
          position: absolute; top: 6%; right: -80px;
          width: 320px; height: 280px;
          background-color: var(--paper-2);
          clip-path: var(--hex);
          animation: hexDrift 26s ease-in-out infinite alternate;
          pointer-events: none; z-index: 0;
        }
        .ct-glowOrange {
          position: absolute; bottom: 6%; left: -60px;
          width: 130px; height: 130px;
          background-color: var(--orange); opacity: 0.9;
          clip-path: var(--hex);
          pointer-events: none; z-index: 0;
        }

        .ct-shell { position: relative; z-index: 10; max-width: 1180px; margin: 0 auto; padding: 0 24px; }

        /* ── TOP BAR ── */
        .ct-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 0 16px; border-bottom: 1px solid var(--line);
          gap: 12px; flex-wrap: wrap;
        }
        .ct-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--ink); letter-spacing: -0.01em; }
        .ct-logo span { color: var(--orange); }
        .ct-status { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
        .ct-status span { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; letter-spacing: 0.06em; color: var(--ink); }

        .ct-statusDotWrap { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 10px; height: 10px; }
        .ct-statusDotPulse { position: absolute; width: 10px; height: 10px; border-radius: 50%; background-color: var(--orange-tint); animation: dotPulse 1.8s cubic-bezier(0,0,0.2,1) infinite; }
        .ct-statusDotCore { width: 6px; height: 6px; border-radius: 50%; background-color: var(--orange); position: relative; z-index: 1; }

        .ct-sec { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--purple); margin-bottom: 12px; }

        /* ── HEADER ── */
        .ct-header { padding: 48px 0 36px; display: flex; align-items: flex-end; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
        .ct-eyebrow {
          font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--orange); display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .ct-eyebrow::before { content: ''; width: 22px; height: 1px; background-color: var(--orange); display: inline-block; }
        .ct-heading {
          font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto;
          font-size: clamp(2.8rem, 6vw, 4.6rem); font-weight: 600; color: var(--ink);
          line-height: 0.98; letter-spacing: -0.02em; margin: 0;
        }
        .ct-heading em { font-style: italic; font-weight: 400; color: var(--purple); }
        .ct-headerRight { max-width: 340px; }
        .ct-headerSub { font-size: 0.92rem; font-weight: 300; color: var(--slate); line-height: 1.8; margin: 0 0 16px; }
        .ct-avail {
          display: inline-flex; align-items: center; gap: 8px; border: 1px solid var(--line);
          border-radius: 20px; padding: 7px 14px; background: var(--paper-2);
        }
        .ct-availText { font-family: 'JetBrains Mono', monospace; font-size: 0.64rem; color: var(--ink); letter-spacing: 0.04em; }

        /* ── STATS ── */
        .ct-stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
          border: 1px solid var(--line); border-radius: 6px; overflow: hidden;
          background-color: var(--line); margin-bottom: 52px;
        }
        .ct-stat { background-color: #FFFFFF; padding: 18px 12px; text-align: center; }
        .ct-statVal { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(1.4rem, 2.4vw, 1.8rem); color: var(--ink); display: block; line-height: 1; }
        .ct-statLbl { font-family: 'JetBrains Mono', monospace; font-size: 0.56rem; color: var(--slate); letter-spacing: 0.08em; text-transform: uppercase; display: block; margin-top: 6px; }

        /* ── MAIN GRID ── */
        .ct-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 56px; align-items: start; }

        /* ── CHANNEL CARD ── */
        .ct-ch {
          border: 1px solid var(--line); border-radius: 6px; padding: 18px 20px; margin-bottom: 10px;
          display: flex; align-items: flex-start; gap: 14px; text-decoration: none; color: inherit;
          background: #FFFFFF; transition: border-color 0.2s, transform 0.2s cubic-bezier(.22,1,.36,1);
        }
        .ct-ch:last-child { margin-bottom: 0; }
        .ct-ch:hover { transform: translateX(4px); border-color: var(--purple-2); }
        .ct-chIcon {
          width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; border: 1px solid var(--line); background: var(--paper-2); color: var(--purple);
        }
        .ct-chLbl { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--slate); margin-bottom: 3px; }
        .ct-chVal { font-family: 'Fraunces', serif; font-size: 0.98rem; font-weight: 600; color: var(--ink); margin-bottom: 3px; word-break: break-all; }
        .ct-chSub { font-size: 0.78rem; color: var(--slate); line-height: 1.4; }
        .ct-chAction { font-family: 'Space Grotesk', sans-serif; font-size: 0.68rem; font-weight: 600; color: var(--purple); margin-top: 6px; display: inline-flex; align-items: center; gap: 5px; }

        /* ── LOCATION CARD ── */
        .ct-loc { border: 1px solid var(--line); border-radius: 6px; padding: 18px 20px; margin-top: 10px; display: flex; align-items: flex-start; gap: 14px; background: var(--paper-2); }
        .ct-locIcon { width: 36px; height: 36px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid var(--line); background: #FFFFFF; color: var(--orange); }
        .ct-locTitle { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 0.85rem; color: var(--ink); margin-bottom: 3px; }
        .ct-locSub { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--slate); line-height: 1.6; }

        /* ── FORM ── */
        .ct-formCard { border: 1px solid var(--line); border-radius: 8px; background: #FFFFFF; padding: 32px 36px; }
        .ct-formTitle { font-family: 'Fraunces', serif; font-size: 1.5rem; font-weight: 600; color: var(--ink); margin: 0 0 4px; letter-spacing: -0.01em; }
        .ct-formSub { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--slate); margin: 0 0 24px; }
        .ct-formRow { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
        .ct-formGroup { display: flex; flex-direction: column; gap: 5px; margin-bottom: 14px; }
        .ct-formLbl { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--slate); }
        .ct-formInput {
          font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--ink);
          background: var(--paper); border: 1px solid var(--line); border-radius: 5px;
          padding: 10px 12px; outline: none; transition: border-color 0.2s, box-shadow 0.2s; width: 100%;
        }
        .ct-formInput:focus { border-color: var(--purple-2); box-shadow: 0 0 0 3px rgba(139,92,246,0.12); }
        .ct-formInput::placeholder { color: #B8B0C9; }
        .ct-formSelect {
          font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--ink);
          background: var(--paper); border: 1px solid var(--line); border-radius: 5px;
          padding: 10px 12px; outline: none; width: 100%; cursor: pointer; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%236B6478' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center; transition: border-color 0.2s;
        }
        .ct-formSelect:focus { border-color: var(--purple-2); }
        .ct-formTextarea {
          font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--ink);
          background: var(--paper); border: 1px solid var(--line); border-radius: 5px;
          padding: 10px 12px; outline: none; width: 100%; resize: vertical; min-height: 110px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ct-formTextarea:focus { border-color: var(--purple-2); box-shadow: 0 0 0 3px rgba(139,92,246,0.12); }
        .ct-formTextarea::placeholder { color: #B8B0C9; }
        .ct-char { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--slate); text-align: right; margin-top: 3px; }
        .ct-formBtn {
          width: 100%; padding: 13px 24px; background: var(--purple); color: #fff;
          font-family: 'Space Grotesk', sans-serif; font-size: 0.82rem; font-weight: 600; letter-spacing: 0.01em;
          border: 1.5px solid var(--purple); border-radius: 5px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: background 0.2s, transform 0.15s, opacity 0.2s; margin-top: 6px;
        }
        .ct-formBtn:hover:not(:disabled) { background: #4C1D95; transform: translateY(-1px); }
        .ct-formBtn:disabled { opacity: 0.5; cursor: not-allowed; }
        .ct-formBtn.sent { background: #16A34A; border-color: #16A34A; }

        /* ── FAQ ── */
        .ct-faqCard { border: 1px solid var(--line); border-radius: 8px; background: #FFFFFF; padding: 28px 32px; margin-top: 20px; }
        .ct-faqTitle { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 600; color: var(--ink); margin: 0 0 18px; }
        .ct-faqItem { border-bottom: 1px solid var(--line); }
        .ct-faqItem:last-child { border-bottom: none; }
        .ct-faqQ { width: 100%; background: none; border: none; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 15px 0; cursor: pointer; text-align: left; }
        .ct-faqQLeft { display: flex; align-items: center; gap: 12px; }
        .ct-faqNum { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 600; color: var(--orange); letter-spacing: 0.06em; flex-shrink: 0; }
        .ct-faqQText { font-family: 'Space Grotesk', sans-serif; font-size: 0.88rem; font-weight: 600; color: var(--ink); }
        .ct-faqToggle {
          width: 20px; height: 20px; border-radius: 50%; border: 1px solid var(--line); background: var(--paper-2);
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s;
          font-size: 14px; color: var(--slate); line-height: 1;
        }
        .ct-faqToggle.open { background: var(--paper-2); border-color: var(--purple-2); color: var(--purple); }
        .ct-faqAWrap { overflow: hidden; transition: max-height 0.35s cubic-bezier(.22,1,.36,1); }
        .ct-faqA { font-family: 'Inter', sans-serif; font-size: 0.84rem; color: var(--slate); line-height: 1.75; padding: 0 0 16px 32px; margin: 0; font-weight: 300; }

        /* ── BOTTOM CTA ── */
        .ct-cta { border: 1px solid var(--line); border-radius: 8px; background: var(--paper-2); padding: 44px 44px; display: flex; align-items: center; justify-content: space-between; gap: 36px; flex-wrap: wrap; margin-bottom: 40px; }
        .ct-ctaHeading { font-family: 'Fraunces', serif; font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 600; color: var(--ink); margin: 0 0 8px; letter-spacing: -0.01em; }
        .ct-ctaSub { font-size: 0.9rem; font-weight: 300; color: var(--slate); line-height: 1.7; max-width: 400px; margin: 0; }
        .ct-ctaBtns { display: flex; gap: 10px; flex-wrap: wrap; flex-shrink: 0; }
        .ct-btnP {
          display: inline-flex; align-items: center; gap: 7px; background: var(--purple); color: #fff;
          font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.01em;
          padding: 12px 22px; border-radius: 5px; border: 1.5px solid var(--purple);
          text-decoration: none; cursor: pointer; transition: background 0.18s, transform 0.15s;
        }
        .ct-btnP:hover { background: #4C1D95; transform: translateY(-1px); }
        .ct-btnO {
          display: inline-flex; align-items: center; gap: 7px; background: transparent; color: var(--ink);
          font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.01em;
          padding: 12px 22px; border-radius: 5px; border: 1.5px solid var(--line);
          text-decoration: none; cursor: pointer; transition: border-color 0.18s, color 0.18s, transform 0.15s;
        }
        .ct-btnO:hover { border-color: var(--orange); color: var(--orange); transform: translateY(-1px); }

        /* ── FOOTER ── */
        .ct-foot { border-top: 1px solid var(--line); padding: 13px 0 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .ct-footTxt { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--slate); }

        /* ── COPY BUTTON ── */
        .ct-copyBtn {
          background: var(--paper-2); border: 1px solid var(--line); border-radius: 4px;
          padding: 5px 10px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 500;
          color: var(--slate); transition: all 0.2s; flex-shrink: 0;
        }
        .ct-copyBtn--copied { border-color: var(--purple-2); color: var(--purple); }
        .ct-copyBtn--err { border-color: var(--orange); color: var(--orange); }

        @media (max-width: 960px) {
          .ct-grid { grid-template-columns: 1fr; }
          .ct-formRow { grid-template-columns: 1fr; }
          .ct-stats { grid-template-columns: repeat(2, 1fr); }
          .ct-cta { padding: 36px 28px; }
        }
        @media (max-width: 600px) {
          .ct-shell { padding: 0 16px; }
          .ct-heading { font-size: clamp(2.2rem, 12vw, 2.8rem); }
          .ct-header { padding: 36px 0 26px; }
          .ct-formCard { padding: 24px 20px; }
          .ct-faqCard { padding: 22px 20px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ct-hexLayer, .ct-statusDotPulse { animation: none; }
        }
      `}</style>

      <section className="ct-root" id="contact">
        <div className="ct-hexLayer" aria-hidden="true" />
        <div className="ct-glowOrange" aria-hidden="true" />

        <div className="ct-shell">

          {/* ── TOP BAR ── */}
          <div className="ct-bar">
            <div className="ct-logo">Mwalish<span>.dev</span></div>
            <div className="ct-status">
              <StatusDot />
              <span>Open to work</span>
            </div>
          </div>

          {/* ── HEADER ── */}
          <motion.div className="ct-header" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.div variants={fadeUp}>
              <p className="ct-eyebrow">Contact · Eldoret, Kenya</p>
              <h2 className="ct-heading">Let's Work<br /><em>Together</em></h2>
            </motion.div>
            <motion.div className="ct-headerRight" variants={fadeUp}>
              <p className="ct-headerSub">
                Have a project in mind, want to collaborate, or just want to say hello?
                I'm a message away — and I respond fast.
              </p>
              <div className="ct-avail">
                <StatusDot />
                <span className="ct-availText">Open to work · Eldoret, KE · EAT (UTC+3)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── STATS ── */}
          <motion.div
            className="ct-stats"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {stats.map((s, i) => (
              <div key={i} className="ct-stat">
                <span className="ct-statVal">{s.value}</span>
                <span className="ct-statLbl">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── MAIN GRID ── */}
          <div className="ct-grid">

            {/* ── LEFT: Channels + Location ── */}
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
              <motion.div variants={fadeUp}>
                <p className="ct-sec">Reach Me On</p>
                {contactChannels.map((ch, i) => (
                  <motion.a
                    key={i}
                    href={ch.link}
                    target={ch.link?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="ct-ch"
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <div className="ct-chIcon">{ch.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="ct-chLbl">{ch.label}</div>
                      <div className="ct-chVal">{ch.value}</div>
                      <div className="ct-chSub">{ch.sub}</div>
                      <span className="ct-chAction">{ch.action} →</span>
                    </div>
                    <CopyBtn text={ch.value} />
                  </motion.a>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <div className="ct-loc">
                  <div className="ct-locIcon">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="ct-locTitle">Based in Eldoret, Kenya</div>
                    <div className="ct-locSub">EAT (UTC+3) · Remote-first · Open to relocation<br />Available for freelance, contract, and full-time work</div>
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
              <div className="ct-formCard">
                <h3 className="ct-formTitle">Send a Message</h3>
                <p className="ct-formSub">Your mail client will open with everything pre-filled</p>

                <div className="ct-formRow">
                  <div className="ct-formGroup" style={{ marginBottom: 0 }}>
                    <label className="ct-formLbl">Name *</label>
                    <input className="ct-formInput" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" autoComplete="off" />
                  </div>
                  <div className="ct-formGroup" style={{ marginBottom: 0 }}>
                    <label className="ct-formLbl">Email *</label>
                    <input className="ct-formInput" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@email.com" autoComplete="off" />
                  </div>
                </div>

                <div className="ct-formGroup">
                  <label className="ct-formLbl">Project Type</label>
                  <select className="ct-formSelect" name="type" value={formData.type} onChange={handleChange}>
                    <option value="">Select a category…</option>
                    {projectTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="ct-formGroup">
                  <label className="ct-formLbl">Message *</label>
                  <textarea className="ct-formTextarea" name="message" value={formData.message} onChange={handleChange} placeholder="Hi Brian, I'd like to discuss…" maxLength={600} />
                  <div className="ct-char">{formData.message.length} / 600</div>
                </div>

                <button
                  className={`ct-formBtn${formState === 'sent' ? ' sent' : ''}`}
                  onClick={handleSubmit}
                  disabled={formState === 'sending' || !formData.name || !formData.email || !formData.message}
                >
                  {formState === 'sending' ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'ctSpin 1s linear infinite' }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4" strokeLinecap="round" />
                      </svg>
                      Opening Mail Client…
                    </>
                  ) : formState === 'sent' ? (
                    <>
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Mail Client Opened
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </>
                  )}
                </button>
              </div>

              <div className="ct-faqCard">
                <p className="ct-sec">Common Questions</p>
                <h3 className="ct-faqTitle">Quick Answers</h3>
                {faqs.map((item, i) => <FaqItem key={i} item={item} index={i} />)}
              </div>
            </motion.div>
          </div>

          {/* ── BOTTOM CTA ── */}
          <motion.div
            className="ct-cta"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h3 className="ct-ctaHeading">Ready to Start?</h3>
              <p className="ct-ctaSub">Every great project starts with a conversation. Let's build something that makes an impact.</p>
            </div>
            <div className="ct-ctaBtns">
              <a href="mailto:brianmwalish@gmail.com" className="ct-btnP">
                Email Me
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="/BRIAN%20CV.pdf" download="BRIAN CV.pdf" className="ct-btnO">
                Download CV
                <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M7 19H5a2 2 0 01-2-2V7a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2h-2" /></svg>
              </a>
            </div>
          </motion.div>

          {/* ── FOOTER ── */}
          <footer className="ct-foot">
            <span className="ct-footTxt">© 2025 Brian Mwalish</span>
            <span className="ct-footTxt">Software Engineer · Eldoret KE</span>
          </footer>

        </div>
      </section>
    </>
  );
};

export default Contact;