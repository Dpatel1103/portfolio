'use client';

import React, { useState, useEffect } from 'react';

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Detect initial theme from localStorage or system preference
    const stored = localStorage.getItem('devanshi_theme');
    if (stored === 'dark' || stored === 'light') {
      setTheme(stored);
      document.documentElement.setAttribute('data-theme', stored);
    } else {
      const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(isSystemDark ? 'dark' : 'light');
    }

    const systemDarkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const currentStored = localStorage.getItem('devanshi_theme');
      if (!currentStored) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    systemDarkQuery.addEventListener('change', handleSystemChange);
    return () => systemDarkQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem('devanshi_theme', nextTheme);
    } catch {}
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      // Clean hash navigation: scroll smoothly without leaving ugly hashtag in URL
      element.scrollIntoView({ behavior: 'smooth' });
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    }
  };

  return (
    <header className="site-header">
      <div className="folio-container nav-bar">
        <a
          href="#prologue"
          className="masthead-logo"
          onClick={(e) => handleNavClick(e, 'prologue')}
        >
          <span className="masthead-sigil">✦</span>
          <span className="masthead-title">Devanshi Patel</span>
        </a>

        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`} id="nav-menu">
          <li>
            <a href="#prologue" className="nav-link" onClick={(e) => handleNavClick(e, 'prologue')}>
              Prologue
            </a>
          </li>
          <li>
            <a href="#classes" className="nav-link" onClick={(e) => handleNavClick(e, 'classes')}>
              Classes
            </a>
          </li>
          <li>
            <a href="#spellbook" className="nav-link" onClick={(e) => handleNavClick(e, 'spellbook')}>
              Spellbook
            </a>
          </li>
          <li>
            <a href="#credentials" className="nav-link" onClick={(e) => handleNavClick(e, 'credentials')}>
              Credentials
            </a>
          </li>
          <li>
            <a href="#owl-post" className="nav-link" onClick={(e) => handleNavClick(e, 'owl-post')}>
              Owl Post
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="spell-toggle-btn"
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Cast Lumos to activate light theme' : 'Cast Nox to activate dark theme'}
            title={theme === 'dark' ? 'Cast Lumos: Return to Parchment (Light Mode)' : 'Cast Nox: Enter Midnight (Dark Mode)'}
          >
            <span className="spell-icon" aria-hidden="true">
              {theme === 'dark' ? '✨' : '🕯️'}
            </span>
            <span className="spell-text">
              {theme === 'dark' ? 'Lumos' : 'Nox'}
            </span>
          </button>

          <button
            type="button"
            className="mobile-menu-btn"
            id="mobile-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="nav-menu"
            aria-label="Toggle navigation parchment"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
