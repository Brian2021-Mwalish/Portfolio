import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

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
    num: '01',
    year: '2026',
    status: 'live',
    features: ['Student Enrollment', 'Course Management', 'Academic Records', 'Fee Tracking', 'Admin Portal', 'Staff Dashboard'],
    metrics: [{ label: 'User Roles', val: 4 }, { label: 'Modules', val: 12 }, { label: 'Uptime %', val: 99 }],
  },
  {
    title: 'Akinaties',
    description: 'A community empowerment platform focused on education, training, and development programs that support youth and community growth.',
    longDesc: 'Akinaties is a web-based community empowerment platform designed to share programs, training opportunities, and outreach initiatives. It focuses on providing accessible information, promoting engagement, and supporting community development through a clean, responsive, and scalable interface.',
    tech: ['React', 'JavaScript', 'Vite', 'Tailwind CSS'],
    live: 'https://akinaties.org/',
    github: '',
    category: 'Full-Stack',
    num: '02',
    year: '2025',
    status: 'live',
    features: ['Responsive UI', 'Program & Content Display', 'Community Engagement', 'Modern UI Design'],
    metrics: [{ label: 'Sections', val: 10 }, { label: 'Pages', val: 5 }, { label: 'Uptime %', val: 99 }],
  },
  {
    title: 'Liquidity-Funding',
    description: 'A modern investment platform enabling seamless funding and investment management. Features include real-time dashboards, M-Pesa integration, context-aware tracking, and a referral rewards system for enhanced user engagement.',
    longDesc: 'Built from scratch as a solo full-stack effort, Liquidity-Funding tackles the real challenge of digitising community-based investment (chama) management in Kenya. The M-Pesa STK push integration allows instant mobile payments, while the referral engine drives organic growth. The admin dashboard surfaces real-time fund flows, member contributions, and ROI metrics at a glance.',
    tech: ['React', 'Django', 'Vite', 'JavaScript', 'Tailwind CSS'],
    live: 'https://liquiinvestke.co.ke',
    github: 'https://github.com/Brian2021-Mwalish/Digital-Liquidity-Fund-Platform-.git',
    category: 'Full-Stack',
    num: '03',
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
    num: '04',
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
    num: '05',
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
    num: '06',
    year: '2025',
    status: 'live',
    features: ['Smart Real-Time Updates', 'Admin Dashboard', 'Customer Loyalty', 'Fully Responsive'],
    metrics: [{ label: 'Tables Managed', val: 50 }, { label: 'Avg Booking ms', val: 320 }, { label: 'SMS Success %', val: 98 }],
  },
  {
    title: 'Loyalty Dashboard',
    description: 'Advanced administrative control panel for managing customer loyalty tiers, comprehensive engagement analytics visualization, and automated loyalty action triggers with manual override.',
    longDesc: 'A standalone loyalty engine that can be white-labelled into any e-commerce or SaaS product. Tier thresholds, point multipliers, and reward catalogues are all configurable without code. The analytics board shows cohort retention and redemption rates at a weekly cadence.',
    tech: ['React', 'Django REST', 'Chart.js', 'Redux'],
    live: '',
    github: 'https://github.com/Brian2021-Mwalish/loyalty-dashboard',
    category: 'Dashboard',
    num: '07',
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
];

const techUsage = [
  { name: 'React', count: 4 },
  { name: 'Django', count: 4 },
  { name: 'TypeScript', count: 3 },
  { name: 'Tailwind CSS', count: 3 },
  { name: 'PostgreSQL', count: 2 },
  { name: 'Chart.js', count: 2 },
  { name: 'Redux', count: 2 },
  { name: 'FastAPI', count: 1 },
];

const CATEGORIES = ['All', 'Full-Stack', 'Dashboard'];

const accentFor = (category) => (category === 'Dashboard' ? 'var(--orange)' : 'var(--purple)');

// ─── STATUS DOT ──────────────────────────────────────────────────────────────

const StatusDot = () => (
  <span className="p-statusDotWrap">
    <span className="p-statusDotPulse" />
    <span className="p-statusDotCore" />
  </span>
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
        const step = Math.max(1, Math.ceil(target / 40));
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
    <button onClick={handleCopy} title="Copy link" className={`p-copyBtn p-copyBtn--${state}`}>
      {state === 'copied' ? 'Copied' : state === 'error' ? "Couldn't copy" : 'Copy link'}
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
  const accent = accentFor(project.category);

  return (
    <div onClick={onClose} className="p-overlay">
      <motion.div
        onClick={e => e.stopPropagation()}
        className="p-drawer"
        style={{ borderTopColor: accent }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button onClick={onClose} className="p-drawerClose" aria-label="Close">×</button>

        <div className="p-drawerHead">
          <span className="p-tag" style={{ color: accent, borderColor: accent === 'var(--orange)' ? 'var(--orange-tint)' : '#D6C6F5' }}>
            {project.category}
          </span>
          <span className="p-drawerYear">{project.year}</span>
        </div>

        <h2 className="p-drawerTitle">{project.title}</h2>
        <p className="p-drawerDesc">{project.longDesc}</p>

        <p className="p-sec">Project Metrics</p>
        <div className="p-metricBars">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-metricBarRow">
              <div className="p-metricBarTop">
                <span>{m.label}</span>
                <span>{m.val}</span>
              </div>
              <div className="p-metricBarTrack">
                <div className="p-metricBarFill" style={{ width: `${Math.round((m.val / maxMetric) * 100)}%`, backgroundColor: accent }} />
              </div>
            </div>
          ))}
        </div>

        <p className="p-sec">Key Features</p>
        <div className="p-pillRow">
          {project.features.map((f, i) => <span key={i} className="p-featurePill">{f}</span>)}
        </div>

        <p className="p-sec">Tech Stack</p>
        <div className="p-pillRow" style={{ marginBottom: 28 }}>
          {project.tech.map((t, i) => <span key={i} className="p-techPill">{t}</span>)}
        </div>

        <div className="p-drawerBtns">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-btn-p">View Live Site</a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-btn-o">View Code</a>
          {project.live && <CopyLinkBtn url={project.live} />}
        </div>
      </motion.div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Projects = ({ onSectionChange }) => {
  const techRef = useRef(null);
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
        @keyframes dotPulse {
          75%, 100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }

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

        .p-root {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
          background-color: var(--paper);
          min-height: 100dvh;
          color: var(--ink);
          position: relative;
          overflow: hidden;
        }

        .p-hexLayer {
          position: absolute; top: 4%; right: -90px;
          width: 320px; height: 280px;
          background-color: var(--paper-2);
          clip-path: var(--hex);
          animation: hexDrift 26s ease-in-out infinite alternate;
          pointer-events: none; z-index: 0;
        }
        .p-glowOrange {
          position: absolute; bottom: 4%; left: -60px;
          width: 130px; height: 130px;
          background-color: var(--orange);
          opacity: 0.9;
          clip-path: var(--hex);
          pointer-events: none; z-index: 0;
        }

        .p-shell {
          position: relative; z-index: 10;
          max-width: 1180px; margin: 0 auto; padding: 0 24px;
          display: flex; flex-direction: column; min-height: 100dvh;
        }

        /* TOP BAR */
        .p-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 22px 0 16px; border-bottom: 1px solid var(--line);
          gap: 12px; flex-wrap: wrap;
        }
        .p-logo { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--ink); letter-spacing: -0.01em; }
        .p-logo span { color: var(--orange); }
        .p-status { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
        .p-status span { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; letter-spacing: 0.06em; color: var(--ink); }

        .p-statusDotWrap { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 10px; height: 10px; }
        .p-statusDotPulse { position: absolute; width: 10px; height: 10px; border-radius: 50%; background-color: var(--orange-tint); animation: dotPulse 1.8s cubic-bezier(0,0,0.2,1) infinite; }
        .p-statusDotCore { width: 6px; height: 6px; border-radius: 50%; background-color: var(--orange); position: relative; z-index: 1; }

        .p-inner { flex: 1; padding: 48px 0 60px; }

        .p-sec {
          font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; color: var(--purple); margin-bottom: 10px;
        }

        /* HEADER */
        .p-headerRow {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 32px; flex-wrap: wrap; margin-bottom: 38px;
        }
        .p-eyebrow {
          font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; letter-spacing: 0.2em;
          text-transform: uppercase; color: var(--orange); display: flex; align-items: center; gap: 10px; margin-bottom: 12px;
        }
        .p-eyebrow::before { content: ''; width: 22px; height: 1px; background-color: var(--orange); display: inline-block; }
        .p-heading {
          font-family: 'Fraunces', Georgia, serif; font-optical-sizing: auto;
          font-size: clamp(2.6rem, 5.6vw, 4.2rem); font-weight: 600; color: var(--ink);
          line-height: 0.98; letter-spacing: -0.02em; margin: 0;
        }
        .p-heading em { font-style: italic; font-weight: 400; color: var(--purple); }
        .p-subtext { font-size: 0.92rem; font-weight: 300; color: var(--slate); line-height: 1.8; max-width: 400px; margin: 0; }

        /* STATS */
        .p-stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px;
          border: 1px solid var(--line); border-radius: 6px; overflow: hidden;
          background-color: var(--line); margin-bottom: 40px;
        }
        .p-stat { background-color: #FFFFFF; padding: 18px 10px; text-align: center; }
        .p-stat-val { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(1.4rem, 2.4vw, 1.8rem); color: var(--ink); display: block; line-height: 1; }
        .p-stat-lbl { font-family: 'JetBrains Mono', monospace; font-size: 0.56rem; color: var(--slate); letter-spacing: 0.08em; text-transform: uppercase; display: block; margin-top: 6px; }

        /* FILTER */
        .p-filterRow { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 36px; }
        .p-filterLabel { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--slate); letter-spacing: 0.1em; text-transform: uppercase; }
        .p-filterBtn {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.76rem; font-weight: 600; color: var(--ink);
          padding: 7px 14px; border: 1.5px solid var(--line); border-radius: 20px; background: #FFFFFF;
          cursor: pointer; transition: all 0.18s; display: inline-flex; align-items: center; gap: 6px;
        }
        .p-filterBtn:hover { border-color: var(--purple-2); }
        .p-filterBtn.active { border-color: var(--purple); background: var(--paper-2); color: var(--purple); }
        .p-filterCount {
          font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--slate);
        }
        .p-filterBtn.active .p-filterCount { color: var(--purple); }

        /* COLLAB PANEL */
        .p-collab { border: 1px solid var(--line); border-radius: 6px; background-color: #FFFFFF; padding: 26px 28px; margin-bottom: 44px; }
        .p-collabTitle { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 600; color: var(--ink); margin: 0 0 8px; }
        .p-collabSub { font-size: 0.86rem; color: var(--slate); line-height: 1.75; margin: 0 0 18px; max-width: 640px; }
        .p-collabGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 8px 18px; }
        .p-collabItem { display: flex; align-items: flex-start; gap: 8px; font-family: 'Inter', sans-serif; font-size: 0.78rem; color: var(--ink); line-height: 1.5; }
        .p-collabItem::before { content: ''; width: 5px; height: 5px; margin-top: 7px; border-radius: 50%; background-color: var(--orange); flex-shrink: 0; }

        /* GRID */
        .p-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 52px; }

        .p-card {
          background-color: #FFFFFF; border: 1px solid var(--line); border-radius: 8px;
          padding: 26px; display: flex; flex-direction: column; cursor: pointer;
          transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease, border-color 0.2s;
        }
        .p-card:hover { transform: translateY(-4px); border-color: var(--purple-2); box-shadow: 0 12px 28px rgba(91,33,182,0.08); }

        .p-cardTop { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; gap: 8px; }
        .p-cardTopLeft { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .p-tag {
          font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; font-weight: 500;
          letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 9px; border-radius: 3px;
          border: 1px solid var(--line); background: var(--paper-2);
        }
        .p-cardYear { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--slate); }
        .p-cardStatus { display: flex; align-items: center; gap: 5px; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--slate); white-space: nowrap; }
        .p-cardStatusDot { width: 6px; height: 6px; border-radius: 50%; }

        .p-cardAccent { height: 3px; border-radius: 3px; margin-bottom: 14px; width: 30px; }
        .p-cardTitle { font-family: 'Fraunces', serif; font-size: 1.28rem; font-weight: 600; color: var(--ink); margin: 0 0 10px; line-height: 1.15; letter-spacing: -0.01em; }
        .p-cardDesc { font-size: 0.83rem; color: var(--slate); line-height: 1.7; margin: 0 0 16px; flex: 1; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

        .p-cardFeatures { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 10px; margin-bottom: 16px; }
        .p-featItem { display: flex; align-items: flex-start; gap: 5px; font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--slate); line-height: 1.4; }
        .p-featDot { width: 4px; height: 4px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; background-color: var(--purple-2); }

        .p-cardTechRow { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; padding-bottom: 16px; border-bottom: 1px solid var(--line); }
        .p-techChip {
          font-family: 'JetBrains Mono', monospace; font-size: 0.64rem; color: var(--ink);
          padding: 4px 10px; background-color: #FFFFFF; border: 1px solid var(--line);
          clip-path: polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px);
        }

        .p-cardBtns { display: flex; gap: 7px; margin-top: auto; }
        .p-btn-live {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 600;
          background-color: var(--purple); color: #fff; padding: 10px 12px; border-radius: 5px;
          border: 1.5px solid var(--purple); cursor: pointer; transition: background-color 0.18s, transform 0.15s; text-decoration: none;
        }
        .p-btn-live:hover { background-color: #4C1D95; transform: translateY(-1px); }
        .p-btn-gh {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px;
          font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 600;
          background: transparent; color: var(--ink); padding: 10px 12px; border-radius: 5px;
          border: 1.5px solid var(--line); cursor: pointer; transition: all 0.18s; text-decoration: none;
        }
        .p-btn-gh:hover { border-color: var(--orange); color: var(--orange); }
        .p-btn-detail {
          display: inline-flex; align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif; font-size: 0.68rem; color: var(--slate);
          background: transparent; border: 1px solid var(--line); border-radius: 5px;
          padding: 10px 12px; cursor: pointer; transition: all 0.18s; white-space: nowrap;
        }
        .p-btn-detail:hover { border-color: var(--purple-2); color: var(--purple); }

        /* TECH FREQUENCY */
        .p-techSection { border: 1px solid var(--line); border-radius: 6px; background-color: #FFFFFF; padding: 26px 28px; margin-bottom: 44px; }
        .p-techTitle { font-family: 'Fraunces', serif; font-size: 1.15rem; font-weight: 600; color: var(--ink); margin: 0 0 4px; }
        .p-techSub { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; color: var(--slate); margin: 0 0 20px; letter-spacing: 0.03em; }
        .p-barRow { display: flex; align-items: center; gap: 12px; margin-bottom: 11px; }
        .p-barLabel { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--ink); width: 100px; flex-shrink: 0; }
        .p-barTrack { flex: 1; height: 7px; background: var(--paper-2); border-radius: 4px; overflow: hidden; }
        .p-barFill { height: 100%; border-radius: 4px; transition: width 0.9s cubic-bezier(.22,1,.36,1); }
        .p-barCount { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; color: var(--slate); width: 22px; text-align: right; flex-shrink: 0; }

        /* CTA */
        .p-cta { border: 1px solid var(--line); border-radius: 8px; background-color: var(--paper-2); overflow: hidden; position: relative; }
        .p-ctaBody { padding: 34px 40px; display: flex; align-items: center; justify-content: space-between; gap: 28px; flex-wrap: wrap; position: relative; z-index: 1; }
        .p-ctaHeading { font-family: 'Fraunces', serif; font-size: clamp(1.4rem, 2.5vw, 1.9rem); font-weight: 600; color: var(--ink); margin: 0 0 8px; letter-spacing: -0.01em; }
        .p-ctaSub { font-family: 'Inter', sans-serif; font-size: 0.86rem; color: var(--slate); line-height: 1.7; max-width: 380px; margin: 0; font-weight: 300; }
        .p-ctaBtns { display: flex; gap: 10px; flex-wrap: wrap; }
        .p-btn-p {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.01em;
          background-color: var(--purple); color: #fff; padding: 12px 22px; border-radius: 5px;
          border: 1.5px solid var(--purple); text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          transition: background-color 0.18s, transform 0.15s; cursor: pointer; white-space: nowrap;
        }
        .p-btn-p:hover { background-color: #4C1D95; transform: translateY(-1px); }
        .p-btn-o {
          font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.01em;
          background-color: transparent; color: var(--ink); padding: 12px 22px; border-radius: 5px;
          border: 1.5px solid var(--line); text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
          transition: border-color 0.18s, color 0.18s, transform 0.15s; cursor: pointer; white-space: nowrap;
        }
        .p-btn-o:hover { border-color: var(--orange); color: var(--orange); transform: translateY(-1px); }

        /* FOOTER */
        .p-foot { border-top: 1px solid var(--line); padding: 13px 0 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
        .p-footCopy { display: flex; align-items: center; gap: 8px; }
        .p-footSep { width: 1px; height: 10px; background-color: var(--line); }
        .p-footTxt { font-family: 'JetBrains Mono', monospace; font-size: 0.6rem; color: var(--slate); }

        /* EMPTY */
        .p-empty { text-align: center; padding: 60px 40px; color: var(--slate); grid-column: 1 / -1; font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; }

        /* DRAWER / OVERLAY */
        .p-overlay {
          position: fixed; inset: 0; z-index: 9999; background: rgba(27,17,48,0.55);
          backdrop-filter: blur(4px); display: flex; align-items: flex-end; justify-content: center;
          animation: fadeInOverlay 0.25s ease;
        }
        .p-drawer {
          background: var(--paper); border-top: 3px solid var(--purple); border-radius: 10px 10px 0 0;
          width: 100%; max-width: 720px; max-height: 82vh; overflow-y: auto; position: relative;
          padding: 40px 44px 44px; font-family: 'Inter', sans-serif;
        }
        .p-drawerClose {
          position: absolute; top: 24px; right: 24px; background: var(--paper-2); color: var(--ink);
          border: 1px solid var(--line); border-radius: 50%; width: 30px; height: 30px;
          display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 17px; line-height: 1;
        }
        .p-drawerClose:hover { border-color: var(--orange); color: var(--orange); }
        .p-drawerHead { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .p-drawerYear { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; color: var(--slate); }
        .p-drawerTitle { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 600; color: var(--ink); margin: 0 0 14px; letter-spacing: -0.02em; }
        .p-drawerDesc { color: var(--slate); font-size: 0.9rem; font-weight: 300; line-height: 1.8; margin: 0 0 28px; }

        .p-metricBars { margin-bottom: 26px; }
        .p-metricBarRow { margin-bottom: 12px; }
        .p-metricBarTop { display: flex; justify-content: space-between; margin-bottom: 5px; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; color: var(--ink); }
        .p-metricBarTrack { height: 6px; background: var(--paper-2); border-radius: 3px; overflow: hidden; }
        .p-metricBarFill { height: 100%; border-radius: 3px; transition: width 0.8s cubic-bezier(.22,1,.36,1); }

        .p-pillRow { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 26px; }
        .p-featurePill { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--purple); padding: 5px 12px; border-radius: 3px; border: 1px solid #D6C6F5; background: var(--paper-2); }
        .p-techPill { font-family: 'JetBrains Mono', monospace; font-size: 0.7rem; color: var(--ink); padding: 5px 12px; border-radius: 3px; border: 1px solid var(--line); background: #FFFFFF; }

        .p-drawerBtns { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
        .p-copyBtn {
          font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; background: transparent;
          border: 1px solid var(--line); border-radius: 5px; padding: 11px 14px; cursor: pointer;
          color: var(--slate); transition: all 0.2s; white-space: nowrap;
        }
        .p-copyBtn--copied { border-color: var(--purple-2); color: var(--purple); background: var(--paper-2); }
        .p-copyBtn--error { border-color: var(--orange); color: var(--orange); }

        /* ─── RESPONSIVE ── */
        @media (max-width: 900px) {
          .p-grid { grid-template-columns: repeat(2, 1fr); }
          .p-stats { grid-template-columns: repeat(2, 1fr); }
          .p-ctaBody { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 640px) {
          .p-shell { padding: 0 16px; }
          .p-heading { font-size: clamp(2.1rem, 11vw, 2.6rem); }
          .p-grid { grid-template-columns: 1fr; }
          .p-stats { grid-template-columns: repeat(2, 1fr); }
          .p-ctaBody { padding: 28px 20px; }
          .p-cardFeatures { grid-template-columns: 1fr; }
          .p-drawer { padding: 32px 22px 32px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .p-hexLayer, .p-statusDotPulse { animation: none; }
        }
      `}</style>

      <section className="p-root" id="projects">
        <div className="p-hexLayer" aria-hidden="true" />
        <div className="p-glowOrange" aria-hidden="true" />

        <div className="p-shell">

          {/* ── TOP BAR ── */}
          <header className="p-bar">
            <div className="p-logo">Mwalish<span>.dev</span></div>
            <div className="p-status">
              <StatusDot />
              <span>Open to work</span>
            </div>
          </header>

          <motion.div className="p-inner" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>

            {/* ── HEADER ── */}
            <motion.div variants={fadeUp} className="p-headerRow">
              <div>
                <p className="p-eyebrow">Portfolio · {projects.length} Projects</p>
                <h2 className="p-heading">Featured <em>Projects</em></h2>
              </div>
              <p className="p-subtext">
                Full-stack solutions built with modern technologies — from investment platforms to institutional portals and smart booking systems.
              </p>
            </motion.div>

            {/* ── STATS ── */}
            <motion.div variants={fadeUp}>
              <p className="p-sec">Engineering Metrics</p>
              <div className="p-stats">
                {[
                  { val: projects.length, suffix: '', label: 'Total Projects' },
                  { val: projects.filter(p => p.status === 'live').length, suffix: '', label: 'Live & Deployed' },
                  { val: new Set(projects.flatMap(p => p.tech)).size, suffix: '+', label: 'Technologies Used' },
                  { val: 3, suffix: '+', label: 'Years Experience' },
                ].map((s, i) => (
                  <div key={i} className="p-stat">
                    <span className="p-stat-val"><Counter target={s.val} suffix={s.suffix} /></span>
                    <span className="p-stat-lbl">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── FILTER ── */}
            <motion.div variants={fadeUp} className="p-filterRow">
              <span className="p-filterLabel">Filter</span>
              {CATEGORIES.map(cat => {
                const count = cat === 'All' ? projects.length : projects.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    className={`p-filterBtn${activeCategory === cat ? ' active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat} <span className="p-filterCount">{count}</span>
                  </button>
                );
              })}
            </motion.div>

            {/* ── COLLAB ── */}
            <motion.div variants={fadeUp} className="p-collab">
              <h3 className="p-collabTitle">Collaborative Development Experience</h3>
              <p className="p-collabSub">
                Worked with multiple engineers across business, booking, institutional, and SME domains — covering the full delivery cycle from architecture to deployment.
              </p>
              <div className="p-collabGrid">
                {collabItems.map((item, i) => <div key={i} className="p-collabItem">{item}</div>)}
              </div>
            </motion.div>

            {/* ── GRID ── */}
            <motion.p variants={fadeUp} className="p-sec">Recent Work</motion.p>
            <motion.div variants={fadeUp} className="p-grid">
              {filtered.length === 0 ? (
                <div className="p-empty">No projects match this filter.</div>
              ) : filtered.map((project) => {
                const accent = accentFor(project.category);
                return (
                  <div key={project.num} className="p-card" onClick={() => setOpenProject(project)}>
                    <div className="p-cardTop">
                      <div className="p-cardTopLeft">
                        <span className="p-tag" style={{ color: accent }}>{project.category}</span>
                        <span className="p-cardYear">{project.year}</span>
                      </div>
                      <div className="p-cardStatus">
                        <span className="p-cardStatusDot" style={{ backgroundColor: project.status === 'live' ? '#16A34A' : 'var(--orange)' }} />
                        {project.status === 'live' ? 'Live' : 'In development'}
                      </div>
                    </div>

                    <div className="p-cardAccent" style={{ backgroundColor: accent }} />
                    <h3 className="p-cardTitle">{project.title}</h3>
                    <p className="p-cardDesc">{project.description}</p>

                    <div className="p-cardFeatures">
                      {project.features.slice(0, 4).map((f, i) => (
                        <div key={i} className="p-featItem"><div className="p-featDot" />{f}</div>
                      ))}
                    </div>

                    <div className="p-cardTechRow">
                      {project.tech.map((t, i) => <span key={i} className="p-techChip">{t}</span>)}
                    </div>

                    <div className="p-cardBtns" onClick={e => e.stopPropagation()}>
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-btn-live">Live ↗</a>
                      )}
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-btn-gh">GitHub</a>
                      <button className="p-btn-detail" onClick={() => setOpenProject(project)}>Details</button>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* ── TECH STACK ── */}
            <motion.div variants={fadeUp}>
              <p className="p-sec">Stack Frequency</p>
              <div className="p-techSection" ref={techRef}>
                <h3 className="p-techTitle">Technologies Across Projects</h3>
                <p className="p-techSub">Usage frequency across all {projects.length} shipped projects</p>
                {techUsage.map((t, i) => (
                  <div key={i} className="p-barRow">
                    <span className="p-barLabel">{t.name}</span>
                    <div className="p-barTrack">
                      <div
                        className="p-barFill"
                        style={{
                          width: techBarReady ? `${Math.round((t.count / maxTech) * 100)}%` : '0%',
                          backgroundColor: i % 2 === 0 ? 'var(--purple)' : 'var(--orange)',
                          transitionDelay: `${i * 0.06}s`,
                        }}
                      />
                    </div>
                    <span className="p-barCount">{t.count}×</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── CTA ── */}
            <motion.div variants={fadeUp} className="p-cta">
              <div className="p-ctaBody">
                <div>
                  <h3 className="p-ctaHeading">Interested in Working Together?</h3>
                  <p className="p-ctaSub">Ready to build scalable, high-performance solutions. Let's create something remarkable.</p>
                </div>
                <div className="p-ctaBtns">
                  <button className="p-btn-p" onClick={() => onSectionChange && onSectionChange('contact')}>
                    Let's Connect
                  </button>
                  <a href="https://github.com/Brian2021-Mwalish" target="_blank" rel="noopener noreferrer" className="p-btn-o">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.52-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.05.78 2.12v3.14c0 .3.2.66.79.55C20.22 21.4 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>

          </motion.div>

          {/* ── FOOTER ── */}
          <footer className="p-foot">
            <div className="p-footCopy">
              <span className="p-footTxt">© 2025 Brian Mwalish</span>
              <span className="p-footSep" />
              <span className="p-footTxt">Software Engineer · Eldoret KE</span>
            </div>
          </footer>

        </div>
      </section>

      {openProject && <DetailDrawer project={openProject} onClose={() => setOpenProject(null)} />}
    </>
  );
};

export default Projects;