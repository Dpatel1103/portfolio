'use client';

import React, { useState, useRef } from 'react';
import { useMischief } from '@/context/MischiefContext';

interface FooterProps {
  onMischiefManaged?: () => void;
}

export default function Footer({ onMischiefManaged }: FooterProps) {
  const [isDissolved, setIsDissolved] = useState<boolean>(false);
  const [announcement, setAnnouncement] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toggleFootsteps } = useMischief();

  const handleMischief = () => {
    setIsDissolved(true);
    setAnnouncement('The footer ink softly fades into the parchment...');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsDissolved(false);
      setAnnouncement('');
    }, 2000);

    toggleFootsteps();

    if (onMischiefManaged) {
      onMischiefManaged();
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div
        className={`folio-container footer-ink-surface ${isDissolved ? 'ink-dissolved' : ''}`}
        id="footer-ink-surface"
      >
        <div className="footer-sigil">✦ ✦ ✦</div>
        <div className="footer-fan-note">
          <button
            type="button"
            id="mischief-managed-btn"
            className="mischief-btn"
            title="Click to manage mischief"
            aria-label="Mischief managed — click to dissolve map ink"
            onClick={handleMischief}
          >
            Mischief managed.
          </button>{' '}
          An unofficial, fan-inspired design.
        </div>
        <div className="footer-colophon">
          Crafted &amp; Inscribed by <strong>Devanshi Patel</strong> · Gandhinagar, Gujarat
        </div>
        <p style={{ fontSize: '0.92rem', color: 'var(--subtle-ink)', marginBottom: '0.5rem' }}>
          Typeset in <em>IM Fell English</em> and <em>Crimson Pro</em>. Styled in Parchment &amp; Midnight.
        </p>
        <ul className="footer-links">
          <li>
            <a href="#prologue" onClick={(e) => handleSmoothScroll(e, 'prologue')}>
              Prologue
            </a>
          </li>
          <li>
            <a href="#classes" onClick={(e) => handleSmoothScroll(e, 'classes')}>
              Classes
            </a>
          </li>
          <li>
            <a href="#spellbook" onClick={(e) => handleSmoothScroll(e, 'spellbook')}>
              Spellbook
            </a>
          </li>
          <li>
            <a href="#credentials" onClick={(e) => handleSmoothScroll(e, 'credentials')}>
              Credentials
            </a>
          </li>
          <li>
            <a href="#owl-post" onClick={(e) => handleSmoothScroll(e, 'owl-post')}>
              Owl Post
            </a>
          </li>
          <li>
            <a href="https://github.com/Dpatel1103" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="mailto:devanshi1303@gmail.com">devanshi1303@gmail.com</a>
          </li>
        </ul>
        <a
          href="#prologue"
          className="back-to-top"
          onClick={(e) => handleSmoothScroll(e, 'prologue')}
        >
          ↑ Return to the Beginning
        </a>
        <span id="mischief-announcement" className="sr-only" aria-live="polite">
          {announcement}
        </span>
      </div>
    </footer>
  );
}
