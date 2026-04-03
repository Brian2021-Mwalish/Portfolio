import React, { useState, useRef, useEffect, useCallback } from 'react';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const contactChannels = [
  {
    num: '01',
    label: 'Email',
    value: 'brianmwalish@gmail.com',
    sub: 'Best for project proposals & detailed enquiries',
    link: 'mailto:brianmwalish@gmail.com',
    accent: '#E63946',
    action: 'Send Email →',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
    accent: '#16A34A',
    action: 'Call Now →',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
    accent: '#2563EB',
    action: 'View Profile →',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    num: '04',
    label: 'GitHub',
    value: 'github.com/Brian2021-Mwalish',
    sub: 'Explore repositories & open-source contributions',
    link: 'https://github.com/Brian2021-Mwalish',
    accent: '#D97706',
    action: 'View Code →',
    icon: (
      <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
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

// ─── COPY BUTTON ──────────────────────────────────────────────────────────────

const CopyBtn = ({ text }) => {
  const [state, setState] = useState('idle');
  const handle = useCallback((e) => {
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      setState('copied'); setTimeout(() => setState('idle'), 1800);
    }).catch(() => {
      setState('err'); setTimeout(() => setState('idle'), 1800);
    });
  }, [text]);

  return (
    <button onClick={handle} title="Copy" style={{
      background: state === 'copied' ? '#22C55E' : state === 'err' ? '#E63946' : '#F0EDE8',
      border: '1.5px solid #D1CDC4', borderRadius: 2,
      padding: '4px 10px', cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 4,
      fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em',
      color: state !== 'idle' ? '#fff' : '#9A9590',
      transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif",
      flexShrink: 0,
    }}>
      {state === 'copied' ? '✓ COPIED' : state === 'err' ? '✕ FAIL' : 'COPY'}
    </button>
  );
};

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────

const FaqItem = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: '1.5px solid #E8E4DC',
      overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16, padding: '20px 0', cursor: 'pointer', textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.7rem', fontWeight: 900, color: '#E63946',
            letterSpacing: '0.04em', flexShrink: 0,
          }}>0{index + 1}</span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.95rem', fontWeight: 600, color: '#1A1A2E',
          }}>{item.q}</span>
        </div>
        <span style={{
          width: 24, height: 24, borderRadius: 2,
          background: open ? '#1A1A2E' : '#F0EDE8',
          border: '1.5px solid #1A1A2E',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.2s',
          fontSize: 16, color: open ? '#F7F5F0' : '#1A1A2E', lineHeight: 1,
        }}>
          {open ? '−' : '+'}
        </span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s cubic-bezier(.22,1,.36,1)',
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '0.88rem', color: '#4B4A56', lineHeight: 1.75,
          padding: '0 0 20px 38px', margin: 0,
        }}>{item.a}</p>
      </div>
    </div>
  );
};

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────

const Counter = ({ target, suffix = '' }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let n = 0;
        const step = Math.ceil(target / 40);
        const t = setInterval(() => {
          n += step;
          if (n >= target) { setVal(target); clearInterval(t); }
          else setVal(n);
        }, 28);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const Contact = () => {
  const sectionRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', type: '', message: '' });
  const [formState, setFormState] = useState('idle'); // idle | sending | sent | error
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormState('sending');
    // Compose mailto with prefilled subject & body
    const subject = encodeURIComponent(`[Portfolio] ${formData.type || 'Enquiry'} from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Brian,\n\nMy name is ${formData.name}.\n\n${formData.message}\n\n— ${formData.name}\n${formData.email}`
    );
    setTimeout(() => {
      window.location.href = `mailto:brianmwalish@gmail.com?subject=${subject}&body=${body}`;
      setFormState('sent');
      setTimeout(() => setFormState('idle'), 3000);
    }, 600);
  };

  const projectTypes = ['Full-Stack Web App', 'API / Backend', 'Dashboard / Analytics', 'UI / UX Design', 'Consultation', 'Full-Time Role', 'Other'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGreen {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.4); }
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .contact-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #F7F5F0;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .contact-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 47px, #E2DDD5 47px, #E2DDD5 48px
          );
          pointer-events: none; z-index: 0;
        }
        .contact-accent-bar {
          position: absolute; top: 0; left: 0;
          width: 8px; height: 100%;
          background-color: #1A1A2E; z-index: 2;
        }
        .contact-inner {
          position: relative; z-index: 10;
          max-width: 1280px; margin: 0 auto;
          padding: 80px 48px 80px 72px;
        }

        /* ── HEADER ── */
        .contact-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 32px;
          margin-bottom: 56px; flex-wrap: wrap;
        }
        .contact-label {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1A1A2E; color: #F7F5F0;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 2px; margin-bottom: 16px;
        }
        .contact-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 900;
          color: #1A1A2E; line-height: 0.95;
          letter-spacing: -0.03em; margin: 0;
        }
        .contact-heading span { color: #E63946; }
        .contact-subtext {
          font-size: 1rem; color: #4B4A56; line-height: 1.75;
          max-width: 380px; margin: 20px 0 0; align-self: flex-end;
        }
        .contact-divider {
          display: flex; align-items: center; gap: 12px; margin-bottom: 48px;
        }
        .contact-divider-line { height: 2px; background: #1A1A2E; flex: 0 0 48px; }
        .contact-divider-dot  { width: 8px; height: 8px; border-radius: 50%; background: #E63946; }
        .contact-divider-text { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9A9590; }

        /* ── TICKER ── */
        .ticker-wrap {
          overflow: hidden;
          border-top: 2px solid #1A1A2E;
          border-bottom: 2px solid #1A1A2E;
          background: #1A1A2E;
          margin-bottom: 56px;
          padding: 12px 0;
        }
        .ticker-track {
          display: flex; gap: 0;
          animation: tickerScroll 18s linear infinite;
          width: max-content;
        }
        .ticker-item {
          display: inline-flex; align-items: center; gap: 16px;
          padding: 0 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #F7F5F0; white-space: nowrap;
        }
        .ticker-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #E63946; flex-shrink: 0;
        }

        /* ── AVAIL BANNER ── */
        .avail-banner {
          background: #fff;
          border: 2px solid #1A1A2E; border-radius: 4px;
          box-shadow: 6px 6px 0 #22C55E;
          padding: 20px 28px;
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        .avail-pulse {
          width: 12px; height: 12px; border-radius: 50%;
          background: #22C55E; flex-shrink: 0;
          animation: pulseGreen 1.8s ease-in-out infinite;
        }
        .avail-text-primary {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: #1A1A2E;
        }
        .avail-text-sub { font-size: 0.85rem; color: #4B4A56; margin-top: 2px; }
        .avail-badge {
          margin-left: auto;
          background: #22C55E; color: #fff;
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; padding: 6px 14px; border-radius: 2px;
          border: 1.5px solid #1A1A2E;
          box-shadow: 2px 2px 0 #1A1A2E;
          white-space: nowrap;
        }

        /* ── MAIN GRID ── */
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 40px; margin-bottom: 64px;
          align-items: start;
        }

        /* ── CHANNEL CARDS ── */
        .channel-card {
          background: #fff;
          border: 2px solid #1A1A2E; border-radius: 4px;
          padding: 24px 28px;
          display: flex; align-items: flex-start; gap: 18px;
          margin-bottom: 16px; cursor: pointer;
          transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease;
          text-decoration: none; color: inherit;
          position: relative; overflow: hidden;
          animation: fadeInUp 0.5s ease both;
        }
        .channel-card:last-child { margin-bottom: 0; }
        .channel-card:hover { transform: translateX(6px); }
        .channel-icon-wrap {
          width: 48px; height: 48px; border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; border: 2px solid #1A1A2E;
        }
        .channel-num {
          position: absolute; top: 10px; right: 14px;
          font-family: 'Playfair Display', serif;
          font-size: 2.8rem; font-weight: 900; color: #F0EDE8;
          line-height: 1; pointer-events: none; user-select: none;
          letter-spacing: -2px;
        }
        .channel-label {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: #9A9590; margin-bottom: 2px;
        }
        .channel-value {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 700; color: #1A1A2E;
          margin-bottom: 4px; line-height: 1.2;
          word-break: break-all;
        }
        .channel-sub { font-size: 0.8rem; color: #9A9590; line-height: 1.4; }
        .channel-action {
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.06em;
          margin-top: 8px; display: inline-block;
        }

        /* ── STATS ROW ── */
        .stats-strip {
          border: 2px solid #1A1A2E; border-radius: 4px;
          overflow: hidden; display: flex;
          box-shadow: 4px 4px 0 #D1CDC4;
          margin-bottom: 16px;
        }
        .stat-cell {
          flex: 1; padding: 18px 20px; background: #fff;
          border-right: 2px solid #1A1A2E; text-align: center;
        }
        .stat-cell:last-child { border-right: none; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem; font-weight: 900; color: #1A1A2E; line-height: 1;
          display: block; margin-bottom: 2px;
        }
        .stat-label {
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #9A9590;
        }

        /* ── FORM ── */
        .form-card {
          background: #fff; border: 2px solid #1A1A2E;
          border-radius: 4px; padding: 36px 40px;
          box-shadow: 8px 8px 0 #E63946;
          position: relative; overflow: hidden;
          animation: fadeInUp 0.5s 0.15s ease both;
        }
        .form-card::after {
          content: '✉'; position: absolute;
          right: -8px; top: 8px;
          font-size: 6rem; color: rgba(26,26,46,0.04);
          pointer-events: none; user-select: none;
          font-family: serif;
        }
        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem; font-weight: 900; color: #1A1A2E;
          margin: 0 0 6px; letter-spacing: -0.02em;
        }
        .form-sub { font-size: 0.88rem; color: #9A9590; margin: 0 0 28px; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 16px; }
        .form-label {
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase; color: #4B4A56;
        }
        .form-input {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; color: #1A1A2E;
          background: #F7F5F0; border: 2px solid #D1CDC4;
          border-radius: 2px; padding: 12px 14px;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%; box-sizing: border-box;
        }
        .form-input:focus { border-color: #1A1A2E; box-shadow: 3px 3px 0 #E63946; }
        .form-input::placeholder { color: #C8C4C0; }
        .form-select {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; color: #1A1A2E;
          background: #F7F5F0; border: 2px solid #D1CDC4;
          border-radius: 2px; padding: 12px 14px;
          outline: none; transition: border-color 0.2s;
          width: 100%; box-sizing: border-box; cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 7L11 1' stroke='%231A1A2E' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
        }
        .form-select:focus { border-color: #1A1A2E; }
        .form-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; color: #1A1A2E;
          background: #F7F5F0; border: 2px solid #D1CDC4;
          border-radius: 2px; padding: 12px 14px;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%; box-sizing: border-box;
          resize: vertical; min-height: 120px;
        }
        .form-textarea:focus { border-color: #1A1A2E; box-shadow: 3px 3px 0 #E63946; }
        .form-textarea::placeholder { color: #C8C4C0; }
        .char-count { font-size: 0.68rem; color: #C8C4C0; text-align: right; margin-top: 4px; }
        .form-btn {
          width: 100%; padding: 15px 28px;
          background: #1A1A2E; color: #F7F5F0;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem; font-weight: 700;
          letter-spacing: 0.07em; text-transform: uppercase;
          border: 2px solid #1A1A2E; border-radius: 2px;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 10px;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 4px 4px 0 #E63946;
          margin-top: 8px;
        }
        .form-btn:hover:not(:disabled) {
          background: #E63946; border-color: #E63946;
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 #1A1A2E;
        }
        .form-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .form-btn.sent { background: #22C55E; border-color: #22C55E; box-shadow: 4px 4px 0 #1A1A2E; }

        /* ── FAQ ── */
        .faq-card {
          background: #fff; border: 2px solid #1A1A2E;
          border-radius: 4px; padding: 36px 40px;
          box-shadow: 4px 4px 0 #D1CDC4;
          margin-bottom: 40px;
          animation: fadeInUp 0.5s 0.2s ease both;
        }
        .faq-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem; font-weight: 700; color: #1A1A2E;
          margin: 0 0 6px; letter-spacing: -0.02em;
        }
        .faq-sub { font-size: 0.85rem; color: #9A9590; margin: 0 0 24px; }

        /* ── BOTTOM CTA ── */
        .bottom-cta {
          background: #1A1A2E; border: 2px solid #1A1A2E;
          border-radius: 4px; box-shadow: 8px 8px 0 #E63946;
          padding: 56px 48px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 40px; flex-wrap: wrap;
          position: relative; overflow: hidden;
        }
        .bottom-cta::after {
          content: '→'; position: absolute;
          right: 160px; top: 50%; transform: translateY(-50%);
          font-family: 'Playfair Display', serif; font-size: 10rem;
          font-weight: 900; color: rgba(255,255,255,0.03);
          pointer-events: none; user-select: none;
        }
        .cta-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700;
          color: #F7F5F0; margin: 0 0 8px; letter-spacing: -0.02em;
        }
        .cta-sub { font-size: 0.95rem; color: #A8A4A0; line-height: 1.65; max-width: 440px; margin: 0; }
        .cta-actions { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }
        .cta-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #E63946; color: #F7F5F0;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 14px 28px; border-radius: 2px; border: 2px solid #E63946;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 4px 4px 0 #F7F5F0;
        }
        .cta-btn-primary:hover {
          opacity: 0.9; transform: translate(-2px,-2px);
          box-shadow: 6px 6px 0 #F7F5F0;
        }
        .cta-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #F7F5F0;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 14px 28px; border-radius: 2px; border: 2px solid #F7F5F0;
          text-decoration: none;
          transition: background 0.2s, color 0.2s;
        }
        .cta-btn-secondary:hover { background: #F7F5F0; color: #1A1A2E; }

        /* CORNER NUM */
        .contact-corner-num {
          position: absolute; top: 32px; right: 48px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(5rem, 12vw, 10rem); font-weight: 900;
          color: #E2DDD5; line-height: 1;
          user-select: none; pointer-events: none; z-index: 1;
          letter-spacing: -0.04em;
        }

        @media (max-width: 960px) {
          .contact-inner { padding: 60px 24px 60px 40px; }
          .contact-grid { grid-template-columns: 1fr; }
          .form-row { grid-template-columns: 1fr; }
          .bottom-cta { padding: 40px 32px; }
        }
        @media (max-width: 600px) {
          .contact-inner { padding: 48px 16px 48px 28px; }
          .contact-heading { font-size: 2.8rem; }
          .bottom-cta::after { display: none; }
          .stats-strip { flex-wrap: wrap; }
          .stat-cell { flex: 0 0 50%; border-bottom: 2px solid #1A1A2E; }
        }
      `}</style>

      <section className="contact-root" ref={sectionRef} id="contact">
        <div className="contact-accent-bar" />
        <div className="contact-corner-num" aria-hidden="true">03</div>

        <div className="contact-inner">

          {/* ── HEADER ── */}
          <div className="contact-header">
            <div>
              <div className="contact-label">
                <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#22C55E', display: 'inline-block' }} />
                Contact · Eldoret, KE
              </div>
              <h2 className="contact-heading">
                Let's Work<br />
                <span>Together</span>
              </h2>
            </div>
            <p className="contact-subtext">
              Have a project in mind, want to collaborate, or just want to say hello?
              I'm a message away — and I respond fast.
            </p>
          </div>

          <div className="contact-divider">
            <div className="contact-divider-line" />
            <div className="contact-divider-dot" />
            <span className="contact-divider-text">Get In Touch</span>
          </div>

          {/* ── TICKER ── */}
          <div className="ticker-wrap">
            <div className="ticker-track">
              {[...Array(2)].map((_, ri) =>
                ['Open for Freelance', 'Available for Full-Time', 'Based in Eldoret KE', 'Remote-Ready', 'Fast Responder', 'Clean Code Advocate', 'M-Pesa Integration Expert', 'Full-Stack Developer'].map((t, i) => (
                  <span key={`${ri}-${i}`} className="ticker-item">
                    <span className="ticker-dot" />
                    {t}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* ── AVAILABILITY BANNER ── */}
          <div className="avail-banner">
            <div className="avail-pulse" />
            <div>
              <div className="avail-text-primary">Available for New Projects</div>
              <div className="avail-text-sub">Currently accepting freelance & full-time opportunities — response within 24 hrs</div>
            </div>
            <span className="avail-badge">✓ Open to Work</span>
          </div>

          {/* ── STATS STRIP ── */}
          <div className="stats-strip">
            {[
              { label: 'Response Time', val: 24, suffix: 'h' },
              { label: 'Projects Delivered', val: 5, suffix: '+' },
              { label: 'Happy Clients', val: 10, suffix: '+' },
              { label: 'Years Experience', val: 3, suffix: '+' },
            ].map((s, i) => (
              <div className="stat-cell" key={i}>
                <span className="stat-num" style={{ color: i === 0 ? '#E63946' : '#1A1A2E' }}>
                  <Counter target={s.val} suffix={s.suffix} />
                </span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          {/* ── MAIN GRID ── */}
          <div className="contact-grid" style={{ marginTop: 48 }}>

            {/* LEFT: Channels + FAQ */}
            <div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9590', marginBottom: 16 }}>
                  Reach Me On
                </div>
                {contactChannels.map((ch, i) => (
                  <a
                    key={i}
                    href={ch.link}
                    target={ch.link?.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="channel-card"
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      boxShadow: hoveredCard === i ? `4px 4px 0 ${ch.accent}` : '3px 3px 0 #D1CDC4',
                      animationDelay: `${i * 0.07}s`,
                    }}
                  >
                    <div className="channel-num">{ch.num}</div>
                    <div
                      className="channel-icon-wrap"
                      style={{ background: ch.accent + '18', borderColor: ch.accent + '55', color: ch.accent }}
                    >
                      {ch.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="channel-label">{ch.label}</div>
                      <div className="channel-value">{ch.value}</div>
                      <div className="channel-sub">{ch.sub}</div>
                      <span className="channel-action" style={{ color: ch.accent }}>{ch.action}</span>
                    </div>
                    <div style={{ alignSelf: 'flex-start', paddingTop: 2 }}>
                      <CopyBtn text={ch.value} />
                    </div>
                  </a>
                ))}
              </div>

              {/* ── LOCATION CARD ── */}
              <div style={{
                background: '#1A1A2E', borderRadius: 4,
                border: '2px solid #1A1A2E', padding: '24px 28px',
                boxShadow: '4px 4px 0 #D97706',
                display: 'flex', gap: 16, alignItems: 'flex-start',
                marginTop: 16,
              }}>
                <div style={{
                  width: 44, height: 44, background: '#D97706',
                  borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#F7F5F0" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9590', marginBottom: 4 }}>Location</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, color: '#F7F5F0', marginBottom: 4 }}>Eldoret, Kenya</div>
                  <div style={{ fontSize: '0.8rem', color: '#A8A4A0', lineHeight: 1.5 }}>EAT (UTC+3) · Remote-first · Open to relocation</div>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div>
              <div className="form-card">
                <h3 className="form-title">Send a Message</h3>
                <p className="form-sub">Fill in the form — your mail client will open with everything pre-filled.</p>

                <div className="form-row">
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Your Name *</label>
                    <input
                      className="form-input"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField('name')}
                      onBlur={() => setActiveField(null)}
                      placeholder="Brian Mwalish"
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Your Email *</label>
                    <input
                      className="form-input"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField('email')}
                      onBlur={() => setActiveField(null)}
                      placeholder="you@email.com"
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Type</label>
                  <select
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="">Select a category…</option>
                    {projectTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-textarea"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField('message')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Hi Brian, I'd like to discuss a project…"
                    maxLength={600}
                  />
                  <div className="char-count">{formData.message.length} / 600</div>
                </div>

                <button
                  className={`form-btn${formState === 'sent' ? ' sent' : ''}`}
                  onClick={handleSubmit}
                  disabled={formState === 'sending' || !formData.name || !formData.email || !formData.message}
                >
                  {formState === 'sending' ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'spin 1s linear infinite' }}>
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
                      </svg>
                      Opening Mail Client…
                    </>
                  ) : formState === 'sent' ? (
                    <>
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      Mail Client Opened!
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </>
                  )}
                </button>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>

              {/* ── FAQ ── */}
              <div className="faq-card">
                <h3 className="faq-title">Common Questions</h3>
                <p className="faq-sub">Quick answers before we talk.</p>
                {faqs.map((item, i) => (
                  <FaqItem key={i} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* ── BOTTOM CTA ── */}
          <div className="bottom-cta">
            <div>
              <h3 className="cta-heading">Ready to Start?</h3>
              <p className="cta-sub">Every great project starts with a conversation. Let's build something that makes an impact.</p>
            </div>
            <div className="cta-actions">
              <a href="mailto:brianmwalish@gmail.com" className="cta-btn-primary">
                Email Me
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <a href="/Brian%20Mwalish%20Cv.pdf" download="BRIAN CV.pdf" className="cta-btn-secondary">
                Download CV ↓
              </a>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Contact;