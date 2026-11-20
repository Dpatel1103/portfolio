'use client';

import React, { useEffect, useState } from 'react';
import { useMischief } from '@/context/MischiefContext';

export default function BroomstickSilhouettes() {
  const { isFootstepsActive } = useMischief();
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

  // Suppress completely if reduced motion is preferred
  if (prefersReducedMotion) return null;

  return (
    <div
      className={`broomstick-sky-layer ${!isFootstepsActive ? 'is-calm' : ''}`}
      aria-hidden="true"
    >
      {/* Distant Broomstick Rider 1 (High sky glider, left-to-right drift) */}
      <div className="broomstick-rider rider-upper">
        <svg
          viewBox="0 0 100 40"
          className="broomstick-svg"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Broomstick handle and bristles */}
          <path d="M 5 22 Q 15 21 35 20 L 96 17 C 98 17 98 19 96 19 L 36 22 L 5 22 Z" />
          <path d="M 5 22 C 1 20 0 16 2 13 C 8 16 18 19 28 20 C 18 22 10 26 2 29 C 0 26 1 23 5 22 Z" />
          <path d="M 27 19.5 L 29 22.5" stroke="currentColor" strokeWidth="1.2" />
          {/* Rider torso & fluttering cloak */}
          <path d="M 42 21 C 40 18 43 14 48 13 C 52 12 55 14 56 16 L 62 20 L 52 22 Z" />
          <path d="M 45 14 C 36 12 30 15 22 13 C 28 17 34 18 42 19 Z" />
          {/* Arms holding broom */}
          <path d="M 54 15 C 60 16 68 18 72 18 C 70 19 62 19 56 18 Z" />
          {/* Head & wind-tilted pointed hat */}
          <path d="M 53 11 C 55 9 58 9 59 11 C 58 13 54 13 53 11 Z" />
          <path d="M 49 11 C 54 10 61 10 63 11 C 60 9 55 5 44 4 C 47 7 51 9 53 10 Z" />
        </svg>
      </div>

      {/* Distant Broomstick Rider 2 (Lower horizon glider, staggered interval) */}
      <div className="broomstick-rider rider-lower">
        <svg
          viewBox="0 0 100 40"
          className="broomstick-svg"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Broomstick handle and bristles */}
          <path d="M 5 22 Q 15 21 35 20 L 96 17 C 98 17 98 19 96 19 L 36 22 L 5 22 Z" />
          <path d="M 5 22 C 1 20 0 16 2 13 C 8 16 18 19 28 20 C 18 22 10 26 2 29 C 0 26 1 23 5 22 Z" />
          <path d="M 27 19.5 L 29 22.5" stroke="currentColor" strokeWidth="1.2" />
          {/* Rider torso & fluttering cloak */}
          <path d="M 42 21 C 40 18 43 14 48 13 C 52 12 55 14 56 16 L 62 20 L 52 22 Z" />
          <path d="M 45 14 C 36 12 30 15 22 13 C 28 17 34 18 42 19 Z" />
          {/* Arms holding broom */}
          <path d="M 54 15 C 60 16 68 18 72 18 C 70 19 62 19 56 18 Z" />
          {/* Head & wind-tilted pointed hat */}
          <path d="M 53 11 C 55 9 58 9 59 11 C 58 13 54 13 53 11 Z" />
          <path d="M 49 11 C 54 10 61 10 63 11 C 60 9 55 5 44 4 C 47 7 51 9 53 10 Z" />
        </svg>
      </div>
    </div>
  );
}
