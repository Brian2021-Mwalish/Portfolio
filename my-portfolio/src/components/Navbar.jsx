import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Home, FolderOpen, User, Briefcase, Star, Smile, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

/* ── Magnetic button ── */
const MagneticBtn = ({ children, className, onClick, active, style, 'aria-label': ariaLabel, 'aria-haspopup': ariaHaspopup, 'aria-expanded': ariaExpanded }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isTouchRef = useRef(false);

  const handleMove = (e) => {
    if (isTouchRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.14,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.14,
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

/* ── Logo: hex mark + wordmark, consistent with Hero/Projects/Contact ── */
const Logo = ({ onClick }) => (
  <motion.div
    onClick={onClick}
    whileTap={{ scale: 0.96 }}
    className="nb-logoWrap"
    role="link"
    tabIndex={0}
    aria-label="Go to home"
    onKeyDown={e => e.key === 'Enter' && onClick()}
  >
    <motion.span
      className="nb-hexMark"
      whileHover={{ scale: 1.06, rotate: 6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      aria-hidden="true"
    />
    <span className="nb-logoText">Mwalish<span>.dev</span></span>
  </motion.div>
);

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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        :root {
          /* site tokens (unchanged — used only by the light dropdown card) */
          --ink: #111827;
          --ink-secondary: #4B5563;
          --ink-muted: #6B7280;
          --accent: #2563EB;
          --accent-hover: #1D4ED8;
          --paper: #F3F4F6;
          --surface: #FFFFFF;
          --line: #E5E7EB;

          /* navbar-only dark tokens */
          --nb-bg: rgba(17,24,39,0.6);
          --nb-bg-scrolled: rgba(15,20,32,0.92);
          --nb-text: #F9FAFB;
          --nb-text-secondary: #C7CBD4;
          --nb-text-muted: #9CA3AF;
          --nb-border: rgba(255,255,255,0.08);
          --nb-hover-bg: rgba(255,255,255,0.08);
          --nb-accent: #60A5FA;

          --hex: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        *, *::before, *::after { box-sizing: border-box; }
        .nb-nav  { font-family: 'Plus Jakarta Sans', sans-serif; }
        .nb-mono { font-family: 'JetBrains Mono', monospace; }

        .nb-focus-ring:focus-visible {
          outline: 2px solid var(--nb-accent);
          outline-offset: 3px;
          border-radius: 8px;
        }

        /* ── Top bar (dark) ── */
        .nb-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: flex; align-items: center;
          height: 76px;
          padding: 0 1.5rem;
          background: var(--nb-bg);
          backdrop-filter: blur(10px) saturate(1.3);
          -webkit-backdrop-filter: blur(10px) saturate(1.3);
          border-bottom: 1px solid transparent;
          transition: background 300ms ease, border-color 300ms ease, box-shadow 300ms ease, backdrop-filter 300ms ease;
        }
        .nb-bar.scrolled {
          background: var(--nb-bg-scrolled);
          backdrop-filter: blur(18px) saturate(1.4);
          -webkit-backdrop-filter: blur(18px) saturate(1.4);
          border-bottom: 1px solid var(--nb-border);
          box-shadow: 0 8px 32px rgba(0,0,0,0.35);
        }

        /* ── Desktop nav inner wrapper ── */
        .nb-nav-inner { display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%; gap: 8px; }

        /* ── Logo ── */
        .nb-logoWrap { cursor: pointer; position: relative; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .nb-hexMark {
          display: inline-block; width: 28px; height: 28px;
          background-color: var(--nb-accent);
          clip-path: var(--hex);
          flex-shrink: 0;
        }
        .nb-logoText { font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 16px; color: var(--nb-text); letter-spacing: -0.01em; }
        .nb-logoText span { color: var(--nb-accent); }

        /* ── Desktop links container ── */
        .nb-desktop-links { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

        /* ── Pill nav ── */
        .nb-pill {
          position: relative; padding: 10px 18px; border-radius: 999px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 500; letter-spacing: 0;
          color: var(--nb-text-secondary); background: transparent; border: none;
          cursor: pointer; overflow: visible; white-space: nowrap;
          display: inline-flex; align-items: center; gap: 7px;
          transition: color 250ms ease;
        }
        .nb-pill::after {
          content: '';
          position: absolute; left: 18px; right: 18px; bottom: 4px;
          height: 2px; border-radius: 2px;
          background: var(--nb-accent);
          transform: scaleX(0); transform-origin: center;
          transition: transform 250ms ease;
        }
        .nb-pill:hover { color: var(--nb-text); }
        .nb-pill[data-active='true'] { color: var(--nb-accent); }
        .nb-pill[data-active='true']::after { transform: scaleX(1); }
        .nb-pill > * { position: relative; z-index: 1; }

        /* ── Contact CTA ── */
        .nb-contact {
          padding: 11px 22px; border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 600; letter-spacing: 0;
          border: 1.5px solid var(--nb-accent);
          color: var(--nb-accent); background: transparent;
          cursor: pointer; white-space: nowrap;
          display: inline-flex; align-items: center; gap: 8px;
          transition: background 250ms ease, color 250ms ease, transform 250ms ease, box-shadow 250ms ease;
        }
        .nb-contact:hover {
          background: var(--nb-accent); color: #0B0F19;
          transform: scale(1.02);
          box-shadow: 0 8px 20px rgba(96,165,250,0.28);
        }
        .nb-contact[data-active='true'] { background: var(--nb-accent); border-color: var(--nb-accent); color: #0B0F19; }

        /* ── Dropdown (stays a light card, like the rest of the site) ── */
        .nb-dropdown {
          position: absolute; top: calc(100% + 12px); left: 50%; transform: translateX(-50%);
          width: 216px; background: var(--surface);
          border: 1px solid var(--line);
          border-radius: 16px; overflow: hidden;
          box-shadow: 0 20px 48px rgba(17,24,39,0.18);
          z-index: 60;
        }
        .nb-dd-arrow {
          position: absolute; top: -7px; left: 50%; transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 7px solid transparent; border-right: 7px solid transparent;
          border-bottom: 7px solid var(--surface);
        }
        .nb-dd-item {
          display: flex; align-items: center; gap: 12px; padding: 12px 16px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 500; letter-spacing: 0;
          color: var(--ink-secondary); background: transparent; border: none;
          width: 100%; text-align: left; cursor: pointer;
          transition: background 200ms ease, color 200ms ease;
        }
        .nb-dd-item .dd-icon-wrap {
          width: 26px; height: 26px; display: flex; align-items: center; justify-content: center;
          border-radius: 8px; background: var(--paper); color: var(--accent); flex-shrink: 0;
          transition: background 200ms ease, color 200ms ease;
        }
        .nb-dd-item:hover, .nb-dd-item.active { background: var(--paper); color: var(--ink); }
        .nb-dd-item:hover .dd-icon-wrap, .nb-dd-item.active .dd-icon-wrap { background: var(--accent); color: #fff; }
        .nb-dd-sep { height: 1px; background: var(--line); margin: 0 12px; }

        /* ── Hamburger ── */
        .nb-ham {
          display: none; flex-direction: column; justify-content: center;
          gap: 5px; background: none; border: none;
          cursor: pointer; padding: 8px 6px; border-radius: 10px;
          transition: background 200ms ease; flex-shrink: 0;
        }
        .nb-ham:hover { background: var(--nb-hover-bg); }

        /* ── Mobile sidebar (dark, matches the bar) ── */
        .nb-sidebar {
          position: fixed; top: 0; left: 0; height: 100%; width: min(300px, 85vw);
          background: #111827;
          border-right: 1px solid var(--nb-border);
          z-index: 60;
          display: flex; flex-direction: column; overflow: hidden;
        }
        .nb-sb-btn {
          display: flex; align-items: center; gap: 12px;
          width: 100%; text-align: left; padding: 14px 16px; border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 500; letter-spacing: 0;
          color: var(--nb-text-secondary); background: transparent; border: none;
          cursor: pointer; transition: background 200ms ease, color 200ms ease;
        }
        .nb-sb-btn .sb-icon {
          width: 34px; height: 34px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06); color: var(--nb-accent); flex-shrink: 0;
          transition: background 200ms ease, color 200ms ease;
          border: 1px solid var(--nb-border);
        }
        .nb-sb-btn:hover { background: var(--nb-hover-bg); color: var(--nb-text); }
        .nb-sb-btn.active { background: var(--nb-accent); color: #0B0F19; }
        .nb-sb-btn.active .sb-icon { background: rgba(11,15,25,0.18); color: #0B0F19; border-color: transparent; }

        .nb-sb-sub {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 14px; border-radius: 10px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 14px; font-weight: 500; letter-spacing: 0;
          color: var(--nb-text-secondary); background: transparent; border: none;
          cursor: pointer; width: 100%; text-align: left;
          transition: background 200ms ease, color 200ms ease;
        }
        .nb-sb-sub .sub-icon { color: var(--nb-accent); flex-shrink: 0; }
        .nb-sb-sub:hover  { color: var(--nb-text); background: var(--nb-hover-bg); }
        .nb-sb-sub.active { color: var(--nb-accent); }
        .nb-sb-sub.active .sub-icon { color: var(--nb-accent); }

        .nb-sb-scroll::-webkit-scrollbar { width: 4px; }
        .nb-sb-scroll::-webkit-scrollbar-track { background: transparent; }
        .nb-sb-scroll::-webkit-scrollbar-thumb { background: var(--nb-border); border-radius: 2px; }

        .nb-sb-contact {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 15px; border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 16px; font-weight: 600; letter-spacing: 0;
          border: 1.5px solid var(--nb-accent);
          color: var(--nb-accent); background: transparent;
          cursor: pointer; transition: all 250ms ease;
        }
        .nb-sb-contact:hover, .nb-sb-contact.active { background: var(--nb-accent); color: #0B0F19; }

        /* ── RESPONSIVE BREAKPOINTS ── */
        @media (min-width: 1024px) {
          .nb-bar { padding: 0 3rem; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .nb-bar { padding: 0 1.5rem; }
          .nb-desktop-links { gap: 4px; }
          .nb-pill { padding: 9px 12px; font-size: 14px; }
          .nb-contact { padding: 9px 16px; font-size: 14px; }
          .nb-pill-label { display: none; }
        }

        @media (max-width: 767px) {
          .nb-desktop-links { display: none !important; }
          .nb-ham { display: flex !important; }
          .nb-bar { padding: 0 1.25rem; height: 64px; }
        }

        @media (max-width: 380px) {
          .nb-bar { padding: 0 1rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .nb-bar { transition: none !important; }
        }
      `}</style>

      {/* ══════════ TOP NAVBAR ══════════ */}
      <nav
        className={`nb-nav nb-bar ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="nb-nav-inner">

          <Logo onClick={() => go('hero')} />

          {/* ── Desktop links ── */}
          <div className="nb-desktop-links" role="menubar">
            {NAV_LINKS.map(({ name, section, Icon }) => (
              <MagneticBtn
                key={section}
                className="nb-pill nb-focus-ring"
                active={activeSection === section}
                onClick={() => go(section)}
                aria-label={name}
              >
                <Icon size={14} aria-hidden="true" />
                <span className="nb-pill-label">{name}</span>
              </MagneticBtn>
            ))}

            {/* About dropdown — desktop only, uses desktopDropdownOpen */}
            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <MagneticBtn
                className="nb-pill nb-focus-ring"
                active={isAboutActive}
                onClick={() => setDesktopDropdownOpen(o => !o)}
                aria-label="About Me menu"
                aria-haspopup="true"
                aria-expanded={desktopDropdownOpen}
              >
                <User size={14} aria-hidden="true" />
                <span className="nb-pill-label">About Me</span>
                <motion.span
                  animate={{ rotate: desktopDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden="true"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ChevronDown size={13} />
                </motion.span>
              </MagneticBtn>

              <AnimatePresence>
                {desktopDropdownOpen && (
                  <motion.div
                    className="nb-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    role="menu"
                  >
                    <div className="nb-dd-arrow" aria-hidden="true" />
                    {ABOUT_ITEMS.map(({ name, section, Icon: ItemIcon }, i) => (
                      <React.Fragment key={section}>
                        {i > 0 && <div className="nb-dd-sep" role="separator" />}
                        <motion.button
                          className={`nb-dd-item nb-focus-ring ${activeSection === section ? 'active' : ''}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => go(section)}
                          role="menuitem"
                          aria-current={activeSection === section ? 'page' : undefined}
                        >
                          <span className="dd-icon-wrap" aria-hidden="true">
                            <ItemIcon size={14} />
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
              className="nb-contact nb-focus-ring"
              active={activeSection === 'contact'}
              onClick={() => go('contact')}
              aria-label="Contact us"
            >
              <Mail size={14} aria-hidden="true" />
              <span className="nb-pill-label">Contact</span>
            </MagneticBtn>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <motion.button
            className="nb-ham nb-focus-ring"
            onClick={() => setNavOpen(o => !o)}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="nb-mobile-menu"
          >
            <motion.span
              animate={{ rotate: navOpen ? 45 : 0, y: navOpen ? 7 : 0 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'block', width: 22, height: 2, background: 'var(--nb-text)', borderRadius: 99 }}
            />
            <motion.span
              animate={{ opacity: navOpen ? 0 : 1, scaleX: navOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 22, height: 2, background: 'var(--nb-text)', borderRadius: 99 }}
            />
            <motion.span
              animate={{ rotate: navOpen ? -45 : 0, y: navOpen ? -7 : 0 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'block', width: 22, height: 2, background: 'var(--nb-text)', borderRadius: 99 }}
            />
          </motion.button>
        </div>
      </nav>

      {/* ══════════ MOBILE SIDEBAR ══════════ */}
      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              key="nb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 55,
                background: 'rgba(0,0,0,0.55)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
              onClick={() => setNavOpen(false)}
              aria-hidden="true"
            />

            <motion.aside
              key="nb-sidebar"
              id="nb-mobile-menu"
              className="nb-sidebar"
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
                padding: '20px 20px 18px',
                borderBottom: '1px solid var(--nb-border)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="nb-hexMark" aria-hidden="true" style={{ width: 24, height: 24 }} />
                  <span className="nb-logoText" style={{ fontSize: 15 }}>Mwalish<span>.dev</span></span>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setNavOpen(false)}
                  className="nb-focus-ring"
                  aria-label="Close menu"
                  style={{
                    color: 'var(--nb-text-secondary)', background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--nb-border)', borderRadius: 10, padding: 8, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Nav links — mobile uses mobileDropdownOpen */}
              <nav className="nb-sb-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '24px 16px', flex: 1, overflowY: 'auto' }}>
                {NAV_LINKS.map(({ name, section, Icon }, i) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => go(section)}
                    className={`nb-sb-btn nb-focus-ring ${activeSection === section ? 'active' : ''}`}
                    aria-current={activeSection === section ? 'page' : undefined}
                  >
                    <span className="sb-icon" aria-hidden="true"><Icon size={16} /></span>
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
                    className={`nb-sb-btn nb-focus-ring ${isAboutActive ? 'active' : ''}`}
                    aria-expanded={mobileDropdownOpen}
                    style={{ width: '100%' }}
                  >
                    <span className="sb-icon" aria-hidden="true"><User size={16} /></span>
                    About Me
                    <motion.span
                      animate={{ rotate: mobileDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                      aria-hidden="true"
                    >
                      <ChevronDown size={16} />
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
                          marginLeft: 14, marginTop: 6, paddingLeft: 14,
                          borderLeft: '2px solid var(--nb-border)',
                          display: 'flex', flexDirection: 'column', gap: 3,
                        }}>
                          {ABOUT_ITEMS.map(({ name, section, Icon: ItemIcon }, i) => (
                            <motion.button
                              key={section}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                              onClick={() => go(section)}
                              className={`nb-sb-sub nb-focus-ring ${activeSection === section ? 'active' : ''}`}
                              aria-current={activeSection === section ? 'page' : undefined}
                            >
                              <span className="sub-icon" aria-hidden="true"><ItemIcon size={14} /></span>
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
                  className={`nb-sb-contact nb-focus-ring ${activeSection === 'contact' ? 'active' : ''}`}
                  aria-current={activeSection === 'contact' ? 'page' : undefined}
                >
                  <Mail size={16} aria-hidden="true" />
                  Contact Us
                </motion.button>
              </nav>

              <div style={{
                padding: '16px 20px',
                borderTop: '1px solid var(--nb-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span className="nb-mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--nb-text-muted)' }}>
                  © 2025 Mwalish Dev
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--nb-accent)', display: 'inline-block' }} aria-hidden="true" />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;