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
   MAIN NAVBAR - ULTRA COMPACT LOGO FIX
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

        .kx-nav { font-family: 'Syne', sans-serif; }
        .kx-mono { font-family: 'Space Mono', monospace; }
        /* ULTRA MINIMAL LOGO - NO EFFECTS */
        .kx-logo-minimal {
          border-radius: 50%;
        }
        .kx-logo-minimal:hover {
          filter: brightness(1.05);
        }

        /* Compact navbar */
        .kx-bar {
          transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
          height: 40px !important;
          padding: 0.25rem 1rem !important;
        }
        .kx-bar.scrolled {
          margin-top: 2px;
          border-radius: 999px;
          max-width: 1100px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 0 0 1px var(--kx-border);
        }

        /* Rest unchanged - pill buttons, dropdowns, etc. */
        .kx-pill {
          position: relative; padding: 6px 16px; border-radius: 999px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
          text-transform: uppercase; transition: color 0.25s, background 0.25s;
          overflow: hidden; white-space: nowrap; color: var(--kx-pearl);
        }
        .kx-pill::before {
          content: ''; position: absolute; inset: 0; background: var(--kx-gold);
          border-radius: 999px; transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); z-index: 0;
        }
        .kx-pill:hover::before, .kx-pill[data-active='true']::before { transform: scaleX(1); }
        .kx-pill:hover, .kx-pill[data-active='true'] { color: var(--kx-ink); }
        .kx-pill span { position: relative; z-index: 1; }

        .kx-contact {
          padding: 7px 20px; border-radius: 999px; font-size: 13px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase; border: 2px solid var(--kx-ember);
          color: var(--kx-ember); background: transparent; transition: all 0.25s;
          white-space: nowrap;
        }
        .kx-contact:hover, .kx-contact[data-active='true'] {
          background: var(--kx-ember); color: #fff; box-shadow: 0 0 16px rgba(255,107,53,0.35);
        }

        .kx-dropdown { background: var(--kx-slate); border: 1px solid var(--kx-border);
          border-radius: 16px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.45); }
        .kx-dd-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px;
          font-size: 12px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--kx-pearl); transition: all 0.2s; cursor: pointer; border: none;
          background: transparent; width: 100%; text-align: left; }
        .kx-dd-item .dd-icon { font-size: 10px; color: var(--kx-gold); flex-shrink: 0; }
        .kx-dd-item:hover, .kx-dd-item.active { background: rgba(245,200,66,0.12); color: var(--kx-gold); }
        .kx-dd-item.active .dd-icon { color: var(--kx-ember); }
        .kx-dd-sep { height: 1px; background: var(--kx-border); margin: 2px 0; }

        .kx-sidebar { background: var(--kx-ink); border-right: 1px solid var(--kx-border); }
        .kx-sb-btn { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left;
          padding: 14px 20px; border-radius: 14px; font-family: 'Syne', sans-serif; font-size: 15px;
          font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #999;
          background: transparent; border: none; cursor: pointer; transition: all 0.2s; }
        .kx-sb-btn:hover { background: rgba(245,200,66,0.08); color: var(--kx-gold); }
        .kx-sb-btn.active { background: var(--kx-gold); color: var(--kx-ink); }
        .kx-sb-sub { padding: 10px 16px; border-radius: 10px; font-family: 'Syne', sans-serif;
          font-size: 13px; font-weight: 700; letter-spacing: 0.04em; color: #777; background: transparent;
          border: none; cursor: pointer; width: 100%; text-align: left; display: flex; align-items: center;
          gap: 10px; transition: all 0.2s; }
        .kx-sb-sub:hover { color: var(--kx-gold); background: rgba(245,200,66,0.06); }
        .kx-sb-sub.active { color: var(--kx-ember); }

        .kx-ham span { display: block; width: 22px; height: 2px; background: var(--kx-pearl);
          transition: all 0.3s cubic-bezier(0.16,1,0.3,1); border-radius: 99px; }
        .kx-ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .kx-ham.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .kx-ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .kx-ham { display: flex; flex-direction: column; gap: 5px; background: none; border: none;
          cursor: pointer; padding: 5px; }
      `}</style>

      <nav className={`kx-nav kx-bar fixed top-0 z-50 w-full px-4 ${scrolled ? 'scrolled' : ''}`}
           style={{ background: scrolled ? 'var(--kx-glass)' : 'var(--kx-ink)', backdropFilter: 'blur(18px)', display: 'flex', alignItems: 'center' }}>
        <div className="flex items-center justify-between max-w-[1200px] mx-auto w-full h-10">

          {/* ── ULTRA COMPACT LOGO ── NO EFFECTS */}
          <motion.div className="flex items-center gap-1.5 cursor-pointer select-none" onClick={() => go('hero')}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <img src={logoImage} alt="Kraftrix Africa"
                 className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-4.5 lg:h-4.5 !max-w-[14px] !max-h-[14px] rounded-full object-contain kx-logo-minimal border border-yellow-300/50"
                 style={{ background: '#fffbe644', borderWidth: '1px' }} />
            <div className="flex flex-col leading-none">
              <span className="text-[10px] md:text-xs font-bold tracking-tight text-pearl font-syne" style={{ lineHeight: 1 }}>
                Kraftrix <span style={{ color: 'var(--kx-gold)' }}>Africa</span>
              </span>
              <span className="kx-mono text-[4px] md:text-[5px] tracking-widest uppercase" style={{ color: 'var(--kx-ember)', lineHeight: 1 }}>Technologies</span>
            </div>
            <Ticker />
          </motion.div>

          <div className="hidden md:flex items-center gap-1.5">
            {NAV_LINKS.map((link) => (
              <MagneticBtn key={link.section} className="kx-pill" active={activeSection === link.section} onClick={() => go(link.section)}>
                <span>{link.name}</span>
              </MagneticBtn>
            ))}

            <div className="relative" ref={dropdownRef}>
              <MagneticBtn className="kx-pill flex items-center gap-1" active={isAboutActive} onClick={() => setDropdownOpen(o => !o)}>
                <span>About Me</span>
                <motion.span style={{ position: 'relative', zIndex: 1 }} animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={13} />
                </motion.span>
              </MagneticBtn>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 8, scale: 0.95 }} transition={{ duration: 0.2 }}
                              className="kx-dropdown absolute top-[calc(100%+8px)] left-1/2 w-48" style={{ transform: 'translateX(-50%)' }}>
                    <div style={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0,
                      borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderBottom: '6px solid var(--kx-border)' }} />
                    {ABOUT_ITEMS.map((item, i) => (
                      <React.Fragment key={item.section}>
                        {i > 0 && <div className="kx-dd-sep" />}
                        <motion.button className={`kx-dd-item ${activeSection === item.section ? 'active' : ''}`}
                                      initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                                      onClick={() => go(item.section)}>
                          <span className="dd-icon">{item.icon}</span>
                          {item.name}
                        </motion.button>
                      </React.Fragment>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <MagneticBtn className="kx-contact" active={activeSection === 'contact'} onClick={() => go('contact')}>
              Contact
            </MagneticBtn>
          </div>

          <div className="flex items-center gap-3">
            <button className={`kx-ham md:hidden ${navOpen ? 'open' : ''}`} onClick={() => setNavOpen(o => !o)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
                        onClick={() => setNavOpen(false)} />
            <motion.aside key="sidebar" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                          transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                          className="kx-sidebar fixed top-0 left-0 h-full w-72 z-50 flex flex-col">
              <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--kx-border)' }}>
                <div className="flex flex-col">
                  <span className="text-base font-bold" style={{ color: 'var(--kx-gold)', fontFamily: 'Syne, sans-serif' }}>Menu</span>
                  <span className="kx-mono text-[9px] tracking-widest" style={{ color: 'var(--kx-ember)' }}>Navigate</span>
                </div>
                <motion.button whileHover={{ rotate: 90, scale: 1.1 }} transition={{ duration: 0.2 }} onClick={() => setNavOpen(false)}
                               style={{ color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={22} />
                </motion.button>
              </div>
              <nav className="flex flex-col gap-2 px-4 py-6 flex-1 overflow-y-auto">
                {NAV_LINKS.map((link, i) => (
                  <motion.button key={link.section} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.07 }} onClick={() => go(link.section)}
                                className={`kx-sb-btn ${activeSection === link.section ? 'active' : ''}`}>
                    <Zap size={14} style={{ color: activeSection === link.section ? 'var(--kx-ink)' : 'var(--kx-gold)', flexShrink: 0 }} />
                    {link.name}
                  </motion.button>
                ))}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 }}>
                  <button onClick={() => setDropdownOpen(o => !o)} className={`kx-sb-btn ${isAboutActive ? 'active' : ''}`}>
                    <Zap size={14} style={{ color: isAboutActive ? 'var(--kx-ink)' : 'var(--kx-gold)', flexShrink: 0 }} />
                    About Me
                    <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ marginLeft: 'auto' }}>
                      <ChevronDown size={14} />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }} className="overflow-hidden">
                        <div className="ml-4 flex flex-col gap-1 mt-1 border-l-2 pl-3" style={{ borderColor: 'var(--kx-border)' }}>
                          {ABOUT_ITEMS.map((item, i) => (
                            <motion.button key={item.section} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: i * 0.05 }} onClick={() => go(item.section)}
                                          className={`kx-sb-sub ${activeSection === item.section ? 'active' : ''}`}>
                              <span style={{ fontSize: 9, color: 'var(--kx-gold)' }}>{item.icon}</span>
                              {item.name}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.21 }}
                              onClick={() => go('contact')} className="kx-sb-btn mt-auto"
                              style={{ border: '2px solid var(--kx-ember)', color: activeSection === 'contact' ? 'var(--kx-ink)' : 'var(--kx-ember)',
                                       background: activeSection === 'contact' ? 'var(--kx-ember)' : 'transparent', justifyContent: 'center' }}>
                  Contact
                </motion.button>
              </nav>
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

