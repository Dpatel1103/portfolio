'use client';

import React, { useEffect, useState } from 'react';

interface Mote {
  id: number;
  size: string;
  left: string;
  duration: string;
  delay: string;
  sway: string;
  peakOpacity: string;
}

export default function AmbientMotes() {
  const [motes, setMotes] = useState<Mote[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    const count = 18;
    const generated: Mote[] = [];

    for (let i = 0; i < count; i++) {
      const size = (2.0 + (i % 5) * 0.7).toFixed(1);
      const left = (((i * 5.5 + 2) % 96) + 2).toFixed(1);
      const duration = (20.0 + (i % 7) * 2.2).toFixed(1);
      const delay = (-(i * 1.8 + 0.5)).toFixed(1);
      const sway = ((i % 2 === 0 ? 1 : -1) * (12 + (i % 4) * 4)).toFixed(0);
      const peakOpacity = (0.5 + (i % 4) * 0.12).toFixed(2);

      generated.push({
        id: i,
        size,
        left,
        duration,
        delay,
        sway,
        peakOpacity
      });
    }

    setMotes(generated);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMotes([]);
      } else {
        setMotes(generated);
      }
    };

    prefersReducedMotion.addEventListener('change', handleMotionChange);
    return () => prefersReducedMotion.removeEventListener('change', handleMotionChange);
  }, []);

  return (
    <div id="ambient-motes" className="ambient-motes" aria-hidden="true">
      {motes.map((mote) => (
        <span
          key={mote.id}
          className="ambient-mote"
          style={{
            width: `${mote.size}px`,
            height: `${mote.size}px`,
            left: `${mote.left}vw`,
            animationDuration: `${mote.duration}s`,
            animationDelay: `${mote.delay}s`,
            ['--sway-x' as string]: `${mote.sway}px`,
            ['--mote-peak-opacity' as string]: mote.peakOpacity
          }}
        />
      ))}
    </div>
  );
}
