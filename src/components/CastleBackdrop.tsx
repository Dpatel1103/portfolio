'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function CastleBackdrop() {
  const [offsetY, setOffsetY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Automatically disable parallax drift if visitor prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(() => {
          // Gentle vertical parallax: subtle 0.045 drift, capped at 85px
          const drift = Math.min(window.scrollY * 0.045, 85);
          setOffsetY(drift);
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setOffsetY(0);
        window.removeEventListener('scroll', handleScroll);
      } else {
        window.addEventListener('scroll', handleScroll, { passive: true });
      }
    };

    prefersReduced.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      prefersReduced.removeEventListener('change', handleMotionChange);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="castle-backdrop-container"
      aria-hidden="true"
      style={
        offsetY > 0
          ? { transform: `translate3d(0, -${offsetY.toFixed(1)}px, 0)` }
          : undefined
      }
    >
      {/* Warm Parchment Daytime Illustration (Lumos / Light Mode) */}
      <div className="castle-layer castle-layer-light">
        <Image
          src="/hogwarts-castle-light.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="castle-image"
        />
      </div>

      {/* Moonlit Midnight-Navy Illustration (Nox / Dark Mode) */}
      <div className="castle-layer castle-layer-dark">
        <Image
          src="/hogwarts-castle-dark.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="castle-image"
        />
      </div>

      {/* Gentle Edge Vignette & Editorial Framing Overlay */}
      <div className="castle-vignette-overlay" />
    </div>
  );
}
