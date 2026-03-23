import React, { useRef, useState, useEffect } from 'react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const skillGroups = [
  {
    num: '01',
    category: 'Frontend',
    accent: '#E63946',
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#F7F5F0" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    tagline: 'Pixel-perfect interfaces',
    skills: [
      { name: 'React', level: 92 },
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 75 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'Tailwind CSS', level: 88 },
      { name: 'Vite', level: 80 },
    ],
  },
  {
    num: '02',
    category: 'Backend',
    accent: '#2563EB',
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#F7F5F0" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    tagline: 'Scalable APIs & data layers',
    skills: [
      { name: 'Django', level: 88 },
      { name: 'Django REST', level: 85 },
      { name: 'Node.js', level: 70 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'SQLite', level: 78 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    num: '03',
    category: 'Tools & DevOps',
    accent: '#16A34A',
    icon: (
      <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#F7F5F0" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    tagline: 'From idea to deployment',
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Linux', level: 75 },
      { name: 'Figma', level: 72 },
      { name: 'Postman', level: 85 },
      { name: 'VS Code', level: 95 },
      { name: 'M-Pesa API', level: 80 },
    ],
  },
];

const highlights = [
  { label: 'Skill Areas', val: skillGroups.length, suffix: '' },
  { label: 'Technologies', val: skillGroups.reduce((a, g) => a + g.skills.length, 0), suffix: '+' },
  { label: 'Avg Proficiency', val: Math.round(skillGroups.flatMap(g => g.skills).reduce((a, s) => a + s.level, 0) / skillGroups.flatMap(g => g.skills).length), suffix: '%' },
  { label: 'Years Coding', val: 3, suffix: '+' },
];

// ─── COUNTER ──────────────────────────────────────────────────────────────────

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

// ─── SKILL BAR ────────────────────────────────────────────────────────────────

const SkillBar = ({ name, level, accent, delay }) => {
  const [ready, setReady] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setReady(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1A1A2E', fontFamily: "'DM Sans', sans-serif" }}>{name}</span>
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: accent }}>{level}%</span>
      </div>
      <div style={{ height: 6, background: '#E8E4DC', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: ready ? `${level}%` : '0%',
          background: accent,
          borderRadius: 2,
          transition: `width 0.9s cubic-bezier(.22,1,.36,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Skills = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .sk-root {
          font-family: 'DM Sans', sans-serif;
          background-color: #F7F5F0;
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        .sk-root::before {
          content: '';
          position: absolute; inset: 0;
          background-image: repeating-linear-gradient(
            0deg, transparent, transparent 47px, #E2DDD5 47px, #E2DDD5 48px
          );
          pointer-events: none; z-index: 0;
        }
        .sk-accent-bar {
          position: absolute; top: 0; left: 0;
          width: 8px; height: 100%;
          background-color: #1A1A2E; z-index: 2;
        }
        .sk-inner {
          position: relative; z-index: 10;
          max-width: 1280px; margin: 0 auto;
          padding: 80px 48px 80px 72px;
        }

        /* HEADER */
        .sk-header {
          display: flex; align-items: flex-start;
          justify-content: space-between; gap: 32px;
          margin-bottom: 48px; flex-wrap: wrap;
        }
        .sk-section-label {
          display: inline-flex; align-items: center; gap: 8px;
          background-color: #1A1A2E; color: #F7F5F0;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 6px 14px; border-radius: 2px; margin-bottom: 16px;
        }
        .sk-heading {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(3rem, 6vw, 5.5rem); font-weight: 900;
          color: #1A1A2E; line-height: 0.95;
          letter-spacing: -0.03em; margin: 0;
        }
        .sk-heading span { color: #E63946; }
        .sk-subtext {
          font-size: 1rem; color: #4B4A56;
          line-height: 1.75; max-width: 380px;
          margin: 20px 0 0; align-self: flex-end;
        }

        /* STATS ROW */
        .sk-stats-row {
          display: flex; gap: 0;
          border: 2px solid #1A1A2E; border-radius: 4px;
          overflow: hidden; margin-bottom: 48px;
          box-shadow: 4px 4px 0 #D1CDC4;
        }
        .sk-stat-cell {
          flex: 1; padding: 20px 28px;
          border-right: 2px solid #1A1A2E;
          background: #fff;
        }
        .sk-stat-cell:last-child { border-right: none; }
        .sk-stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 900;
          color: #1A1A2E; line-height: 1;
          display: block; margin-bottom: 2px;
        }
        .sk-stat-label {
          font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #9A9590;
        }

        /* DIVIDER */
        .sk-divider {
          display: flex; align-items: center; gap: 12px; margin-bottom: 40px;
        }
        .sk-divider-line { height: 2px; background-color: #1A1A2E; flex: 0 0 48px; }
        .sk-divider-dot { width: 8px; height: 8px; border-radius: 50%; background-color: #E63946; }
        .sk-divider-text {
          font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase; color: #9A9590;
        }

        /* CARDS GRID */
        .sk-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 28px; margin-bottom: 64px;
        }

        /* SKILL CARD */
        .sk-card {
          background-color: #FFFFFF;
          border: 2px solid #1A1A2E;
          border-radius: 4px; padding: 32px;
          display: flex; flex-direction: column;
          position: relative; overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
          animation: fadeInCard 0.5s ease both;
        }
        .sk-card:hover { transform: translateY(-6px); }
        .sk-card-num {
          position: absolute; top: 14px; right: 18px;
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem; font-weight: 900; color: #F0EDE8;
          line-height: 1; letter-spacing: -3px;
          pointer-events: none; user-select: none;
        }
        .sk-card-icon-wrap {
          width: 48px; height: 48px; border-radius: 2px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-bottom: 20px;
        }
        .sk-card-top {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 8px;
        }
        .sk-card-category {
          background-color: #1A1A2E; color: #F7F5F0;
          font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; padding: 4px 10px; border-radius: 2px;
        }
        .sk-card-count {
          font-size: 0.68rem; font-weight: 600; color: #9A9590;
          letter-spacing: 0.06em;
        }
        .sk-card-accent-bar { height: 3px; border-radius: 2px; margin-bottom: 8px; width: 36px; }
        .sk-card-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.5rem; font-weight: 700; color: #1A1A2E;
          margin: 0 0 4px; line-height: 1.15; letter-spacing: -0.02em;
        }
        .sk-card-tagline {
          font-size: 0.82rem; color: #9A9590;
          margin: 0 0 24px; font-style: italic;
        }
        .sk-bars-wrapper { flex: 1; }

        /* PROFICIENCY KEY */
        .sk-key {
          background: #fff; border: 2px solid #1A1A2E;
          border-radius: 4px; padding: 36px 40px;
          margin-bottom: 64px; box-shadow: 4px 4px 0 #D1CDC4;
          position: relative; overflow: hidden;
          animation: fadeInUp 0.6s ease 0.2s both;
        }
        .sk-key-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 700; color: #1A1A2E;
          margin: 0 0 6px; letter-spacing: -0.02em;
        }
        .sk-key-sub {
          font-size: 0.85rem; color: #9A9590; margin: 0 0 28px;
        }
        .sk-key-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }
        .sk-key-item {
          display: flex; flex-direction: column; gap: 6px;
        }
        .sk-key-item-header {
          display: flex; align-items: center; gap: 8px;
        }
        .sk-key-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .sk-key-range {
          font-size: 0.82rem; font-weight: 700; color: #1A1A2E;
        }
        .sk-key-desc {
          font-size: 0.75rem; color: #9A9590; padding-left: 18px;
        }
        .sk-key-bar {
          height: 4px; border-radius: 2px;
          margin-left: 18px; background: #E8E4DC; overflow: hidden;
        }
        .sk-key-bar-fill { height: 100%; border-radius: 2px; }

        /* CORNER WATERMARK */
        .sk-corner-num {
          position: absolute; top: 32px; right: 48px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(5rem, 12vw, 10rem); font-weight: 900;
          color: #E2DDD5; line-height: 1;
          user-select: none; pointer-events: none; z-index: 1; letter-spacing: -0.04em;
        }

        /* ALL SKILLS TICKER */
        .sk-ticker-wrap {
          overflow: hidden; border-top: 2px solid #1A1A2E;
          border-bottom: 2px solid #1A1A2E;
          background: #1A1A2E;
          padding: 14px 0; margin-bottom: 64px;
          position: relative;
        }
        .sk-ticker {
          display: flex; gap: 0; white-space: nowrap;
          animation: tickerScroll 20s linear infinite;
        }
        .sk-ticker:hover { animation-play-state: paused; }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .sk-ticker-item {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 0 28px;
          font-size: 0.78rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #F7F5F0; flex-shrink: 0;
        }
        .sk-ticker-sep { color: #E63946; font-size: 0.6rem; }

        /* EXPERIENCE CALLOUT */
        .sk-callout {
          background: #1A1A2E; border-radius: 4px;
          border: 2px solid #1A1A2E;
          box-shadow: 8px 8px 0 #E63946;
          padding: 48px; margin-bottom: 0;
          position: relative; overflow: hidden;
        }
        .sk-callout::after {
          content: '{ }'; position: absolute;
          right: 40px; top: 50%; transform: translateY(-50%);
          font-family: 'Playfair Display', serif; font-size: 9rem; font-weight: 900;
          color: rgba(255,255,255,0.04); pointer-events: none; user-select: none;
        }
        .sk-callout-label {
          display: inline-flex; align-items: center; gap: 8px;
          background: #E63946; color: #F7F5F0;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; padding: 5px 12px; border-radius: 2px;
          margin-bottom: 20px;
        }
        .sk-callout-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700;
          color: #F7F5F0; margin: 0 0 12px; letter-spacing: -0.02em;
        }
        .sk-callout-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px 24px; margin-top: 28px;
        }
        .sk-callout-item {
          display: flex; align-items: flex-start; gap: 10px;
          font-size: 0.88rem; color: #C8C4C0; line-height: 1.5;
        }
        .sk-callout-arrow { color: #E63946; font-size: 0.8rem; flex-shrink: 0; margin-top: 2px; }

        @media (max-width: 900px) {
          .sk-inner { padding: 60px 24px 60px 40px; }
          .sk-grid { grid-template-columns: 1fr; }
          .sk-stats-row { flex-wrap: wrap; }
          .sk-stat-cell { border-bottom: 2px solid #1A1A2E; flex: 0 0 50%; }
        }
        @media (max-width: 600px) {
          .sk-inner { padding: 48px 16px 48px 28px; }
          .sk-heading { font-size: 2.8rem; }
          .sk-stat-cell { flex: 0 0 100%; }
          .sk-callout::after { display: none; }
          .sk-key-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <section className="sk-root" id="skills">
        <div className="sk-accent-bar" />
        <div className="sk-corner-num" aria-hidden="true">03</div>

        <div className="sk-inner">

          {/* ── HEADER ── */}
          <div className="sk-header">
            <div>
              <div className="sk-section-label">
                <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#22C55E', display: 'inline-block' }} />
                Expertise · {skillGroups.reduce((a, g) => a + g.skills.length, 0)} Skills
              </div>
              <h2 className="sk-heading">
                Skills &amp;<br />
                <span>Toolbox</span>
              </h2>
            </div>
            <p className="sk-subtext">
              Three years of intentional full-stack practice — from browser pixels to database schemas, infrastructure to payments.
            </p>
          </div>

          {/* ── STATS ROW ── */}
          <div className="sk-stats-row">
            {highlights.map((s, i) => (
              <div className="sk-stat-cell" key={i}>
                <span className="sk-stat-num" style={{ color: i === 0 ? '#E63946' : '#1A1A2E' }}>
                  <Counter target={s.val} suffix={s.suffix} />
                </span>
                <span className="sk-stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="sk-divider">
            <div className="sk-divider-line" />
            <div className="sk-divider-dot" />
            <span className="sk-divider-text">Core Disciplines</span>
          </div>

          {/* ── SKILL CARDS ── */}
          <div className="sk-grid">
            {skillGroups.map((group, gi) => (
              <div
                key={group.num}
                className="sk-card"
                onMouseEnter={() => setHoveredCard(gi)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  boxShadow: hoveredCard === gi
                    ? `6px 6px 0 ${group.accent}`
                    : '4px 4px 0 #D1CDC4',
                  animationDelay: `${gi * 0.1}s`,
                }}
              >
                <div className="sk-card-num">{group.num}</div>

                <div
                  className="sk-card-icon-wrap"
                  style={{ backgroundColor: group.accent }}
                >
                  {group.icon}
                </div>

                <div className="sk-card-top">
                  <span className="sk-card-category">{group.category}</span>
                  <span className="sk-card-count">{group.skills.length} skills</span>
                </div>

                <div
                  className="sk-card-accent-bar"
                  style={{ backgroundColor: group.accent }}
                />

                <h3 className="sk-card-title">{group.category}</h3>
                <p className="sk-card-tagline">{group.tagline}</p>

                <div className="sk-bars-wrapper">
                  {group.skills.map((skill, si) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      accent={group.accent}
                      delay={si * 0.07}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── SCROLLING TECH TICKER ── */}
          <div className="sk-ticker-wrap">
            <div className="sk-ticker">
              {/* Double the items so it loops seamlessly */}
              {[...skillGroups.flatMap(g => g.skills), ...skillGroups.flatMap(g => g.skills)].map((s, i) => (
                <span key={i} className="sk-ticker-item">
                  {s.name}
                  <span className="sk-ticker-sep">◆</span>
                </span>
              ))}
            </div>
          </div>

          {/* ── PROFICIENCY KEY ── */}
          <div className="sk-key">
            <div style={{
              position: 'absolute', top: 12, right: 20,
              fontFamily: "'Playfair Display', serif",
              fontSize: '4rem', fontWeight: 900, color: '#F0EDE8',
              pointerEvents: 'none', userSelect: 'none',
            }}>≈</div>
            <h3 className="sk-key-title">Proficiency Scale</h3>
            <p className="sk-key-sub">How I self-assess each skill across the spectrum</p>
            <div className="sk-key-grid">
              {[
                { range: '90–100%', desc: 'Expert — production daily use', color: '#1A1A2E', fill: '100%' },
                { range: '75–89%', desc: 'Advanced — confident shipping', color: '#2563EB', fill: '82%' },
                { range: '60–74%', desc: 'Proficient — regular usage', color: '#16A34A', fill: '67%' },
                { range: '< 60%', desc: 'Learning — growing actively', color: '#D97706', fill: '45%' },
              ].map((k, i) => (
                <div className="sk-key-item" key={i}>
                  <div className="sk-key-item-header">
                    <div className="sk-key-dot" style={{ backgroundColor: k.color }} />
                    <span className="sk-key-range">{k.range}</span>
                  </div>
                  <div className="sk-key-bar">
                    <div className="sk-key-bar-fill" style={{ width: k.fill, background: k.color }} />
                  </div>
                  <span className="sk-key-desc">{k.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── LEARNING & EXPERIENCE CALLOUT ── */}
          <div className="sk-callout">
            <div className="sk-callout-label">
              <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#F7F5F0', display: 'inline-block' }} />
              Continuous Growth
            </div>
            <h3 className="sk-callout-heading">
              Always learning, always building.
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#A8A4A0', lineHeight: 1.75, maxWidth: 560, margin: 0 }}>
              Every project adds new depth. From integrating M-Pesa payments to architecting role-based access systems — practical challenges keep the stack growing.
            </p>
            <div className="sk-callout-grid">
              {[
                'Clean, readable code habits',
                'RESTful API best practices',
                'Mobile-first responsive design',
                'Database schema design',
                'Real-world payment integrations',
                'Agile & Git-based workflows',
                'Performance optimisation',
                'UI/UX design fundamentals',
              ].map((item, i) => (
                <div key={i} className="sk-callout-item">
                  <span className="sk-callout-arrow">▸</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Skills;
