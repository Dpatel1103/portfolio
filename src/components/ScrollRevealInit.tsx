'use client';

import { useEffect } from 'react';

export default function ScrollRevealInit() {
  useEffect(() => {
    const revealAll = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => el.classList.add('is-revealed'));
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    const observeElements = () => {
      const revealElements = document.querySelectorAll('.scroll-reveal');
      revealElements.forEach((el) => {
        // If element is already within the initial viewport, reveal it immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    // Run on mount
    observeElements();

    // Re-check on next frame in case child components were still mounting
    const rafId = requestAnimationFrame(observeElements);

    // Fallback timer: ensure everything becomes visible within 1.2s so content is never blank
    const safetyTimer = setTimeout(revealAll, 1200);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        revealAll();
      }
    };

    prefersReducedMotion.addEventListener('change', handleMotionChange);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
      observer.disconnect();
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return null;
}
