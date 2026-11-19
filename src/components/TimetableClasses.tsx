'use client';

import React, { useState } from 'react';
import { SYLLABUS_DATA } from '@/data/syllabus';
import { SyllabusProject } from '@/types';
import ClassSyllabusModal from './ClassSyllabusModal';

export default function TimetableClasses() {
  const [activeSyllabus, setActiveSyllabus] = useState<SyllabusProject | null>(null);

  const handleRowClick = (key: string) => {
    const data = SYLLABUS_DATA[key];
    if (data) {
      setActiveSyllabus(data);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>, key: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleRowClick(key);
    }
  };

  return (
    <>
      <section id="classes" className="folio-container scroll-reveal">
        <div id="timetable" style={{ scrollMarginTop: '5.5rem' }}></div>
        <div className="section-header">
          <span className="section-eyebrow">✦ The Curriculum ✦</span>
          <h2 className="section-title">Timetable of Classes</h2>
          <p className="section-subtitle">
            A schedule of technical masteries, production disciplines, and client-facing artifacts.
          </p>
        </div>

        <div className="classes-table-container">
          <table className="classes-table">
            <thead>
              <tr>
                <th scope="col">Discipline</th>
                <th scope="col">Curriculum & Project Artifact</th>
                <th scope="col">Enchanted Runes / Tags</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Potions */}
              <tr
                className="timetable-row"
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label="Inspect syllabus for Potions: Remedy Success Centre"
                onClick={() => handleRowClick('potions')}
                onKeyDown={(e) => handleKeyDown(e, 'potions')}
              >
                <td data-label="Discipline">
                  <div className="class-discipline">
                    <span className="class-discipline-icon">⚗️</span>
                    <span>Potions</span>
                  </div>
                </td>
                <td data-label="Curriculum & Project Artifact">
                  <div className="class-entry-title">Remedy Success Centre</div>
                  <p className="class-entry-desc">
                    Full-stack support portal with staff login, persistent live chat via session tokens, DOCX transcript
                    export, and Airtable/Slack/Resend integrations.
                  </p>
                  <div className="syllabus-inspect-hint" aria-hidden="true">
                    <span>Inspect Syllabus</span>
                    <span className="syllabus-hint-arrow">→</span>
                  </div>
                </td>
                <td data-label="Enchanted Runes / Tags">
                  <div className="class-tags">
                    <span className="class-tag">Next.js</span>
                    <span className="class-tag">React</span>
                    <span className="class-tag">REST APIs</span>
                    <span className="class-tag">Airtable</span>
                  </div>
                </td>
              </tr>

              {/* Row 2: Charms */}
              <tr
                className="timetable-row"
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label="Inspect syllabus for Charms: Review Builder & Listing Suite"
                onClick={() => handleRowClick('charms')}
                onKeyDown={(e) => handleKeyDown(e, 'charms')}
              >
                <td data-label="Discipline">
                  <div className="class-discipline">
                    <span className="class-discipline-icon">✨</span>
                    <span>Charms</span>
                  </div>
                </td>
                <td data-label="Curriculum & Project Artifact">
                  <div className="class-entry-title">Review Builder & Listing Suite</div>
                  <p className="class-entry-desc">
                    Production Duda widgets featuring full CRUD review-source management, rating-based auto-approval,
                    and searchable listing dashboards with Google import.
                  </p>
                  <div className="syllabus-inspect-hint" aria-hidden="true">
                    <span>Inspect Syllabus</span>
                    <span className="syllabus-hint-arrow">→</span>
                  </div>
                </td>
                <td data-label="Enchanted Runes / Tags">
                  <div className="class-tags">
                    <span className="class-tag">JavaScript</span>
                    <span className="class-tag">Duda</span>
                    <span className="class-tag">Google API</span>
                    <span className="class-tag">CRUD</span>
                  </div>
                </td>
              </tr>

              {/* Row 3: Transfiguration */}
              <tr
                className="timetable-row"
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label="Inspect syllabus for Transfiguration: Review Collector & Campaign Manager"
                onClick={() => handleRowClick('transfiguration')}
                onKeyDown={(e) => handleKeyDown(e, 'transfiguration')}
              >
                <td data-label="Discipline">
                  <div className="class-discipline">
                    <span className="class-discipline-icon">🔮</span>
                    <span>Transfiguration</span>
                  </div>
                </td>
                <td data-label="Curriculum & Project Artifact">
                  <div className="class-entry-title">Review Collector & Campaign Manager</div>
                  <p className="class-entry-desc">
                    Dual-mode feedback collection and campaign delivery widgets with dynamic rating-based routing,
                    automated webhooks, and live delivery tracking.
                  </p>
                  <div className="syllabus-inspect-hint" aria-hidden="true">
                    <span>Inspect Syllabus</span>
                    <span className="syllabus-hint-arrow">→</span>
                  </div>
                </td>
                <td data-label="Enchanted Runes / Tags">
                  <div className="class-tags">
                    <span className="class-tag">JavaScript</span>
                    <span className="class-tag">RemedyConnect</span>
                    <span className="class-tag">Webhooks</span>
                    <span className="class-tag">Airtable</span>
                  </div>
                </td>
              </tr>

              {/* Row 4: Defence Against the Dark Arts */}
              <tr
                className="timetable-row"
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label="Inspect syllabus for Defence Against the Dark Arts: Session & Compliance Hardening"
                onClick={() => handleRowClick('dark-arts')}
                onKeyDown={(e) => handleKeyDown(e, 'dark-arts')}
              >
                <td data-label="Discipline">
                  <div className="class-discipline">
                    <span className="class-discipline-icon">🛡️</span>
                    <span>Defence Against the Dark Arts</span>
                  </div>
                </td>
                <td data-label="Curriculum & Project Artifact">
                  <div className="class-entry-title">Session & Compliance Hardening</div>
                  <p className="class-entry-desc">
                    Production cookie-consent tools, secure browser session-token management across environments, and
                    HIPAA-compliant data handling safeguards.
                  </p>
                  <div className="syllabus-inspect-hint" aria-hidden="true">
                    <span>Inspect Syllabus</span>
                    <span className="syllabus-hint-arrow">→</span>
                  </div>
                </td>
                <td data-label="Enchanted Runes / Tags">
                  <div className="class-tags">
                    <span className="class-tag">Auth Flows</span>
                    <span className="class-tag">Session Tokens</span>
                    <span className="class-tag">Cookie Consent</span>
                    <span className="class-tag">HIPAA</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Class Syllabus Modal Popup */}
      <ClassSyllabusModal syllabus={activeSyllabus} onClose={() => setActiveSyllabus(null)} />
    </>
  );
}
