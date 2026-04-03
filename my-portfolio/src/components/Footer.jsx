import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useEffect, useRef } from "react";

const Footer = ({ onSectionChange }) => {
  const handleNavClick = (section) => {
    if (onSectionChange) {
      onSectionChange(section);
    } else {
      window.location.hash = `#${section}`;
    }
  };

  const year = new Date().getFullYear();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const dots = Array.from({ length: 38 }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      r: Math.random() * 1.5 + 0.4,
      dx: (Math.random() - 0.5) * 0.28,
      dy: (Math.random() - 0.5) * 0.18,
      o: Math.random() * 0.35 + 0.12,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.dx;
        d.y += d.dy;
        if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(250,204,21,${d.o})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const navLinks = [
    { label: "About", section: "about" },
    { label: "Projects", section: "projects" },
    { label: "Contact", section: "contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&display=swap');

        .footer-root {
          position: relative;
          background: #0a0a0f;
          color: #c8c8d8;
          font-family: 'DM Mono', monospace;
          overflow: hidden;
        }

        .footer-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .footer-glow {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          width: 520px;
          height: 120px;
          background: radial-gradient(ellipse at center, rgba(250,204,21,0.10) 0%, transparent 75%);
          pointer-events: none;
          z-index: 0;
        }

        .footer-divider-top {
          position: relative;
          z-index: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(250,204,21,0.45) 40%, rgba(250,204,21,0.45) 60%, transparent);
          margin-bottom: 0;
        }

        .footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 48px 32px 32px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 24px;
        }

        @media (max-width: 700px) {
          .footer-top {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 32px;
          }
          .footer-socials { justify-content: center !important; }
        }

        .footer-brand {}

        .footer-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 1.55rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        .footer-brand-name span {
          color: #facc15;
        }

        .footer-brand-role {
          margin-top: 6px;
          font-size: 0.72rem;
          font-weight: 300;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6b6b80;
        }

        .footer-brand-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #facc15;
          margin: 0 6px;
          vertical-align: middle;
          animation: footer-pulse 2.2s ease-in-out infinite;
        }

        @keyframes footer-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }

        .footer-nav {
          display: flex;
          flex-direction: row;
          gap: 4px;
          justify-content: center;
        }

        .footer-nav-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 7px 16px;
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          color: #8888a0;
          text-transform: uppercase;
          position: relative;
          transition: color 0.22s;
        }

        .footer-nav-btn::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 50%;
          transform: translateX(-50%) scaleX(0);
          width: 70%;
          height: 1.5px;
          background: #facc15;
          border-radius: 2px;
          transition: transform 0.22s cubic-bezier(.4,0,.2,1);
        }

        .footer-nav-btn:hover {
          color: #facc15;
        }

        .footer-nav-btn:hover::after {
          transform: translateX(-50%) scaleX(1);
        }

        .footer-socials {
          display: flex;
          gap: 14px;
          justify-content: flex-end;
          align-items: center;
        }

        .footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(250,204,21,0.18);
          color: #8888a0;
          font-size: 1.05rem;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.18s;
          background: rgba(255,255,255,0.02);
        }

        .footer-social-link:hover {
          color: #facc15;
          border-color: rgba(250,204,21,0.6);
          background: rgba(250,204,21,0.07);
          transform: translateY(-2px);
        }

        .footer-bottom {
          margin-top: 36px;
          padding-top: 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        .footer-copy {
          font-size: 0.67rem;
          letter-spacing: 0.12em;
          color: #3f3f52;
          text-transform: uppercase;
        }

        .footer-copy strong {
          color: #5a5a70;
          font-weight: 400;
        }

        .footer-tagline {
          font-size: 0.67rem;
          letter-spacing: 0.1em;
          color: #3f3f52;
          text-transform: uppercase;
        }

        .footer-tagline span {
          color: #facc15;
          opacity: 0.6;
        }
      `}</style>

      <footer className="footer-root">
        <canvas ref={canvasRef} className="footer-canvas" aria-hidden="true" />
        <div className="footer-glow" aria-hidden="true" />
        <div className="footer-divider-top" />

        <div className="footer-inner">
          <div className="footer-top">
            {/* Branding */}
            <div className="footer-brand">
              <div className="footer-brand-name">
                Brian <span>Mwalish</span>
              </div>
              <div className="footer-brand-role">
                <span className="footer-brand-dot" />
                Software Engineer
                <span className="footer-brand-dot" />
              </div>
            </div>

            {/* Nav */}
            <nav className="footer-nav" aria-label="Footer navigation">
              {navLinks.map(({ label, section }) => (
                <button
                  key={section}
                  type="button"
                  className="footer-nav-btn"
                  onClick={() => handleNavClick(section)}
                >
                  {label}
                </button>
              ))}
            </nav>

            {/* Socials */}
            <div className="footer-socials">
              <a
                href="https://github.com/Brian2021-Mwalish"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <p className="footer-copy">
              © {year} <strong>Mwalish</strong>. All rights reserved.
            </p>
            <p className="footer-tagline">
              Crafting code <span>&amp;</span> interfaces
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;