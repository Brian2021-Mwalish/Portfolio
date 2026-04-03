import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/* ─── EDITORIAL COLOR SYSTEM ───────────────────────────────────────────────
   #F7F5F0  — warm paper / page background
   #1A1A2E  — deep navy-ink / primary text
   #E63946  — red accent (headlines, highlights)
   #22C55E  — green accent (skill bars, tags)
   #C8C2B4  — muted ruled-line colour
   Fonts   : Playfair Display (display) + DM Sans (body)
──────────────────────────────────────────────────────────────────────────── */

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');
  
  .funfacts-root {
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

  .funfacts-root .playfair { font-family: 'Playfair Display', serif; }

  /* ruled lines background */
  .funfacts-root .ruled {
    background-image: repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 39px,
      var(--rule) 39px,
      var(--rule) 40px
    );
  }

  /* red overline */
  .funfacts-root .overline-red::before {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: var(--red);
    margin-bottom: 10px;
  }

  /* editorial card */
  .funfacts-root .ed-card {
    background: var(--card-bg);
    border-top: 3px solid var(--ink);
    position: relative;
  }
  .funfacts-root .ed-card-red { border-top-color: var(--red); }
  .funfacts-root .ed-card-green { border-top-color: var(--green); }

  /* big number index */
  .funfacts-root .index-num {
    font-family: 'DM Sans';
    font-size: clamp(48px, 8vw, 96px);
    font-weight: 900;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1.5px var(--rule);
    user-select: none;
    pointer-events: none;
  }

  /* horizontal rule */
  .funfacts-root .h-rule {
    width: 100%;
    height: 1px;
    background: var(--rule);
  }

  /* column rule */
  .funfacts-root .col-rule {
    width: 1px;
    background: var(--rule);
    align-self: stretch;
  }

  /* hover lift */
  .funfacts-root .hover-lift { 
    transition: transform .25s ease, box-shadow .25s ease; 
    cursor: default;
  }
  .funfacts-root .hover-lift:hover { 
    transform: translateY(-4px); 
    box-shadow: 6px 6px 0 var(--ink); 
  }
  .funfacts-root .hover-lift-red:hover { box-shadow: 6px 6px 0 var(--red); }
  .funfacts-root .hover-lift-green:hover { box-shadow: 6px 6px 0 var(--green); }

  /* masthead stripe */
  .funfacts-root .masthead-stripe {
    background: var(--ink);
    color: var(--paper);
  }

  /* pull quote */
  .funfacts-root .pull-quote {
    border-left: 4px solid var(--red);
    padding-left: 20px;
    font-family: 'DM Sans';
    font-style: italic;
    font-size: clamp(18px, 2.5vw, 24px);
    line-height: 1.5;
    color: var(--ink);
  }

  /* tag chip */
  .funfacts-root .tag {
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
  .funfacts-root .tag-red { border-color: var(--red); color: var(--red); }
  .funfacts-root .tag-green { border-color: var(--green); color: var(--green); }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────
const funFacts = [
  { 
    index: '01', 
    title: 'Code Marathon', 
    icon: '🚀', 
    fact: 'Coded for 24 hours straight during a hackathon, building a full-stack app from scratch!',
    accent: 'var(--red)' 
  },
  { 
    index: '02', 
    title: 'Music Coder', 
    icon: '🎵', 
    fact: "Lo-fi hip hop beats help me achieve peak coding flow state.",
    accent: 'var(--green)' 
  },
  { 
    index: '03', 
    title: 'World Traveler', 
    icon: '🌍', 
    fact: 'Lived in 3 countries, speak 4 languages. Diversity fuels creativity.',
    accent: 'var(--red)' 
  },
  { 
    index: '04', 
    title: 'Lifelong Learner', 
    icon: '📚', 
    fact: 'Read 2+ technical books monthly to stay ahead of tech trends.',
    accent: 'var(--green)' 
  },
  { 
    index: '05', 
    title: 'Strategy Gamer', 
    icon: '🎮', 
    fact: 'Love strategy games and virtual world exploration.',
    accent: 'var(--red)' 
  },
  { 
    index: '06', 
    title: 'Detail Obsessed', 
    icon: '✦', 
    fact: 'Every pixel matters. Polish transforms good into exceptional.',
    accent: 'var(--green)' 
  },
];

// ─── FACT CARD ──────────────────────────────────────────────────────────────
function FactCard({ fact, index, inView }) {
  const isRed = fact.accent === 'var(--red)';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`ed-card hover-lift ${isRed ? 'hover-lift-red ed-card-red' : 'hover-lift-green ed-card-green'}`}
      style={{
        borderTopColor: fact.accent,
        padding: '24px 26px',
        flex: '1 1 280px',
        minWidth: 260
      }}
    >
      {/* Index number */}
      <div className="index-num" style={{ marginBottom: 16 }}>
        {fact.index}
      </div>
      
      {/* Icon */}
      <div style={{
        width: 56,
        height: 56,
        background: fact.accent,
        borderRadius: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
        fontSize: 24,
        color: 'var(--paper)'
      }}>
        {fact.icon}
      </div>
      
      {/* Title */}
      <h4 className="playfair" style={{ 
        fontWeight: 700, 
        fontSize: 16, 
        color: 'var(--ink)', 
        marginBottom: 12,
        lineHeight: 1.3
      }}>
        {fact.title}
      </h4>
      
      {/* Fact */}
      <p style={{ 
        fontFamily: 'DM Sans', 
        fontSize: 13, 
        color: 'var(--muted)', 
        lineHeight: 1.6,
        margin: 0 
      }}>
        {fact.fact}
      </p>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
const FunFacts = ({ onSectionChange }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <>
      <style>{STYLES}</style>
      <section
        ref={sectionRef}
        id="funfacts"
        className="funfacts-root"
        style={{ minHeight: '100vh', padding: '0 0 80px' }}
      >
        {/* ── MASTHEAD ─────────────────────────────────────────────────────── */}
        <div className="masthead-stripe" style={{ padding: '10px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', opacity: 0.6 }}>
            Portfolio · Issue No. 03
          </span>
          <span style={{ fontFamily: 'DM Sans', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', opacity: 0.6 }}>
            Fun Facts
          </span>
        </div>

        {/* ── HEADER ────────────────────────────────────────────────────────── */}
        <div style={{ padding: '40px 40px 0', maxWidth: 1280, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="overline-red"
          >
            <h3 className="playfair" style={{ fontWeight: 700, fontSize: 22, color: 'var(--ink)', margin: 0 }}>
              Behind the Code
            </h3>
          </motion.div>

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
              Fun<br />
              <em style={{ color: 'var(--red)', fontStyle: 'italic' }}>Facts</em><br />
              About Me.
            </motion.h1>

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
              <span style={{ fontFamily: 'DM Sans', fontSize: 11, color: 'var(--muted)', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                Personal
              </span>
              <span className="playfair" style={{ fontSize: 28, fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>6</span>
              <span style={{ fontFamily: 'DM Sans', fontSize: 11, color: 'var(--muted)', letterSpacing: '.05em' }}>Facts</span>
            </motion.div>
          </div>

          <div className="h-rule" />
        </div>

        {/* ── TWO-COLUMN BODY ───────────────────────────────────────────────── */}
        <div style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '40px 40px 0',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.1fr) 1px minmax(0,0.9fr)',
          gap: '0 40px',
          alignItems: 'start'
        }}>
          {/* LEFT: Intro & Highlighted fact */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="ruled"
              style={{ padding: '0 0 16px' }}
            >
              <p style={{ 
                fontFamily: 'DM Sans', 
                fontSize: 16, 
                lineHeight: 2.5, 
                color: 'var(--ink)', 
                margin: '0 0 20px 0' 
              }}>
                Beyond code and keyboards, here are the quirks that make me tick. 
                These are the sparks that fuel my creativity and problem-solving.
              </p>
            </motion.div>

            {/* Pull-quote style featured fact */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pull-quote"
              style={{ margin: '32px 0 40px' }}
            >
              "Every coder has their rituals. Here's what makes me productive and inspired."
            </motion.blockquote>

            <div className="h-rule" style={{ marginBottom: 24 }} />
          </div>

          {/* COLUMN RULE */}
          <div className="col-rule" style={{ marginTop: 80 }} />

          {/* RIGHT: Facts grid */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              className="overline-red"
              style={{ marginBottom: 24 }}
            >
              <h3 className="playfair" style={{ fontWeight: 700, fontSize: 20, color: 'var(--ink)', margin: 0 }}>
                The Real Me
              </h3>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {funFacts.map((fact, i) => (
                <FactCard key={fact.index} fact={fact} index={i} inView={isInView} />
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '60px auto 0', padding: '0 40px' }}>
          <div className="h-rule" style={{ marginBottom: 32 }} />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="ed-card ed-card-red hover-lift hover-lift-red"
            style={{ padding: '28px 28px 24px' }}
          >
            <p style={{ 
              fontFamily: 'DM Sans', 
              fontWeight: 600, 
              fontSize: 11, 
              letterSpacing: '.15em', 
              textTransform: 'uppercase', 
              color: 'var(--red)', 
              marginBottom: 12 
            }}>
              Let's Connect
            </p>
            <h3 className="playfair" style={{ 
              fontWeight: 700, 
              fontSize: 22, 
              color: 'var(--ink)', 
              marginBottom: 12,
              lineHeight: 1.2 
            }}>
              There's More to Discover
            </h3>
            <p style={{ 
              fontFamily: 'DM Sans', 
              fontSize: 14, 
              color: 'var(--muted)', 
              lineHeight: 1.7, 
              marginBottom: 24 
            }}>
              These are just highlights. Let's chat about projects, collaborations, or just share stories.
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
                onClick={() => onSectionChange && onSectionChange('about')}
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
                onMouseEnter={e => { 
                  e.currentTarget.style.background = 'var(--ink)'; 
                  e.currentTarget.style.color = 'var(--paper)'; 
                }}
                onMouseLeave={e => { 
                  e.currentTarget.style.background = 'transparent'; 
                  e.currentTarget.style.color = 'var(--ink)'; 
                }}
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>

        {/* ── FOOTER RULE ──────────────────────────────────────────────────── */}
        <div style={{ maxWidth: 1280, margin: '40px auto 0', padding: '0 40px' }}>
          <div className="h-rule" />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            padding: '12px 0 0', 
            fontFamily: 'DM Sans', 
            fontSize: 10, 
            color: 'var(--muted)', 
            letterSpacing: '.1em', 
            textTransform: 'uppercase' 
          }}>
            <span>Brian Mwalish · Portfolio</span>
            <span>Fun Facts</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default FunFacts;

