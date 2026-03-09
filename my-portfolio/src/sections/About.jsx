import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import reactLogo from "../assets/react.png";
import pythonLogo from "../assets/python.png";
import fastapiLogo from "../assets/fastapi.png";
import dockerLogo from "../assets/docker.png";
import awsLogo from "../assets/aws.png";

/* ─── EDITORIAL COLOR SYSTEM ───────────────────────────────────────────────
   #F7F5F0  — warm paper / page background
   #1A1A2E  — deep navy-ink / primary text
   #E63946  — red accent (headlines, highlights)
   #22C55E  — green accent (skill bars, tags)
   #C8C2B4  — muted ruled-line colour
   Fonts   : Playfair Display (display) + DM Sans (body)
──────────────────────────────────────────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .about-root {
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

  .playfair { font-family: 'Playfair Display', serif; }

  /* ruled lines background */
  .ruled {
    background-image: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 39px,
      var(--rule) 39px,
      var(--rule) 40px
    );
  }

  /* red overline */
  .overline-red::before {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: var(--red);
    margin-bottom: 10px;
  }

  /* skill bar track */
  .skill-track {
    height: 6px;
    background: rgba(26,26,46,0.1);
    border-radius: 999px;
    overflow: hidden;
  }

  .skill-fill {
    height: 100%;
    background: var(--green);
    border-radius: 999px;
    transform-origin: left;
  }

  /* tag chip */
  .tag {
    display: inline-block;
    border: 1px solid var(--ink);
    border-radius: 2px;
    padding: 2px 10px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: .08em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .tag-red { border-color: var(--red); color: var(--red); }
  .tag-green { border-color: var(--green); color: var(--green); }

  /* editorial card */
  .ed-card {
    background: var(--card-bg);
    border-top: 3px solid var(--ink);
    position: relative;
  }
  .ed-card-red { border-top-color: var(--red); }
  .ed-card-green { border-top-color: var(--green); }

  /* big number index */
  .index-num {
    font-family: 'Playfair Display', serif;
    font-size: clamp(48px, 8vw, 96px);
    font-weight: 900;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--rule);
    user-select: none;
    pointer-events: none;
  }

  /* horizontal rule */
  .h-rule {
    width: 100%;
    height: 1px;
    background: var(--rule);
  }

  /* column rule */
  .col-rule {
    width: 1px;
    background: var(--rule);
    align-self: stretch;
  }

  /* hover lift */
  .hover-lift { transition: transform .25s ease, box-shadow .25s ease; }
  .hover-lift:hover { transform: translateY(-4px); box-shadow: 6px 6px 0 var(--ink); }
  .hover-lift-red:hover { box-shadow: 6px 6px 0 var(--red); }
  .hover-lift-green:hover { box-shadow: 6px 6px 0 var(--green); }

  /* masthead stripe */
  .masthead-stripe {
    background: var(--ink);
    color: var(--paper);
  }

  /* pull quote */
  .pull-quote {
    border-left: 4px solid var(--red);
    padding-left: 20px;
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(18px, 2.5vw, 24px);
    line-height: 1.5;
    color: var(--ink);
  }

  .about-root a { color: var(--red); }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const skills = [
  { name: 'React',      logo: reactLogo,   level: 95, tag: 'Frontend'  },
  { name: 'Python',     logo: pythonLogo,  level: 90, tag: 'Backend'   },
  { name: 'FastAPI',    logo: fastapiLogo, level: 88, tag: 'API'       },
  { name: 'Docker',     logo: dockerLogo,  level: 82, tag: 'DevOps'    },
  { name: 'AWS',        logo: awsLogo,     level: 75, tag: 'Cloud'     },
  { name: 'PostgreSQL', logo: null,        level: 85, tag: 'Database'  },
];

const values = [
  { num: '01', title: 'Detail-Oriented',     desc: 'Every pixel matters. I craft polished experiences that users genuinely love.',              accent: 'var(--red)'   },
  { num: '02', title: 'Collaborative',        desc: 'Great software is built by great teams. I thrive in collaborative environments.',           accent: 'var(--green)' },
  { num: '03', title: 'Innovation-Driven',    desc: 'Always exploring new technologies and methodologies to solve problems better.',             accent: 'var(--red)'   },
  { num: '04', title: 'Growth Mindset',       desc: 'Continuous learning is key. Every challenge is an opportunity to improve and grow.',        accent: 'var(--green)' },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

function SkillRow({ skill, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
      className="hover-lift"
      style={{ background: 'var(--card-bg)', padding: '14px 18px', borderBottom: '1px solid var(--rule)', cursor: 'default' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {skill.logo
            ? <img src={skill.logo} alt={skill.name} style={{ width: 24, height: 24, objectFit: 'contain' }} />
            : <div style={{ width: 24, height: 24, background: 'var(--ink)', borderRadius: 4, opacity: 0.3 }} />
          }
          <span style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{skill.name}</span>
          <span className="tag" style={{ fontSize: 10 }}>{skill.tag}</span>
        </div>
        <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 18, color: 'var(--green)' }}>
          {skill.level}
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'DM Sans' }}>%</span>
        </span>
      </div>

      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.4 + index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

function ValueCard({ v, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.15 * index }}
      className="ed-card hover-lift"
      style={{
        borderTopColor: v.accent,
        padding: '20px 22px',
        flex: '1 1 200px',
        minWidth: 180
      }}
    >
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 48,
        fontWeight: 900,
        color: 'transparent',
        WebkitTextStroke: `1.5px ${v.accent}`,
        lineHeight: 1,
        marginBottom: 8
      }}>
        {v.num}
      </div>
      <h4 style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16, color: 'var(--ink)', marginBottom: 8 }}>
        {v.title}
      </h4>
      <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
        {v.desc}
      </p>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

const About = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const isInView   = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <>
      <style>{STYLES}</style>

      <section
        ref={sectionRef}
        id="about"
        className="about-root"
        style={{ minHeight: '100vh', padding: '0 0 80px' }}
      >

        {/* ── MASTHEAD ─────────────────────────────────────────────────────── */}
        <div className="masthead-stripe" style={{ padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', opacity: 0.6 }}>
            Portfolio · Issue No. 01
          </span>
          <span style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', opacity: 0.6 }}>
            Full-Stack Engineer
          </span>
        </div>

        {/* ── HEADER SPREAD ────────────────────────────────────────────────── */}
        <div style={{ padding: '40px 40px 0', maxWidth: 1280, margin: '0 auto' }}>
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}
          >
            <div style={{ height: 3, width: 40, background: 'var(--red)' }} />
            <span style={{ fontFamily: 'DM Sans', fontSize: 11, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--red)' }}>
              About Me
            </span>
          </motion.div>

          {/* Giant headline */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 24, marginBottom: 32 }}>
            <motion.h1
              className="playfair"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(40px, 7vw, 96px)',
                fontWeight: 900,
                lineHeight: 0.95,
                color: 'var(--ink)',
                margin: 0
              }}
            >
              Building<br />
              <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>elegant</em><br />
              solutions.
            </motion.h1>

            {/* Issue-style right block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                textAlign: 'right',
                borderRight: '3px solid var(--green)',
                paddingRight: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 4
              }}
            >
              <span style={{ fontFamily: 'DM Sans', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>Nairobi, Kenya</span>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>5+</span>
              <span style={{ fontFamily: 'DM Sans', fontSize: 11, color: 'var(--muted)', letterSpacing: '.05em' }}>Years Experience</span>
            </motion.div>
          </div>

          <div className="h-rule" />
        </div>

        {/* ── TWO-COLUMN BODY ──────────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '40px 40px 0',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.1fr) 1px minmax(0,0.9fr)',
            gap: '0 40px',
            alignItems: 'start'
          }}
        >

          {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
          <div>

            {/* Byline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
            >
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: 'var(--paper)', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16 }}>B</span>
              </div>
              <div>
                <p style={{ margin: 0, fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>Brian Mwalish</p>
                <p style={{ margin: 0, fontFamily: 'DM Sans', fontSize: 11, color: 'var(--muted)' }}>Full-Stack Software Engineer</p>
              </div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                <span className="tag tag-red">Available</span>
              </div>
            </motion.div>

            {/* Body copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="ruled"
              style={{ padding: '0 0 16px' }}
            >
              <p style={{ fontFamily: 'DM Sans', fontSize: 16, lineHeight: 2.5, color: 'var(--ink)', margin: '0 0 0' }}>
                I'm a passionate <strong style={{ color: 'var(--red)' }}>Full-Stack Software Engineer</strong> who
                turns complex problems into elegant solutions. With a strong foundation in both
                frontend and backend technologies, I create digital experiences that are not
                just functional — but delightful.
              </p>
            </motion.div>

            {/* Pull quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="pull-quote"
              style={{ margin: '32px 0' }}
            >
              "Great software lives at the intersection of technical excellence,
              user empathy, and creative problem-solving."
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="ruled"
              style={{ padding: '0 0 16px' }}
            >
              <p style={{ fontFamily: 'DM Sans', fontSize: 16, lineHeight: 2.5, color: 'var(--ink)', margin: 0 }}>
                My journey started with curiosity and has evolved into a deep passion for
                building scalable applications that make a real impact. Every challenge
                is an opportunity to learn, grow, and deliver something extraordinary.
              </p>
            </motion.div>

            {/* Values grid */}
            <div className="h-rule" style={{ margin: '32px 0 24px' }} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <p style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
                Core Principles
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {values.map((v, i) => (
                <ValueCard key={v.num} v={v} index={i} inView={isInView} />
              ))}
            </div>
          </div>

          {/* ── COLUMN RULE ─────────────────────────────────────────── */}
          <div className="col-rule" style={{ marginTop: 60 }} />

          {/* ── RIGHT COLUMN ────────────────────────────────────────── */}
          <div>

            {/* Skills section label */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
              className="overline-red"
              style={{ marginBottom: 20 }}
            >
              <h3 className="playfair" style={{ fontWeight: 700, fontSize: 22, color: 'var(--ink)', margin: 0 }}>
                Technical Expertise
              </h3>
            </motion.div>

            {/* Skill rows */}
            <div style={{ marginBottom: 40 }}>
              {skills.map((skill, i) => (
                <SkillRow key={skill.name} skill={skill} index={i} inView={isInView} />
              ))}
            </div>

            {/* Stats row */}
            <div className="h-rule" style={{ marginBottom: 28 }} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', gap: 0 }}
            >
              {[
                { num: '20+',  label: 'Projects\nDelivered' },
                { num: '|',    label: '' },
                { num: '5+',   label: 'Years\nExperience' },
                { num: '|',    label: '' },
                { num: '100%', label: 'Client\nSatisfaction' },
              ].map((s, i) =>
                s.num === '|'
                  ? <div key={i} style={{ width: 1, background: 'var(--rule)', margin: '0 auto' }} />
                  : (
                    <div key={i} style={{ textAlign: 'center', padding: '12px 8px' }}>
                      <div className="playfair" style={{ fontWeight: 900, fontSize: 32, color: i === 0 ? 'var(--red)' : i === 2 ? 'var(--green)' : 'var(--ink)', lineHeight: 1 }}>
                        {s.num}
                      </div>
                      <div style={{ fontFamily: 'DM Sans', fontSize: 10, color: 'var(--muted)', letterSpacing: '.08em', textTransform: 'uppercase', lineHeight: 1.4, marginTop: 4, whiteSpace: 'pre-line' }}>
                        {s.label}
                      </div>
                    </div>
                  )
              )}
            </motion.div>
            <div className="h-rule" style={{ marginBottom: 32 }} />

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="ed-card ed-card-red hover-lift hover-lift-red"
              style={{ padding: '28px 28px 24px' }}
            >
              <p style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--red)', marginBottom: 12 }}>
                Open to Opportunities
              </p>
              <h3 className="playfair" style={{ fontWeight: 700, fontSize: 22, color: 'var(--ink)', marginBottom: 12, lineHeight: 1.2 }}>
                Let's Build Something Amazing Together
              </h3>
              <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 24 }}>
                Whether it's a challenging project or an interesting collaboration, I'd love to hear from you and explore what we can create.
              </p>

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => onSectionChange && onSectionChange('contact')}
                  style={{
                    background: 'var(--ink)',
                    color: 'var(--paper)',
                    border: 'none',
                    padding: '12px 24px',
                    fontFamily: 'DM Sans',
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: '.05em',
                    cursor: 'pointer',
                    transition: 'background .2s',
                    borderRadius: 2
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--red)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--ink)'}
                >
                  Get In Touch →
                </button>

                <button
                  onClick={() => onSectionChange && onSectionChange('projects')}
                  style={{
                    background: 'transparent',
                    color: 'var(--ink)',
                    border: '1.5px solid var(--ink)',
                    padding: '12px 24px',
                    fontFamily: 'DM Sans',
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: '.05em',
                    cursor: 'pointer',
                    transition: 'all .2s',
                    borderRadius: 2
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--ink)'; e.currentTarget.style.color = 'var(--paper)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink)'; }}
                >
                  View Work
                </button>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── FOOTER RULE ──────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '60px auto 0', padding: '0 40px' }}>
          <div className="h-rule" />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontFamily: 'DM Sans', fontSize: 10, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
            <span>Brian Mwalish · Portfolio</span>
            <span>Full-Stack Software Engineer</span>
          </div>
        </div>

      </section>
    </>
  );
};

export default About;