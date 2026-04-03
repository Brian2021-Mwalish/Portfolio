import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Zap, Home, FolderOpen, User, Briefcase, Star, Smile, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const logoImage = "/Kraftrix Africa.jpg";

const NAV_LINKS = [
  { name: 'Home',     section: 'hero',     Icon: Home },
  { name: 'Projects', section: 'projects', Icon: FolderOpen },
];

const ABOUT_ITEMS = [
  { name: 'About',        section: 'about',        icon: '◈', Icon: User },
  { name: 'Experience',   section: 'experience',   icon: '◉', Icon: Briefcase },
  { name: 'Testimonials', section: 'testimonials', icon: '◎', Icon: Star },
  { name: 'Fun Facts',    section: 'funfacts',     icon: '◆', Icon: Smile },
];

/* ── Animated ticker (subtle live counter) ── */
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

/* ── Magnetic button (desktop only; touch-safe) ── */
const MagneticBtn = ({ children, className, onClick, active, 'aria-label': ariaLabel }) => {
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
      data-active={active}
      aria-pressed={active}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
};

/* ══════════════════════════════════════════════
   MAIN NAVBAR
══════════════════════════════════════════════ */
const Navbar = ({ onSectionChange, activeSection }) => {
  const [navOpen, setNavOpen]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setNavOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* Lock body scroll when sidebar is open */
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  const go = (section) => {
    onSectionChange(section);
    setNavOpen(false);
    setDropdownOpen(false);
  };

  const isAboutActive = ABOUT_ITEMS.some(i => i.section === activeSection);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

        /* ── Color tokens (WCAG AA / color-blind safe) ──
           • Gold  → warm yellow  (#F5C842)  contrast on dark: 9.3:1 ✓
           • Ember → orange-red   (#FF6B35)  contrast on dark: 5.1:1 ✓
           • Ink   → near-black   (#0A0A0F)
           • Pearl → off-white    (#F0EDE8)  contrast on ink: 15.8:1 ✓
           • Focus ring always visible for keyboard nav
        */
        :root {
          --kx-gold:    #F5C842;
          --kx-gold-dk: #C9A020;   /* darker variant for text-on-light */
          --kx-ember:   #FF6B35;
          --kx-ember-dk:#D94B15;
          --kx-ink:     #0A0A0F;
          --kx-slate:   #14142A;
          --kx-pearl:   #F0EDE8;
          --kx-mist:    #C8C4BC;   /* secondary text — more legible than dim white */
          --kx-glass:   rgba(10,10,18,0.84);
          --kx-border:  rgba(245,200,66,0.28);
          --kx-focus:   #60C8FF;   /* high-vis blue focus ring (safe for deuteranopia) */
        }

        /* ─── Global resets ─── */
        *, *::before, *::after { box-sizing: border-box; }

        .kx-nav  { font-family: 'Syne', sans-serif; }
        .kx-mono { font-family: 'Space Mono', monospace; }

        /* ─── Focus-visible ring (keyboard accessibility) ─── */
        .kx-focus-ring:focus-visible {
          outline: 2.5px solid var(--kx-focus);
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* ─── Top bar ─── */
        .kx-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: flex; align-items: center;
          height: 64px;
          padding: 0 1.5rem;
          background: var(--kx-ink);
          border-bottom: 1px solid transparent;
          transition: background 0.4s ease, border-color 0.4s ease,
                      box-shadow 0.4s ease, border-radius 0.4s ease,
                      left 0.4s ease, right 0.4s ease, top 0.4s ease;
          will-change: transform;
        }
        .kx-bar.scrolled {
          top: 6px;
          left: 50%;
          right: auto;
          transform: translateX(-50%);
          width: calc(100% - 2rem);
          max-width: 1240px;
          border-radius: 999px;
          background: var(--kx-glass);
          backdrop-filter: blur(20px) saturate(1.6);
          -webkit-backdrop-filter: blur(20px) saturate(1.6);
          border-bottom: none;
          box-shadow: 0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px var(--kx-border);
        }

        /* ─── Logo ─── */
        .kx-logo-img {
          border-radius: 50%;
          display: block;
          object-fit: cover;
          border: 1.5px solid rgba(245,200,66,0.45);
          transition: filter 0.25s, transform 0.25s;
        }
        .kx-logo-img:hover { filter: brightness(1.08); }

        /* ─── Pill nav buttons ─── */
        .kx-pill {
          position: relative;
          padding: 7px 18px;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--kx-mist);
          background: transparent;
          border: none;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          transition: color 0.25s;
        }
        /* Underline indicator — visible shape for color-blind users */
        .kx-pill::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 18px; right: 18px;
          height: 2px;
          background: var(--kx-gold);
          border-radius: 1px;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        .kx-pill::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(245,200,66,0.12);
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        .kx-pill:hover::before,
        .kx-pill[data-active='true']::before  { transform: scaleX(1); }
        .kx-pill:hover::after,
        .kx-pill[data-active='true']::after   { transform: scaleX(1); }
        .kx-pill:hover,
        .kx-pill[data-active='true']          { color: var(--kx-gold); }
        .kx-pill > * { position: relative; z-index: 1; }

        /* ─── Contact CTA ─── */
        .kx-contact {
          padding: 7px 22px;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          border: 2px solid var(--kx-ember);
          color: var(--kx-pearl);
          background: transparent;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.25s, color 0.25s, box-shadow 0.25s;
        }
        .kx-contact:hover,
        .kx-contact[data-active='true'] {
          background: var(--kx-ember);
          color: #fff;
          box-shadow: 0 0 20px rgba(255,107,53,0.4), 0 2px 8px rgba(0,0,0,0.3);
        }

        /* ─── Dropdown ─── */
        .kx-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          width: 210px;
          background: var(--kx-slate);
          border: 1px solid var(--kx-border);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04);
          z-index: 60;
        }
        .kx-dd-arrow {
          position: absolute; top: -7px; left: 50%; transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 7px solid transparent;
          border-right: 7px solid transparent;
          border-bottom: 7px solid var(--kx-slate);
        }
        .kx-dd-item {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 16px;
          font-family: 'Syne', sans-serif;
          font-size: 12px; font-weight: 700;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--kx-mist);
          background: transparent; border: none;
          width: 100%; text-align: left; cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .kx-dd-item .dd-icon-wrap {
          width: 26px; height: 26px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 7px;
          background: rgba(245,200,66,0.1);
          color: var(--kx-gold);
          flex-shrink: 0;
          transition: background 0.18s;
        }
        .kx-dd-item:hover,
        .kx-dd-item.active {
          background: rgba(245,200,66,0.1);
          color: var(--kx-pearl);
        }
        .kx-dd-item:hover .dd-icon-wrap,
        .kx-dd-item.active .dd-icon-wrap {
          background: var(--kx-gold);
          color: var(--kx-ink);
        }
        .kx-dd-sep { height: 1px; background: var(--kx-border); margin: 0 12px; }

        /* ─── Hamburger ─── */
        .kx-ham {
          display: flex; flex-direction: column; justify-content: center;
          gap: 5px; background: none; border: none;
          cursor: pointer; padding: 8px 6px; border-radius: 8px;
          transition: background 0.2s;
        }
        .kx-ham:hover { background: rgba(245,200,66,0.08); }
        .kx-ham span {
          display: block; width: 22px; height: 2px;
          background: var(--kx-pearl); border-radius: 99px;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.2s;
        }
        .kx-ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .kx-ham.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .kx-ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* ─── Mobile sidebar ─── */
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
          background: rgba(255,255,255,0.06);
          flex-shrink: 0; transition: background 0.18s;
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

        /* Scrollbar in sidebar */
        .kx-sb-scroll::-webkit-scrollbar { width: 4px; }
        .kx-sb-scroll::-webkit-scrollbar-track { background: transparent; }
        .kx-sb-scroll::-webkit-scrollbar-thumb { background: rgba(245,200,66,0.2); border-radius: 2px; }

        /* Mobile contact button */
        .kx-sb-contact {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 14px;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-size: 14px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          border: 2px solid var(--kx-ember);
          color: var(--kx-ember); background: transparent;
          cursor: pointer; transition: all 0.22s;
        }
        .kx-sb-contact:hover,
        .kx-sb-contact.active {
          background: var(--kx-ember); color: #fff;
          box-shadow: 0 0 24px rgba(255,107,53,0.35);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .kx-bar, .kx-pill::before, .kx-pill::after,
          .kx-contact, .kx-logo-img { transition: none !important; }
        }
      `}</style>

      {/* ══════════ TOP NAVBAR ══════════ */}
      <nav
        className={`kx-nav kx-bar ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between w-full h-full">

          {/* ── Logo ── */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => go('hero')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            role="link"
            tabIndex={0}
            aria-label="Go to home"
            onKeyDown={e => e.key === 'Enter' && go('hero')}
          >
            <img
              src={logoImage}
              alt="Kraftrix Africa logo"
              width={48} height={48}
              className="kx-logo-img"
              style={{ width: 44, height: 44 }}
            />
            <div className="flex flex-col leading-none">
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 15, color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                Kraftrix <span style={{ color: 'var(--kx-gold)' }}>Africa</span>
              </span>
              <span className="kx-mono" style={{ fontSize: 9, color: 'var(--kx-ember)', letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1.4 }}>
                Technologies
              </span>
            </div>
            <Ticker />
          </motion.div>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-1" role="menubar">
            {NAV_LINKS.map(({ name, section, Icon }) => (
              <MagneticBtn
                key={section}
                className="kx-pill kx-focus-ring"
                active={activeSection === section}
                onClick={() => go(section)}
                aria-label={name}
              >
                <Icon size={13} aria-hidden="true" />
                <span>{name}</span>
              </MagneticBtn>
            ))}

            {/* About dropdown */}
            <div className="relative" ref={dropdownRef}>
              <MagneticBtn
                className="kx-pill kx-focus-ring"
                active={isAboutActive}
                onClick={() => setDropdownOpen(o => !o)}
                aria-label="About Me menu"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <User size={13} aria-hidden="true" />
                <span>About Me</span>
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  aria-hidden="true"
                >
                  <ChevronDown size={12} />
                </motion.span>
              </MagneticBtn>

              <AnimatePresence>
                {dropdownOpen && (
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
              <Mail size={13} style={{ marginRight: 4 }} aria-hidden="true" />
              Contact
            </MagneticBtn>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            className={`kx-ham md:hidden kx-focus-ring`}
            style={{ display: 'none' }}
            id="kx-ham-btn"
            onClick={() => setNavOpen(o => !o)}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="kx-mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Inline style trick: show ham on mobile */}
          <style>{`
            @media (max-width: 767px) {
              #kx-ham-btn { display: flex !important; }
              #kx-ham-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
              #kx-ham-btn.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
              #kx-ham-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
            }
          `}</style>

          {/* apply 'open' class on navOpen */}
          <button
            className={`kx-ham kx-focus-ring md:hidden`}
            onClick={() => setNavOpen(o => !o)}
            aria-label={navOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={navOpen}
            aria-controls="kx-mobile-menu"
            style={{ display: undefined }}
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
          </button>
        </div>
      </nav>

      {/* ══════════ MOBILE SIDEBAR ══════════ */}
      <AnimatePresence>
        {navOpen && (
          <>
            {/* Backdrop */}
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

            {/* Sidebar */}
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
                  <span className="kx-mono" style={{ fontSize: 9, color: 'var(--kx-ember)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
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

              {/* Nav links */}
              <nav className="kx-sb-scroll flex flex-col gap-1.5 px-3 py-5 flex-1 overflow-y-auto">
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
                    <span className="sb-icon" aria-hidden="true">
                      <Icon size={15} />
                    </span>
                    {name}
                  </motion.button>
                ))}

                {/* About Me expandable */}
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 }}
                >
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className={`kx-sb-btn kx-focus-ring ${isAboutActive ? 'active' : ''}`}
                    aria-expanded={dropdownOpen}
                    style={{ width: '100%' }}
                  >
                    <span className="sb-icon" aria-hidden="true">
                      <User size={15} />
                    </span>
                    About Me
                    <motion.span
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
                      aria-hidden="true"
                    >
                      <ChevronDown size={15} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
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
                              <span className="sub-icon" aria-hidden="true">
                                <ItemIcon size={13} />
                              </span>
                              {name}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Spacer */}
                <div style={{ flex: 1, minHeight: 16 }} />

                {/* Contact CTA */}
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

              {/* Footer */}
              <div style={{
                padding: '14px 20px',
                borderTop: '1px solid var(--kx-border)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span className="kx-mono" style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#444' }}>
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