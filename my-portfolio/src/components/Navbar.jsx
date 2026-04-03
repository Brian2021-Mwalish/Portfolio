import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Home, FolderOpen, User, Briefcase, Star, Smile, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const logoImage = "/Kraftrix Africa.jpg";

const NAV_LINKS = [
  { name: 'Home',     section: 'hero',     Icon: Home },
  { name: 'Projects', section: 'projects', Icon: FolderOpen },
];

const ABOUT_ITEMS = [
  { name: 'About',        section: 'about',        Icon: User },
  { name: 'Experience',   section: 'experience',   Icon: Briefcase },
  { name: 'Testimonials', section: 'testimonials', Icon: Star },
  { name: 'Fun Facts',    section: 'funfacts',     Icon: Smile },
];

/* ── Animated ticker ── */
const Ticker = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(c => (c + 1) % 100), 80);
    return () => clearInterval(id);
  }, []);
  return (
    <span aria-hidden="true" className="kx-ticker font-mono text-[10px] opacity-40 select-none tabular-nums">
      {String(count).padStart(2, '0')}
    </span>
  );
};

/* ── Magnetic button ── */
const MagneticBtn = ({ children, className, onClick, active, style, 'aria-label': ariaLabel, 'aria-haspopup': ariaHaspopup, 'aria-expanded': ariaExpanded }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  const handleMove = (e) => {
    if (isTouchRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.22,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.22,
    });
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      onTouchStart={() => { isTouchRef.current = true; }}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      onClick={onClick}
      className={className}
      style={style}
      data-active={active}
      aria-pressed={active}
      aria-label={ariaLabel}
      aria-haspopup={ariaHaspopup}
      aria-expanded={ariaExpanded}
    >
      {children}
    </motion.button>
  );
};

/* ── Shiny Logo with light beams ── */
const ShinyLogo = ({ onClick }) => {
  const [hovered, setHovered] = useState(false);
  const [beamAngle, setBeamAngle] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setBeamAngle(a => (a + 1.2) % 360), 30);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={{ scale: 0.95 }}
      className="kx-logo-wrap"
      role="link"
      tabIndex={0}
      aria-label="Go to home"
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{ cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}
    >
      {/* Logo orb container */}
      <div style={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
        {/* Outer glow ring */}
        <motion.div
          animate={{
            boxShadow: hovered
              ? '0 0 0 2px rgba(220,220,255,0.6), 0 0 22px rgba(180,180,255,0.5), 0 0 45px rgba(200,160,255,0.3)'
              : '0 0 0 1.5px rgba(200,200,240,0.35), 0 0 14px rgba(160,160,220,0.25), 0 0 28px rgba(180,140,255,0.15)',
          }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', inset: -3, borderRadius: '50%', pointerEvents: 'none', zIndex: 3 }}
        />
        {/* Rotating beam ring */}
        <div style={{
          position: 'absolute', inset: -6, borderRadius: '50%',
          background: `conic-gradient(from ${beamAngle}deg, transparent 0deg, rgba(200,180,255,0.7) 20deg, rgba(255,240,200,0.9) 40deg, rgba(200,220,255,0.7) 60deg, transparent 80deg, transparent 360deg)`,
          WebkitMaskImage: 'radial-gradient(circle, transparent 48%, black 52%, black 100%)',
          maskImage: 'radial-gradient(circle, transparent 48%, black 52%, black 100%)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        {/* Silver sheen overlay */}
        <motion.div
          animate={{ opacity: hovered ? 0.7 : 0.35 }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, transparent 40%, rgba(180,200,255,0.3) 70%, rgba(255,220,150,0.2) 100%)',
            zIndex: 4, pointerEvents: 'none', mixBlendMode: 'overlay',
          }}
        />
        {/* Light sweep */}
        <motion.div
          animate={{ x: hovered ? ['-120%', '120%'] : '-120%' }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.85) 50%, transparent 80%)',
            zIndex: 5, pointerEvents: 'none', overflow: 'hidden',
          }}
        />
        {/* Logo image */}
        <img
          src={logoImage}
          alt="Kraftrix Africa logo"
          width={40} height={40}
          style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', position: 'relative', zIndex: 1, display: 'block' }}
        />
      </div>

      {/* Brand text */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14, color: '#fff', letterSpacing: '-0.01em' }}>
            Kraftrix
          </span>
          <span style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 14,
            background: 'linear-gradient(90deg, #C8A840 0%, #F5D060 30%, #FFF0A0 50%, #F5D060 70%, #C8A840 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            animation: 'kx-gold-shine 3s linear infinite',
          }}>Africa</span>
        </div>
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: 8,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          background: 'linear-gradient(90deg, #FF6B35, #FF9A6C, #FF6B35)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          animation: 'kx-ember-shine 2.5s linear infinite',
        }}>Technologies</span>
      </div>

      <Ticker />
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   MAIN NAVBAR
══════════════════════════════════════════════ */
const Navbar = ({ onSectionChange, activeSection }) => {
  const [navOpen, setNavOpen]                     = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false); // desktop only
  const [mobileDropdownOpen, setMobileDropdownOpen]   = useState(false); // mobile only
  const [scrolled, setScrolled]                   = useState(false);
  const [isMobile, setIsMobile]                   = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDesktopDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (!isMobile) setNavOpen(false);
  }, [isMobile]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  const go = (section) => {
    onSectionChange(section);
    setNavOpen(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
  };

  const isAboutActive = ABOUT_ITEMS.some(i => i.section === activeSection);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

        :root {
          --kx-gold:    #F5C842;
          --kx-gold-dk: #C9A020;
          --kx-ember:   #FF6B35;
          --kx-ink:     #0A0A0F;
          --kx-slate:   #14142A;
          --kx-pearl:   #F0EDE8;
          --kx-mist:    #C8C4BC;
          --kx-glass:   rgba(10,10,18,0.92);
          --kx-border:  rgba(245,200,66,0.28);
          --kx-focus:   #60C8FF;
        }
        *, *::before, *::after { box-sizing: border-box; }
        .kx-nav  { font-family: 'Syne', sans-serif; }
        .kx-mono { font-family: 'Space Mono', monospace; }

        .kx-focus-ring:focus-visible {
          outline: 2.5px solid var(--kx-focus);
          outline-offset: 3px;
          border-radius: 6px;
        }

        @keyframes kx-gold-shine {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes kx-ember-shine {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        /* ── Top bar ── */
        .kx-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: flex; align-items: center;
          height: 64px;
          padding: 0 1.25rem;
          background: var(--kx-ink);
          border-bottom: 1px solid transparent;
          transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .kx-bar.scrolled {
          background: var(--kx-glass);
          backdrop-filter: blur(22px) saturate(1.7);
          -webkit-backdrop-filter: blur(22px) saturate(1.7);
          border-bottom: 1px solid rgba(200,210,255,0.22);
          box-shadow: 0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset;
        }
        .kx-bar.scrolled::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(200,210,255,0.5) 20%, rgba(255,240,200,0.8) 40%, rgba(200,220,255,0.9) 50%, rgba(255,240,200,0.8) 60%, rgba(200,210,255,0.5) 80%, transparent 100%);
          background-size: 200% auto;
          animation: kx-gold-shine 3s linear infinite;
        }

        /* ── Desktop nav inner wrapper ── */
        .kx-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 100%;
          gap: 8px;
        }

        /* ── Desktop links container ── */
        .kx-desktop-links {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }

        /* ── Pill nav ── */
        .kx-pill {
          position: relative;
          padding: 7px 14px;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--kx-mist);
          background: transparent; border: none;
          cursor: pointer; overflow: hidden;
          white-space: nowrap;
          display: inline-flex; align-items: center; gap: 5px;
          transition: color 0.25s;
        }
        .kx-pill::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 14px; right: 14px;
          height: 2px;
          background: linear-gradient(90deg, var(--kx-gold-dk), var(--kx-gold), #FFF0A0, var(--kx-gold));
          border-radius: 1px;
          transform: scaleX(0); transform-origin: center;
          transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        .kx-pill::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(245,200,66,0.1);
          border-radius: 999px;
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        .kx-pill:hover::before, .kx-pill[data-active='true']::before { transform: scaleX(1); }
        .kx-pill:hover::after,  .kx-pill[data-active='true']::after  { transform: scaleX(1); }
        .kx-pill:hover, .kx-pill[data-active='true'] { color: var(--kx-gold); }
        .kx-pill > * { position: relative; z-index: 1; }

        /* ── Contact CTA ── */
        .kx-contact {
          padding: 7px 18px;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase;
          border: 2px solid var(--kx-ember);
          color: var(--kx-pearl);
          background: transparent;
          cursor: pointer; white-space: nowrap;
          display: inline-flex; align-items: center; gap: 5px;
          transition: background 0.25s, color 0.25s, box-shadow 0.25s;
        }
        .kx-contact:hover, .kx-contact[data-active='true'] {
          background: var(--kx-ember); color: #fff;
          box-shadow: 0 0 24px rgba(255,107,53,0.45);
        }

        /* ── Dropdown ── */
        .kx-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%; transform: translateX(-50%);
          width: 200px;
          background: var(--kx-slate);
          border: 1px solid var(--kx-border);
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04);
          z-index: 60;
        }
        .kx-dd-arrow {
          position: absolute; top: -7px; left: 50%; transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 7px solid transparent; border-right: 7px solid transparent;
          border-bottom: 7px solid var(--kx-slate);
        }
        .kx-dd-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--kx-mist);
          background: transparent; border: none;
          width: 100%; text-align: left; cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .kx-dd-item .dd-icon-wrap {
          width: 24px; height: 24px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 6px; background: rgba(245,200,66,0.1);
          color: var(--kx-gold); flex-shrink: 0;
          transition: background 0.18s;
        }
        .kx-dd-item:hover, .kx-dd-item.active { background: rgba(245,200,66,0.1); color: var(--kx-pearl); }
        .kx-dd-item:hover .dd-icon-wrap, .kx-dd-item.active .dd-icon-wrap { background: var(--kx-gold); color: var(--kx-ink); }
        .kx-dd-sep { height: 1px; background: var(--kx-border); margin: 0 12px; }

        /* ── Hamburger ── */
        .kx-ham {
          display: none;
          flex-direction: column; justify-content: center;
          gap: 5px; background: none; border: none;
          cursor: pointer; padding: 8px 6px; border-radius: 8px;
          transition: background 0.2s; flex-shrink: 0;
        }
        .kx-ham:hover { background: rgba(245,200,66,0.08); }

        /* ── Mobile sidebar ── */
        .kx-sidebar {
          position: fixed; top: 0; left: 0; height: 100%; width: min(300px, 85vw);
          background: var(--kx-ink);
          border-right: 1px solid var(--kx-border);
          z-index: 60;
          display: flex; flex-direction: column;
          overflow: hidden;
        }
        .kx-sb-btn {
          display: flex; align-items: center; gap: 12px;
          width: 100%; text-align: left;
          padding: 13px 16px; border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--kx-mist);
          background: transparent; border: none;
          cursor: pointer; transition: background 0.18s, color 0.18s;
        }
        .kx-sb-btn .sb-icon {
          width: 32px; height: 32px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06); flex-shrink: 0;
          transition: background 0.18s;
        }
        .kx-sb-btn:hover { background: rgba(245,200,66,0.08); color: var(--kx-pearl); }
        .kx-sb-btn:hover .sb-icon { background: rgba(245,200,66,0.15); color: var(--kx-gold); }
        .kx-sb-btn.active { background: var(--kx-gold); color: var(--kx-ink); }
        .kx-sb-btn.active .sb-icon { background: rgba(0,0,0,0.15); color: var(--kx-ink); }

        .kx-sb-sub {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 9px;
          font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: #777; background: transparent; border: none;
          cursor: pointer; width: 100%; text-align: left;
          transition: background 0.18s, color 0.18s;
        }
        .kx-sb-sub .sub-icon { color: var(--kx-gold); flex-shrink: 0; }
        .kx-sb-sub:hover  { color: var(--kx-pearl); background: rgba(245,200,66,0.07); }
        .kx-sb-sub.active { color: var(--kx-ember); }
        .kx-sb-sub.active .sub-icon { color: var(--kx-ember); }

        .kx-sb-scroll::-webkit-scrollbar { width: 4px; }
        .kx-sb-scroll::-webkit-scrollbar-track { background: transparent; }
        .kx-sb-scroll::-webkit-scrollbar-thumb { background: rgba(245,200,66,0.2); border-radius: 2px; }

        .kx-sb-contact {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 14px; border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          border: 2px solid var(--kx-ember);
          color: var(--kx-ember); background: transparent;
          cursor: pointer; transition: all 0.22s;
        }
        .kx-sb-contact:hover, .kx-sb-contact.active {
          background: var(--kx-ember); color: #fff;
          box-shadow: 0 0 24px rgba(255,107,53,0.35);
        }

        /* ── RESPONSIVE BREAKPOINTS ── */
        @media (min-width: 1024px) {
          .kx-bar { padding: 0 2rem; }
          .kx-pill { font-size: 13px; padding: 7px 18px; }
          .kx-contact { font-size: 13px; padding: 7px 22px; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .kx-bar { padding: 0 1rem; }
          .kx-desktop-links { gap: 1px; }
          .kx-pill { padding: 7px 10px; font-size: 11px; letter-spacing: 0.02em; }
          .kx-contact { padding: 7px 12px; font-size: 11px; }
          .kx-pill-label { display: none; }
          .kx-pill-label-short { display: inline !important; }
        }

        @media (max-width: 767px) {
          .kx-desktop-links { display: none !important; }
          .kx-ham { display: flex !important; }
          .kx-bar { padding: 0 1rem; height: 60px; }
        }

        @media (max-width: 380px) {
          .kx-bar { padding: 0 0.75rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .kx-bar, .kx-pill::before, .kx-pill::after, .kx-contact { transition: none !important; }
          @keyframes kx-gold-shine { from, to { background-position: 0% center; } }
        }
      `}</style>

      {/* ══════════ TOP NAVBAR ══════════ */}
      <nav
        className={`kx-nav kx-bar ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="kx-nav-inner">

          {/* ── Shiny Logo ── */}
          <ShinyLogo onClick={() => go('hero')} />

          {/* ── Desktop links ── */}
          <div className="kx-desktop-links" role="menubar">
            {NAV_LINKS.map(({ name, section, Icon }) => (
              <MagneticBtn
                key={section}
                className="kx-pill kx-focus-ring"
                active={activeSection === section}
                onClick={() => go(section)}
                aria-label={name}
              >
                <Icon size={13} aria-hidden="true" />
                <span className="kx-pill-label">{name}</span>
              </MagneticBtn>
            ))}

            {/* About dropdown — desktop only, uses desktopDropdownOpen */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <MagneticBtn
                className="kx-pill kx-focus-ring"
                active={isAboutActive}
                onClick={() => setDesktopDropdownOpen(o => !o)}
                aria-label="About Me menu"
                aria-haspopup="true"
                aria-expanded={desktopDropdownOpen}
              >
                <User size={13} aria-hidden="true" />
                <span className="kx-pill-label">About Me</span>
                <motion.span
                  animate={{ rotate: desktopDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden="true"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ChevronDown size={12} />
                </motion.span>
              </MagneticBtn>

              <AnimatePresence>
                {desktopDropdownOpen && (
                  <motion.div
                    className="kx-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    role="menu"
                  >
                    <div className="kx-dd-arrow" aria-hidden="true" />
                    {ABOUT_ITEMS.map(({ name, section, Icon: ItemIcon }, i) => (
                      <React.Fragment key={section}>
                        {i > 0 && <div className="kx-dd-sep" role="separator" />}
                        <motion.button
                          className={`kx-dd-item kx-focus-ring ${activeSection === section ? 'active' : ''}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => go(section)}
                          role="menuitem"
                          aria-current={activeSection === section ? 'page' : undefined}
                        >
                          <span className="dd-icon-wrap" aria-hidden="true">
                            <ItemIcon size={13} />
                          </span>
                          {name}
                        </motion.button>
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <MagneticBtn
              className="kx-contact kx-focus-ring"
              active={activeSection === 'contact'}
              onClick={() => go('contact')}
              aria-label="Contact us"
            >
              <Mail size={13} aria-hidden="true" />
              <span className="kx-pill-label">Contact</span>
            </MagneticBtn>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <motion.button
            className="kx-ham kx-focus-ring"
            onClick={() => setNavOpen(o => !o)}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="kx-mobile-menu"
          >
            <motion.span
              animate={{ rotate: navOpen ? 45 : 0, y: navOpen ? 7 : 0 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'block', width: 22, height: 2, background: 'var(--kx-pearl)', borderRadius: 99 }}
            />
            <motion.span
              animate={{ opacity: navOpen ? 0 : 1, scaleX: navOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 22, height: 2, background: 'var(--kx-pearl)', borderRadius: 99 }}
            />
            <motion.span
              animate={{ rotate: navOpen ? -45 : 0, y: navOpen ? -7 : 0 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'block', width: 22, height: 2, background: 'var(--kx-pearl)', borderRadius: 99 }}
            />
          </motion.button>
        </div>
      </nav>

      {/* ══════════ MOBILE SIDEBAR ══════════ */}
      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              key="kx-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 55,
                background: 'rgba(0,0,0,0.72)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
              onClick={() => setNavOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              key="kx-sidebar"
              id="kx-mobile-menu"
              className="kx-sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 340, damping: 32 }}
              aria-label="Mobile navigation"
              role="dialog"
              aria-modal="true"
            >
              {/* Sidebar header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 20px 16px',
                borderBottom: '1px solid var(--kx-border)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 16, color: 'var(--kx-gold)' }}>
                    Navigation
                  </span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'var(--kx-ember)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                    Kraftrix Africa
                  </span>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setNavOpen(false)}
                  className="kx-focus-ring"
                  aria-label="Close menu"
                  style={{
                    color: 'var(--kx-mist)', background: 'rgba(255,255,255,0.06)',
                    border: 'none', borderRadius: 9, padding: 8, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Nav links — mobile uses mobileDropdownOpen */}
              <nav className="kx-sb-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '20px 12px', flex: 1, overflowY: 'auto' }}>
                {NAV_LINKS.map(({ name, section, Icon }, i) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => go(section)}
                    className={`kx-sb-btn kx-focus-ring ${activeSection === section ? 'active' : ''}`}
                    aria-current={activeSection === section ? 'page' : undefined}
                  >
                    <span className="sb-icon" aria-hidden="true"><Icon size={15} /></span>
                    {name}
                  </motion.button>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 }}
                >
                  <button
                    onClick={() => setMobileDropdownOpen(o => !o)}
                    className={`kx-sb-btn kx-focus-ring ${isAboutActive ? 'active' : ''}`}
                    aria-expanded={mobileDropdownOpen}
                    style={{ width: '100%' }}
                  >
                    <span className="sb-icon" aria-hidden="true"><User size={15} /></span>
                    About Me
                    <motion.span
                      animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                      aria-hidden="true"
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {mobileDropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          marginLeft: 12, marginTop: 4,
                          paddingLeft: 12,
                          borderLeft: '2px solid var(--kx-border)',
                          display: 'flex', flexDirection: 'column', gap: 3,
                        }}>
                          {ABOUT_ITEMS.map(({ name, section, Icon: ItemIcon }, i) => (
                            <motion.button
                              key={section}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                              onClick={() => go(section)}
                              className={`kx-sb-sub kx-focus-ring ${activeSection === section ? 'active' : ''}`}
                              aria-current={activeSection === section ? 'page' : undefined}
                            >
                              <span className="sub-icon" aria-hidden="true"><ItemIcon size={13} /></span>
                              {name}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div style={{ flex: 1, minHeight: 16 }} />

                <motion.button
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => go('contact')}
                  className={`kx-sb-contact kx-focus-ring ${activeSection === 'contact' ? 'active' : ''}`}
                  aria-current={activeSection === 'contact' ? 'page' : undefined}
                >
                  <Mail size={15} aria-hidden="true" />
                  Contact Us
                </motion.button>
              </nav>

              <div style={{
                padding: '14px 20px',
                borderTop: '1px solid var(--kx-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#444' }}>
                  © 2025 Kraftrix Africa
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--kx-gold)', display: 'inline-block' }} aria-hidden="true" />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;