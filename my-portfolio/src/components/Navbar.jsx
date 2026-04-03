import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Zap } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// import ThemeToggle from './ThemeToggle';

const logoImage = "/Kraftrix Africa.jpg";

/* ─────────────────────────────────────────────
   Pill cursor trail effect (canvas overlay)
───────────────────────────────────────────── */
const NAV_LINKS = [
  { name: 'Home', section: 'hero' },
  { name: 'Projects', section: 'projects' },
];

const ABOUT_ITEMS = [
  { name: 'About', section: 'about', icon: '◈' },
  { name: 'Experience', section: 'experience', icon: '◉' },
  { name: 'Testimonials', section: 'testimonials', icon: '◎' },
  { name: 'Fun Facts', section: 'funfacts', icon: '◆' },
];

/* ── Animated number ticker for a subtle "live" feel ── */
const Ticker = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCount(c => (c + 1) % 100), 80);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="kx-ticker font-mono text-[10px] opacity-40 select-none">
      {String(count).padStart(2, '0')}
    </span>
  );
};

/* ── Magnetic button wrapper ── */
const MagneticBtn = ({ children, className, onClick, active }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
  };

  return (
    <motion.button
      ref={ref}
      animate={{ x: pos.x, y: pos.y }}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={onClick}
      className={className}
      data-active={active}
    >
      {children}
    </motion.button>
  );
};

/* ═══════════════════════════════════════════
   MAIN NAVBAR
═══════════════════════════════════════════ */
const Navbar = ({ onSectionChange, activeSection }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const go = (section) => {
    onSectionChange(section);
    setNavOpen(false);
    setDropdownOpen(false);
  };

  const isAboutActive = ABOUT_ITEMS.some(i => i.section === activeSection);

  return (
    <>
      {/* ── Global styles injected inline ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@700;800&display=swap');

        :root {
          --kx-gold:   #F5C842;
          --kx-ember:  #FF6B35;
          --kx-ink:    #0A0A0F;
          --kx-slate:  #1A1A2E;
          --kx-pearl:  #F0EDE8;
          --kx-glass:  rgba(10,10,15,0.72);
          --kx-border: rgba(245,200,66,0.22);
        }

        .kx-nav {
          font-family: 'Syne', sans-serif;
        }
        .kx-mono {
          font-family: 'Space Mono', monospace;
        }
        /* Unique logo style for this portfolio */
        .kx-logo-unique {
          transition: box-shadow 0.4s, filter 0.3s;
          outline: 2.5px solid #fffbe6;
          outline-offset: 2px;
        }
        .kx-logo-unique:hover {
          filter: brightness(1.15) saturate(1.2) drop-shadow(0 0 8px #f5c842cc);
          box-shadow: 0 0 24px 6px #f5c84299, 0 0 0 3px #fffbe6;
        }

        /* scrolled pill */
        .kx-bar {
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          min-height: 44px;
          height: 44px;
          padding-top: 0.25rem !important;
          padding-bottom: 0.25rem !important;
        }
.kx-bar.scrolled {\n  margin-top: 4px;\n  border-radius: 999px;\n  max-width: 1100px;\n  left: 50%;\n  transform: translateX(-50%);\n  box-shadow: 0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px var(--kx-border);\n        }

        /* Desktop nav pill buttons */
        .kx-pill {
          position: relative;
          padding: 8px 20px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: color 0.25s, background 0.25s;
          overflow: hidden;
          white-space: nowrap;
          color: var(--kx-pearl);
        }
        .kx-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--kx-gold);
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
          z-index: 0;
        }
        .kx-pill:hover::before,
        .kx-pill[data-active='true']::before {
          transform: scaleX(1);
        }
        .kx-pill:hover,
        .kx-pill[data-active='true'] {
          color: var(--kx-ink);
        }
        .kx-pill span { position: relative; z-index: 1; }

        /* Contact — ember outlined */
        .kx-contact {
          padding: 9px 24px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border: 2px solid var(--kx-ember);
          color: var(--kx-ember);
          background: transparent;
          transition: background 0.25s, color 0.25s, box-shadow 0.25s;
          white-space: nowrap;
        }
        .kx-contact:hover,
        .kx-contact[data-active='true'] {
          background: var(--kx-ember);
          color: #fff;
          box-shadow: 0 0 24px rgba(255,107,53,0.45);
        }

        /* Dropdown card */
        .kx-dropdown {
          background: var(--kx-slate);
          border: 1px solid var(--kx-border);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .kx-dd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 18px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--kx-pearl);
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }
        .kx-dd-item .dd-icon {
          font-size: 10px;
          color: var(--kx-gold);
          flex-shrink: 0;
        }
        .kx-dd-item:hover,
        .kx-dd-item.active {
          background: rgba(245,200,66,0.12);
          color: var(--kx-gold);
        }
        .kx-dd-item.active .dd-icon { color: var(--kx-ember); }
        .kx-dd-sep {
          height: 1px;
          background: var(--kx-border);
          margin: 2px 0;
        }

        /* Sidebar */
        .kx-sidebar {
          background: var(--kx-ink);
          border-right: 1px solid var(--kx-border);
        }
        .kx-sb-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          text-align: left;
          padding: 14px 20px;
          border-radius: 14px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #999;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .kx-sb-btn:hover { background: rgba(245,200,66,0.08); color: var(--kx-gold); }
        .kx-sb-btn.active { background: var(--kx-gold); color: var(--kx-ink); }
        .kx-sb-sub {
          padding: 10px 16px;
          border-radius: 10px;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #777;
          background: transparent;
          border: none;
          cursor: pointer;
          width: 100%;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
        }
        .kx-sb-sub:hover { color: var(--kx-gold); background: rgba(245,200,66,0.06); }
        .kx-sb-sub.active { color: var(--kx-ember); }

        /* Hamburger lines */
        .kx-ham span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--kx-pearl);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
          border-radius: 99px;
        }
        .kx-ham.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .kx-ham.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .kx-ham.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
        .kx-ham { display: flex; flex-direction: column; gap: 6px; background: none; border: none; cursor: pointer; padding: 6px; }
      `}</style>

      {/* ═══ NAV BAR ═══ */}
      <nav
        className={`kx-nav kx-bar fixed top-0 z-50 w-full px-6 py-0 ${scrolled ? 'scrolled' : ''}`}
        style={{ background: scrolled ? 'var(--kx-glass)' : 'var(--kx-ink)', backdropFilter: 'blur(18px)', minHeight: '44px', display: 'flex', alignItems: 'center' }}
      >
        <div className="flex items-center justify-between max-w-[1200px] mx-auto w-full h-full" style={{height: '44px'}}>

          {/* ── Logo ── */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer select-none h-full"
            style={{height: '44px'}}
            onClick={() => go('hero')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative flex items-center h-full" style={{height: '44px'}}>
              <motion.img
                src={logoImage}
                alt="Kraftrix Africa"
                className="w-5 h-5 min-w-5 min-h-5 max-w-5 max-h-5 rounded-full object-cover border-2 border-yellow-400 shadow-lg kx-logo-unique"
                style={{ filter: 'grayscale(0.15) brightness(1.08) contrast(1.15)', background: 'linear-gradient(135deg, #fffbe6 0%, #f5c842 100%)', border: '2.5px solid var(--kx-gold)', boxShadow: '0 0 10px 2px rgba(245,200,66,0.25), 0 0 0 3px rgba(0,0,0,0.07)', display: 'block', margin: '0 auto', verticalAlign: 'middle' }}
                animate={{ boxShadow: ['0 0 8px 2px #f5c84255', '0 0 18px 4px #f5c84299', '0 0 8px 2px #f5c84255'] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Removed status indicator to prevent overlap */}
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight" style={{ color: 'var(--kx-pearl)', fontFamily: 'Syne, sans-serif' }}>
                Kraftrix <span style={{ color: 'var(--kx-gold)' }}>Africa</span>
              </span>
              <span className="kx-mono text-[9px] tracking-widest uppercase" style={{ color: 'var(--kx-ember)' }}>Technologies</span>
            </div>
            <Ticker />
          </motion.div>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <MagneticBtn
                key={link.section}
                className="kx-pill"
                active={activeSection === link.section}
                onClick={() => go(link.section)}
              >
                <span>{link.name}</span>
              </MagneticBtn>
            ))}

            {/* About dropdown */}
            <div className="relative" ref={dropdownRef}>
              <MagneticBtn
                className="kx-pill flex items-center gap-1"
                active={isAboutActive}
                onClick={() => setDropdownOpen(o => !o)}
              >
                <span>About Me</span>
                <motion.span
                  style={{ position: 'relative', zIndex: 1, display: 'flex' }}
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} />
                </motion.span>
              </MagneticBtn>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="kx-dropdown absolute top-[calc(100%+10px)] left-1/2 w-52"
                    style={{ transform: 'translateX(-50%)' }}
                  >
                    {/* tiny arrow */}
                    <div style={{
                      position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)',
                      width: 0, height: 0,
                      borderLeft: '7px solid transparent',
                      borderRight: '7px solid transparent',
                      borderBottom: '7px solid var(--kx-border)',
                    }} />
                    {ABOUT_ITEMS.map((item, i) => (
                      <React.Fragment key={item.section}>
                        {i > 0 && <div className="kx-dd-sep" />}
                        <motion.button
                          className={`kx-dd-item ${activeSection === item.section ? 'active' : ''}`}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => go(item.section)}
                        >
                          <span className="dd-icon">{item.icon}</span>
                          {item.name}
                        </motion.button>
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact — ember outlined */}
            <MagneticBtn
              className="kx-contact"
              active={activeSection === 'contact'}
              onClick={() => go('contact')}
            >
              Contact
            </MagneticBtn>
          </div>

          {/* ── Right cluster ── */}
          <div className="flex items-center gap-4">
            {/* Hamburger */}
            <button
              className={`kx-ham md:hidden ${navOpen ? 'open' : ''}`}
              onClick={() => setNavOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE SIDEBAR ═══ */}
      <AnimatePresence>
        {navOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
              onClick={() => setNavOpen(false)}
            />

            {/* panel */}
            <motion.aside
              key="sidebar"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 380, damping: 34 }}
              className="kx-sidebar fixed top-0 left-0 h-full w-72 z-50 flex flex-col"
            >
              {/* header */}
              <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--kx-border)' }}>
                <div className="flex flex-col">
                  <span className="text-base font-bold" style={{ color: 'var(--kx-gold)', fontFamily: 'Syne, sans-serif' }}>Menu</span>
                  <span className="kx-mono text-[9px] tracking-widest" style={{ color: 'var(--kx-ember)' }}>Navigate</span>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setNavOpen(false)}
                  style={{ color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <X size={22} />
                </motion.button>
              </div>

              {/* links */}
              <nav className="flex flex-col gap-2 px-4 py-6 flex-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.section}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => go(link.section)}
                    className={`kx-sb-btn ${activeSection === link.section ? 'active' : ''}`}
                  >
                    <Zap size={14} style={{ color: activeSection === link.section ? 'var(--kx-ink)' : 'var(--kx-gold)', flexShrink: 0 }} />
                    {link.name}
                  </motion.button>
                ))}

                {/* About group */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.14 }}
                >
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className={`kx-sb-btn ${isAboutActive ? 'active' : ''}`}
                  >
                    <Zap size={14} style={{ color: isAboutActive ? 'var(--kx-ink)' : 'var(--kx-gold)', flexShrink: 0 }} />
                    About Me
                    <motion.span
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ marginLeft: 'auto' }}
                    >
                      <ChevronDown size={14} />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 flex flex-col gap-1 mt-1 border-l-2 pl-3" style={{ borderColor: 'var(--kx-border)' }}>
                          {ABOUT_ITEMS.map((item, i) => (
                            <motion.button
                              key={item.section}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              onClick={() => go(item.section)}
                              className={`kx-sb-sub ${activeSection === item.section ? 'active' : ''}`}
                            >
                              <span style={{ fontSize: 9, color: 'var(--kx-gold)' }}>{item.icon}</span>
                              {item.name}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Contact */}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.21 }}
                  onClick={() => go('contact')}
                  className="kx-sb-btn mt-auto"
                  style={{
                    border: '2px solid var(--kx-ember)',
                    color: activeSection === 'contact' ? 'var(--kx-ink)' : 'var(--kx-ember)',
                    background: activeSection === 'contact' ? 'var(--kx-ember)' : 'transparent',
                    justifyContent: 'center',
                  }}
                >
                  Contact
                </motion.button>
              </nav>

              {/* footer */}
              <div className="px-6 py-4 border-t kx-mono text-[9px] tracking-widest uppercase" style={{ borderColor: 'var(--kx-border)', color: '#444' }}>
                Kraftrix Africa Technologies © 2025
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;