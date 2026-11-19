'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function OwlPostForm() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [totalOwls, setTotalOwls] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [botcheck, setBotcheck] = useState<boolean>(false);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch owl stats on initial render
  useEffect(() => {
    let isMounted = true;
    fetch('/api/owl-post')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch count');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data && typeof data.totalOwls === 'number') {
          setTotalOwls(data.totalOwls);
        }
      })
      .catch(() => {
        // Quiet fallback
      });

    return () => {
      isMounted = false;
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const toggleExpand = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);
    if (nextState) {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 300);
    }
  };

  const handleCopy = async () => {
    const emailToCopy = 'devanshi1303@gmail.com';
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Quiet fallback
    }
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setStatusMessage('');
    setIsSuccess(false);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMessage('Please complete all marked parchment fields before dispatch.');
      setIsSuccess(false);
      return;
    }

    // Honeypot spam shield
    if (botcheck) {
      setSubmitted(true);
      setIsSuccess(true);
      setStatusMessage('✦ Your owl has taken flight! Devanshi will reply to your return address soon.');
      setName('');
      setEmail('');
      setMessage('');
      return;
    }

    setLoading(true);
    setStatusMessage('');
    setIsSuccess(false);

    try {
      const res = await fetch('/api/owl-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          botcheck
        })
      });

      const result = await res.json().catch(() => ({}));

      if (res.ok && result.success) {
        setSubmitted(true);
        setIsSuccess(true);
        setStatusMessage(
          result.message || '✦ Your owl has taken flight! Devanshi will reply to your return address soon.'
        );
        setName('');
        setEmail('');
        setMessage('');
        if (typeof result.totalOwls === 'number') {
          setTotalOwls(result.totalOwls);
        } else {
          setTotalOwls((prev) => (prev !== null ? prev + 1 : 1));
        }
      } else {
        setIsSuccess(false);
        setStatusMessage(
          result.message || 'The owl encountered a storm. Please use the direct mail link below.'
        );
      }
    } catch {
      setIsSuccess(false);
      setStatusMessage(
        'The owl could not complete its journey across the network. Please use the direct mail link below.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getCounterText = () => {
    if (totalOwls === null) return 'Owls dispatched across the realm';
    if (totalOwls === 1) return '1 owl dispatched to date';
    return `${totalOwls} owls dispatched to date`;
  };

  return (
    <section id="owl-post" className="folio-container scroll-reveal">
      <div className="section-header">
        <span className="section-eyebrow">✦ Correspondence ✦</span>
        <h2 className="section-title">Owl Post</h2>
        <p className="section-subtitle">
          Dispatch a message regarding engineering opportunities, full-stack portals, or technical
          collaborations.
        </p>
      </div>

      <div className="owl-post-card">
        <p className="owl-post-intro">
          Whether you are looking to build responsive React/Next.js platforms, engineer custom widgets, or
          integrate complex RESTful data pipelines, my window is always open for an owl.
        </p>

        {/* Live Owl Dispatch Counter */}
        <div className="owl-counter-container">
          <div className="owl-counter-badge" id="owl-counter-badge" aria-live="polite">
            <span className="owl-counter-sigil" aria-hidden="true">
              ✦
            </span>
            <span id="owl-counter-text" className="owl-counter-text">
              {getCounterText()}
            </span>
            <span className="owl-counter-sigil" aria-hidden="true">
              ✦
            </span>
          </div>
        </div>

        <div className="owl-btn-container">
          <button
            type="button"
            className="wax-btn owl-btn"
            id="owl-toggle-btn"
            aria-expanded={isExpanded}
            aria-controls="owl-scroll-container"
            onClick={toggleExpand}
          >
            <span>Send an owl</span>
            <svg
              className="owl-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 2C7.5 2 4 5.5 4 10c0 4.5 3 7.5 5 11 1.5 2.5 3 2.5 3 2.5s1.5 0 3-2.5c2-3.5 5-6.5 5-11 0-4.5-3.5-8-8-8z" />
              <circle cx="9" cy="8" r="1.5" fill="currentColor" />
              <circle cx="15" cy="8" r="1.5" fill="currentColor" />
              <path d="M12 11.5l-1 2h2l-1-2z" fill="currentColor" />
              <path d="M5 10c-1.5 2-2 4-2 5.5 2.5.5 5-1 6-2" />
              <path d="M19 10c1.5 2 2 4 2 5.5-2.5.5-5-1-6-2" />
            </svg>
          </button>
        </div>

        {/* Compact Parchment Scroll Form Container */}
        <div
          className={`owl-scroll-container ${isExpanded ? 'is-expanded' : ''}`}
          id="owl-scroll-container"
          aria-hidden={!isExpanded}
        >
          <div className="owl-parchment-scroll">
            <form id="owl-post-form" className="owl-form" onSubmit={handleSubmit} noValidate>
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                checked={botcheck}
                onChange={(e) => setBotcheck(e.target.checked)}
              />

              {!submitted ? (
                <div className="owl-form-fields" id="owl-form-fields">
                  <div className="owl-form-group">
                    <label htmlFor="owl-sender-name" className="owl-form-label">
                      Sender Name <span className="required-mark" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="text"
                      id="owl-sender-name"
                      name="name"
                      className="owl-form-input"
                      placeholder="e.g. Albus Dumbledore"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="owl-form-group">
                    <label htmlFor="owl-sender-email" className="owl-form-label">
                      Return Owl / Email <span className="required-mark" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="owl-sender-email"
                      name="email"
                      className="owl-form-input"
                      placeholder="e.g. albus@hogwarts.edu"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="owl-form-group">
                    <label htmlFor="owl-message" className="owl-form-label">
                      Message <span className="required-mark" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="owl-message"
                      name="message"
                      className="owl-form-textarea"
                      rows={3}
                      placeholder="Inscribe your parchment dispatch here..."
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="wax-btn owl-submit-btn"
                    id="owl-submit-btn"
                    disabled={loading}
                  >
                    <span>
                      {loading ? (
                        'Dispatching owl...'
                      ) : (
                        <>
                          Dispatch Owl <span className="owl-emoji" aria-hidden="true">🦉</span>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <button
                    type="button"
                    className="wax-btn secondary"
                    style={{ fontSize: '0.9rem', padding: '0.45rem 1.1rem' }}
                    onClick={handleResetForm}
                  >
                    <span>✦ Send another dispatch</span>
                  </button>
                </div>
              )}

              {statusMessage && (
                <div
                  id="owl-status"
                  className={`owl-status-msg ${isSuccess ? 'has-success' : ''}`}
                  aria-live="polite"
                >
                  {statusMessage}
                </div>
              )}
            </form>

            <div className="owl-fallback-container">
              <a
                href="mailto:devanshi1303@gmail.com?subject=Owl%20Post%20for%20Devanshi"
                className="owl-fallback-link"
              >
                Or open in your default mail app
              </a>
              <span className="fallback-sep" aria-hidden="true">
                ·
              </span>
              <button
                type="button"
                className={`copy-email-btn ${copied ? 'copied' : ''}`}
                id="copy-email-btn"
                aria-label="Copy email address devanshi1303@gmail.com to clipboard"
                onClick={handleCopy}
              >
                <span id="copy-text">{copied ? 'Copied to parchment ✓' : 'devanshi1303@gmail.com'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="owl-channels">
          <div className="owl-channel-item">
            <span>✦ <strong>LinkedIn:</strong></span>
            <a
              href="https://www.linkedin.com/in/devanshipatel1103"
              target="_blank"
              rel="noopener noreferrer"
            >
              /in/devanshipatel1103 ↗
            </a>
          </div>
          <div className="owl-channel-item">
            <span>✦ <strong>GitHub:</strong></span>
            <a
              href="https://github.com/Dpatel1103"
              target="_blank"
              rel="noopener noreferrer"
            >
              /Dpatel1103 ↗
            </a>
          </div>
          <div className="owl-channel-item">
            <span>✦ <strong>Telephone:</strong></span>
            <a href="tel:+919316661187">+91 93166 61187</a>
          </div>
          <div className="owl-channel-item">
            <span>✦ <strong>Location:</strong></span>
            <span>Gandhinagar, Gujarat, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
