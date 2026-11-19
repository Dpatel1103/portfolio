'use client';

import React from 'react';

export default function Credentials() {
  return (
    <section id="credentials" className="folio-container scroll-reveal">
      <div className="section-header">
        <span className="section-eyebrow">✦ Records & Ledger ✦</span>
        <h2 className="section-title">Apprenticeship & Credentials</h2>
        <p className="section-subtitle">
          Chronicles of professional apprenticeship, formal education, and healthcare compliance certification.
        </p>
      </div>

      <div className="ledger-grid">
        {/* Left Column: Apprenticeship */}
        <article className="ledger-card">
          <div>
            <div className="ledger-header">
              <span className="editorial-badge">✦ Apprenticeship</span>
              <span className="ledger-term">Jan 2026 – Present</span>
            </div>
            <h3 className="ledger-role">Developer Intern</h3>
            <div className="ledger-company">Covrize IT Solutions Pvt. Ltd.</div>
            <ul className="ledger-bullets">
              <li>Building production Duda widgets tailored for responsive client deployments.</li>
              <li>
                Integrating REST APIs like RemedyConnect, Airtable, and Google Services for reliable cross-platform data
                pipelines.
              </li>
              <li>Developing client-facing CRUD dashboards with sorting, filtering, and pagination.</li>
            </ul>
          </div>
          <div className="class-tags" style={{ marginTop: '1rem' }}>
            <span className="class-tag">Duda Widgets</span>
            <span className="class-tag">REST APIs</span>
            <span className="class-tag">RemedyConnect</span>
            <span className="class-tag">Airtable</span>
            <span className="class-tag">Google Services</span>
            <span className="class-tag">CRUD Dashboards</span>
          </div>
        </article>

        {/* Right Column: Education & Credentials */}
        <article className="ledger-card">
          <div>
            <div className="ledger-header">
              <span className="editorial-badge">✦ Education & Credentials</span>
              <span className="ledger-term">Accredited</span>
            </div>

            {/* Degree */}
            <div className="credential-entry">
              <h3 className="credential-title">BSc in Data Management & Visual Insight</h3>
              <div className="credential-meta">Gujarat University</div>
              <p className="credential-desc">
                Foundational study in structured information architecture, normalized relational databases, and data
                visualization.
              </p>
            </div>

            {/* Training & Grade */}
            <div className="credential-entry">
              <h3 className="credential-title">HIPAA Security & Privacy Training</h3>
              <div className="credential-meta">Grade: 90% · Healthcare Data Compliance</div>
              <p className="credential-desc">
                Certified proficiency in safeguarding Protected Health Information (PHI), browser session token
                hardening, and privacy workflows.
              </p>
            </div>
          </div>

          {/* Subtle gold-bordered button labelled 'Download Curriculum Scroll' */}
          <div className="resume-cta-wrap">
            <a
              href="/Devanshi_Patel_Resume.pdf"
              className="curriculum-scroll-btn"
              download="Devanshi_Patel_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className="scroll-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <line x1="9" y1="15" x2="15" y2="15" />
              </svg>
              <span>Download Curriculum Scroll</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
