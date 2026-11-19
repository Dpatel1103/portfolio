'use client';

import React from 'react';
import { SPELLS_DATA } from '@/data/spells';

export default function Spellbook() {
  return (
    <section id="spellbook" className="folio-container scroll-reveal">
      <div className="section-header">
        <span className="section-eyebrow">✦ The Grimoire ✦</span>
        <h2 className="section-title">The Spellbook</h2>
        <p className="section-subtitle">
          Essential incantations, charms, and defensive wards invoked across modern web architectures.
        </p>
      </div>

      <div className="spellbook-grid">
        {SPELLS_DATA.map((spell) => (
          <article
            key={spell.id}
            className="spell-card"
            tabIndex={0}
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
    </section>
  );
}
