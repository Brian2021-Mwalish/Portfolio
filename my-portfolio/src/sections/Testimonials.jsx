import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Testimonials = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredCard, setHoveredCard] = useState(null);

  const testimonials = [
    {
      name: 'Joseph Juma',
      role: 'Production Director',
      company: 'Kariki Farm Molo',
      content:
        'Brian delivered outstanding graphic design work for our marketing materials. His creativity, attention to detail, and ability to bring our vision to life were exceptional. The designs were delivered on time and exceeded our expectations.',
      avatar: 'JJ',
      rating: 5,
      accent: '#E63946',
      num: '01',
    },
    {
      name: 'Joe Karanja',
      role: 'CTO',
      company: 'Lish AI Labs',
      content:
        'Working with Brian was a pleasure. His full-stack expertise and innovative approach helped us launch our AI-powered application successfully. Highly recommended for any tech project.',
      avatar: 'JK',
      rating: 5,
      accent: '#2563EB',
      num: '02',
    },
    {
      name: 'Achieng Oduya',
      role: 'Startup Founder',
      company: 'GreenTech Ventures',
      content:
        'Brian transformed our vision into reality. His code is clean, efficient, and scalable. He was proactive in suggesting improvements and always delivered high-quality work.',
      avatar: 'AO',
      rating: 5,
      accent: '#16A34A',
      num: '03',
    },
    {
      name: 'Kiprop David',
      role: 'Senior Teacher',
      company: 'Njenga Karume Sec School',
      content:
        "As a fellow developer, I can attest to Brian's technical skills and collaborative nature. He writes maintainable code and is great at explaining complex concepts.",
      avatar: 'KD',
      rating: 5,
      accent: '#D97706',
      num: '04',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`star-icon ${i < rating ? 'star-filled' : 'star-empty'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        width="16"
        height="16"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .tst-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #F7F5F0;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .tst-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 47px, #E2DDD5 47px, #E2DDD5 48px
          );
          pointer-events: none; z-index: 0;
        }
        .tst-accent-bar {
          position: absolute; top: 0; left: 0;
          width: 8px; height: 100%;
          background-color: #1A1A2E; z-index: 2;
        }
        .tst-corner-num {
          position: absolute; top: 32px; right: 48px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(5rem, 12vw, 10rem); font-weight: 900;
          color: #E2DDD5; line-height: 1;
          user-select: none; pointer-events: none; z-index: 1;
          letter-spacing: -0.04em;
        }
        .tst-inner {
          position: relative; z-index: 10;
          max-width: 1280px; margin: 0 auto;
          padding: 80px 48px 80px 72px;
        }

        /* ── HEADER ── */
        .tst-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 32px;
          margin-bottom: 56px; flex-wrap: wrap;
        }
        .tst-label {
          display: inline-flex; align-items: center; gap: 8px;
          background: #1A1A2E; color: #F7F5F0;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 2px; margin-bottom: 16px;
        }
        .tst-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 900;
          color: #1A1A2E; line-height: 0.95;
          letter-spacing: -0.03em; margin: 0;
        }
        .tst-heading span { color: #E63946; }
        .tst-subtext {
          font-size: 1rem; color: #4B4A56; line-height: 1.75;
          max-width: 380px; margin: 20px 0 0; align-self: flex-end;
        }
        .tst-divider {
          display: flex; align-items: center; gap: 12px; margin-bottom: 48px;
        }
        .tst-divider-line { height: 2px; background: #1A1A2E; flex: 0 0 48px; }
        .tst-divider-dot  { width: 8px; height: 8px; border-radius: 50%; background: #E63946; }
        .tst-divider-text {
          font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #9A9590;
        }

        /* ── TICKER ── */
        .tst-ticker-wrap {
          overflow: hidden;
          border-top: 2px solid #1A1A2E;
          border-bottom: 2px solid #1A1A2E;
          background: #1A1A2E;
          margin-bottom: 56px;
          padding: 12px 0;
        }
        .tst-ticker-track {
          display: flex;
          animation: tickerScroll 20s linear infinite;
          width: max-content;
        }
        .tst-ticker-item {
          display: inline-flex; align-items: center; gap: 16px;
          padding: 0 32px;
          font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #F7F5F0; white-space: nowrap;
        }
        .tst-ticker-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #E63946; flex-shrink: 0;
        }

        /* ── STATS STRIP ── */
        .tst-stats-strip {
          border: 2px solid #1A1A2E; border-radius: 4px;
          overflow: hidden; display: flex;
          box-shadow: 4px 4px 0 #D1CDC4;
          margin-bottom: 56px;
        }
        .tst-stat-cell {
          flex: 1; padding: 18px 20px; background: #fff;
          border-right: 2px solid #1A1A2E; text-align: center;
        }
        .tst-stat-cell:last-child { border-right: none; }
        .tst-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem; font-weight: 900; color: #1A1A2E; line-height: 1;
          display: block; margin-bottom: 2px;
        }
        .tst-stat-label {
          font-size: 0.62rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #9A9590;
        }

        /* ── CARDS GRID ── */
        .tst-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 64px;
        }

        /* ── TESTIMONIAL CARD ── */
        .tst-card {
          background: #fff;
          border: 2px solid #1A1A2E;
          border-radius: 4px;
          padding: 32px 36px;
          position: relative;
          overflow: hidden;
          cursor: default;
          transition: transform 0.25s cubic-bezier(.22,1,.36,1), box-shadow 0.25s ease;
          animation: fadeInUp 0.5s ease both;
          display: flex;
          flex-direction: column;
        }
        .tst-card:hover {
          transform: translateY(-6px);
        }
        .tst-card-num {
          position: absolute; top: 10px; right: 16px;
          font-family: 'Playfair Display', serif;
          font-size: 3rem; font-weight: 900; color: #F0EDE8;
          line-height: 1; pointer-events: none; user-select: none;
          letter-spacing: -2px;
        }

        /* ── QUOTE MARK ── */
        .tst-quote-mark {
          font-family: 'Playfair Display', serif;
          font-size: 5rem; font-weight: 900; line-height: 0.6;
          margin-bottom: 12px; display: block;
        }

        /* ── STARS ── */
        .tst-stars { display: flex; gap: 3px; margin-bottom: 16px; }
        .star-filled { color: #D97706; }
        .star-empty  { color: #E2DDD5; }

        /* ── BLOCKQUOTE ── */
        .tst-blockquote {
          font-size: 0.93rem; color: #4B4A56;
          line-height: 1.75; font-style: italic;
          margin: 0 0 24px; flex: 1;
        }

        /* ── DIVIDER LINE IN CARD ── */
        .tst-card-divider {
          height: 2px; background: #F0EDE8;
          margin-bottom: 20px; border-radius: 1px;
        }

        /* ── AUTHOR ── */
        .tst-author {
          display: flex; align-items: center; gap: 14px;
        }
        .tst-avatar {
          width: 48px; height: 48px;
          border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 0.9rem; font-weight: 900; color: #F7F5F0;
          flex-shrink: 0;
          border: 2px solid #1A1A2E;
          letter-spacing: 0.04em;
        }
        .tst-author-name {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700; color: #1A1A2E;
          letter-spacing: -0.01em;
        }
        .tst-author-role {
          font-size: 0.75rem; color: #9A9590;
          font-weight: 500; letter-spacing: 0.04em;
          margin-top: 2px;
        }
        .tst-author-badge {
          margin-left: auto;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          padding: 4px 10px; border-radius: 2px;
          border: 1.5px solid #1A1A2E;
          box-shadow: 2px 2px 0 #1A1A2E;
          white-space: nowrap; flex-shrink: 0;
          color: #F7F5F0;
        }

        /* ── CTA ── */
        .tst-cta {
          background: #1A1A2E; border: 2px solid #1A1A2E;
          border-radius: 4px; box-shadow: 8px 8px 0 #E63946;
          padding: 56px 48px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 40px; flex-wrap: wrap;
          position: relative; overflow: hidden;
        }
        .tst-cta::after {
          content: '"';
          position: absolute; right: 160px; top: 50%;
          transform: translateY(-50%);
          font-family: 'Playfair Display', serif; font-size: 14rem;
          font-weight: 900; color: rgba(255,255,255,0.03);
          pointer-events: none; user-select: none; line-height: 1;
        }
        .tst-cta-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700;
          color: #F7F5F0; margin: 0 0 8px; letter-spacing: -0.02em;
        }
        .tst-cta-sub {
          font-size: 0.95rem; color: #A8A4A0;
          line-height: 1.65; max-width: 440px; margin: 0;
        }
        .tst-cta-actions { display: flex; gap: 12px; flex-wrap: wrap; flex-shrink: 0; }
        .tst-cta-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: #E63946; color: #F7F5F0;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 14px 28px; border-radius: 2px; border: 2px solid #E63946;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.2s, box-shadow 0.2s;
          box-shadow: 4px 4px 0 #F7F5F0;
        }
        .tst-cta-btn-primary:hover {
          opacity: 0.9; transform: translate(-2px,-2px);
          box-shadow: 6px 6px 0 #F7F5F0;
        }
        .tst-cta-btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: #F7F5F0;
          font-family: 'DM Sans', sans-serif; font-size: 0.88rem;
          font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
          padding: 14px 28px; border-radius: 2px; border: 2px solid #F7F5F0;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .tst-cta-btn-secondary:hover { background: #F7F5F0; color: #1A1A2E; }

        @media (max-width: 960px) {
          .tst-inner { padding: 60px 24px 60px 40px; }
          .tst-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .tst-inner { padding: 48px 16px 48px 28px; }
          .tst-heading { font-size: 2.8rem; }
          .tst-cta { padding: 40px 32px; }
          .tst-cta::after { display: none; }
          .tst-stats-strip { flex-wrap: wrap; }
          .tst-stat-cell { flex: 0 0 50%; border-bottom: 2px solid #1A1A2E; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="testimonials"
        className="tst-root"
      >
        <div className="tst-accent-bar" />
        <div className="tst-corner-num" aria-hidden="true">02</div>

        <motion.div
          className="tst-inner"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* ── HEADER ── */}
          <motion.div variants={itemVariants} className="tst-header">
            <div>
              <div className="tst-label">
                <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#E63946', display: 'inline-block' }} />
                Testimonials · Social Proof
              </div>
              <h2 className="tst-heading">
                What People<br />
                <span>Say</span>
              </h2>
            </div>
            <p className="tst-subtext">
              Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="tst-divider">
            <div className="tst-divider-line" />
            <div className="tst-divider-dot" />
            <span className="tst-divider-text">Client Reviews</span>
          </motion.div>

          {/* ── TICKER ── */}
          <motion.div variants={itemVariants} className="tst-ticker-wrap">
            <div className="tst-ticker-track">
              {[...Array(2)].map((_, ri) =>
                ['5-Star Rated', 'Trusted by Founders', 'On-Time Delivery', 'Clean Code', 'Creative Designs', 'M-Pesa Integration', 'Full-Stack Expertise', 'Client-First Approach'].map((t, i) => (
                  <span key={`${ri}-${i}`} className="tst-ticker-item">
                    <span className="tst-ticker-dot" />
                    {t}
                  </span>
                ))
              )}
            </div>
          </motion.div>

          {/* ── STATS STRIP ── */}
          <motion.div variants={itemVariants} className="tst-stats-strip">
            {[
              { label: 'Happy Clients', val: '10+', accent: '#E63946' },
              { label: 'Five-Star Reviews', val: '100%', accent: '#1A1A2E' },
              { label: 'Projects Delivered', val: '5+', accent: '#1A1A2E' },
              { label: 'Repeat Clients', val: '80%', accent: '#1A1A2E' },
            ].map((s, i) => (
              <div className="tst-stat-cell" key={i}>
                <span className="tst-stat-num" style={{ color: s.accent }}>{s.val}</span>
                <span className="tst-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>

          {/* ── TESTIMONIALS GRID ── */}
          <motion.div className="tst-grid" variants={containerVariants}>
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="tst-card"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  boxShadow: hoveredCard === index
                    ? `6px 6px 0 ${t.accent}`
                    : '4px 4px 0 #D1CDC4',
                  animationDelay: `${index * 0.08}s`,
                }}
              >
                <div className="tst-card-num">{t.num}</div>

                {/* Quote mark */}
                <span className="tst-quote-mark" style={{ color: t.accent + '33' }}>"</span>

                {/* Stars */}
                <div className="tst-stars">{renderStars(t.rating)}</div>

                {/* Quote text */}
                <blockquote className="tst-blockquote">"{t.content}"</blockquote>

                <div className="tst-card-divider" />

                {/* Author */}
                <div className="tst-author">
                  <div
                    className="tst-avatar"
                    style={{ background: t.accent }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="tst-author-name">{t.name}</div>
                    <div className="tst-author-role">
                      {t.role} · {t.company}
                    </div>
                  </div>
                  <div
                    className="tst-author-badge"
                    style={{ background: t.accent, borderColor: t.accent }}
                  >
                    ★ Verified
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── BOTTOM CTA ── */}
          <motion.div variants={itemVariants} className="tst-cta">
            <div>
              <h3 className="tst-cta-heading">Ready to Join the List?</h3>
              <p className="tst-cta-sub">
                Let's work together and create something amazing. I'd love to add your testimonial to this collection.
              </p>
            </div>
            <div className="tst-cta-actions">
              <button
                className="tst-cta-btn-primary"
                onClick={() => onSectionChange('contact')}
              >
                Start a Project
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button
                className="tst-cta-btn-secondary"
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

export default Testimonials;