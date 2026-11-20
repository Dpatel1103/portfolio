'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface MischiefContextType {
  isFootstepsActive: boolean;
  toggleFootsteps: () => void;
  setFootstepsActive: (active: boolean) => void;
}

const MischiefContext = createContext<MischiefContextType>({
  isFootstepsActive: true,
  toggleFootsteps: () => { },
  setFootstepsActive: () => { },
});

export function MischiefProvider({ children }: { children: React.ReactNode }) {
  const [isFootstepsActive, setIsFootstepsActive] = useState<boolean>(true);

  useEffect(() => {
    // Automatically keep background footsteps turned off if reduced motion is enabled
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      setIsFootstepsActive(false);
      return;
    }

    // Read stored user preference if available
    try {
      const stored = localStorage.getItem('devanshi_footsteps_active');
      if (stored !== null) {
        setIsFootstepsActive(stored === 'true');
      }
    } catch { }

    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsFootstepsActive(false);
      }
    };

    prefersReducedMotion.addEventListener('change', handleMotionChange);
    return () => prefersReducedMotion.removeEventListener('change', handleMotionChange);
  }, []);

  const toggleFootsteps = useCallback(() => {
    setIsFootstepsActive((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('devanshi_footsteps_active', String(next));
      } catch { }
      return next;
    });
  }, []);

  const setFootstepsActive = useCallback((active: boolean) => {
    setIsFootstepsActive(active);
    try {
      localStorage.setItem('devanshi_footsteps_active', String(active));
    } catch { }
  }, []);

  return (
    <MischiefContext.Provider value={{ isFootstepsActive, toggleFootsteps, setFootstepsActive }}>
      {children}
    </MischiefContext.Provider>
  );
}

export function useMischief() {
  return useContext(MischiefContext);
}
