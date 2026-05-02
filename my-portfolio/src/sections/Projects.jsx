import React, { useRef, useState, useEffect, useCallback } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    title: 'Peepal MTC',
    description: 'A comprehensive college management platform for Peepal Management & Technology College. Features student enrollment, course management, academic records, fee tracking, and an institutional portal for staff, students, and administration.',
    longDesc: 'Built as a full institutional web platform for Peepal Management & Technology College (peepalmtc.ac.ke). The system handles the complete student lifecycle — from enrollment and course registration through academic progress tracking and fee management. A FastAPI backend powers a robust REST layer over a SQL database, while the TypeScript-React frontend delivers a responsive, role-aware portal for students, lecturers, and administrators.',
    tech: ['TypeScript', 'React', 'FastAPI', 'SQL', 'Tailwind CSS'],
    live: 'https://peepalmtc.ac.ke/',
    github: 'https://github.com/Brian2021-Mwalish',
    category: 'Full-Stack',
    num: '00',
    accent: '#E63946',
    year: '2026',
    status: 'live',
    features: ['Student Enrollment', 'Course Management', 'Academic Records', 'Fee Tracking', 'Admin Portal', 'Staff Dashboard'],
    metrics: [{ label: 'User Roles', val: 4 }, { label: 'Modules', val: 12 }, { label: 'Uptime %', val: 99 }],
  },
  {
    title: 'Liquidity-Funding',
    description: 'A modern investment platform enabling seamless funding and investment management. Features include real-time dashboards, M-Pesa integration, context-aware tracking, and a referral rewards system for enhanced user engagement.',
    longDesc: 'Built from scratch as a solo full-stack effort, Liquidity-Funding tackles the real challenge of digitising community-based investment (chama) management in Kenya. The M-Pesa STK push integration allows instant mobile payments, while the referral engine drives organic growth. The admin dashboard surfaces real-time fund flows, member contributions, and ROI metrics at a glance.',
    tech: ['React', 'Django', 'Vite', 'JavaScript', 'Tailwind CSS'],
    live: 'https://liquiinvestke.co.ke',
    github: 'https://github.com/Brian2021-Mwalish/Digital-Liquidity-Fund-Platform-.git',
    category: 'Full-Stack',
    num: '01',
    accent: '#E63946',
    year: '2025',
    status: 'live',
    features: ['M-Pesa Payment Integration', 'Real-Time Dashboard', 'Investment Tracking', 'Referral Program', 'Modern UI'],
    metrics: [{ label: 'Components', val: 40 }, { label: 'API Endpoints', val: 28 }, { label: 'Uptime %', val: 99 }],
  },
  {
    title: 'Home-mAP Hub',
    description: 'A modern house leasing platform connecting tenants, landlords, and agents. Property discovery through interactive maps, online bookings, secure payments, messaging, and reviews for efficient rental management.',
    longDesc: 'Home-Map Hub replaces static listing pages with a live Leaflet.js map experience. Landlords pin their properties; tenants browse, filter, and book directly. Role-based dashboards mean landlords manage leases while agents track commissions — all in one cohesive Django REST-backed system.',
    tech: ['TypeScript', 'React', 'Leaflet.js', 'Django REST', 'Tailwind CSS'],
    live: 'https://home-leasing.vercel.app/',
    github: 'https://github.com/Brian2021-Mwalish/HomeLeasing.git',
    category: 'Full-Stack',
    num: '02',
    accent: '#2563EB',
    year: '2026',
    status: 'live',
    features: ['Map-Based Search', 'Property Listings', 'Online Booking', 'Secure Payments', 'In-App Messaging', 'Reviews & Ratings'],
    metrics: [{ label: 'Map Layers', val: 6 }, { label: 'User Roles', val: 3 }, { label: 'Cities', val: 12 }],
  },
  {
    title: 'Prime Trades',
    description: 'Advanced administrative control panel for managing customer loyalty tiers, comprehensive engagement analytics, and automated loyalty action triggers with manual override capabilities.',
    longDesc: 'Prime Trades provides traders and administrators with a single pane of glass for loyalty-tier management. Automated rules fire rewards when thresholds are hit; Chart.js visualisations surface engagement trends; and a Redux-backed override panel lets admins intervene in real time without redeploying.',
    tech: ['TypeScript', 'Django', 'Chart.js', 'Redux'],
    live: 'https://www.primetrades.app',
    github: 'https://github.com/Brian2021-Mwalish/Prime-Trade.git',
    category: 'Dashboard',
    num: '03',
    accent: '#16A34A',
    year: '2025',
    status: 'live',
    features: ['Analytics Dashboard', 'Tier Management', 'Auto Actions', 'Data Visualization'],
    metrics: [{ label: 'Chart Types', val: 8 }, { label: 'Triggers', val: 15 }, { label: 'Tiers', val: 5 }],
  },
  {
    title: 'Smart Reservation System',
    description: 'A powerful platform to optimize restaurant operations with intelligent table reservation, automated workflows, and real-time monitoring. Smart booking algorithms and dynamic staff dashboards.',
    longDesc: 'Designed for busy restaurants that lose revenue to no-shows and double-bookings. The smart algorithm scores reservation requests by probability of honouring and auto-assigns optimal tables. Staff see live floor-plan status; customers receive SMS confirmations; loyalty points accumulate automatically.',
    tech: ['React', 'Django', 'PostgreSQL', 'Tailwind CSS'],
    live: 'https://restaurant-app-demo.vercel.app',
    github: 'https://github.com/Brian2021-Mwalish/Reservation-System.git',
    category: 'Full-Stack',
    num: '04',
    accent: '#D97706',
    year: '2025',
    status: 'live',
    features: ['Smart Real-Time Updates', 'Admin Dashboard', 'Customer Loyalty', 'Fully Responsive'],
    metrics: [{ label: 'Tables Managed', val: 50 }, { label: 'Avg Booking ms', val: 320 }, { label: 'SMS Success %', val: 98 }],
  },
  {
    title: 'Loyalty Dashboard',
    description: 'Advanced administrative control panel for managing customer loyalty tiers, comprehensive engagement analytics visualization, and automated loyalty action triggers with manual override.',
    longDesc: 'A standalone loyalty engine that can be white-labelled into any e-commerce or SaaS product. Tier thresholds, point multipliers, and reward catalogues are all configurable without code. The Chart.js-powered analytics board shows cohort retention and redemption rates at a weekly cadence.',
    tech: ['React', 'Django REST', 'Chart.js', 'Redux'],
    live: '',
    github: 'https://github.com/Brian2021-Mwalish/loyalty-dashboard',
    category: 'Dashboard',
    num: '05',
    accent: '#E63946',
    year: '2023',
    status: 'dev',
    features: ['Analytics Dashboard', 'Tier Management', 'Auto Actions', 'Data Visualization'],
    metrics: [{ label: 'Widgets', val: 12 }, { label: 'Reward Types', val: 7 }, { label: 'Reports', val: 9 }],
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

const techUsage = [
  { name: 'React',       count: 4 },
  { name: 'Django',      count: 4 },
  { name: 'TypeScript',  count: 3 },
  { name: 'Tailwind CSS',count: 3 },
  { name: 'PostgreSQL',  count: 2 },
  { name: 'Chart.js',    count: 2 },
  { name: 'Redux',       count: 2 },
  { name: 'FastAPI',     count: 1 },
];

const CATEGORIES = ['All', 'Full-Stack', 'Dashboard'];

// ─── STATUS DOT ──────────────────────────────────────────────────────────────

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

// ─── TERM LINE ───────────────────────────────────────────────────────────────

const TermLine = ({ prompt = '$', dimPrompt, children }) => (
  <div style={{ display: 'flex', gap: 8, fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', lineHeight: 1.65 }}>
    <span style={{ color: dimPrompt ? '#374151' : '#22C55E', flexShrink: 0 }}>{prompt}</span>
    <span style={{ color: '#9CA3AF' }}>{children}</span>
  </div>
);

// ─── WIN BAR ─────────────────────────────────────────────────────────────────

const WinBar = ({ label }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '7px 12px', borderBottom: '1px solid rgba(255,255,255,0.04)',
  }}>
    {[{ bg: '#FF5F57' }, { bg: '#FEBC2E' }, { bg: '#28C840' }].map((d, i) => (
      <span key={i} style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: d.bg }} />
    ))}
    <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.58rem', color: '#6B7280', marginLeft: 5 }}>{label}</span>
  </div>
);

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────

const Counter = ({ target, suffix = '' }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setVal(target); clearInterval(timer); }
          else setVal(start);
        }, 30);
      }
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
};

// ─── COPY LINK BUTTON ────────────────────────────────────────────────────────

const CopyLinkBtn = ({ url }) => {
  const [state, setState] = useState('idle');

  const handleCopy = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setState('copied');
      setTimeout(() => setState('idle'), 1800);
    }).catch(() => {
      setState('error');
      setTimeout(() => setState('idle'), 1800);
    });
  }, [url]);

  return (
    <button
      onClick={handleCopy}
      title="Copy link"
      style={{
        fontFamily: "'Fira Code', monospace",
        fontSize: '0.62rem',
        background: state === 'copied' ? 'rgba(34,197,94,0.15)' : state === 'error' ? 'rgba(230,57,70,0.15)' : 'transparent',
        border: `1px solid ${state === 'copied' ? 'rgba(34,197,94,0.4)' : state === 'error' ? 'rgba(230,57,70,0.4)' : 'rgba(107,114,128,0.2)'}`,
        borderRadius: 2,
        padding: '9px 10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        color: state === 'copied' ? '#22C55E' : state === 'error' ? '#E63946' : '#6B7280',
        transition: 'all 0.2s',
        flexShrink: 0,
        letterSpacing: '0.06em',
      }}
    >
      {state === 'copied' ? '✓ copied' : state === 'error' ? '✕ fail' : '⧉ link'}
    </button>
  );
};

// ─── DETAIL DRAWER ───────────────────────────────────────────────────────────

const DetailDrawer = ({ project, onClose }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const maxMetric = Math.max(...project.metrics.map(m => m.val));

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(13,17,23,0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        animation: 'fadeInOverlay 0.25s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#161B22',
          borderTop: `3px solid ${project.accent}`,
          border: `1px solid rgba(230,57,70,0.2)`,
          borderTop: `3px solid ${project.accent}`,
          borderRadius: '6px 6px 0 0',
          width: '100%',
          maxWidth: 760,
          maxHeight: '80vh',
          overflowY: 'auto',
          position: 'relative',
          animation: 'slideUp 0.35s cubic-bezier(.22,1,.36,1)',
          fontFamily: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <WinBar label={`${project.title.toLowerCase().replace(/\s/g, '_')}.md`} />

        <div style={{ padding: '32px 44px 44px' }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 44, right: 44,
              background: '#E63946', color: '#fff',
              border: 'none', borderRadius: 2,
              width: 28, height: 28,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', fontSize: 16, lineHeight: 1,
              fontFamily: "'Fira Code', monospace",
            }}
          >×</button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <div style={{ width: 4, height: 28, background: project.accent, borderRadius: 2 }} />
            <span style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.12em',
              color: '#E63946', padding: '3px 8px', borderRadius: 2,
              border: '1px solid rgba(230,57,70,0.3)', background: 'rgba(230,57,70,0.08)',
              textTransform: 'uppercase',
            }}>{project.category}</span>
            <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.6rem', color: '#6B7280' }}>{project.year}</span>
          </div>

          <h2 style={{
            fontFamily: "'DM Serif Display', Georgia, serif",
            fontSize: '2rem', fontWeight: 400,
            color: '#E6EDF3', margin: '0 0 14px',
            letterSpacing: '-0.02em',
          }}>{project.title}</h2>

          <p style={{ color: '#8B949E', fontSize: '0.88rem', lineHeight: 1.8, margin: '0 0 28px' }}>
            {project.longDesc}
          </p>

          {/* Metrics */}
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E63946', marginBottom: 12 }}>// project metrics</p>
          <div style={{ marginBottom: 24 }}>
            {project.metrics.map((m, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.7rem', color: '#8B949E' }}>{m.label}</span>
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.7rem', color: '#E6EDF3', fontWeight: 500 }}>{m.val}</span>
                </div>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.round((m.val / maxMetric) * 100)}%`,
                    background: project.accent,
                    borderRadius: 2,
                    transition: 'width 0.8s cubic-bezier(.22,1,.36,1)',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E63946', marginBottom: 12 }}>// key features</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
            {project.features.map((f, i) => (
              <span key={i} style={{
                fontFamily: "'Fira Code', monospace", fontSize: '0.68rem', color: '#22C55E',
                padding: '4px 12px', borderRadius: 2,
                border: '1px solid rgba(34,197,94,0.25)', background: 'rgba(34,197,94,0.08)',
              }}>{f}</span>
            ))}
          </div>

          {/* Tech */}
          <p style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.58rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E63946', marginBottom: 12 }}>// tech stack</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 28 }}>
            {project.tech.map((t, i) => (
              <span key={i} style={{
                fontFamily: "'Fira Code', monospace", fontSize: '0.68rem', color: '#6B7280',
                padding: '4px 12px', borderRadius: 2,
                border: '1px solid rgba(107,114,128,0.2)', background: 'rgba(107,114,128,0.06)',
              }}>{t}</span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {project.live && (
              <a
                href={project.live} target="_blank" rel="noopener noreferrer"
                style={{
                  fontFamily: "'Syne', sans-serif", fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  background: '#E63946', color: '#fff',
                  padding: '11px 24px', borderRadius: 3,
                  border: '1.5px solid #E63946', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  transition: 'background 0.18s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#C62833'}
                onMouseLeave={e => e.currentTarget.style.background = '#E63946'}
              >View Live ↗</a>
            )}
            <a
              href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Syne', sans-serif", fontSize: '0.72rem', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                background: 'transparent', color: '#8B949E',
                padding: '11px 24px', borderRadius: 3,
                border: '1.5px solid rgba(139,148,158,0.22)', textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 7,
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#E63946'; e.currentTarget.style.color = '#E63946'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(139,148,158,0.22)'; e.currentTarget.style.color = '#8B949E'; }}
            >GitHub →</a>
            {project.live && <CopyLinkBtn url={project.live} />}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Projects = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const techRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openProject, setOpenProject] = useState(null);
  const [techBarReady, setTechBarReady] = useState(false);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTechBarReady(true);
    }, { threshold: 0.3 });
    if (techRef.current) observer.observe(techRef.current);
    return () => observer.disconnect();
  }, []);

  const maxTech = Math.max(...techUsage.map(t => t.count));

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
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(60px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        *, *::before, *::after { box-sizing: border-box; }

        .pr-root {
          font-family: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
          background-color: #0D1117;
          min-height: 100dvh;
          color: #E6EDF3;
          position: relative;
          overflow: hidden;
        }
        .pr-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(230,57,70,0.07) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: heroGrid 6s linear infinite;
          pointer-events: none;
          z-index: 0;
        }
        .pr-root::after {
          content: '';
          position: absolute; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(34,197,94,0.05) 50%, transparent 100%);
          animation: heroScan 9s linear infinite;
          pointer-events: none;
          z-index: 1;
        }

        .pr-glow-r { position: absolute; top: -140px; left: -100px; width: 550px; height: 550px; border-radius: 50%; background: radial-gradient(circle, rgba(230,57,70,0.07) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .pr-glow-b { position: absolute; bottom: -100px; right: -60px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(26,26,46,0.55) 0%, transparent 70%); pointer-events: none; z-index: 0; }

        .pr-shell {
          position: relative; z-index: 10;
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          min-height: 100dvh;
        }

        /* TOP BAR */
        .pr-bar {
          display: flex; align-items: center;
          justify-content: space-between;
          padding: 18px 0 14px;
          border-bottom: 1px solid rgba(230,57,70,0.14);
          gap: 12px; flex-wrap: wrap;
        }
        .pr-logo { font-family: 'DM Serif Display', serif; font-size: 1.05rem; color: #E6EDF3; white-space: nowrap; }
        .pr-logo span { color: #E63946; }
        .pr-nav { display: flex; gap: 6px; flex-wrap: wrap; }
        .pr-chip {
          font-family: 'Fira Code', monospace;
          font-size: 0.62rem; color: #6B7280;
          padding: 3px 8px; border: 1px solid rgba(107,114,128,0.18);
          border-radius: 2px; letter-spacing: 0.06em;
          white-space: nowrap; text-decoration: none; cursor: pointer;
          transition: border-color 0.18s, color 0.18s;
          background: transparent;
        }
        .pr-chip:hover { border-color: rgba(230,57,70,0.4); color: #E63946; }
        .pr-chip.active { border-color: rgba(230,57,70,0.4); color: #E63946; }
        .pr-status { display: flex; align-items: center; gap: 7px; white-space: nowrap; }
        .pr-status span { font-family: 'Fira Code', monospace; font-size: 0.62rem; color: #22C55E; }

        /* INNER */
        .pr-inner { flex: 1; padding: 44px 0 60px; }

        /* SECTION LABEL */
        .pr-sec {
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #E63946; margin-bottom: 9px;
        }

        /* HEADER */
        .pr-header-row {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 32px;
          flex-wrap: wrap; margin-bottom: 36px;
        }
        .pr-heading {
          font-family: 'DM Serif Display', Georgia, serif;
          font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 400;
          color: #E6EDF3; line-height: 0.92;
          letter-spacing: -0.03em; margin: 0 0 0;
        }
        .pr-heading em { color: #E63946; font-style: italic; }
        .pr-section-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'Fira Code', monospace;
          font-size: 0.58rem; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #E63946; margin-bottom: 12px;
        }
        .pr-subtext {
          font-size: 0.88rem; color: #8B949E;
          line-height: 1.82; max-width: 440px;
          align-self: flex-end; margin: 0;
        }

        /* STATS */
        .pr-stats {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; border: 1px solid rgba(230,57,70,0.14);
          border-radius: 4px; overflow: hidden;
          background-color: rgba(230,57,70,0.07);
          margin-bottom: 36px;
        }
        .pr-stat { background-color: #0D1117; padding: 18px 10px; text-align: center; }
        .pr-stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.5rem, 2.5vw, 2rem); color: #E6EDF3;
          display: block; line-height: 1;
        }
        .pr-stat-val.accent { color: #E63946; }
        .pr-stat-lbl {
          font-family: 'Fira Code', monospace; font-size: 0.52rem;
          color: #6B7280; letter-spacing: 0.1em; text-transform: uppercase;
          display: block; margin-top: 5px;
        }

        /* FILTER */
        .pr-filter-row { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 32px; }
        .pr-filter-btn {
          font-family: 'Fira Code', monospace; font-size: 0.62rem; color: #6B7280;
          padding: 5px 12px; border: 1px solid rgba(107,114,128,0.2); border-radius: 2px;
          letter-spacing: 0.06em; cursor: pointer; transition: all .18s; background: transparent;
        }
        .pr-filter-btn:hover { border-color: rgba(230,57,70,0.4); color: #E63946; }
        .pr-filter-btn.active { border-color: #E63946; color: #E63946; background: rgba(230,57,70,0.08); }
        .pr-filter-count {
          display: inline-flex; align-items: center; justify-content: center;
          background: #E63946; color: #fff;
          width: 16px; height: 16px; border-radius: 50%;
          font-size: 0.55rem; font-weight: 800; margin-left: 5px; vertical-align: middle;
        }

        /* COLLAB */
        .pr-collab {
          border: 1px solid rgba(230,57,70,0.18); border-radius: 6px;
          background-color: #161B22; overflow: hidden; margin-bottom: 40px;
          position: relative;
        }
        .pr-collab::before {
          content: 'COLLAB'; position: absolute; right: -12px; top: 38px;
          font-family: 'DM Serif Display', serif; font-size: 6rem; font-weight: 400;
          color: rgba(230,57,70,0.04); letter-spacing: -2px;
          pointer-events: none; user-select: none;
        }
        .pr-collab-body { padding: 24px 28px 28px; }
        .pr-collab-title { font-family: 'DM Serif Display', serif; font-size: 1.35rem; color: #E6EDF3; margin: 0 0 8px; }
        .pr-collab-sub { font-size: 0.85rem; color: #8B949E; line-height: 1.75; margin: 0 0 20px; }
        .pr-collab-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 8px 16px; }
        .pr-collab-item { display: flex; align-items: flex-start; gap: 8px; font-family: 'Fira Code', monospace; font-size: 0.68rem; color: #6B7280; line-height: 1.5; }
        .pr-collab-arrow { color: #E63946; flex-shrink: 0; margin-top: 1px; }

        /* GRID */
        .pr-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 48px; }

        /* CARD */
        .pr-card {
          background-color: #161B22;
          border: 1px solid rgba(230,57,70,0.15);
          border-radius: 6px; padding: 28px;
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease, border-color .2s;
          cursor: pointer;
          animation: fadeInCard 0.5s ease both;
        }
        .pr-card:hover { transform: translateY(-5px); border-color: rgba(230,57,70,0.35); }
        .pr-card-num {
          position: absolute; top: 10px; right: 14px;
          font-family: 'DM Serif Display', serif; font-size: 4rem; font-weight: 400;
          color: rgba(230,57,70,0.06); line-height: 1; letter-spacing: -3px;
          pointer-events: none; user-select: none;
        }
        .pr-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; gap: 8px; }
        .pr-card-top-left { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .pr-card-cat {
          font-family: 'Fira Code', monospace; font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #E63946; padding: 3px 8px; border-radius: 2px;
          border: 1px solid rgba(230,57,70,0.3); background: rgba(230,57,70,0.08);
        }
        .pr-card-year { font-family: 'Fira Code', monospace; font-size: 0.6rem; color: #6B7280; }
        .pr-card-status { display: flex; align-items: center; gap: 5px; font-family: 'Fira Code', monospace; font-size: 0.6rem; color: #6B7280; }
        .pr-card-status-dot { width: 6px; height: 6px; border-radius: 50%; }
        .pr-card-accent { height: 2px; border-radius: 2px; margin-bottom: 14px; width: 32px; }
        .pr-card-title { font-family: 'DM Serif Display', serif; font-size: 1.35rem; color: #E6EDF3; margin: 0 0 10px; line-height: 1.15; letter-spacing: -0.02em; }
        .pr-card-desc { font-size: 0.82rem; color: #8B949E; line-height: 1.7; margin: 0 0 16px; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .pr-card-features { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 10px; margin-bottom: 16px; }
        .pr-feat-item { display: flex; align-items: flex-start; gap: 5px; font-family: 'Fira Code', monospace; font-size: 0.62rem; color: #6B7280; line-height: 1.4; }
        .pr-feat-dot { width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        .pr-card-tech-row { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .pr-tech-pill { font-family: 'Fira Code', monospace; font-size: 0.6rem; color: #6B7280; padding: 2px 8px; border-radius: 2px; border: 1px solid rgba(107,114,128,0.2); background: rgba(107,114,128,0.06); }

        /* CARD BUTTONS */
        .pr-card-btns { display: flex; gap: 7px; margin-top: auto; }
        .pr-btn-live {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          font-family: 'Syne', sans-serif; font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          background-color: #E63946; color: #fff;
          padding: 9px 12px; border-radius: 3px;
          border: 1.5px solid #E63946; cursor: pointer;
          transition: background .18s, transform .15s; text-decoration: none;
        }
        .pr-btn-live:hover { background: #C62833; transform: translateY(-1px); }
        .pr-btn-gh {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          font-family: 'Syne', sans-serif; font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: transparent; color: #8B949E;
          padding: 9px 12px; border-radius: 3px;
          border: 1.5px solid rgba(139,148,158,0.22); cursor: pointer;
          transition: all .18s; text-decoration: none;
        }
        .pr-btn-gh:hover { border-color: #E63946; color: #E63946; transform: translateY(-1px); }
        .pr-btn-detail {
          display: inline-flex; align-items: center; justify-content: center;
          font-family: 'Fira Code', monospace; font-size: 0.6rem; color: #6B7280;
          background: transparent; border: 1px solid rgba(107,114,128,0.2); border-radius: 2px;
          padding: 9px 10px; cursor: pointer; transition: all .18s; white-space: nowrap;
        }
        .pr-btn-detail:hover { border-color: rgba(230,57,70,0.4); color: #E63946; }

        /* TECH SECTION */
        .pr-tech-section {
          border: 1px solid rgba(230,57,70,0.13); border-radius: 6px;
          background-color: #161B22; overflow: hidden; margin-bottom: 40px;
        }
        .pr-tech-body { padding: 24px 28px 28px; }
        .pr-tech-title { font-family: 'DM Serif Display', serif; font-size: 1.2rem; color: #E6EDF3; margin: 0 0 4px; }
        .pr-tech-sub { font-family: 'Fira Code', monospace; font-size: 0.6rem; color: #6B7280; margin: 0 0 20px; letter-spacing: 0.04em; }
        .pr-bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
        .pr-bar-label { font-family: 'Fira Code', monospace; font-size: 0.7rem; color: #8B949E; width: 100px; flex-shrink: 0; }
        .pr-bar-track { flex: 1; height: 8px; background: rgba(255,255,255,0.05); border-radius: 2px; overflow: hidden; }
        .pr-bar-fill { height: 100%; border-radius: 2px; transition: width 0.9s cubic-bezier(.22,1,.36,1); }
        .pr-bar-count { font-family: 'Fira Code', monospace; font-size: 0.65rem; color: #6B7280; width: 24px; text-align: right; flex-shrink: 0; }

        /* CTA */
        .pr-cta {
          border: 1px solid rgba(230,57,70,0.2); border-radius: 6px;
          background-color: #161B22; overflow: hidden;
          position: relative;
        }
        .pr-cta::before {
          content: '';position: absolute; top: -100px; right: -100px;
          width: 300px; height: 300px; border-radius: 50%;
          background: radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .pr-cta-body {
          padding: 36px 44px;
          display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap;
        }
        .pr-cta-heading { font-family: 'DM Serif Display', serif; font-size: clamp(1.4rem, 2.5vw, 2rem); color: #E6EDF3; margin: 0 0 8px; letter-spacing: -0.02em; }
        .pr-cta-sub { font-family: 'Fira Code', monospace; font-size: 0.68rem; color: '#6B7280'; line-height: 1.75; max-width: 400px; margin: 0; color: #6B7280; }
        .pr-cta-btns { display: flex; gap: 9px; flex-wrap: wrap; }
        .pr-btn-p {
          font-family: 'Syne', sans-serif; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          background-color: #E63946; color: #fff;
          padding: 11px 20px; border-radius: 3px; border: 1.5px solid #E63946;
          text-decoration: none; display: inline-flex; align-items: center; gap: 7px;
          transition: background-color .18s, transform .15s; cursor: pointer; white-space: nowrap;
        }
        .pr-btn-p:hover { background-color: #C62833; transform: translateY(-1px); }
        .pr-btn-o {
          font-family: 'Syne', sans-serif; font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          background-color: transparent; color: #8B949E;
          padding: 11px 20px; border-radius: 3px; border: 1.5px solid rgba(139,148,158,0.22);
          text-decoration: none; display: inline-flex; align-items: center; gap: 7px;
          transition: border-color .18s, color .18s, transform .15s; cursor: pointer; white-space: nowrap;
        }
        .pr-btn-o:hover { border-color: #E63946; color: #E63946; transform: translateY(-1px); }

        /* FOOTER */
        .pr-foot {
          border-top: 1px solid rgba(230,57,70,0.09);
          padding: 11px 0 15px;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;
        }
        .pr-foot-txt { font-family: 'Fira Code', monospace; font-size: 0.58rem; color: #374151; }

        /* WIN BAR shared */
        .pr-winbar { display: flex; align-items: center; gap: 5px; padding: 7px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); background-color: #161B22; }
        .pr-wdot { width: 9px; height: 9px; border-radius: 50%; }
        .pr-wlabel { font-family: 'Fira Code', monospace; font-size: 0.58rem; color: #6B7280; margin-left: 5px; }

        /* EMPTY */
        .pr-empty { text-align: center; padding: 60px 40px; color: #6B7280; grid-column: 1 / -1; font-family: 'Fira Code', monospace; font-size: 0.78rem; }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .pr-grid { grid-template-columns: repeat(2, 1fr); }
          .pr-stats { grid-template-columns: repeat(2, 1fr); }
          .pr-cta-body { flex-direction: column; }
        }
        @media (max-width: 640px) {
          .pr-shell { padding: 0 16px; }
          .pr-nav { display: none; }
          .pr-heading { font-size: clamp(2.2rem, 12vw, 2.8rem); }
          .pr-grid { grid-template-columns: 1fr; }
          .pr-stats { grid-template-columns: repeat(2, 1fr); }
          .pr-cta-body { padding: 28px 20px; }
          .pr-card-features { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="pr-root" ref={sectionRef} id="projects">
        <div className="pr-glow-r" aria-hidden="true" />
        <div className="pr-glow-b" aria-hidden="true" />

        <div className="pr-shell">

          {/* ── TOP BAR ── */}
          <header className="pr-bar">
            <div className="pr-logo">Brian<span>.</span>dev</div>

            <div className="pr-status">
              <StatusDot />
              <span>{projects.length}_projects_indexed</span>
            </div>
          </header>

          <div className="pr-inner">

            {/* ── HEADER ── */}
            <div className="pr-header-row">
              <div>
                <div className="pr-section-tag">
                  <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#22C55E', display: 'inline-block' }} />
                  Portfolio · {projects.length} Projects
                </div>
                <h2 className="pr-heading">
                  Featured<br />
                  <em>Projects</em>
                </h2>
              </div>
              <p className="pr-subtext">
                {'>'} Full-stack solutions built with modern technologies — from investment platforms to institutional portals and smart booking systems.
              </p>
            </div>

            {/* ── STATS ── */}
            <p className="pr-sec">// engineering metrics</p>
            <div className="pr-stats">
              {[
                { val: projects.length,                                           suffix: '',  label: 'Total Projects',    accent: true  },
                { val: projects.filter(p => p.status === 'live').length,          suffix: '',  label: 'Live & Deployed',   accent: false },
                { val: new Set(projects.flatMap(p => p.tech)).size,               suffix: '+', label: 'Technologies Used', accent: false },
                { val: 3,                                                          suffix: '+', label: 'Years Experience',  accent: false },
              ].map((s, i) => (
                <div key={i} className="pr-stat">
                  <span className={`pr-stat-val${s.accent ? ' accent' : ''}`}>
                    <Counter target={s.val} suffix={s.suffix} />
                  </span>
                  <span className="pr-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>

            {/* ── FILTER ── */}
            <div className="pr-filter-row">
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.58rem', color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase' }}>filter:</span>
              {CATEGORIES.map(cat => {
                const count = cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    className={`pr-filter-btn${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                    <span className="pr-filter-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* ── COLLAB ── */}
            <div className="pr-collab">
              <div className="pr-winbar">
                <span className="pr-wdot" style={{ backgroundColor: '#FF5F57' }} />
                <span className="pr-wdot" style={{ backgroundColor: '#FEBC2E' }} />
                <span className="pr-wdot" style={{ backgroundColor: '#28C840' }} />
                <span className="pr-wlabel">collaborative_experience.md</span>
              </div>
              <div className="pr-collab-body">
                <div style={{ marginBottom: 14 }}>
                  <TermLine prompt="$">git log --oneline --team --author="Brian"</TermLine>
                </div>
                <h3 className="pr-collab-title">Collaborative Development Experience</h3>
                <p className="pr-collab-sub">
                  Worked with multiple engineers across business, booking, institutional, and SME domains.
                </p>
                <div className="pr-collab-grid">
                  {collabItems.map((item, i) => (
                    <div key={i} className="pr-collab-item">
                      <span className="pr-collab-arrow">▸</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── GRID ── */}
            <p className="pr-sec">// recent work</p>
            <div className="pr-grid">
              {filtered.length === 0 ? (
                <div className="pr-empty">// no projects match filter</div>
              ) : filtered.map((project, index) => (
                <div
                  key={project.num}
                  className="pr-card"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    boxShadow: hoveredIndex === index ? `0 8px 32px rgba(230,57,70,0.15)` : 'none',
                    animationDelay: `${index * 0.08}s`,
                  }}
                >
                  <div className="pr-card-num">{project.num}</div>

                  <div className="pr-card-top">
                    <div className="pr-card-top-left">
                      <span className="pr-card-cat">{project.category}</span>
                      <span className="pr-card-year">{project.year}</span>
                    </div>
                    <div className="pr-card-status">
                      <span className="pr-card-status-dot" style={{ backgroundColor: project.status === 'live' ? '#22C55E' : '#D97706' }} />
                      {project.status === 'live' ? 'live' : 'in_dev'}
                    </div>
                  </div>

                  <div className="pr-card-accent" style={{ backgroundColor: project.accent }} />
                  <h3 className="pr-card-title">{project.title}</h3>
                  <p className="pr-card-desc">{project.description}</p>

                  <div className="pr-card-features">
                    {project.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="pr-feat-item">
                        <div className="pr-feat-dot" style={{ backgroundColor: project.accent }} />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="pr-card-tech-row">
                    {project.tech.map((t, i) => (
                      <span key={i} className="pr-tech-pill">{t}</span>
                    ))}
                  </div>

                  <div className="pr-card-btns">
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="pr-btn-live">
                        Live ↗
                      </a>
                    )}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="pr-btn-gh">
                      GitHub
                    </a>
                    <button className="pr-btn-detail" onClick={() => setOpenProject(project)}>
                      Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ── TECH STACK ── */}
            <p className="pr-sec">// stack frequency</p>
            <div className="pr-tech-section" ref={techRef}>
              <div className="pr-winbar">
                <span className="pr-wdot" style={{ backgroundColor: '#FF5F57' }} />
                <span className="pr-wdot" style={{ backgroundColor: '#FEBC2E' }} />
                <span className="pr-wdot" style={{ backgroundColor: '#28C840' }} />
                <span className="pr-wlabel">stack_analysis.sh</span>
              </div>
              <div className="pr-tech-body">
                <div style={{ marginBottom: 16 }}>
                  <TermLine prompt="$">git log --stat | grep "Tech" | sort | uniq -c | sort -rn</TermLine>
                </div>
                <h3 className="pr-tech-title">Stack Frequency</h3>
                <p className="pr-tech-sub">Technologies used across all {projects.length} projects</p>
                {techUsage.map((t, i) => (
                  <div key={i} className="pr-bar-row">
                    <span className="pr-bar-label">{t.name}</span>
                    <div className="pr-bar-track">
                      <div
                        className="pr-bar-fill"
                        style={{
                          width: techBarReady ? `${Math.round((t.count / maxTech) * 100)}%` : '0%',
                          background: i % 2 === 0 ? '#E63946' : '#22C55E',
                          transitionDelay: `${i * 0.08}s`,
                        }}
                      />
                    </div>
                    <span className="pr-bar-count">{t.count}×</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="pr-cta">
              <div className="pr-winbar">
                <span className="pr-wdot" style={{ backgroundColor: '#FF5F57' }} />
                <span className="pr-wdot" style={{ backgroundColor: '#FEBC2E' }} />
                <span className="pr-wdot" style={{ backgroundColor: '#28C840' }} />
                <span className="pr-wlabel">new_opportunity.sh</span>
              </div>
              <div className="pr-cta-body">
                <div>
                  <div style={{ marginBottom: 12 }}>
                    <TermLine prompt="$">./start_collaboration.sh --mode=open</TermLine>
                  </div>
                  <h3 className="pr-cta-heading">Interested in Working Together?</h3>
                  <p className="pr-cta-sub">
                    {'>'} Ready to build scalable, high-performance solutions. Let's create something remarkable.
                  </p>
                </div>
                <div className="pr-cta-btns">
                  <button className="pr-btn-p" onClick={() => onSectionChange && onSectionChange('contact')}>
                    Let's Connect
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <a href="https://github.com/Brian2021-Mwalish" target="_blank" rel="noopener noreferrer" className="pr-btn-o">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.79.55C20.22 21.4 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* ── FOOTER ── */}
          <footer className="pr-foot">
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <StatusDot />
              <span className="pr-foot-txt" style={{ color: '#22C55E' }}>online</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="pr-foot-txt">© 2025 Brian Mwalish</span>
              <span style={{ width: 1, height: 10, backgroundColor: 'rgba(107,114,128,0.25)' }} />
              <span className="pr-foot-txt">Software Engineer · Eldoret KE</span>
            </div>
          </footer>

        </div>
      </section>

      {/* ── DETAIL DRAWER ── */}
      {openProject && (
        <DetailDrawer project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </>
  );
};

export default Projects;