'use client';

import React, { useState, useEffect } from 'react';
import { SPELLS_DATA } from '@/data/spells';

export default function Spellbook() {
  const [activeSpellId, setActiveSpellId] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return (
    <section id="spellbook" className="folio-container scroll-reveal spellbook-section">
      <div className="section-header">
        <span className="section-eyebrow">✦ The Grimoire ✦</span>
        <h2 className="section-title">The Spellbook</h2>
        <p className="section-subtitle">
          Essential incantations, charms, and defensive wards invoked across modern web architectures.
        </p>
      </div>

      <div className="spellbook-wrapper">
        {/* Subtle Outer Margin Spirit (drifts upward when spells are hovered) */}
        {!prefersReducedMotion && (
          <div
            className={`spell-margin-spirit spirit-left ${activeSpellId ? 'is-drifting' : ''}`}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 80 100"
              className="spell-spirit-svg"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Ethereal Patronus Spirit Silhouette */}
              <path
                d="M 40 28 C 36 20 28 14 20 12 C 24 16 30 18 34 24"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 40 28 C 44 20 52 14 60 12 C 56 16 50 18 46 24"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 32 16 C 26 10 20 10 16 11 C 20 13 26 14 28 18"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 48 16 C 54 10 60 10 64 11 C 60 13 54 14 52 18"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 38 27 C 36 29 37 32 40 33 C 43 32 44 29 42 27 C 41 26 39 26 38 27 Z" />
              <path d="M 39 33 C 36 38 34 46 36 54 C 40 54 44 46 41 33 Z" />
              <path d="M 36 54 C 32 60 26 66 22 74 C 28 72 34 68 38 62 C 42 68 48 72 54 74 C 50 66 44 60 40 54 Z" />
              <path d="M 38 62 C 34 72 32 82 38 94 C 42 86 44 76 40 62 Z" />
              <circle cx="40" cy="30" r="1.5" fill="#fff" opacity="0.8" />
              <circle cx="22" cy="35" r="1.2" fill="currentColor" opacity="0.6" />
              <circle cx="58" cy="38" r="1.4" fill="currentColor" opacity="0.7" />
              <circle cx="28" cy="55" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="52" cy="58" r="1.2" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
        )}

        <div className="spellbook-grid">
          {SPELLS_DATA.map((spell) => (
            <article
              key={spell.id}
              className="spell-card"
              tabIndex={0}
              onMouseEnter={() => setActiveSpellId(spell.id)}
              onMouseLeave={() => setActiveSpellId(null)}
              onFocus={() => setActiveSpellId(spell.id)}
              onBlur={() => setActiveSpellId(null)}
              style={spell.colSpanFull ? { gridColumn: '1 / -1' } : undefined}
            >
              <div>
                <div className="spell-card-header">
                  <h3 className="spell-name">
                    <span className="spell-sigil" aria-hidden="true">
                      ✦
                    </span>{' '}
                    {spell.name}
                  </h3>
                  <span className="spell-type">{spell.type}</span>
                </div>
                <div className="spell-skills">{spell.skills}</div>
                <p className="spell-desc">{spell.desc}</p>
              </div>
              <div className="spell-tags">
                {spell.tags.map((tag, idx) => (
                  <span key={idx} className="class-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {!prefersReducedMotion && (
          <div
            className={`spell-margin-spirit spirit-right ${activeSpellId ? 'is-drifting' : ''}`}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 80 100"
              className="spell-spirit-svg"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 40 28 C 36 20 28 14 20 12 C 24 16 30 18 34 24"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 40 28 C 44 20 52 14 60 12 C 56 16 50 18 46 24"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 32 16 C 26 10 20 10 16 11 C 20 13 26 14 28 18"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 48 16 C 54 10 60 10 64 11 C 60 13 54 14 52 18"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
              />
              <path d="M 38 27 C 36 29 37 32 40 33 C 43 32 44 29 42 27 C 41 26 39 26 38 27 Z" />
              <path d="M 39 33 C 36 38 34 46 36 54 C 40 54 44 46 41 33 Z" />
              <path d="M 36 54 C 32 60 26 66 22 74 C 28 72 34 68 38 62 C 42 68 48 72 54 74 C 50 66 44 60 40 54 Z" />
              <path d="M 38 62 C 34 72 32 82 38 94 C 42 86 44 76 40 62 Z" />
              <circle cx="40" cy="30" r="1.5" fill="#fff" opacity="0.8" />
              <circle cx="22" cy="35" r="1.2" fill="currentColor" opacity="0.6" />
              <circle cx="58" cy="38" r="1.4" fill="currentColor" opacity="0.7" />
              <circle cx="28" cy="55" r="1" fill="currentColor" opacity="0.5" />
              <circle cx="52" cy="58" r="1.2" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
