import React, { useRef, useState, useEffect, useCallback } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
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
    year: '2024',
    status: 'live',
    features: ['M-Pesa Payment Integration', 'Real-Time Dashboard', 'Investment Tracking', 'Referral Program', 'Modern UI'],
    metrics: [{ label: 'Components', val: 40 }, { label: 'API Endpoints', val: 28 }, { label: 'Uptime', val: 99 }],
  },
  {
    title: 'Home-Map Hub',
    description: 'A modern house leasing platform connecting tenants, landlords, and agents. Property discovery through interactive maps, online bookings, secure payments, messaging, and reviews for efficient rental management.',
    longDesc: 'Home-Map Hub replaces static listing pages with a live Leaflet.js map experience. Landlords pin their properties; tenants browse, filter, and book directly. Role-based dashboards mean landlords manage leases while agents track commissions — all in one cohesive Django REST-backed system.',
    tech: ['TypeScript', 'React', 'Leaflet.js', 'Django REST', 'Tailwind CSS'],
    live: 'https://home-leasing.vercel.app/',
    github: 'https://github.com/Brian2021-Mwalish/HomeLeasing.git',
    category: 'Full-Stack',
    num: '02',
    accent: '#2563EB',
    year: '2024',
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
    year: '2023',
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
    year: '2024',
    status: 'live',
    features: ['Smart Real-Time Updates', 'Admin Dashboard', 'Customer Loyalty', 'Fully Responsive'],
    metrics: [{ label: 'Tables Managed', val: 50 }, { label: 'Avg Booking ms', val: 320 }, { label: 'SMS Success', val: 98 }],
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

// Tech usage tallied across all projects
const techUsage = [
  { name: 'React', count: 4 },
  { name: 'Django', count: 4 },
  { name: 'TypeScript', count: 2 },
  { name: 'Tailwind CSS', count: 3 },
  { name: 'PostgreSQL', count: 2 },
  { name: 'Chart.js', count: 2 },
  { name: 'Redux', count: 2 },
];

const CATEGORIES = ['All', 'Full-Stack', 'Dashboard'];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

// Animated number counter
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

// Copy-to-clipboard micro interaction
const CopyLinkBtn = ({ url }) => {
  const [state, setState] = useState('idle'); // idle | copied | error

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
        background: state === 'copied' ? '#22C55E' : state === 'error' ? '#E63946' : '#F0EDE8',
        border: '1.5px solid #D1CDC4',
        borderRadius: 2,
        padding: '6px 10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        fontSize: '0.7rem',
        fontWeight: 700,
        letterSpacing: '0.06em',
        color: state !== 'idle' ? '#fff' : '#1A1A2E',
        transition: 'background 0.2s, color 0.2s',
        flexShrink: 0,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {state === 'copied' ? (
        <>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          COPIED
        </>
      ) : state === 'error' ? '✕ FAIL' : (
        <>
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          LINK
        </>
      )}
    </button>
  );
};

// Expandable detail drawer
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
        background: 'rgba(26,26,46,0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '0 0 0 0',
        animation: 'fadeInOverlay 0.25s ease',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#F7F5F0',
          borderTop: `4px solid ${project.accent}`,
          borderLeft: '2px solid #1A1A2E',
          borderRight: '2px solid #1A1A2E',
          borderRadius: '4px 4px 0 0',
          width: '100%',
          maxWidth: 760,
          maxHeight: '80vh',
          overflowY: 'auto',
          padding: '40px 48px 48px',
          position: 'relative',
          animation: 'slideUp 0.35s cubic-bezier(.22,1,.36,1)',
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: '0 -8px 40px rgba(26,26,46,0.18)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: '#1A1A2E', color: '#F7F5F0',
            border: 'none', borderRadius: 2,
            width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 18, lineHeight: 1,
          }}
        >×</button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 4, height: 32, background: project.accent, borderRadius: 2 }} />
          <span style={{
            background: '#1A1A2E', color: '#F7F5F0',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.12em',
            padding: '3px 10px', borderRadius: 2, textTransform: 'uppercase',
          }}>{project.category}</span>
          <span style={{ color: '#9A9590', fontSize: '0.78rem' }}>{project.year}</span>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '2.2rem', fontWeight: 900,
          color: '#1A1A2E', margin: '0 0 16px',
          letterSpacing: '-0.02em',
        }}>{project.title}</h2>

        <p style={{ color: '#4B4A56', fontSize: '0.95rem', lineHeight: 1.75, margin: '0 0 32px' }}>
          {project.longDesc}
        </p>

        {/* Metrics bar chart */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: '#9A9590', marginBottom: 14,
          }}>Project Metrics</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {project.metrics.map((m, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.82rem', color: '#4B4A56', fontWeight: 500 }}>{m.label}</span>
                  <span style={{ fontSize: '0.82rem', color: '#1A1A2E', fontWeight: 700 }}>{m.val}{m.label.includes('Uptime') || m.label.includes('Success') ? '%' : ''}</span>
                </div>
                <div style={{ height: 6, background: '#E8E4DC', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.round((m.val / maxMetric) * 100)}%`,
                    background: project.accent,
                    borderRadius: 3,
                    transition: 'width 0.8s cubic-bezier(.22,1,.36,1)',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9590', marginBottom: 12 }}>Key Features</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.features.map((f, i) => (
              <span key={i} style={{
                background: project.accent + '18',
                border: `1.5px solid ${project.accent}55`,
                color: '#1A1A2E',
                fontSize: '0.8rem', fontWeight: 600,
                padding: '5px 14px', borderRadius: 2,
              }}>{f}</span>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9A9590', marginBottom: 12 }}>Tech Stack</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {project.tech.map((t, i) => (
              <span key={i} style={{
                background: '#F0EDE8', color: '#1A1A2E',
                fontSize: '0.78rem', fontWeight: 600,
                padding: '5px 14px', borderRadius: 2,
                border: '1px solid #D1CDC4',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" style={{
              background: '#1A1A2E', color: '#F7F5F0',
              padding: '12px 28px', borderRadius: 2,
              fontSize: '0.85rem', fontWeight: 700,
              letterSpacing: '0.05em', textDecoration: 'none',
              border: '2px solid #1A1A2E',
              display: 'inline-flex', alignItems: 'center', gap: 8,
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = project.accent}
              onMouseLeave={e => e.currentTarget.style.background = '#1A1A2E'}
            >
              View Live ↗
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
            background: 'transparent', color: '#1A1A2E',
            padding: '12px 28px', borderRadius: 2,
            fontSize: '0.85rem', fontWeight: 700,
            letterSpacing: '0.05em', textDecoration: 'none',
            border: '2px solid #1A1A2E',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            GitHub →
          </a>
          {project.live && <CopyLinkBtn url={project.live} />}
        </div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Projects = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openProject, setOpenProject] = useState(null);
  const [techBarReady, setTechBarReady] = useState(false);
  const techRef = useRef(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  // Animate tech bars on intersection
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes slideUp {
          from { transform: translateY(60px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .proj-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #F7F5F0;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .proj-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 47px, #E2DDD5 47px, #E2DDD5 48px
          );
          pointer-events: none; z-index: 0;
        }
        .proj-accent-bar {
          position: absolute; top: 0; left: 0;
          width: 8px; height: 100%;
          background-color: #1A1A2E; z-index: 2;
        }
        .proj-inner {
          position: relative; z-index: 10;
          max-width: 1280px; margin: 0 auto;
          padding: 80px 48px 80px 72px;
        }

        /* HEADER */
        .proj-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 32px;
          margin-bottom: 48px; flex-wrap: wrap;
        }
        .proj-section-label {
          display: inline-flex; align-items: center; gap: 8px;
          background-color: #1A1A2E; color: #F7F5F0;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 2px; margin-bottom: 16px;
        }
        .proj-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 900;
          color: #1A1A2E; line-height: 0.95;
          letter-spacing: -0.03em; margin: 0;
        }
        .proj-heading span { color: #E63946; }
        .proj-subtext {
          font-size: 1rem; color: #4B4A56;
          line-height: 1.75; max-width: 380px;
          margin: 20px 0 0; align-self: flex-end;
        }

        /* STATS ROW */
        .stats-row {
          display: flex; gap: 0;
          border: 2px solid #1A1A2E; border-radius: 4px;
          overflow: hidden; margin-bottom: 48px;
          box-shadow: 4px 4px 0 #D1CDC4;
        }
        .stat-cell {
          flex: 1; padding: 20px 28px;
          border-right: 2px solid #1A1A2E;
          background: #fff;
        }
        .stat-cell:last-child { border-right: none; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 900;
          color: #1A1A2E; line-height: 1;
          display: block; margin-bottom: 2px;
        }
        .stat-label {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #9A9590;
        }

        /* DIVIDER */
        .proj-divider {
          display: flex; align-items: center; gap: 12px; margin-bottom: 36px;
        }
        .proj-divider-line { height: 2px; background-color: #1A1A2E; flex: 0 0 48px; }
        .proj-divider-dot { width: 8px; height: 8px; border-radius: 50%; background-color: #E63946; }
        .proj-divider-text {
          font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #9A9590;
        }

        /* FILTER TABS */
        .filter-row {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 40px; flex-wrap: wrap;
        }
        .filter-label {
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #9A9590; margin-right: 4px;
        }
        .filter-btn {
          padding: 8px 20px; border-radius: 2px;
          border: 2px solid #1A1A2E;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem; font-weight: 600;
          letter-spacing: 0.05em; cursor: pointer;
          transition: background 0.18s, color 0.18s;
          position: relative;
        }
        .filter-btn.active {
          background: #1A1A2E; color: #F7F5F0;
        }
        .filter-btn:not(.active) {
          background: transparent; color: #1A1A2E;
        }
        .filter-btn:not(.active):hover {
          background: #E8E4DC;
        }
        .filter-count {
          display: inline-flex; align-items: center; justify-content: center;
          background: #E63946; color: #fff;
          width: 18px; height: 18px; border-radius: 50%;
          font-size: 0.6rem; font-weight: 800;
          margin-left: 6px; vertical-align: middle;
        }

        /* COLLAB */
        .collab-card {
          background-color: #1A1A2E; color: #F7F5F0;
          border-radius: 4px; border: 2px solid #1A1A2E;
          box-shadow: 8px 8px 0 #E63946;
          padding: 40px 48px; margin-bottom: 64px;
          position: relative; overflow: hidden;
        }
        .collab-card::after {
          content: 'TEAM'; position: absolute;
          right: -6px; top: 12px;
          font-family: 'Playfair Display', serif;
          font-size: 6rem; font-weight: 900;
          color: rgba(255,255,255,0.04); letter-spacing: -2px;
          pointer-events: none; user-select: none;
        }
        .collab-icon-wrap {
          width: 56px; height: 56px; background-color: #E63946;
          border-radius: 2px; display: flex; align-items: center;
          justify-content: center; flex-shrink: 0; margin-bottom: 20px;
        }
        .collab-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.9rem; font-weight: 700; color: #F7F5F0;
          margin: 0 0 8px; letter-spacing: -0.02em;
        }
        .collab-sub {
          font-size: 0.95rem; color: #A8A4A0;
          line-height: 1.7; max-width: 600px; margin: 0 0 28px;
        }
        .collab-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px 20px;
        }
        .collab-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.88rem; color: #C8C4C0; line-height: 1.5;
        }
        .collab-arrow { color: #E63946; font-size: 0.8rem; flex-shrink: 0; margin-top: 2px; }

        /* GRID */
        .proj-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 28px; margin-bottom: 64px;
        }

        /* CARD */
        .proj-card {
          background-color: #FFFFFF; border: 2px solid #1A1A2E;
          border-radius: 4px; padding: 32px;
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
          cursor: pointer; min-height: 460px;
          animation: fadeInCard 0.5s ease both;
        }
        .proj-card:hover { transform: translateY(-6px); }
        .card-num {
          position: absolute; top: 14px; right: 18px;
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem; font-weight: 900; color: #F0EDE8;
          line-height: 1; letter-spacing: -3px;
          pointer-events: none; user-select: none;
        }
        .card-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; margin-bottom: 16px; gap: 8px;
        }
        .card-top-left { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .card-category {
          display: inline-block; background-color: #1A1A2E; color: #F7F5F0;
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 2px;
        }
        .card-year {
          font-size: 0.68rem; font-weight: 600; color: #9A9590;
          letter-spacing: 0.06em;
        }
        .card-status {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.7rem; font-weight: 500; color: #9A9590;
        }
        .card-status-dot { width: 7px; height: 7px; border-radius: 50%; }
        .card-accent-bar { height: 3px; border-radius: 2px; margin-bottom: 18px; width: 36px; }
        .card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem; font-weight: 700; color: #1A1A2E;
          margin: 0 0 12px; line-height: 1.15; letter-spacing: -0.02em;
        }
        .card-desc {
          font-size: 0.88rem; color: #4B4A56;
          line-height: 1.7; margin: 0 0 20px; flex: 1;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .card-features {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 6px 12px; margin-bottom: 20px;
        }
        .card-feat-item {
          display: flex; align-items: flex-start; gap: 6px;
          font-size: 0.78rem; color: #4B4A56; line-height: 1.4;
        }
        .card-feat-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        .card-tech-row {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-bottom: 22px; padding-bottom: 20px;
          border-bottom: 1.5px solid #E8E4DC;
        }
        .card-tech-pill {
          background-color: #F0EDE8; color: #1A1A2E;
          font-size: 0.7rem; font-weight: 600; letter-spacing: 0.05em;
          padding: 3px 10px; border-radius: 2px; border: 1px solid #D1CDC4;
        }
        .card-btns { display: flex; gap: 8px; margin-top: auto; }
        .card-btn-live {
          flex: 1; display: inline-flex; align-items: center;
          justify-content: center; gap: 6px;
          background-color: #1A1A2E; color: #F7F5F0;
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
          font-weight: 600; letter-spacing: 0.05em; padding: 10px 14px;
          border-radius: 2px; text-decoration: none; border: 2px solid #1A1A2E;
          transition: background 0.2s, color 0.2s; cursor: pointer;
        }
        .card-btn-live:hover { background-color: #E63946; border-color: #E63946; }
        .card-btn-gh {
          flex: 1; display: inline-flex; align-items: center;
          justify-content: center; gap: 6px;
          background-color: transparent; color: #1A1A2E;
          font-family: 'DM Sans', sans-serif; font-size: 0.8rem;
          font-weight: 600; letter-spacing: 0.05em; padding: 10px 14px;
          border-radius: 2px; text-decoration: none; border: 2px solid #1A1A2E;
          transition: background 0.2s, color 0.2s; cursor: pointer;
        }
        .card-btn-gh:hover { background-color: #1A1A2E; color: #F7F5F0; }
        .card-btn-detail {
          display: inline-flex; align-items: center; justify-content: center;
          background-color: transparent; color: #9A9590;
          border: 2px solid #E8E4DC; border-radius: 2px;
          padding: 10px 12px; cursor: pointer; font-size: 0.75rem;
          font-weight: 600; letter-spacing: 0.06em; font-family: 'DM Sans', sans-serif;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .card-btn-detail:hover { background: #F0EDE8; color: #1A1A2E; border-color: #1A1A2E; }

        /* TECH STACK SECTION */
        .tech-section {
          background: #fff; border: 2px solid #1A1A2E;
          border-radius: 4px; padding: 36px 40px;
          margin-bottom: 64px; box-shadow: 4px 4px 0 #D1CDC4;
          position: relative; overflow: hidden;
        }
        .tech-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: #1A1A2E;
          margin: 0 0 6px; letter-spacing: -0.02em;
        }
        .tech-section-sub {
          font-size: 0.85rem; color: #9A9590; margin: 0 0 28px;
        }
        .tech-bar-row {
          display: flex; align-items: center; gap: 14px; margin-bottom: 12px;
        }
        .tech-bar-label {
          font-size: 0.82rem; font-weight: 600; color: #1A1A2E;
          width: 110px; flex-shrink: 0;
        }
        .tech-bar-track {
          flex: 1; height: 10px; background: #F0EDE8;
          border-radius: 2px; overflow: hidden;
        }
        .tech-bar-fill {
          height: 100%; border-radius: 2px;
          background: #1A1A2E;
          transition: width 0.9s cubic-bezier(.22,1,.36,1);
        }
        .tech-bar-count {
          font-size: 0.78rem; font-weight: 700;
          color: #4B4A56; width: 28px; text-align: right; flex-shrink: 0;
        }

        /* CTA */
        .proj-cta {
          background-color: #1A1A2E; border-radius: 4px;
          border: 2px solid #1A1A2E; box-shadow: 8px 8px 0 #E63946;
          padding: 56px 48px;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 40px; flex-wrap: wrap;
          position: relative; overflow: hidden;
        }
        .proj-cta::after {
          content: '→'; position: absolute;
          right: 160px; top: 50%; transform: translateY(-50%);
          font-family: 'Playfair Display', serif; font-size: 10rem; font-weight: 900;
          color: rgba(255,255,255,0.03); pointer-events: none; user-select: none;
        }
        .cta-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700;
          color: #F7F5F0; margin: 0 0 8px; letter-spacing: -0.02em;
        }
        .cta-sub { font-size: 0.95rem; color: #A8A4A0; line-height: 1.65; max-width: 440px; margin: 0; }
        .cta-btn {
          display: inline-flex; align-items: center; gap: 10px;
          background-color: #E63946; color: #F7F5F0;
          font-family: 'DM Sans', sans-serif; font-size: 0.92rem;
          font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 16px 36px; border-radius: 2px; border: none;
          cursor: pointer; white-space: nowrap; flex-shrink: 0;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 4px 4px 0 #F7F5F0;
        }
        .cta-btn:hover { opacity: 0.92; transform: translate(-2px,-2px); box-shadow: 6px 6px 0 #F7F5F0; }

        /* CORNER NUM */
        .proj-corner-num {
          position: absolute; top: 32px; right: 48px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(5rem, 12vw, 10rem); font-weight: 900;
          color: #E2DDD5; line-height: 1;
          user-select: none; pointer-events: none; z-index: 1; letter-spacing: -0.04em;
        }

        /* EMPTY STATE */
        .empty-state {
          text-align: center; padding: 80px 40px;
          color: #9A9590; font-size: 1rem; grid-column: 1 / -1;
        }
        .empty-state strong {
          display: block; font-family: 'Playfair Display', serif;
          font-size: 1.4rem; color: #4B4A56; margin-bottom: 8px;
        }

        @media (max-width: 900px) {
          .proj-inner { padding: 60px 24px 60px 40px; }
          .proj-grid { grid-template-columns: 1fr; }
          .collab-card { padding: 32px 24px; }
          .proj-cta { padding: 40px 32px; }
          .stats-row { flex-wrap: wrap; }
          .stat-cell { border-bottom: 2px solid #1A1A2E; flex: 0 0 50%; }
        }
        @media (max-width: 600px) {
          .proj-inner { padding: 48px 16px 48px 28px; }
          .proj-heading { font-size: 2.8rem; }
          .card-features { grid-template-columns: 1fr; }
          .proj-cta::after { display: none; }
          .stat-cell { flex: 0 0 100%; }
        }
      `}</style>

      <section className="proj-root" ref={sectionRef} id="projects">
        <div className="proj-accent-bar" />
        <div className="proj-corner-num" aria-hidden="true">02</div>

        <div className="proj-inner">

          {/* ── HEADER ── */}
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

          {/* ── ANIMATED STATS ROW ── */}
          <div className="stats-row">
            {[
              { label: 'Projects Built', val: projects.length, suffix: '' },
              { label: 'Live & Deployed', val: projects.filter(p => p.status === 'live').length, suffix: '' },
              { label: 'Technologies Used', val: new Set(projects.flatMap(p => p.tech)).size, suffix: '+' },
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

          <div className="proj-divider">
            <div className="proj-divider-line" />
            <div className="proj-divider-dot" />
            <span className="proj-divider-text">Recent Work</span>
          </div>

          {/* ── FILTER TABS ── */}
          <div className="filter-row">
            <span className="filter-label">Filter:</span>
            {CATEGORIES.map(cat => {
              const count = cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length;
              return (
                <button
                  key={cat}
                  className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <span className="filter-count">{count}</span>
                </button>
              );
            })}
          </div>

          {/* ── COLLAB CARD ── */}
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

          {/* ── PROJECTS GRID ── */}
          <div className="proj-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <strong>No projects found</strong>
                Try a different filter category.
              </div>
            ) : filtered.map((project, index) => (
              <div
                key={project.num}
                className="proj-card"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  boxShadow: hoveredIndex === index
                    ? `6px 6px 0 ${project.accent}`
                    : '4px 4px 0 #D1CDC4',
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                <div className="card-num">{project.num}</div>

                <div className="card-top">
                  <div className="card-top-left">
                    <span className="card-category">{project.category}</span>
                    <span className="card-year">{project.year}</span>
                  </div>
                  <div className="card-status">
                    <span className="card-status-dot" style={{ backgroundColor: project.status === 'live' ? '#22C55E' : '#D97706' }} />
                    {project.status === 'live' ? 'Live' : 'In Dev'}
                  </div>
                </div>

                <div className="card-accent-bar" style={{ backgroundColor: project.accent }} />
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc">{project.description}</p>

                <div className="card-features">
                  {project.features.slice(0, 4).map((f, i) => (
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
                      Live ↗
                    </a>
                  )}
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="card-btn-gh">
                    GitHub
                  </a>
                  <button
                    className="card-btn-detail"
                    onClick={() => setOpenProject(project)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ── TECH STACK USAGE ── */}
          <div className="tech-section" ref={techRef}>
            <div style={{ position: 'absolute', top: 12, right: 20, fontFamily: "'Playfair Display', serif", fontSize: '4rem', fontWeight: 900, color: '#F0EDE8', pointerEvents: 'none', userSelect: 'none' }}>∑</div>
            <h3 className="tech-section-title">Stack Frequency</h3>
            <p className="tech-section-sub">Technologies used across all {projects.length} projects</p>
            {techUsage.map((t, i) => (
              <div className="tech-bar-row" key={i}>
                <span className="tech-bar-label">{t.name}</span>
                <div className="tech-bar-track">
                  <div
                    className="tech-bar-fill"
                    style={{
                      width: techBarReady ? `${Math.round((t.count / maxTech) * 100)}%` : '0%',
                      background: i % 2 === 0 ? '#1A1A2E' : '#E63946',
                      transitionDelay: `${i * 0.08}s`,
                    }}
                  />
                </div>
                <span className="tech-bar-count">{t.count}×</span>
              </div>
            ))}
          </div>

          {/* ── CTA ── */}
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

        {/* ── DETAIL DRAWER ── */}
        {openProject && (
          <DetailDrawer project={openProject} onClose={() => setOpenProject(null)} />
        )}
      </section>
    </>
  );
};

export default Projects;