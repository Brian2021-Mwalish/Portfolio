import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const FunFacts = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [currentFact, setCurrentFact] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const funFacts = [
    {
      icon: '🚀',
      num: '01',
      title: 'Code Marathon',
      fact: 'I once coded for 24 hours straight during a hackathon and built a full-stack app from scratch!',
      accent: '#E63946',
    },
    {
      icon: '💻',
      num: '02',
      title: 'Code Enthusiast',
      fact: 'I love writing clean, efficient code and solving complex algorithms. Coding is my passion!',
      accent: '#2563EB',
    },
    {
      icon: '🎵',
      num: '03',
      title: 'Music Lover',
      fact: 'I code better with lo-fi hip hop beats playing in the background. Music helps me focus!',
      accent: '#0891B2',
    },
    {
      icon: '🌍',
      num: '04',
      title: 'World Explorer',
      fact: "I've lived in 3 different countries and speak 4 languages. Cultural diversity inspires my creative solutions!",
      accent: '#16A34A',
    },
    {
      icon: '📚',
      num: '05',
      title: 'Lifelong Learner',
      fact: 'I read at least 2 technical books per month and love staying updated with the latest tech trends.',
      accent: '#2563EB',
    },
    {
      icon: '🎮',
      num: '06',
      title: 'Gaming Enthusiast',
      fact: "When I'm not coding, you'll find me playing strategy games or exploring virtual worlds.",
      accent: '#7C3AED',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes ff-fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ff-tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ff-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.6; transform: scale(1.4); }
        }

        .ff-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #F7F5F0;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .ff-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 47px, #E2DDD5 47px, #E2DDD5 48px
          );
          pointer-events: none; z-index: 0;
        }
        .ff-accent-bar {
          position: absolute; top: 0; left: 0;
          width: 8px; height: 100%;
          background-color: #1A1A2E; z-index: 2;
        }
        .ff-corner-num {
          position: absolute; top: 32px; right: 48px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(5rem, 12vw, 10rem); font-weight: 900;
          color: #E2DDD5; line-height: 1;
          user-select: none; pointer-events: none; z-index: 1;
          letter-spacing: -0.04em;
        }
        .ff-inner {
          position: relative; z-index: 10;
          max-width: 1280px; margin: 0 auto;
          padding: 80px 48px 80px 72px;
        }

        /* ── HEADER ── */
        .ff-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 32px;
          margin-bottom: 56px; flex-wrap: wrap;
        }
        .ff-label {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1A1A2E; color: #F7F5F0;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 2px; margin-bottom: 16px;
        }
        .ff-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 900;
          color: #1A1A2E; line-height: 0.95;
          letter-spacing: -0.03em; margin: 0;
        }
        .ff-heading span { color: #E63946; }
        .ff-subtext {
          font-size: 1rem; color: #4B4A56; line-height: 1.75;
          max-width: 380px; margin: 20px 0 0; align-self: flex-end;
        }
        .ff-divider {
          display: flex; align-items: center; gap: 12px; margin-bottom: 48px;
        }
        .ff-divider-line { height: 2px; background: #1A1A2E; flex: 0 0 48px; }
        .ff-divider-dot  { width: 8px; height: 8px; border-radius: 50%; background: #E63946; }
        .ff-divider-text {
          font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #9A9590;
        }

        /* ── TICKER ── */
        .ff-ticker-wrap {
          overflow: hidden;
          border-top: 2px solid #1A1A2E;
          border-bottom: 2px solid #1A1A2E;
          background: #1A1A2E;
          margin-bottom: 56px;
          padding: 12px 0;
        }
        .ff-ticker-track {
          display: flex;
          animation: ff-tickerScroll 22s linear infinite;
          width: max-content;
        }
        .ff-ticker-item {
          display: inline-flex; align-items: center; gap: 16px;
          padding: 0 32px;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #F7F5F0; white-space: nowrap;
        }
        .ff-ticker-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #E63946; flex-shrink: 0;
        }

        /* ── FEATURED FACT ── */
        .ff-featured-wrap {
          margin-bottom: 56px;
        }
        .ff-featured-card {
          background: #1A1A2E;
          border: 2px solid #1A1A2E;
          border-radius: 4px;
          box-shadow: 8px 8px 0 #E63946;
          padding: 48px 56px;
          display: flex;
          align-items: center;
          gap: 40px;
          position: relative;
          overflow: hidden;
          flex-wrap: wrap;
        }
        .ff-featured-card::after {
          content: attr(data-icon);
          position: absolute; right: 48px; top: 50%;
          transform: translateY(-50%);
          font-size: 8rem; line-height: 1;
          opacity: 0.06; pointer-events: none; user-select: none;
        }
        .ff-featured-icon-wrap {
          width: 80px; height: 80px; flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          display: flex; align-items: center; justify-content: center;
          font-size: 2.4rem;
          background: rgba(255,255,255,0.06);
        }
        .ff-featured-body { flex: 1; min-width: 220px; }
        .ff-featured-label {
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: #E63946; margin-bottom: 8px; display: block;
        }
        .ff-featured-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.4rem, 2.5vw, 2rem);
          font-weight: 900; color: #F7F5F0;
          line-height: 1.1; letter-spacing: -0.02em;
          margin-bottom: 14px;
        }
        .ff-featured-fact {
          font-size: 0.96rem; color: #A8A4A0;
          line-height: 1.75; margin: 0;
        }

        /* Dots */
        .ff-dots {
          display: flex; gap: 8px; margin-top: 24px; justify-content: center;
        }
        .ff-dot {
          width: 10px; height: 10px; border-radius: 50%;
          border: 2px solid #1A1A2E;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .ff-dot.active {
          background: #E63946; border-color: #E63946;
          transform: scale(1.3);
        }
        .ff-dot:hover:not(.active) { background: #D1CDC4; }

        /* ── CARDS GRID ── */
        .ff-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 64px;
        }

        /* ── FACT CARD ── */
        .ff-card {
          background: #fff;
          border: 2px solid #1A1A2E;
          border-radius: 4px;
          padding: 28px 32px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease;
          animation: ff-fadeInUp 0.5s ease both;
          display: flex; flex-direction: column;
        }
        .ff-card:hover { transform: translateY(-6px); }
        .ff-card-num {
          position: absolute; top: 10px; right: 16px;
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900; color: #F0EDE8;
          line-height: 1; pointer-events: none; user-select: none;
          letter-spacing: -2px;
        }
        .ff-card-icon-wrap {
          width: 52px; height: 52px;
          border-radius: 4px; border: 2px solid #1A1A2E;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem; margin-bottom: 20px;
          transition: transform 0.2s ease;
        }
        .ff-card:hover .ff-card-icon-wrap { transform: scale(1.08); }
        .ff-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: #1A1A2E;
          letter-spacing: -0.01em; margin-bottom: 10px;
        }
        .ff-card-fact {
          font-size: 0.84rem; color: #4B4A56;
          line-height: 1.75; flex: 1;
        }
        .ff-card-divider {
          height: 2px; background: #F0EDE8;
          margin: 18px 0; border-radius: 1px;
        }
        .ff-card-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 2px;
          border: 1.5px solid #1A1A2E;
          box-shadow: 2px 2px 0 #1A1A2E;
          color: #F7F5F0;
        }
        .ff-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #F7F5F0;
          animation: ff-pulse-dot 2s ease infinite;
        }

        /* ── CTA ── */
        .ff-cta {
          background: #1A1A2E; border: 2px solid #1A1A2E;
          border-radius: 4px; box-shadow: 8px 8px 0 #E63946;
          padding: 56px 48px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 40px; flex-wrap: wrap;
          position: relative; overflow: hidden;
        }
        .ff-cta::after {
          content: '✦';
          position: absolute; right: 160px; top: 50%;
          transform: translateY(-50%);
          font-size: 14rem; font-weight: 900;
          color: rgba(255,255,255,0.03);
          pointer-events: none; user-select: none; line-height: 1;
        }
        .ff-cta-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700;
          color: #F7F5F0; margin: 0 0 8px; letter-spacing: -0.02em;
        }
        .ff-cta-sub {
          font-size: 0.95rem; color: #A8A4A0;
          line-height: 1.65; max-width: 440px; margin: 0;
        }
        .ff-cta-actions { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }
        .ff-cta-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #E63946; color: #F7F5F0;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 14px 28px; border-radius: 2px; border: 2px solid #E63946;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 4px 4px 0 #F7F5F0;
        }
        .ff-cta-btn-primary:hover {
          opacity: 0.9; transform: translate(-2px,-2px);
          box-shadow: 6px 6px 0 #F7F5F0;
        }
        .ff-cta-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #F7F5F0;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 14px 28px; border-radius: 2px; border: 2px solid #F7F5F0;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .ff-cta-btn-secondary:hover { background: #F7F5F0; color: #1A1A2E; }

        @media (max-width: 1024px) {
          .ff-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 960px) {
          .ff-inner { padding: 60px 24px 60px 40px; }
        }
        @media (max-width: 600px) {
          .ff-inner { padding: 48px 16px 48px 28px; }
          .ff-heading { font-size: 2.8rem; }
          .ff-grid { grid-template-columns: 1fr; }
          .ff-featured-card { padding: 32px 28px; }
          .ff-cta { padding: 40px 32px; }
          .ff-cta::after { display: none; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="funfacts"
        className="ff-root"
      >
        <div className="ff-accent-bar" />
        <div className="ff-corner-num" aria-hidden="true">03</div>

        <motion.div
          className="ff-inner"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* ── HEADER ── */}
          <motion.div variants={itemVariants} className="ff-header">
            <div>
              <div className="ff-label">
                <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#E63946', display: 'inline-block' }} />
                Fun Facts · About Me
              </div>
              <h2 className="ff-heading">
                Beyond<br />
                the <span>Code</span>
              </h2>
            </div>
            <p className="ff-subtext">
              Beyond the code and coffee, here are some interesting tidbits that make me who I am.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="ff-divider">
            <div className="ff-divider-line" />
            <div className="ff-divider-dot" />
            <span className="ff-divider-text">Personal Facts</span>
          </motion.div>

          {/* ── TICKER ── */}
          <motion.div variants={itemVariants} className="ff-ticker-wrap">
            <div className="ff-ticker-track">
              {[...Array(2)].map((_, ri) =>
                ['Hackathon Veteran', 'Lo-Fi Coder', '4 Languages Spoken', 'Clean Code Advocate', '3 Countries Lived', 'Strategy Gamer', '2 Books / Month', 'Night Owl', 'Bug Slayer'].map((t, i) => (
                  <span key={`${ri}-${i}`} className="ff-ticker-item">
                    <span className="ff-ticker-dot" />
                    {t}
                  </span>
                ))
              )}
            </div>
          </motion.div>

          {/* ── FEATURED FACT ── */}
          <motion.div variants={itemVariants} className="ff-featured-wrap">
            <motion.div
              key={currentFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="ff-featured-card"
              data-icon={funFacts[currentFact].icon}
            >
              <div className="ff-featured-icon-wrap">
                {funFacts[currentFact].icon}
              </div>
              <div className="ff-featured-body">
                <span className="ff-featured-label">
                  Fact {funFacts[currentFact].num} of {String(funFacts.length).padStart(2, '0')}
                </span>
                <div className="ff-featured-title">{funFacts[currentFact].title}</div>
                <p className="ff-featured-fact">{funFacts[currentFact].fact}</p>
              </div>
            </motion.div>

            {/* Dots */}
            <div className="ff-dots">
              {funFacts.map((_, index) => (
                <button
                  key={index}
                  className={`ff-dot${index === currentFact ? ' active' : ''}`}
                  onClick={() => setCurrentFact(index)}
                  aria-label={`Show fact ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── FACTS GRID ── */}
          <motion.div className="ff-grid" variants={containerVariants}>
            {funFacts.map((fact, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="ff-card"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setCurrentFact(index)}
                style={{
                  boxShadow: hoveredCard === index
                    ? `6px 6px 0 ${fact.accent}`
                    : '4px 4px 0 #D1CDC4',
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                <div className="ff-card-num">{fact.num}</div>

                <div
                  className="ff-card-icon-wrap"
                  style={{ background: fact.accent + '15', borderColor: fact.accent + '60' }}
                >
                  {fact.icon}
                </div>

                <div className="ff-card-title">{fact.title}</div>
                <p className="ff-card-fact">{fact.fact}</p>

                <div className="ff-card-divider" />

                <div
                  className="ff-card-badge"
                  style={{ background: fact.accent, borderColor: fact.accent }}
                >
                  <span className="ff-badge-dot" />
                  Fun Fact
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── CTA ── */}
          <motion.div variants={itemVariants} className="ff-cta">
            <div>
              <h3 className="ff-cta-heading">Want to Know More?</h3>
              <p className="ff-cta-sub">
                These are just a few fun facts. Let's connect and discover what else we have in common!
              </p>
            </div>
            <div className="ff-cta-actions">
              <button
                className="ff-cta-btn-primary"
                onClick={() => onSectionChange('contact')}
              >
                Let's Chat
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button
                className="ff-cta-btn-secondary"
                onClick={() => onSectionChange('work')}
              >
                View My Work ↗
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default FunFacts;