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
  .about-root {
    --paper:   #F7F5F0;
    --ink:     #1A1A2E;
    --red:     #E63946;
    --green:   #22C55E;
    --rule:    #C8C2B4;
    --muted:   #6B6560;
    --card-bg: #EEEAE2;
    font-family: 'Inter', sans-serif;
    background: var(--paper);
    color: var(--ink);
  }

  .playfair { font-family: 'Inter', sans-serif; }

  /* ruled lines background */
  .ruled {
    background-image: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 39px,
      var(--rule) 39px,
      var(--rule) 40px
              [
                { num: '6',  label: 'Projects\nDelivered' },
                { num: '|',    label: '' },
                { num: '3+',   label: 'Years\nExperience' },
                { num: '|',    label: '' },
                { num: '7',    label: 'Core\nServices' },
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

  /* service card */
  .service-card {
    background: var(--card-bg);
    border-left: 3px solid var(--rule);
    padding: 16px 18px;
    margin-bottom: 12px;
    transition: border-color .2s, box-shadow .2s;
    cursor: default;
  }
  .service-card:hover {
    border-left-color: var(--red);
    box-shadow: 4px 0 0 var(--red);
  }
  .service-card.green:hover {
    border-left-color: var(--green);
    box-shadow: 4px 0 0 var(--green);
  }

  /* big number index */
  .index-num {
    font-family: 'Inter';
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
    font-family: 'Inter';
    font-style: italic;
    font-size: clamp(18px, 2.5vw, 24px);
    line-height: 1.5;
    color: var(--ink);
  }

  .about-root a { color: var(--red); }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    num: '01',
    title: 'Full-Stack Software Development',
    desc: 'End-to-end web applications — from database architecture to pixel-perfect UIs — built with modern stacks like React, Python, FastAPI, and Docker.',
    tag: 'Development',
    accent: 'var(--red)',
  },
  {
    num: '02',
    title: 'Graphic Design',
    desc: 'Visual identities, UI/UX mockups, marketing collateral, and brand systems that communicate clearly and leave a lasting impression.',
    tag: 'Design',
    accent: 'var(--green)',
  },
  {
    num: '03',
    title: 'Wireless Network Installation & Optimization',
    desc: 'Planning, deploying, and fine-tuning wireless infrastructure for homes, offices, and enterprise environments — maximizing coverage and performance.',
    tag: 'Networking',
    accent: 'var(--red)',
  },
  {
    num: '04',
    title: 'Digital Marketing Strategy & Campaign Execution',
    desc: 'Data-driven campaigns across search, social, and display channels — from strategy through execution and ROI reporting.',
    tag: 'Marketing',
    accent: 'var(--green)',
  },
  {
    num: '05',
    title: 'SEO & Website Optimization',
    desc: 'Technical SEO audits, on-page optimization, Core Web Vitals improvements, and content strategy to drive organic growth and faster load times.',
    tag: 'SEO',
    accent: 'var(--red)',
  },
  {
    num: '06',
    title: 'Social Media Management & Content Creation',
    desc: 'Platform strategy, content calendars, copywriting, graphic production, and community engagement that grows audiences and builds brand loyalty.',
    tag: 'Social',
    accent: 'var(--green)',
  },
  {
    num: '07',
    title: 'Data Communication & Network Protocols',
    desc: 'Deep knowledge of TCP/IP, OSI model, VLANs, routing protocols, and data-link technologies — bridging hardware and software communication layers.',
    tag: 'Protocols',
    accent: 'var(--red)',
  },
];

const skills = [
  { name: 'React',            logo: reactLogo,   level: 95, tag: 'Frontend'  },
  { name: 'Python / FastAPI', logo: pythonLogo,  level: 90, tag: 'Backend'   },
  { name: 'Docker / AWS',     logo: dockerLogo,  level: 82, tag: 'DevOps'    },
  { name: 'SEO & Analytics',  logo: null,        level: 88, tag: 'Marketing' },
  { name: 'Network Config',   logo: null,        level: 85, tag: 'Networks'  },
  { name: 'Graphic Design',   logo: null,        level: 80, tag: 'Design'    },
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
          <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{skill.name}</span>
          <span className="tag" style={{ fontSize: 10 }}>{skill.tag}</span>
        </div>
        <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 18, color: 'var(--green)' }}>
          {skill.level}
          <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'Inter' }}>%</span>
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

function ServiceCard({ s, index, inView }) {
  const isGreen = s.accent === 'var(--green)';
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.08 * index }}
      className={`service-card${isGreen ? ' green' : ''}`}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <span style={{
          fontFamily: 'Inter',
          fontWeight: 900,
          fontSize: 13,
          color: 'transparent',
          WebkitTextStroke: `1px ${s.accent}`,
          lineHeight: 1,
          flexShrink: 0,
          marginTop: 2,
        }}>
          {s.num}
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
            <h4 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: 14, color: 'var(--ink)', margin: 0 }}>
              {s.title}
            </h4>
            <span
              className="tag"
              style={{ fontSize: 9, borderColor: s.accent, color: s.accent }}
            >
              {s.tag}
            </span>
          </div>
          <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
            {s.desc}
          </p>
        </div>
      </div>
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
            Full-Stack Engineer · Designer · Digital Strategist
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
              <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--red)' }}>
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
              <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>versatile</em><br />
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
                <span style={{ color: 'var(--paper)', fontFamily: 'Inter', fontWeight: 700, fontSize: 16 }}>B</span>
              </div>
              <div>
                <p style={{ margin: 0, fontFamily: 'DM Sans', fontWeight: 600, fontSize: 13, color: 'var(--ink)' }}>Brian Mwalish</p>
                <p style={{ margin: 0, fontFamily: 'DM Sans', fontSize: 11, color: 'var(--muted)' }}>Full-Stack Engineer · Designer · Digital Strategist</p>
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
                I'm a multi-disciplinary professional spanning <strong style={{ color: 'var(--red)' }}>software engineering, design, networking, and digital strategy</strong>. I bring a rare combination of technical depth and creative breadth — capable of building the product, designing the brand, connecting the infrastructure, and marketing the result.
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
              "From codebase to campaign — I build, design, connect, and grow digital ecosystems end to end."
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="ruled"
              style={{ padding: '0 0 16px' }}
            >
              <p style={{ fontFamily: 'DM Sans', fontSize: 16, lineHeight: 2.5, color: 'var(--ink)', margin: 0 }}>
                Whether architecting a full-stack application, crafting a brand identity, optimising a wireless network, or driving organic traffic through SEO — I approach every challenge with the same commitment: deliver work that is excellent, purposeful, and built to last.
              </p>
            </motion.div>

            {/* Services list */}
            <div className="h-rule" style={{ margin: '32px 0 24px' }} />
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <p style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>
                What I Do
              </p>
            </motion.div>

            <div>
              {services.map((s, i) => (
                <ServiceCard key={s.num} s={s} index={i} inView={isInView} />
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
                { num: '7',    label: 'Core\nServices' },
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

            {/* Disciplines tag cloud */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              style={{ marginBottom: 32 }}
            >
              <p style={{ fontFamily: 'DM Sans', fontWeight: 600, fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 14 }}>
                Disciplines
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[
                  { label: 'Software Dev',    red: true  },
                  { label: 'Graphic Design',  red: false },
                  { label: 'Networking',      red: true  },
                  { label: 'Digital Mktg',    red: false },
                  { label: 'SEO',             red: true  },
                  { label: 'Social Media',    red: false },
                  { label: 'Data Comms',      red: true  },
                ].map((t, i) => (
                  <motion.span
                    key={t.label}
                    className={`tag ${t.red ? 'tag-red' : 'tag-green'}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                  >
                    {t.label}
                  </motion.span>
                ))}
              </div>
            </motion.div>

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
                Whether it's a challenging project, a campaign to run, a network to set up, or an interesting collaboration — I'd love to hear from you.
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
            <span>Engineer · Designer · Digital Strategist</span>
          </div>
        </div>

      </section>
    </>
  );
};

export default About;