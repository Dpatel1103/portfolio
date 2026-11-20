'use client';

import React, { useState } from 'react';

interface HeroLetterProps {
  pulseSeal?: boolean;
}

export default function HeroLetter({ pulseSeal = false }: HeroLetterProps) {
  const [isPressed, setIsPressed] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSealClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 250);
  };

  const handleSealKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSealClick();
    }
  };

  return (
    <section id="prologue" className="hero-section">
      <div className="folio-container">
        <div className="hero-grid">
          {/* Left Column: Hero Story */}
          <div className="hero-story">
            <span className="section-eyebrow">✦ Prologue ✦</span>
            <h1 className="hero-title">
              Crafting Resilient Web <em>Experiences</em> &amp; Dynamic Interfaces
            </h1>
            <div className="hero-role-call">
              Frontend &amp; Full-Stack Developer · React.js &amp; Next.js · REST API Integrations
            </div>
            <p className="drop-cap">
              Devanshi Patel is an engineer of the digital realm based in Gandhinagar, Gujarat. Bridging
              deliberate design with rigorous engineering, she specializes in forging production, client-facing web
              applications, performant interactive widgets, and clean RESTful data architectures.
            </p>
            <p>
              From architecting full-stack support portals with real-time persistent sessions to authoring
              sophisticated review and analytics engines for thousands of active visitors, her craft turns
              intricate requirements into fluid, dependable reality.
            </p>
            <div className="hero-actions">
              <a
                href="#classes"
                className="wax-btn"
                onClick={(e) => scrollToSection(e, 'classes')}
              >
                <span>View Timetable</span>
                <span>✦</span>
              </a>
              <a
                href="#owl-post"
                className="wax-btn secondary"
                onClick={(e) => scrollToSection(e, 'owl-post')}
              >
                <span>Send an Owl</span>
              </a>
            </div>
          </div>

          {/* Right Column: Aged Parchment Acceptance Letter */}
          <aside className="parchment-letter-wrapper" aria-label="Official Acceptance Letter">
            <div className="parchment-letter">
              {/* Crest & Letterhead */}
              <div className="letter-crest">
                <span className="letter-crest-sigil">✦ 🕮 ✦</span>
                <div className="letter-crest-title">THE ORDER OF THE WEB &amp; CODE</div>
                <div className="letter-crest-sub">OFFICIAL ACCEPTANCE DISPATCH</div>
              </div>

              {/* Recipient Address */}
              <div className="letter-recipient">
                <div className="recipient-label">Addressed To:</div>
                <div className="recipient-name">Devanshi Patel</div>
                <div className="recipient-role">Frontend &amp; Full-Stack Developer</div>
                <div className="recipient-location">Gandhinagar, Gujarat</div>
              </div>

              {/* Concise Letter Body */}
              <div className="letter-body">
                <p className="letter-greeting">Welcome, Esteemed Visitor —</p>
                <p>
                  We are delighted to present the craft and works of <strong>Devanshi Patel</strong>. Herein lies
                  an artisan specializing in resilient frontend architectures with <strong>React.js</strong>,
                  full-stack portals in <strong>Next.js</strong>, and robust <strong>REST API integrations</strong>{' '}
                  powering live production environments.
                </p>
                <p className="letter-cta-wrapper">
                  Examine her dispatched milestones and terms of practice in the{' '}
                  <a
                    href="#classes"
                    className="letter-cta-link"
                    onClick={(e) => scrollToSection(e, 'classes')}
                  >
                    Timetable of Classes ↓
                  </a>
                </p>
              </div>

              {/* Sign-off & Seal */}
              <div className="letter-signoff">
                <div className="letter-signoff-witness">In Witness Whereof,</div>
                <div className="letter-signoff-author">Devanshi Patel</div>
              </div>

              {/* Realistic Circular Red Wax Seal with Shimmer & Click Press */}
              <div
                className={`wax-seal ${isPressed ? 'pressed' : ''} ${pulseSeal ? 'pulse-glow' : ''}`}
                id="hero-wax-seal"
                role="button"
                tabIndex={0}
                title="Official Seal of Devanshi Patel (Click to stamp)"
                aria-label="Official Seal of Devanshi Patel"
                onClick={handleSealClick}
                onKeyDown={handleSealKeyDown}
              >
                <div className="wax-seal-outer-ring">
                  <div className="wax-seal-inner-ring">
                    <span className="wax-seal-letter" aria-hidden="true">
                      D
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
