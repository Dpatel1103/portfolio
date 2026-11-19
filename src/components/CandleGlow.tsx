'use client';

import React, { useEffect, useRef } from 'react';

export default function CandleGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glowEl = glowRef.current;
    if (!glowEl) return;

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion.matches) return;
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (glowEl) {
            glowEl.style.left = `${targetX}px`;
            glowEl.style.top = `${targetY}px`;
          }
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return <div id="candle-glow" ref={glowRef} aria-hidden="true"></div>;
}
