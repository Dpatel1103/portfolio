'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useMischief } from '@/context/MischiefContext';

interface Footstep {
  id: number;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  rotation: number; // angle in degrees
  side: 'left' | 'right';
  createdAt: number;
}

interface WalkerState {
  id: number;
  currentX: number;
  currentY: number;
  angle: number;
  side: 'left' | 'right';
  stepsLeft: number;
  timer: NodeJS.Timeout | null;
}

export default function MaraudersFootsteps() {
  const { isFootstepsActive } = useMischief();
  const [footsteps, setFootsteps] = useState<Footstep[]>([]);
  const nextIdRef = useRef(1);
  const walkersRef = useRef<WalkerState[]>([]);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    // Helper to stop and clear all walker timers
    const clearAllWalkers = () => {
      walkersRef.current.forEach((w) => {
        if (w.timer) clearTimeout(w.timer);
      });
      walkersRef.current = [];
    };

    if (!isFootstepsActive) {
      clearAllWalkers();
      setFootsteps([]);
      return;
    }

    // Interval to gently remove footsteps older than 7.5 seconds
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setFootsteps((prev) => prev.filter((step) => now - step.createdAt < 7500));
    }, 900);

    // Initial walker sector definitions across the entire map surface
    const walkerConfigs = [
      { minX: 6, maxX: 46, minY: 6, maxY: 42, initialAngle: 45 },    // Upper-left quadrant / North corridor
      { minX: 52, maxX: 92, minY: 8, maxY: 48, initialAngle: 135 },  // Upper-right quadrant / Tower corridor
      { minX: 10, maxX: 48, minY: 52, maxY: 92, initialAngle: 315 }, // Lower-left quadrant / Dungeon corridor
      { minX: 50, maxX: 90, minY: 50, maxY: 94, initialAngle: 225 }, // Lower-right quadrant / Lake corridor
    ];

    // Function to run a step for a specific walker
    const stepWalker = (walkerIndex: number) => {
      if (!isMountedRef.current || !isFootstepsActive) return;

      const walker = walkersRef.current[walkerIndex];
      if (!walker) return;

      // Gentle boundary steering to keep footsteps wandering gracefully across the full page
      if (walker.currentX < 6) {
        walker.angle = (Math.random() - 0.5) * 60; // Steer right
      } else if (walker.currentX > 94) {
        walker.angle = 180 + (Math.random() - 0.5) * 60; // Steer left
      } else if (walker.currentY < 5) {
        walker.angle = 90 + (Math.random() - 0.5) * 60; // Steer downward
      } else if (walker.currentY > 95) {
        walker.angle = 270 + (Math.random() - 0.5) * 60; // Steer upward
      } else {
        // Natural gentle organic curve
        walker.angle += (Math.random() - 0.5) * 24;
      }

      const rad = (walker.angle * Math.PI) / 180;
      const stepDist = 1.9 + Math.random() * 0.7; // ~1.9% to 2.6% stride length

      // Advance along vector
      walker.currentX += Math.cos(rad) * stepDist;
      walker.currentY += Math.sin(rad) * stepDist;

      // Offset perpendicularly for human left/right foot spacing
      const perpRad = rad + (walker.side === 'left' ? -Math.PI / 2 : Math.PI / 2);
      const lateralOffset = 0.65; // ~0.65% width lateral distance between feet
      const footX = walker.currentX + Math.cos(perpRad) * lateralOffset;
      const footY = walker.currentY + Math.sin(perpRad) * lateralOffset;

      const newStep: Footstep = {
        id: nextIdRef.current++,
        x: Math.max(3, Math.min(97, footX)),
        y: Math.max(3, Math.min(97, footY)),
        rotation: walker.angle + 90, // Align shoe pointing with movement vector
        side: walker.side,
        createdAt: Date.now()
      };

      setFootsteps((prev) => [...prev, newStep]);

      // Alternate foot for next step
      walker.side = walker.side === 'left' ? 'right' : 'left';
      walker.stepsLeft--;

      if (walker.stepsLeft > 0) {
        // Rhythmic walking cadence (420ms - 580ms per pace)
        const stepDelay = 420 + Math.random() * 160;
        walker.timer = setTimeout(() => stepWalker(walkerIndex), stepDelay);
      } else {
        // Route complete: brief pause then pick a fresh starting corridor
        const config = walkerConfigs[walkerIndex % walkerConfigs.length];
        const pauseDelay = 700 + Math.random() * 1100;

        walker.timer = setTimeout(() => {
          if (!isMountedRef.current || !isFootstepsActive) return;

          walker.currentX = config.minX + Math.random() * (config.maxX - config.minX);
          walker.currentY = config.minY + Math.random() * (config.maxY - config.minY);
          walker.angle = Math.random() * 360;
          walker.stepsLeft = 14 + Math.floor(Math.random() * 12); // 14 to 25 continuous steps
          walker.side = Math.random() > 0.5 ? 'left' : 'right';

          stepWalker(walkerIndex);
        }, pauseDelay);
      }
    };

    // Initialize the 4 concurrent walkers with staggered starts for an immediate, lively atmosphere
    walkersRef.current = walkerConfigs.map((config, idx) => {
      const initialSteps = 16 + Math.floor(Math.random() * 10);
      return {
        id: idx,
        currentX: config.minX + Math.random() * (config.maxX - config.minX),
        currentY: config.minY + Math.random() * (config.maxY - config.minY),
        angle: config.initialAngle + (Math.random() - 0.5) * 40,
        side: (idx % 2 === 0 ? 'left' : 'right') as 'left' | 'right',
        stepsLeft: initialSteps,
        timer: null
      };
    });

    // Stagger start times so footprints appear across the map right away
    walkersRef.current.forEach((walker, idx) => {
      const initialDelay = 120 + idx * 260; // 120ms, 380ms, 640ms, 900ms
      walker.timer = setTimeout(() => stepWalker(idx), initialDelay);
    });

    return () => {
      isMountedRef.current = false;
      clearAllWalkers();
      clearInterval(cleanupInterval);
    };
  }, [isFootstepsActive]);

  if (!isFootstepsActive && footsteps.length === 0) {
    return null;
  }

  return (
    <div
      className={`marauders-footsteps-layer ${!isFootstepsActive ? 'dissolving' : ''}`}
      aria-hidden="true"
    >
      {footsteps.map((step) => (
        <div
          key={step.id}
          className={`marauder-footstep ${step.side}`}
          style={{
            left: `${step.x}%`,
            top: `${step.y}%`,
            transform: `translate(-50%, -50%) rotate(${step.rotation}deg)`
          }}
        >
          {/* Authentic Marauder's Map Ink Footprint: Contoured Sole & Heel */}
          <svg
            viewBox="0 0 16 28"
            width="13"
            height="22"
            className="footstep-svg"
            style={{
              transform: step.side === 'right' ? 'scaleX(-1)' : undefined
            }}
          >
            {/* Contoured Arch Shoe Sole */}
            <path
              d="M 6.5,1 C 10.5,1 13.5,3.5 13.5,7.2 C 13.5,10.2 11.5,12.5 9.5,14.5 C 8.6,15.5 8.2,16.8 8.8,18 C 6.5,18 4.6,16.5 4,13.8 C 3.4,10.5 1.5,8 1.5,4.8 C 1.5,2.4 3.5,1 6.5,1 Z"
              fill="currentColor"
            />
            {/* Oval Shoe Heel */}
            <path
              d="M 5,20 C 7.8,20 10,21.3 10,23 C 10,24.7 7.8,26 5,26 C 2.2,26 0,24.7 0,23 C 0,21.3 2.2,20 5,20 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
