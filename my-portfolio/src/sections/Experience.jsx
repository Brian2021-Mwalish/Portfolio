import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── EDITORIAL COLOR SYSTEM ───────────────────────────────────────────────
   #F7F5F0  — warm paper / page background
   #1A1A2E  — deep navy-ink / primary text
   #E63946  — red accent
   #22C55E  — green accent
   #C8C2B4  — muted ruled-line colour
   Fonts   : Playfair Display (display) + DM Sans (body)
──────────────────────────────────────────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .exp-root {
    --paper:   #F7F5F0;
    --ink:     #1A1A2E;
    --red:     #E63946;
    --green:   #22C55E;
    --rule:    #C8C2B4;
    --muted:   #6B6560;
    --card-bg: #EEEAE2;
    font-family: 'DM Sans', sans-serif;
    background: var(--paper);
    color: var(--ink);
  }

  .exp-root .playfair { font-family: 'Playfair Display', serif; }

  .exp-root .ruled {
    background-image: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 39px,
      var(--rule) 39px,
      var(--rule) 40px
    );
  }

  .exp-root .h-rule {
    width: 100%;
    height: 1px;
    background: var(--rule);
  }

  .exp-root .masthead-stripe {
    background: var(--ink);
    color: var(--paper);
  }

  .exp-root .ed-card {
    background: var(--card-bg);
    border-top: 3px solid var(--ink);
    position: relative;
  }
  .exp-root .ed-card-red   { border-top-color: var(--red); }
  .exp-root .ed-card-green { border-top-color: var(--green); }

  .exp-root .tag {
    display: inline-block;
    border: 1px solid var(--ink);
    border-radius: 2px;
    padding: 2px 8px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
  }
  .exp-root .tag-red   { border-color: var(--red);   color: var(--red);   }
  .exp-root .tag-green { border-color: var(--green); color: var(--green); }
  .exp-root .tag-ink   { border-color: var(--ink);   color: var(--ink);   background: var(--ink); color: var(--paper); }

  .exp-root .hover-lift {
    transition: transform .25s ease, box-shadow .25s ease;
    cursor: default;
  }
  .exp-root .hover-lift:hover { transform: translateY(-4px); box-shadow: 6px 6px 0 var(--ink); }
  .exp-root .hover-lift-red:hover   { box-shadow: 6px 6px 0 var(--red); }
  .exp-root .hover-lift-green:hover { box-shadow: 6px 6px 0 var(--green); }

  .exp-root .overline-red::before {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: var(--red);
    margin-bottom: 10px;
  }

  .exp-root .tech-chip {
    display: inline-block;
    background: rgba(26,26,46,0.07);
    border: 1px solid var(--rule);
    border-radius: 2px;
    padding: 3px 10px;
    font-size: 11px;
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    font-weight: 500;
    letter-spacing: .03em;
  }

  .exp-root .check-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.6;
  }
  .exp-root .check-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--green);
    flex-shrink: 0;
    margin-top: 6px;
  }
  .exp-root .check-dot-red {
    background: var(--red);
  }

  .exp-root .summary-card {
    background: var(--card-bg);
    border-top: 3px solid var(--green);
    padding: 24px;
    text-align: center;
  }

  .exp-root .icon-box {
    width: 48px;
    height: 48px;
    background: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;
  }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const experiences = [
  {
    index: '01',
    role: 'Fullstack Software Developer',
    company: 'Lish AI Labs',
    period: 'May 2025 – Aug 2025',
    duration: '3 months',
    type: 'Full-time',
    location: 'Remote',
    accent: 'var(--green)',
    details: [
      'Developed and maintained fullstack applications with AI-powered features',
      'Integrated AI capabilities into existing systems and improved UX',
      'Collaborated with engineering team end-to-end from planning to deployment',
    ],
    technologies: ['React', 'Django', 'PostgreSQL', 'AI Integration', 'REST APIs', 'Git'],
    achievements: [
      'Delivered AI-enhanced features on schedule',
      'Contributed to performance improvements and UX updates',
    ],
  },
  {
    index: '02',
    role: 'Practicum Instructor – Networking & IT Skills',
    company: 'University of Eastern Africa, Baraton',
    period: 'Sep 2024 – Apr 2025',
    duration: '2 semesters · Part-time',
    type: 'Part-time',
    location: 'On-site',
    accent: 'var(--red)',
    details: [
      'Taught practicum sessions to students preparing for industrial attachment',
      'Demonstrated Ethernet crimping, WiFi setup and MikroTik/Ubiquiti configuration',
      'Ensured students understood key requirements before attachment',
    ],
    technologies: ['Networking', 'Ethernet', 'WiFi', 'MikroTik', 'Ubiquiti', 'IT Infrastructure'],
    achievements: [
      'Prepared students for real-world networking tasks',
      'Received positive feedback for practical teaching approach',
    ],
  },
  {
    index: '03',
    role: 'Python Bootcamp Trainer',
    company: 'University of Eastern Africa, Baraton',
    period: 'Sep 2024 – Apr 2025',
    duration: '2 semesters · Part-time',
    type: 'Part-time',
    location: 'On-site',
    accent: 'var(--green)',
    details: [
      'Trained and mentored undergraduate students in Python and its frameworks',
      'Developed and delivered curriculum for Python, Django and Flask',
      'Balanced teaching responsibilities alongside final-year academic workload',
    ],
    technologies: ['Python', 'Django', 'Flask', 'Jupyter Notebook'],
    achievements: [
      'Successfully trained multiple cohorts in Python fundamentals',
      'Contributed to the department's practical learning initiatives',
    ],
  },
  {
    index: '04',
    role: 'Educational Outreach',
    company: 'UEAB Young Mentorship Program',
    period: 'Oct 2023 – Apr 2025',
    duration: '1 year 6 months · Casual',
    type: 'Casual',
    location: 'On-site',
    accent: 'var(--red)',
    details: [
      'Taught children aged 6–10 basic keyboarding, Windows accessories and file exploration',
      'Taught children aged 11–16 Scratch programming and faster typing basics',
    ],
    technologies: ['Scratch', 'Windows OS', 'Basic Computer Skills'],
    achievements: [
      'Introduced foundational computer skills to young learners',
      'Built confidence and digital literacy in students',
    ],
  },
  {
    index: '05',
    role: 'Graphic Designer & Data Entry Clerk',
    company: 'Kariki Farm – Molo',
    period: 'Jul 2020 – Aug 2022',
    duration: '2 years 1 month · Full-time',
    type: 'Full-time',
    location: 'On-site',
    accent: 'var(--green)',
    details: [
      'Designed animations and visual materials for internal company advertisements',
      'Performed data entry tasks and maintained accurate company records',
      'Coordinated with teams to ensure timely delivery of visual content',
    ],
    technologies: ['Graphic Design Tools', 'Animation Tools', 'Data Entry Systems'],
    achievements: [
      'Improved consistency of internal marketing materials',
      'Delivered all design work on schedule',
    ],
  },
  {
    index: '06',
    role: 'Freelance Web & Mobile Designer',
    company: 'Self-Employed / Freelance',
    period: 'Ongoing · Project-based',
    duration: 'Project-based',
    type: 'Freelance',
    location: 'Remote',
    accent: 'var(--red)',
    details: [
      'Designed UI for web and mobile applications and marketing materials',
      'Developed visual content for weddings, events and social campaigns',
      'Managed clients' social media accounts to boost engagement',
    ],
    technologies: ['UI Design', 'Branding', 'Social Media Tools', 'Design Suites'],
    achievements: [
      'Consistently met deadlines across multiple concurrent projects',
      'Increased social media engagement for clients',
    ],
  },
];

// ─── EXPERIENCE CARD ─────────────────────────────────────────────────────────

function ExpCard({ exp, index, inView }) {
  const isEven = index % 2 === 0;
  const accentIsGreen = exp.accent === 'var(--green)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className={`ed-card hover-lift ${accentIsGreen ? 'hover-lift-green' : 'hover-lift-red'}`}
      style={{ borderTopColor: exp.accent, padding: '24px 26px' }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div
          className="playfair"
          style={{
            fontSize: 52,
            fontWeight: 900,
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: `1.5px ${exp.accent === 'var(--green)' ? '#C8C2B4' : '#C8C2B4'}`,
            userSelect: 'none',
          }}
        >
          {exp.index}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
          <span className="tag">{exp.type}</span>
          <span style={{ fontFamily: 'DM Sans', fontSize: 10, color: 'var(--muted)', letterSpacing: '.06em', textTransform: 'uppercase' }}>
            {exp.location}
          </span>
        </div>
      </div>

      {/* Role & company */}
      <h3
        className="playfair"
        style={{ fontWeight: 700, fontSize: 'clamp(16px,2vw,20px)', color: 'var(--ink)', marginBottom: 4, lineHeight: 1.2 }}
      >
        {exp.role}
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: exp.accent }}>
          {exp.company}
        </span>
        <span style={{ color: 'var(--rule)' }}>·</span>
        <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'var(--muted)' }}>{exp.period}</span>
      </div>

      <div className="h-rule" style={{ marginBottom: 16 }} />

      {/* Responsibilities */}
      <p style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
        Responsibilities
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
        {exp.details.map((d, i) => (
          <div key={i} className="check-item">
            <div className="check-dot" />
            <span>{d}</span>
          </div>
        ))}
      </div>

      {/* Technologies */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
        {exp.technologies.map((t, i) => (
          <span key={i} className="tech-chip">{t}</span>
        ))}
      </div>

      <div className="h-rule" style={{ marginBottom: 14 }} />

      {/* Achievements */}
      <p style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 10 }}>
        Key Achievements
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {exp.achievements.map((a, i) => (
          <div key={i} className="check-item">
            <div className="check-dot check-dot-red" />
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{a}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const Experience = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={sectionRef}
        id="experience"
        className="exp-root"
        style={{ minHeight: '100vh', paddingBottom: 80 }}
      >

        {/* ── MASTHEAD ───────────────────────────────────────────────────── */}
        <div className="masthead-stripe" style={{ padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', opacity: 0.6 }}>
            Portfolio · Issue No. 02
          </span>
          <span style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', opacity: 0.6 }}>
            Professional Experience
          </span>
        </div>

        {/* ── PAGE HEADER ────────────────────────────────────────────────── */}
        <div style={{ padding: '40px 40px 0', maxWidth: 1280, margin: '0 auto' }}>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}
          >
            <div style={{ height: 3, width: 40, background: 'var(--red)' }} />
            <span style={{ fontFamily: 'DM Sans', fontSize: 11, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--red)' }}>
              Work History
            </span>
          </motion.div>

          {/* Headline + meta */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 24, marginBottom: 32 }}>
            <motion.h1
              className="playfair"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(40px,7vw,96px)', fontWeight: 900, lineHeight: 0.95, color: 'var(--ink)', margin: 0 }}
            >
              Professional<br />
              <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>Journey</em><br />
              & Growth.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ textAlign: 'right', borderRight: '3px solid var(--green)', paddingRight: 16, display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              <span style={{ fontFamily: 'DM Sans', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Roles Held</span>
              <span className="playfair" style={{ fontSize: 28, fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>6+</span>
              <span style={{ fontFamily: 'DM Sans', fontSize: 11, color: 'var(--muted)', letterSpacing: '.05em' }}>Positions</span>
            </motion.div>
          </div>

          {/* Intro copy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontFamily: 'DM Sans', fontSize: 16, color: 'var(--muted)', maxWidth: 680, lineHeight: 1.8, marginBottom: 32 }}
          >
            From graphic design and educational outreach to AI-integrated full-stack development —
            a record of continuous growth across technology, teaching and creative work.
          </motion.p>

          <div className="h-rule" />
        </div>

        {/* ── EXPERIENCE GRID ────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 40px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
            {experiences.map((exp, i) => (
              <ExpCard key={exp.index} exp={exp} index={i} inView={isInView} />
            ))}
          </div>
        </div>

        {/* ── SKILLS SUMMARY STRIP ───────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '60px auto 0', padding: '0 40px' }}>
          <div className="h-rule" style={{ marginBottom: 32 }} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 20 }}>
              Skills Summary
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '⌨', title: 'Full-Stack Development', sub: 'React · Django · PostgreSQL · REST APIs', accent: 'var(--green)' },
              { icon: '☁', title: 'Cloud & DevOps',          sub: 'AWS · Docker · Git · CI/CD',            accent: 'var(--red)'   },
              { icon: '✦', title: 'AI Integration',           sub: 'AI-powered features · Automation',      accent: 'var(--green)' },
              { icon: '◈', title: 'Teaching & Mentorship',   sub: 'Python · Networking · Scratch',          accent: 'var(--red)'   },
              { icon: '◉', title: 'Design & Branding',        sub: 'UI/UX · Graphic Design · Animation',   accent: 'var(--green)' },
              { icon: '◆', title: 'Networking & IT',          sub: 'MikroTik · Ubiquiti · Ethernet · WiFi', accent: 'var(--red)'   },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.05 * i + 0.3 }}
                className="summary-card hover-lift"
                style={{ borderTopColor: s.accent }}
              >
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, color: s.accent, marginBottom: 8, lineHeight: 1 }}>
                  {s.icon}
                </div>
                <h4 style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 13, color: 'var(--ink)', marginBottom: 6 }}>
                  {s.title}
                </h4>
                <p style={{ fontFamily: 'DM Sans', fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, margin: 0 }}>
                  {s.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '60px auto 0', padding: '0 40px' }}>
          <div className="h-rule" style={{ marginBottom: 40 }} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="ed-card ed-card-red hover-lift hover-lift-red"
            style={{ padding: '36px 40px', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 32 }}
          >
            <div>
              <p style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 10 }}>
                Open to New Roles
              </p>
              <h3 className="playfair" style={{ fontWeight: 700, fontSize: 'clamp(20px,3vw,30px)', color: 'var(--ink)', marginBottom: 10, lineHeight: 1.2 }}>
                Ready for New Challenges
              </h3>
              <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
                I'm always interested in roles where I can contribute my experience in full-stack
                development, mentorship and creative problem-solving.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0 }}>
              <button
                onClick={() => onSectionChange && onSectionChange('contact')}
                style={{
                  background: 'var(--ink)', color: 'var(--paper)',
                  border: 'none', padding: '14px 28px',
                  fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13,
                  letterSpacing: '.05em', cursor: 'pointer',
                  borderRadius: 2, transition: 'background .2s', whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--red)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
              >
                Get In Touch →
              </button>
              <button
                onClick={() => onSectionChange && onSectionChange('projects')}
                style={{
                  background: 'transparent', color: 'var(--ink)',
                  border: '1.5px solid var(--ink)', padding: '12px 28px',
                  fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13,
                  letterSpacing: '.05em', cursor: 'pointer',
                  borderRadius: 2, transition: 'all .2s', whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--paper)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}
              >
                View Projects
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── FOOTER RULE ────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '40px auto 0', padding: '0 40px' }}>
          <div className="h-rule" />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontFamily: 'DM Sans', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            <span>Brian Mwalish · Portfolio</span>
            <span>Professional Experience</span>
          </div>
        </div>

      </section>
    </>
  );
};

export default Experience;