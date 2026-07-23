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
      whileHover={{ scale: 1.08, rotate: 6 }}
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
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

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
        *, *::before, *::after { box-sizing: border-box; }
        .nb-nav  { font-family: 'Space Grotesk', sans-serif; }
        .nb-mono { font-family: 'JetBrains Mono', monospace; }

        .nb-focus-ring:focus-visible {
          outline: 2px solid var(--orange);
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* ── Top bar ── */
        .nb-bar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 50;
          display: flex; align-items: center;
          height: 64px;
          padding: 0 1.25rem;
          background: var(--paper);
          border-bottom: 1px solid transparent;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .nb-bar.scrolled {
          background: rgba(250,249,247,0.92);
          backdrop-filter: blur(14px) saturate(1.3);
          -webkit-backdrop-filter: blur(14px) saturate(1.3);
          border-bottom: 1px solid var(--line);
          box-shadow: 0 4px 24px rgba(91,33,182,0.06);
        }

        /* ── Desktop nav inner wrapper ── */
        .nb-nav-inner { display: flex; align-items: center; justify-content: space-between; width: 100%; height: 100%; gap: 8px; }

        /* ── Logo ── */
        .nb-logoWrap { cursor: pointer; position: relative; display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .nb-hexMark {
          display: inline-block; width: 26px; height: 26px;
          background-color: var(--purple);
          clip-path: var(--hex);
          flex-shrink: 0;
        }
        .nb-logoText { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 15px; color: var(--ink); letter-spacing: -0.01em; }
        .nb-logoText span { color: var(--orange); }

        /* ── Desktop links container ── */
        .nb-desktop-links { display: flex; align-items: center; gap: 2px; flex-shrink: 0; }

        /* ── Pill nav ── */
        .nb-pill {
          position: relative; padding: 8px 14px; border-radius: 999px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12.5px; font-weight: 600; letter-spacing: 0.01em;
          color: var(--slate); background: transparent; border: none;
          cursor: pointer; overflow: hidden; white-space: nowrap;
          display: inline-flex; align-items: center; gap: 6px;
          transition: color 0.22s, background 0.22s;
        }
        .nb-pill:hover, .nb-pill[data-active='true'] { color: var(--purple); background: var(--paper-2); }
        .nb-pill > * { position: relative; z-index: 1; }

        /* ── Contact CTA ── */
        .nb-contact {
          padding: 9px 20px; border-radius: 999px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12.5px; font-weight: 600; letter-spacing: 0.01em;
          border: 1.5px solid var(--purple);
          color: var(--purple); background: transparent;
          cursor: pointer; white-space: nowrap;
          display: inline-flex; align-items: center; gap: 6px;
          transition: background 0.22s, color 0.22s;
        }
        .nb-contact:hover, .nb-contact[data-active='true'] { background: var(--purple); color: #fff; }

        /* ── Dropdown ── */
        .nb-dropdown {
          position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%);
          width: 200px; background: #FFFFFF;
          border: 1px solid var(--line);
          border-radius: 12px; overflow: hidden;
          box-shadow: 0 16px 40px rgba(91,33,182,0.12);
          z-index: 60;
        }
        .nb-dd-arrow {
          position: absolute; top: -7px; left: 50%; transform: translateX(-50%);
          width: 0; height: 0;
          border-left: 7px solid transparent; border-right: 7px solid transparent;
          border-bottom: 7px solid #FFFFFF;
        }
        .nb-dd-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 14px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px; font-weight: 600; letter-spacing: 0.01em;
          color: var(--slate); background: transparent; border: none;
          width: 100%; text-align: left; cursor: pointer;
          transition: background 0.16s, color 0.16s;
        }
        .nb-dd-item .dd-icon-wrap {
          width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;
          border-radius: 6px; background: var(--paper-2); color: var(--purple); flex-shrink: 0;
          transition: background 0.16s;
        }
        .nb-dd-item:hover, .nb-dd-item.active { background: var(--paper-2); color: var(--ink); }
        .nb-dd-item:hover .dd-icon-wrap, .nb-dd-item.active .dd-icon-wrap { background: var(--purple); color: #fff; }
        .nb-dd-sep { height: 1px; background: var(--line); margin: 0 12px; }

        /* ── Hamburger ── */
        .nb-ham {
          display: none; flex-direction: column; justify-content: center;
          gap: 5px; background: none; border: none;
          cursor: pointer; padding: 8px 6px; border-radius: 8px;
          transition: background 0.2s; flex-shrink: 0;
        }
        .nb-ham:hover { background: var(--paper-2); }

        /* ── Mobile sidebar ── */
        .nb-sidebar {
          position: fixed; top: 0; left: 0; height: 100%; width: min(300px, 85vw);
          background: var(--paper);
          border-right: 1px solid var(--line);
          z-index: 60;
          display: flex; flex-direction: column; overflow: hidden;
        }
        .nb-sb-btn {
          display: flex; align-items: center; gap: 12px;
          width: 100%; text-align: left; padding: 13px 16px; border-radius: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: 0.01em;
          color: var(--slate); background: transparent; border: none;
          cursor: pointer; transition: background 0.18s, color 0.18s;
        }
        .nb-sb-btn .sb-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          background: var(--paper-2); color: var(--purple); flex-shrink: 0;
          transition: background 0.18s, color 0.18s;
        }
        .nb-sb-btn:hover { background: var(--paper-2); color: var(--ink); }
        .nb-sb-btn.active { background: var(--purple); color: #fff; }
        .nb-sb-btn.active .sb-icon { background: rgba(255,255,255,0.18); color: #fff; }

        .nb-sb-sub {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px; border-radius: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12.5px; font-weight: 600; letter-spacing: 0.01em;
          color: var(--slate); background: transparent; border: none;
          cursor: pointer; width: 100%; text-align: left;
          transition: background 0.18s, color 0.18s;
        }
        .nb-sb-sub .sub-icon { color: var(--purple); flex-shrink: 0; }
        .nb-sb-sub:hover  { color: var(--ink); background: var(--paper-2); }
        .nb-sb-sub.active { color: var(--orange); }
        .nb-sb-sub.active .sub-icon { color: var(--orange); }

        .nb-sb-scroll::-webkit-scrollbar { width: 4px; }
        .nb-sb-scroll::-webkit-scrollbar-track { background: transparent; }
        .nb-sb-scroll::-webkit-scrollbar-thumb { background: var(--line); border-radius: 2px; }

        .nb-sb-contact {
          display: flex; align-items: center; justify-content: center; gap: 10px;
          width: 100%; padding: 14px; border-radius: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px; font-weight: 600; letter-spacing: 0.01em;
          border: 1.5px solid var(--purple);
          color: var(--purple); background: transparent;
          cursor: pointer; transition: all 0.22s;
        }
        .nb-sb-contact:hover, .nb-sb-contact.active { background: var(--purple); color: #fff; }

        /* ── RESPONSIVE BREAKPOINTS ── */
        @media (min-width: 1024px) {
          .nb-bar { padding: 0 2rem; }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .nb-bar { padding: 0 1rem; }
          .nb-desktop-links { gap: 1px; }
          .nb-pill { padding: 8px 10px; font-size: 11.5px; }
          .nb-contact { padding: 8px 14px; font-size: 11.5px; }
          .nb-pill-label { display: none; }
        }

        @media (max-width: 767px) {
          .nb-desktop-links { display: none !important; }
          .nb-ham { display: flex !important; }
          .nb-bar { padding: 0 1rem; height: 60px; }
        }

        @media (max-width: 380px) {
          .nb-bar { padding: 0 0.75rem; }
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
                <Icon size={13} aria-hidden="true" />
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
                <User size={13} aria-hidden="true" />
                <span className="nb-pill-label">About Me</span>
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
                    className="nb-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
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
              className="nb-contact nb-focus-ring"
              active={activeSection === 'contact'}
              onClick={() => go('contact')}
              aria-label="Contact us"
            >
              <Mail size={13} aria-hidden="true" />
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
              style={{ display: 'block', width: 22, height: 2, background: 'var(--ink)', borderRadius: 99 }}
            />
            <motion.span
              animate={{ opacity: navOpen ? 0 : 1, scaleX: navOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: 22, height: 2, background: 'var(--ink)', borderRadius: 99 }}
            />
            <motion.span
              animate={{ rotate: navOpen ? -45 : 0, y: navOpen ? -7 : 0 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'block', width: 22, height: 2, background: 'var(--ink)', borderRadius: 99 }}
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
                background: 'rgba(27,17,48,0.45)',
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
                padding: '18px 20px 16px',
                borderBottom: '1px solid var(--line)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="nb-hexMark" aria-hidden="true" style={{ width: 22, height: 22 }} />
                  <span className="nb-logoText" style={{ fontSize: 14 }}>Mwalish<span>.dev</span></span>
                </div>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setNavOpen(false)}
                  className="nb-focus-ring"
                  aria-label="Close menu"
                  style={{
                    color: 'var(--slate)', background: 'var(--paper-2)',
                    border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Nav links — mobile uses mobileDropdownOpen */}
              <nav className="nb-sb-scroll" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '20px 12px', flex: 1, overflowY: 'auto' }}>
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
                    className={`nb-sb-btn nb-focus-ring ${isAboutActive ? 'active' : ''}`}
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
                          marginLeft: 12, marginTop: 4, paddingLeft: 12,
                          borderLeft: '2px solid var(--line)',
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
                  className={`nb-sb-contact nb-focus-ring ${activeSection === 'contact' ? 'active' : ''}`}
                  aria-current={activeSection === 'contact' ? 'page' : undefined}
                >
                  <Mail size={15} aria-hidden="true" />
                  Contact Us
                </motion.button>
              </nav>

              <div style={{
                padding: '14px 20px',
                borderTop: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span className="nb-mono" style={{ fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--slate)' }}>
                  © 2025 Mwalish Dev
                </span>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--orange)', display: 'inline-block' }} aria-hidden="true" />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;