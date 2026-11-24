'use client';

import React, { useState, useEffect, useRef } from 'react';

interface OwlOption {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  speed: string;
  description: string;
  badge: string;
  svgPath: React.ReactNode;
}

interface SessionDispatch {
  id: string;
  owlName: string;
  time: string;
  recipient: string;
  status: string;
}

const OWL_OPTIONS: OwlOption[] = [
  {
    id: 'barn',
    name: 'Barn Owl',
    title: 'Quick Flight',
    subtitle: 'Direct Dispatch',
    speed: 'Swift · Standard Courier',
    description: 'Graceful heart-faced courier renowned for dependable, direct twilight flights across the realm.',
    badge: 'Quick Flight / Direct Dispatch',
    svgPath: (
      <g>
        <defs>
          <radialGradient id="barnFaceGrad" cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#faf2e3" />
            <stop offset="100%" stopColor="#e8cf9c" />
          </radialGradient>
          <linearGradient id="barnWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d49b43" />
            <stop offset="40%" stopColor="#b87a28" />
            <stop offset="70%" stopColor="#805626" />
            <stop offset="100%" stopColor="#543714" />
          </linearGradient>
        </defs>
        {/* Mantle & Folded Wings */}
        <path d="M 24 6 C 14 6 10 14 10 28 C 10 42 16 55 24 57 C 32 55 38 42 38 28 C 38 14 34 6 24 6 Z" fill="url(#barnWingGrad)" />
        {/* White Chest & Belly */}
        <path d="M 24 19 C 18 19 15 25 15 36 C 15 47 19 52 24 54 C 29 52 33 47 33 36 C 33 25 30 19 24 19 Z" fill="#fffcf5" />
        {/* Heart-Shaped Facial Disc */}
        <path d="M 24 9 C 20 5 13 8 13 14 C 13 22 24 28 24 28 C 24 28 35 22 35 14 C 35 8 28 5 24 9 Z" fill="url(#barnFaceGrad)" stroke="#c2944b" strokeWidth="1.2" />
        {/* Eyes */}
        <ellipse cx="20" cy="16" rx="2" ry="2.5" fill="#1b1108" />
        <ellipse cx="28" cy="16" rx="2" ry="2.5" fill="#1b1108" />
        <circle cx="19.3" cy="15.2" r="0.7" fill="#ffffff" />
        <circle cx="27.3" cy="15.2" r="0.7" fill="#ffffff" />
        {/* Beak */}
        <path d="M 24 16 L 22.8 21 L 25.2 21 Z" fill="#e5c158" stroke="#a67822" strokeWidth="0.4" />
        {/* Speckles */}
        <circle cx="24" cy="32" r="0.8" fill="#8c5828" opacity="0.7" />
        <circle cx="21" cy="37" r="0.7" fill="#8c5828" opacity="0.6" />
        <circle cx="27" cy="37" r="0.7" fill="#8c5828" opacity="0.6" />
        <circle cx="24" cy="42" r="0.8" fill="#8c5828" opacity="0.7" />
        {/* Claws */}
        <path d="M 21 53 L 20 57 M 23 54 L 23 58 M 25 54 L 25 58 M 27 53 L 28 57" stroke="#d4af37" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    )
  },
  {
    id: 'snowy',
    name: 'Snowy Owl',
    title: 'Priority Delivery',
    subtitle: 'Express',
    speed: 'High Priority · Silent Wing',
    description: 'Magnificent arctic courier soaring effortlessly through harsh mountain blizzards with utmost urgency.',
    badge: 'Priority Delivery / Express',
    svgPath: (
      <g>
        <defs>
          <linearGradient id="snowyBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f5f7fa" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
        </defs>
        {/* Body & Head */}
        <path d="M 24 6 C 14 6 11 14 11 28 C 11 42 16 54 24 56 C 32 54 37 42 37 28 C 37 14 34 6 24 6 Z" fill="url(#snowyBodyGrad)" stroke="#cbd5e1" strokeWidth="0.8" />
        {/* Piercing Amber Eyes */}
        <circle cx="19" cy="18" r="3.2" fill="#fbbf24" stroke="#92400e" strokeWidth="0.6" />
        <circle cx="29" cy="18" r="3.2" fill="#fbbf24" stroke="#92400e" strokeWidth="0.6" />
        <circle cx="19" cy="18" r="1.6" fill="#0f172a" />
        <circle cx="29" cy="18" r="1.6" fill="#0f172a" />
        <circle cx="18.3" cy="17.3" r="0.6" fill="#ffffff" />
        <circle cx="28.3" cy="17.3" r="0.6" fill="#ffffff" />
        {/* Beak */}
        <path d="M 24 18 L 22.3 23 L 25.7 23 Z" fill="#1e293b" />
        {/* Chevron Plumage Barrings */}
        <path d="M 20 28 L 22 30 M 26 30 L 28 28 M 19 35 L 22 37 M 26 37 L 29 35 M 22 41 L 24 43 L 26 41 M 20 46 L 22 47 M 26 47 L 28 46" stroke="#334155" strokeWidth="1.3" strokeLinecap="round" />
        {/* Feathered Claws */}
        <path d="M 20 53 L 20 57 M 22 54 L 22 58 M 26 54 L 26 58 M 28 53 L 28 57" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  },
  {
    id: 'horned',
    name: 'Great Horned Owl',
    title: 'Heavier Correspondence',
    subtitle: 'Long Distance',
    speed: 'Enduring · Trans-Realm',
    description: 'Imposing guardian flyer with remarkable stamina, built for heavy technical scrolls and long trans-realm journeys.',
    badge: 'Heavier Correspondence / Long Distance',
    svgPath: (
      <g>
        <defs>
          <radialGradient id="hornedBackglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd700" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#d4af37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hornedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8d5b2d" />
            <stop offset="50%" stopColor="#b87b38" />
            <stop offset="100%" stopColor="#5a3617" />
          </linearGradient>
        </defs>
        {/* Subtle luminous halo */}
        <circle cx="24" cy="30" r="23" fill="url(#hornedBackglow)" />
        {/* Ear Tufts (Plumicorns) */}
        <path d="M 15 15 L 10 2 L 20 10 Z" fill="#42250d" stroke="#f59e0b" strokeWidth="0.8" />
        <path d="M 33 15 L 38 2 L 28 10 Z" fill="#42250d" stroke="#f59e0b" strokeWidth="0.8" />
        {/* Body & Head */}
        <path d="M 24 8 C 14 8 11 15 11 29 C 11 42 16 55 24 57 C 32 55 37 42 37 29 C 37 15 34 8 24 8 Z" fill="url(#hornedGrad)" stroke="#ffd700" strokeWidth="0.5" />
        {/* Luminous Brow line */}
        <path d="M 16 16 Q 24 19 32 16" stroke="#ffd700" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {/* Radiant Amber Eyes */}
        <circle cx="19" cy="20" r="3.4" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
        <circle cx="29" cy="20" r="3.4" fill="#fbbf24" stroke="#78350f" strokeWidth="0.8" />
        <circle cx="19" cy="20" r="1.5" fill="#0f0702" />
        <circle cx="29" cy="20" r="1.5" fill="#0f0702" />
        <circle cx="18.3" cy="19.3" r="0.6" fill="#ffffff" />
        <circle cx="28.3" cy="19.3" r="0.6" fill="#ffffff" />
        {/* Beak */}
        <path d="M 24 20 L 22 26 L 26 26 Z" fill="#2d1c0e" stroke="#d4af37" strokeWidth="0.4" />
        {/* Bright White Chest Bib */}
        <path d="M 19 26 Q 24 28 29 26 Q 24 33 19 26 Z" fill="#fffdfa" opacity="0.95" />
        {/* Horizontal Chest Barrings */}
        <path d="M 17 34 Q 24 36 31 34 M 16 38 Q 24 40 32 38 M 18 43 Q 24 45 30 43 M 19 48 Q 24 50 29 48" fill="none" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" />
        {/* Claws */}
        <path d="M 20 54 L 19 58 M 22 55 L 22 58 M 26 55 L 26 58 M 28 54 L 29 58" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    )
  },
  {
    id: 'screech',
    name: 'Screech Owl',
    title: 'Brief Inquiries',
    subtitle: 'Quick Note',
    speed: 'Nimble · Fast Reply',
    description: 'Compact, inquisitive woodland messenger taking wing at a moment’s notice for quick notes and brief questions.',
    badge: 'Brief Inquiries / Quick Note',
    svgPath: (
      <g>
        <defs>
          <radialGradient id="screechBackglow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#eab308" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="screechGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b2824e" />
            <stop offset="50%" stopColor="#cf9d63" />
            <stop offset="100%" stopColor="#6e4822" />
          </linearGradient>
        </defs>
        {/* Subtle luminous halo */}
        <circle cx="24" cy="30" r="23" fill="url(#screechBackglow)" />
        {/* Petite Ear Tufts */}
        <path d="M 17 14 L 14 6 L 21 12 Z" fill="#5c3815" stroke="#f59e0b" strokeWidth="0.6" />
        <path d="M 31 14 L 34 6 L 27 12 Z" fill="#5c3815" stroke="#f59e0b" strokeWidth="0.6" />
        {/* Compact Body */}
        <path d="M 24 10 C 15 10 12 16 12 29 C 12 42 16 53 24 55 C 32 53 36 42 36 29 C 36 16 33 10 24 10 Z" fill="url(#screechGrad)" stroke="#fde047" strokeWidth="0.5" />
        {/* Large Round Watchful Luminous Eyes */}
        <circle cx="19" cy="20" r="3.4" fill="#facc15" stroke="#713f12" strokeWidth="0.8" />
        <circle cx="29" cy="20" r="3.4" fill="#facc15" stroke="#713f12" strokeWidth="0.8" />
        <circle cx="19" cy="20" r="1.5" fill="#140c06" />
        <circle cx="29" cy="20" r="1.5" fill="#140c06" />
        <circle cx="18.3" cy="19.3" r="0.6" fill="#ffffff" />
        <circle cx="28.3" cy="19.3" r="0.6" fill="#ffffff" />
        {/* Beak */}
        <path d="M 24 21 L 22.5 25.5 L 25.5 25.5 Z" fill="#d97706" stroke="#78350f" strokeWidth="0.3" />
        {/* Camouflage Mottling */}
        <path d="M 18 30 L 21 29 M 27 29 L 30 30 M 20 35 L 23 36 M 25 36 L 28 35 M 19 40 L 23 42 M 25 42 L 29 40 M 22 46 L 26 46" stroke="#fef08a" strokeWidth="1.4" strokeLinecap="round" />
        {/* Claws */}
        <path d="M 21 53 L 20 57 M 23 54 L 23 57 M 25 54 L 25 57 M 27 53 L 28 57" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    )
  }
];

export default function OwlPostForm() {
  // Snowy Owl is selected by default with an active red wax badge reading 'SELECTED'
  const [selectedOwl, setSelectedOwl] = useState<string>('snowy');
  const [totalOwls, setTotalOwls] = useState<number>(0);
  const [tumblerRolling, setTumblerRolling] = useState<boolean>(false);
  const [recentDispatches, setRecentDispatches] = useState<SessionDispatch[]>([]);
  const [validationError, setValidationError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [owlFlightActive, setOwlFlightActive] = useState<boolean>(false);
  const [isPressingSeal, setIsPressingSeal] = useState<boolean>(false);
  const [featherBurstActive, setFeatherBurstActive] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [botcheck, setBotcheck] = useState<boolean>(false);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const mischiefBtnRef = useRef<HTMLButtonElement>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Web Audio Procedural Wizarding Sound Engine
  const playOwlSound = (type: 'perch' | 'scratch' | 'seal' | 'wing') => {
    try {
      if (typeof window === 'undefined') return;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) return;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;
      if (type === 'perch') {
        // Soft resonant wooden perch tap chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(460, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.14);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'scratch') {
        // Subtle quill parchment rustle
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(310, now);
        osc.frequency.setValueAtTime(420, now + 0.04);
        gain.gain.setValueAtTime(0.012, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'seal') {
        // Deep tactile wax stamp thud + magical chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);
        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.32);

        // Radiant star chime
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659.25, now + 0.05);
        osc2.frequency.exponentialRampToValueAtTime(1318.5, now + 0.3);
        gain2.gain.setValueAtTime(0.06, now + 0.05);
        gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now + 0.05);
        osc2.stop(now + 0.42);
      } else if (type === 'wing') {
        // Wing flutter whoosh
        const bufferSize = Math.floor(ctx.sampleRate * 0.45);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(340, now);
        filter.frequency.exponentialRampToValueAtTime(860, now + 0.16);
        filter.frequency.exponentialRampToValueAtTime(220, now + 0.42);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
        noise.stop(now + 0.42);
      }
    } catch {
      // Audio playback quiet fallback
    }
  };

  // Ambient Starlight Dust & Firefly Embers Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1000);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    interface DustParticle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      maxOpacity: number;
      pulseSpeed: number;
      isSparkle: boolean;
    }

    const count = 35;
    const particles: DustParticle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -Math.random() * 0.4 - 0.15,
        opacity: Math.random() * 0.6 + 0.2,
        maxOpacity: Math.random() * 0.5 + 0.4,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        isSparkle: Math.random() > 0.6
      });
    }

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX;
          p.y += p.speedY;
          p.opacity += Math.sin(Date.now() * p.pulseSpeed * 0.05) * 0.01;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          const clampedOpacity = Math.max(0.1, Math.min(p.maxOpacity, p.opacity));

          ctx.save();
          if (p.isSparkle) {
            // 4-point diamond star
            ctx.fillStyle = `rgba(255, 235, 160, ${clampedOpacity})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#d4af37';
            ctx.beginPath();
            const r = p.size * 1.5;
            ctx.moveTo(p.x, p.y - r);
            ctx.lineTo(p.x + r * 0.3, p.y - r * 0.3);
            ctx.lineTo(p.x + r, p.y);
            ctx.lineTo(p.x + r * 0.3, p.y + r * 0.3);
            ctx.lineTo(p.x, p.y + r);
            ctx.lineTo(p.x - r * 0.3, p.y + r * 0.3);
            ctx.lineTo(p.x - r, p.y);
            ctx.lineTo(p.x - r * 0.3, p.y - r * 0.3);
            ctx.closePath();
            ctx.fill();
          } else {
            // Soft warm lantern ember
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
            grad.addColorStop(0, `rgba(255, 220, 120, ${clampedOpacity})`);
            grad.addColorStop(0.5, `rgba(212, 175, 55, ${clampedOpacity * 0.6})`);
            grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  // Auto-focus mischief reset button when confirmation appears
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        mischiefBtnRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // Initialize live owl counter from localStorage and API
  useEffect(() => {
    let isMounted = true;
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem('owl_post_dispatched_count');
      if (savedCount !== null) {
        const parsed = parseInt(savedCount, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          setTotalOwls(parsed);
        }
      }
    }

    fetch('/api/send')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch count');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data && typeof data.totalOwls === 'number') {
          setTotalOwls((prev) => {
            const highest = Math.max(prev, data.totalOwls);
            if (typeof window !== 'undefined') {
              localStorage.setItem('owl_post_dispatched_count', String(highest));
            }
            return highest;
          });
        }
      })
      .catch(() => {
        // Fallback default
      });

    return () => {
      isMounted = false;
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

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
    setValidationError('');
    setIsSuccess(false);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 100);
  };

  const handleMischiefClose = () => {
    handleResetForm();
  };

  const triggerVisualEffects = () => {
    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isReduced) {
      setFeatherBurstActive(true);
      setTimeout(() => setFeatherBurstActive(false), 2400);

      setOwlFlightActive(true);
      setTimeout(() => {
        setOwlFlightActive(false);
      }, 3600);
    }
  };

  const handleKeyDownOwl = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % OWL_OPTIONS.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + OWL_OPTIONS.length) % OWL_OPTIONS.length;
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      setSelectedOwl(OWL_OPTIONS[index].id);
      return;
    }

    if (nextIndex >= 0) {
      setSelectedOwl(OWL_OPTIONS[nextIndex].id);
      radioRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Form Validation with themed messages
    if (!name.trim() || name.trim().length < 2) {
      setValidationError('Please inscribe your name or guild upon the parchment.');
      playOwlSound('scratch');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setValidationError('The owl needs a return address.');
      playOwlSound('scratch');
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setValidationError('Your correspondence must contain at least 10 runes of text.');
      playOwlSound('scratch');
      return;
    }

    const currentOwlObj = OWL_OPTIONS.find((o) => o.id === selectedOwl);
    const chosenOwlName = currentOwlObj ? currentOwlObj.name : 'Snowy Owl';

    // Physical seal press animation & wing-flap feather burst
    setIsPressingSeal(true);
    playOwlSound('seal');
    triggerVisualEffects();
    setTimeout(() => setIsPressingSeal(false), 450);

    // Honeypot spam protection
    if (botcheck) {
      setSubmitted(true);
      setIsSuccess(true);
      setStatusMessage(`✦ Your ${chosenOwlName} has taken flight! Devanshi will reply to your return address soon.`);
      setName('');
      setEmail('');
      setMessage('');
      return;
    }

    setLoading(true);
    setStatusMessage('');
    setIsSuccess(false);

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          owlType: chosenOwlName,
          botcheck
        })
      });

      const result = await res.json().catch(() => ({}));

      if (res.ok && result.success) {
        setSubmitted(true);
        setIsSuccess(true);
        setStatusMessage(
          result.message ||
            `✦ Your ${chosenOwlName} has taken flight! Devanshi will reply to your return address soon.`
        );

        // Add to session dispatches
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newRecord: SessionDispatch = {
          id: 'dispatch-' + Date.now(),
          owlName: chosenOwlName,
          time: timeStr,
          recipient: name.trim(),
          status: 'Dispatched'
        };
        setRecentDispatches((prev) => [newRecord, ...prev.slice(0, 2)]);

        // Increment counter & trigger roll animation
        setTotalOwls((prev) => {
          const updated =
            typeof result.totalOwls === 'number' && result.totalOwls > prev
              ? result.totalOwls
              : prev + 1;
          if (typeof window !== 'undefined') {
            localStorage.setItem('owl_post_dispatched_count', String(updated));
          }
          return updated;
        });

        setTumblerRolling(true);
        setTimeout(() => setTumblerRolling(false), 1400);

        setName('');
        setEmail('');
        setMessage('');
        playOwlSound('wing');
      } else {
        setIsSuccess(false);
        setValidationError(
          result.message || 'The owl encountered a magical storm. Please verify your correspondence.'
        );
      }
    } catch {
      setIsSuccess(false);
      setValidationError(
        'The owl could not complete its journey across the network. Please use the direct mail link in the ledger.'
      );
    } finally {
      setLoading(false);
    }
  };

  const activeOwlObj = OWL_OPTIONS.find((o) => o.id === selectedOwl) || OWL_OPTIONS[1];

  // Helper for vintage mechanical tumbler counter digits (starts at 0, 5-digit roll)
  const getDigits = (num: number): string[] => {
    const safe = Math.max(0, num);
    return safe.toString().padStart(5, '0').slice(-5).split('');
  };

  return (
    <section id="owl-post" className="folio-container scroll-reveal owl-desk-section">
      <div className="section-header">
        <span className="section-eyebrow">✦ The Owlery Registry ✦</span>
        <h2 className="section-title">The Owl Post Desk &amp; Perch</h2>
        <p className="section-subtitle">
          Select your messenger from the roost, inscribe your correspondence upon the unrolled scroll, and inspect the ministry postal ledger.
        </p>
      </div>

      {/* Dimensional Mailroom Container with Filigree Frame & Celestial Flourishes */}
      <div className="owl-mailroom-frame">
        {/* Ambient Warm Mailroom Lantern Glow & Starlight Particle Canvas */}
        <div className="desk-ambient-lamp-glow" aria-hidden="true" />
        <canvas ref={canvasRef} className="owl-vfx-canvas" aria-hidden="true" />

        {/* Celestial Corner Flourishes & Stars */}
        <div className="mailroom-corner-filigree top-left" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="#d4af37" strokeWidth="1.4">
            <path d="M 4 4 L 4 32 C 4 20 12 12 24 12 C 16 12 12 8 12 4 Z" fill="rgba(212,175,55,0.15)" />
            <path d="M 4 4 L 32 4 C 20 4 12 12 12 24 C 12 16 8 12 4 12 Z" fill="rgba(212,175,55,0.15)" />
            <circle cx="6" cy="6" r="2.5" fill="#d4af37" />
            <circle cx="28" cy="4" r="1.5" fill="#d4af37" />
            <circle cx="4" cy="28" r="1.5" fill="#d4af37" />
            <polygon points="12,12 15,9 18,12 15,15" fill="#ffd700" />
          </svg>
        </div>
        <div className="mailroom-corner-filigree top-right" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="#d4af37" strokeWidth="1.4">
            <path d="M 44 4 L 44 32 C 44 20 36 12 24 12 C 32 12 36 8 36 4 Z" fill="rgba(212,175,55,0.15)" />
            <path d="M 44 4 L 16 4 C 28 4 36 12 36 24 C 36 16 40 12 44 12 Z" fill="rgba(212,175,55,0.15)" />
            <circle cx="42" cy="6" r="2.5" fill="#d4af37" />
            <circle cx="20" cy="4" r="1.5" fill="#d4af37" />
            <circle cx="44" cy="28" r="1.5" fill="#d4af37" />
            <polygon points="36,12 33,9 30,12 33,15" fill="#ffd700" />
          </svg>
        </div>
        <div className="mailroom-corner-filigree bottom-left" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="#d4af37" strokeWidth="1.4">
            <path d="M 4 44 L 4 16 C 4 28 12 36 24 36 C 16 36 12 40 12 44 Z" fill="rgba(212,175,55,0.15)" />
            <path d="M 4 44 L 32 44 C 20 44 12 36 12 24 C 12 32 8 36 4 36 Z" fill="rgba(212,175,55,0.15)" />
            <circle cx="6" cy="42" r="2.5" fill="#d4af37" />
            <circle cx="28" cy="44" r="1.5" fill="#d4af37" />
            <circle cx="4" cy="20" r="1.5" fill="#d4af37" />
            <polygon points="12,36 15,33 18,36 15,39" fill="#ffd700" />
          </svg>
        </div>
        <div className="mailroom-corner-filigree bottom-right" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="#d4af37" strokeWidth="1.4">
            <path d="M 44 44 L 44 16 C 44 28 36 36 24 36 C 32 36 36 40 36 44 Z" fill="rgba(212,175,55,0.15)" />
            <path d="M 44 44 L 16 44 C 28 44 36 36 36 24 C 36 32 40 36 44 36 Z" fill="rgba(212,175,55,0.15)" />
            <circle cx="42" cy="42" r="2.5" fill="#d4af37" />
            <circle cx="20" cy="44" r="1.5" fill="#d4af37" />
            <circle cx="44" cy="20" r="1.5" fill="#d4af37" />
            <polygon points="36,36 33,33 30,36 33,39" fill="#ffd700" />
          </svg>
        </div>

        {/* Centered Celestial Compass Stars on Top and Bottom Borders */}
        <div className="mailroom-border-star top-center" aria-hidden="true">✦</div>
        <div className="mailroom-border-star bottom-center" aria-hidden="true">✦</div>

        <div className="mailroom-rivet rivet-tl" aria-hidden="true" />
        <div className="mailroom-rivet rivet-tr" aria-hidden="true" />
        <div className="mailroom-rivet rivet-bl" aria-hidden="true" />
        <div className="mailroom-rivet rivet-br" aria-hidden="true" />

        {/* 3-Column Layout: Desktop Grid, Stacks 1-Column on Mobile (< 1024px) */}
        <div className="owl-desk-layout">

          {/* =========================================================================
              COLUMN 1: SELECT YOUR OWL (ROOST CABINET)
              ========================================================================= */}
          <div className="owl-column-wrapper col-owl">
            <div className="owl-column-super-header">
              <span className="super-header-rule left" aria-hidden="true" />
              <span className="super-header-text">SELECT YOUR OWL</span>
              <span className="super-header-rule right" aria-hidden="true" />
            </div>

            <aside className="owl-perch-column" aria-label="Roost Cabinet: Choose an Owl">
              <div className="perch-panel-frame roost-cabinet-box">
                {/* Brass Corner Brackets */}
                <span className="cabinet-bracket top-left" aria-hidden="true" />
                <span className="cabinet-bracket top-right" aria-hidden="true" />
                <span className="cabinet-bracket bottom-left" aria-hidden="true" />
                <span className="cabinet-bracket bottom-right" aria-hidden="true" />

                {/* Arched Cabinet Header: '✦ CHOOSE AN OWL ✦' */}
                <div className="perch-panel-header arched-cabinet-header">
                  <span className="perch-header-sigil" aria-hidden="true">✦</span>
                  <h3 className="perch-title">CHOOSE AN OWL</h3>
                  <span className="perch-header-sigil" aria-hidden="true">✦</span>
                </div>

                {/* 2x2 Roosting Perch Grid */}
                <div
                  className="owl-roost-2x2-grid"
                  role="radiogroup"
                  aria-label="Available Carrier Owls"
                >
                  {OWL_OPTIONS.map((owl, idx) => {
                    const isSelected = selectedOwl === owl.id;
                    return (
                      <button
                        key={owl.id}
                        ref={(el) => {
                          radioRefs.current[idx] = el;
                        }}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={isSelected ? 0 : -1}
                        id={`owl-perch-${owl.id}`}
                        className={`owl-perch-card roost-card ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => {
                          setSelectedOwl(owl.id);
                          playOwlSound('perch');
                        }}
                        onKeyDown={(e) => handleKeyDownOwl(e, idx)}
                        aria-label={`${owl.name} — ${owl.badge}. ${isSelected ? 'Currently Selected' : 'Click to select'}`}
                      >
                        {/* Illustrated Owl Avatar on Brass-Tipped Branch */}
                        <div className="owl-perch-stage">
                          <div className={`owl-card-icon owl-icon-${owl.id}`} aria-hidden="true">
                            <svg
                              viewBox="0 0 48 64"
                              className="owl-emblem-svg"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {owl.svgPath}
                            </svg>
                          </div>
                          {/* Brass-Tipped Perch Branch directly under talons */}
                          <div className="perch-branch-bar" aria-hidden="true">
                            <span className="brass-perch-tip left" />
                            <span className="wood-perch-rod" />
                            <span className="brass-perch-tip right" />

                            {/* Circular Selection Badge next to Perch Bar */}
                            <div className="perch-inline-seal-wrap">
                              {isSelected ? (
                                <span className="owl-wax-badge selected" aria-label="Currently Selected">
                                  <span className="wax-badge-rim" />
                                  <span className="wax-badge-text">SELECTED</span>
                                </span>
                              ) : (
                                <span className="owl-brass-ring-badge unselected" aria-hidden="true">
                                  <span className="brass-ring-circle" />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Aged Parchment Cartouche Placard with Double Gold Border */}
                        <div className="owl-parchment-placard">
                          <span className="placard-owl-name">{owl.name.toUpperCase()}</span>
                          <span className="placard-owl-desc1">{owl.title}</span>
                          <span className="placard-owl-desc2">{owl.subtitle}</span>
                          <span className={`placard-owl-status ${isSelected ? 'is-selected' : ''}`}>
                            {isSelected ? 'SELECTED' : 'Ready on Perch'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Roost Cabinet Registry Footer for visual column height balance */}
                <div className="cabinet-roost-footer" aria-hidden="true">
                  <span className="roost-footer-flourish">✦</span>
                  <span className="roost-footer-text">Eeylops Owl Registry · Ready for Flight</span>
                  <span className="roost-footer-flourish">✦</span>
                </div>
              </div>
            </aside>
          </div>

          {/* =========================================================================
              COLUMN 2: THE LETTER (PARCHMENT SCROLL)
              ========================================================================= */}
          <div className="owl-column-wrapper col-letter">
            <div className="owl-column-super-header">
              <span className="super-header-rule left" aria-hidden="true" />
              <span className="super-header-text">THE LETTER</span>
              <span className="super-header-rule right" aria-hidden="true" />
            </div>

            <div className="owl-scroll-center-column">
              <div className="unrolled-parchment-scroll">
                {/* 3D Stacked Parchment Wings Behind Scroll */}
                <div className="scroll-backdrop-wings" aria-hidden="true">
                  <span className="scroll-wing-flap left" />
                  <span className="scroll-wing-flap right" />
                </div>

                {/* Realistic Wooden Spindle Roller Top with Brass Endcaps */}
                <div className="scroll-finial-top dimensional-spindle" aria-hidden="true">
                  <span className="spindle-brass-cap left" />
                  <span className="spindle-wood-cylinder" />
                  <span className="spindle-brass-cap right" />
                </div>

                {/* Dimensional Aged Parchment Scroll Body */}
                <div className="scroll-parchment-body aged-texture-scroll">
                  {/* Vintage Watermark Crest */}
                  <div className="parchment-watermark-seal" aria-hidden="true">
                    <svg viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
                      <path d="M 50 22 C 40 22 35 28 35 38 C 35 48 42 58 50 62 C 58 58 65 48 65 38 C 65 28 60 22 50 22 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="45" cy="33" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
                      <circle cx="55" cy="33" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
                      <path d="M 50 36 L 48 41 L 52 41 Z" fill="currentColor" />
                      <path d="M 32 40 C 26 44 26 55 32 64 C 36 60 40 55 42 48" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M 68 40 C 74 44 74 55 68 64 C 64 60 60 55 58 48" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <text x="50" y="78" fontSize="5.5" fontFamily="serif" textAnchor="middle" letterSpacing="0.1em" fill="currentColor">MINISTRY OF MAGIC</text>
                      <text x="50" y="86" fontSize="4.5" fontFamily="serif" textAnchor="middle" letterSpacing="0.15em" fill="currentColor">✦ OWL POST ✦</text>
                    </svg>
                  </div>

                  {/* Elaborate Serif Calligraphy Header with Wings */}
                  <div className="scroll-title-banner">
                    <div className="scroll-crest-calligraphy-row">
                      <span className="scroll-calligraphy-wing left" aria-hidden="true">❧ ✦</span>
                      <h3 className="scroll-main-title calligraphy-heading">THE OWL POST</h3>
                      <span className="scroll-calligraphy-wing right" aria-hidden="true">✦ ❧</span>
                    </div>
                    <p className="scroll-main-subtitle calligraphy-subtitle">
                      Dispatch Your Message across the Realm
                    </p>
                    <div className="scroll-chosen-owl-indicator">
                      <span className="indicator-label">✦ Assigned Messenger:</span>{' '}
                      <strong className="indicator-owl-name">
                        {activeOwlObj.name} — {activeOwlObj.badge}
                      </strong>
                    </div>
                  </div>

                  <form id="owl-post-form" className="owl-ink-form" onSubmit={handleSubmit} noValidate>
                    {/* Invisible Honeypot Spam Shield */}
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
                      <div className="owl-scroll-fields">
                        {/* Field 1: Sender Name & Title */}
                        <div className="ink-field-group">
                          <label htmlFor="owl-sender-name" className="ink-field-label">
                            SENDER NAME &amp; TITLE
                          </label>
                          <div className="ink-input-slot-wrapper">
                            <input
                              ref={firstInputRef}
                              type="text"
                              id="owl-sender-name"
                              name="name"
                              className="ink-field-input parchment-notched-slot"
                              placeholder="Your name or guild..."
                              required
                              autoComplete="name"
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                if (validationError) setValidationError('');
                              }}
                              onFocus={() => playOwlSound('scratch')}
                            />
                            <span className="slot-corner tl" aria-hidden="true" />
                            <span className="slot-corner tr" aria-hidden="true" />
                            <span className="slot-corner bl" aria-hidden="true" />
                            <span className="slot-corner br" aria-hidden="true" />
                          </div>
                        </div>

                        {/* Field 2: Return Owl / Email Address */}
                        <div className="ink-field-group">
                          <label htmlFor="owl-sender-email" className="ink-field-label">
                            RETURN OWL / EMAIL ADDRESS
                          </label>
                          <div className="ink-input-slot-wrapper">
                            <input
                              type="email"
                              id="owl-sender-email"
                              name="email"
                              className="ink-field-input parchment-notched-slot"
                              placeholder="Where our owl should return..."
                              required
                              autoComplete="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (validationError) setValidationError('');
                              }}
                              onFocus={() => playOwlSound('scratch')}
                            />
                            <span className="slot-corner tl" aria-hidden="true" />
                            <span className="slot-corner tr" aria-hidden="true" />
                            <span className="slot-corner bl" aria-hidden="true" />
                            <span className="slot-corner br" aria-hidden="true" />
                          </div>
                        </div>

                        {/* Field 3: Your Correspondence */}
                        <div className="ink-field-group">
                          <label htmlFor="owl-message" className="ink-field-label">
                            YOUR CORRESPONDENCE
                          </label>
                          <div className="ink-input-slot-wrapper textarea-slot">
                            <textarea
                              id="owl-message"
                              name="message"
                              className="ink-field-textarea parchment-notched-slot"
                              rows={4}
                              placeholder="Inscribe your message..."
                              required
                              maxLength={500}
                              value={message}
                              onChange={(e) => {
                                setMessage(e.target.value);
                                if (validationError) setValidationError('');
                              }}
                              onFocus={() => playOwlSound('scratch')}
                            />
                            <span className="slot-corner tl" aria-hidden="true" />
                            <span className="slot-corner tr" aria-hidden="true" />
                            <span className="slot-corner bl" aria-hidden="true" />
                            <span className="slot-corner br" aria-hidden="true" />
                          </div>
                          <div className="ink-field-hint">
                            <span>✦ Inscribed in enchanted indelible ink</span>
                            <span className="char-counter">{message.length} / 500 characters</span>
                          </div>
                        </div>

                        {/* Themed Validation Banner */}
                        {validationError && (
                          <div className="validation-scroll-banner" role="alert">
                            <span className="validation-sigil" aria-hidden="true">⚠️ ✦</span>
                            <span className="validation-text">{validationError}</span>
                          </div>
                        )}

                        {/* Hanging Crimson Wax Seal Button stamped with Owl & 'D' insignia */}
                        <div className="wax-seal-dispatch-wrapper">
                          {isPressingSeal && <span className="wax-seal-shockwave-ring" aria-hidden="true" />}
                          {featherBurstActive && (
                            <div className="feather-burst-animation-container" aria-hidden="true">
                              <span className="feather-burst-particle f1">🪶</span>
                              <span className="feather-burst-particle f2">✦</span>
                              <span className="feather-burst-particle f3">🪶</span>
                              <span className="feather-burst-particle f4">✦</span>
                              <span className="feather-burst-particle f5">🪶</span>
                              <span className="feather-burst-particle f6">✦</span>
                              <span className="feather-burst-particle f7">🪶</span>
                              <span className="feather-burst-particle f8">✦</span>
                            </div>
                          )}
                          <button
                            type="submit"
                            className={`wax-seal-dispatch-btn embossed-crimson-seal hanging-seal ${
                              isPressingSeal ? 'is-pressed' : ''
                            } ${loading ? 'is-loading' : ''}`}
                            id="dispatch-seal-btn"
                            disabled={loading}
                            aria-label={loading ? 'Owl is taking flight…' : 'Dispatch Owl — Press to Seal & Send'}
                          >
                            <span className="wax-outer-rim" />
                            <span className="wax-inner-bevel">
                              <span className="wax-emblem-container">
                                {loading ? (
                                  <>
                                    <span className="wax-flight-spinner" aria-hidden="true">🪶</span>
                                    <span className="wax-seal-label loading-label">Taking Flight…</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="wax-owl-sigil" aria-hidden="true">
                                      <svg viewBox="0 0 32 24" width="34" height="24" fill="#ffd700">
                                        <path d="M 16 2 C 11 -3 2 -1 0 5 C 4 7 8 9 12 14 C 14 16 15 19 16 21 C 17 19 18 16 20 14 C 24 9 28 7 32 5 C 30 -1 21 -3 16 2 Z" />
                                        <circle cx="13" cy="8" r="1.3" fill="#3a0505" />
                                        <circle cx="19" cy="8" r="1.3" fill="#3a0505" />
                                        <text x="16" y="19" fontSize="7" fontFamily="serif" fontWeight="bold" textAnchor="middle" fill="#fffdf0">D</text>
                                      </svg>
                                    </span>
                                    <span className="wax-seal-label">Dispatch Owl</span>
                                  </>
                                )}
                              </span>
                            </span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Confirmation State */
                      <div className="scroll-confirmation-area">
                        <div className="confirmation-header-emblem" aria-hidden="true">
                          <span className="winged-seal-symbol">🪶</span>
                        </div>
                        <h4 className="confirmation-parchment-title">✦ Owl Dispatched! ✦</h4>

                        {/* Animated Flight Path Tracker */}
                        <div className="flight-path-tracker" aria-hidden="true">
                          <span className="flight-station">🏛️ Owlery Roost</span>
                          <div className="flight-path-line">
                            <span className="flight-path-owl-icon">🪶</span>
                          </div>
                          <span className="flight-station">✉️ Recipient&apos;s Desk</span>
                        </div>

                        {statusMessage && (
                          <div
                            id="owl-status"
                            className={`scroll-status-banner ${isSuccess ? 'has-success' : ''}`}
                            aria-live="polite"
                          >
                            <span className="status-sigil" aria-hidden="true">✦</span>
                            <p className="status-text">{statusMessage}</p>
                          </div>
                        )}

                        <div className="scroll-reset-actions">
                          <button
                            ref={mischiefBtnRef}
                            type="button"
                            className="mischief-managed-scroll-btn"
                            id="owl-mischief-reset-btn"
                            aria-label="Mischief managed — Seal & Close Scroll"
                            onClick={handleMischiefClose}
                          >
                            <span>Mischief managed — Seal &amp; Close Scroll ✦</span>
                          </button>
                          <button
                            type="button"
                            className="send-another-dispatch-link"
                            onClick={handleResetForm}
                            aria-label="Inscribe another parchment dispatch"
                          >
                            <span>Inscribe another parchment dispatch</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {!submitted && statusMessage && (
                      <div
                        id="owl-status"
                        className={`scroll-status-banner ${isSuccess ? 'has-success' : ''}`}
                        aria-live="polite"
                      >
                        <span className="status-sigil" aria-hidden="true">✦</span>
                        <p className="status-text">{statusMessage}</p>
                      </div>
                    )}
                  </form>
                </div>

                {/* Realistic Wooden Spindle Roller Bottom with Brass Endcaps */}
                <div className="scroll-finial-bottom dimensional-spindle" aria-hidden="true">
                  <span className="spindle-brass-cap left" />
                  <span className="spindle-wood-cylinder" />
                  <span className="spindle-brass-cap right" />
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              COLUMN 3: POSTAL LEDGER & COUNTER
              ========================================================================= */}
          <div className="owl-column-wrapper col-ledger">
            <div className="owl-column-super-header">
              <span className="super-header-rule left" aria-hidden="true" />
              <span className="super-header-text">POSTAL LEDGER &amp; COUNTER</span>
              <span className="super-header-rule right" aria-hidden="true" />
            </div>

            <aside className="owl-ledger-column" aria-label="Postal Ledger & Counter Shelving">
              <div className="ledger-shelf-frame postal-shelving-unit">
                {/* Brass Corner Brackets */}
                <span className="cabinet-bracket top-left" aria-hidden="true" />
                <span className="cabinet-bracket top-right" aria-hidden="true" />
                <span className="cabinet-bracket bottom-left" aria-hidden="true" />
                <span className="cabinet-bracket bottom-right" aria-hidden="true" />

                {/* SHELF 1: TOP TIER — Hanging Rolled Banner & Vintage Mechanical Brass Counter Box */}
                <div className="shelf-tier shelf-top">
                  {/* Rolled Parchment Header Banner */}
                  <div className="shelf-banner-scroll">
                    <span className="banner-pin left" aria-hidden="true" />
                    <span className="banner-scroll-text">
                      ✦ {totalOwls} OWLS DISPATCHED ✦
                    </span>
                    <span className="banner-pin right" aria-hidden="true" />
                  </div>

                  {/* Mechanical Brass Register Plate */}
                  <div className="mechanical-counter-wrapper">
                    <div className="brass-register-plate vintage-counter-box">
                      <div className="plate-screw top-left" aria-hidden="true" />
                      <div className="plate-screw top-right" aria-hidden="true" />
                      <div className="plate-screw bottom-left" aria-hidden="true" />
                      <div className="plate-screw bottom-right" aria-hidden="true" />

                      {/* 5 Rotating Number Wheels with 3D Tumbler Appearance */}
                      <div className={`counter-tumbler-row ${tumblerRolling ? 'tumbler-roll' : ''}`} aria-live="polite" aria-atomic="true">
                        {getDigits(totalOwls).map((digit, idx) => (
                          <div key={idx} className="tumbler-digit-cell">
                            <span className="tumbler-digit">{digit}</span>
                            <span className="tumbler-reflection" aria-hidden="true" />
                            <span className="tumbler-axle-shadow" aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SHELF 2: MIDDLE TIER — Session Flight Ledger & Recent Dispatches */}
                <div className="shelf-tier shelf-middle">
                  <div className="shelf-plank-surface" aria-hidden="true" />
                  <div className="ledger-shelf-header">
                    <span className="shelf-tier-label">✦ RECENT DISPATCHES ✦</span>
                  </div>

                  <div className="ledger-dispatches-container">
                    {recentDispatches.length === 0 ? (
                      <div className="empty-ledger-state">
                        <span className="empty-ledger-icon" aria-hidden="true">🪶</span>
                        <p className="empty-ledger-text">No owls have left the perch yet</p>
                        <span className="empty-ledger-sub">Inscribe a letter to record flights</span>
                      </div>
                    ) : (
                      <ul className="dispatches-log-list" aria-label="Session recent dispatches">
                        {recentDispatches.map((dispatch) => (
                          <li key={dispatch.id} className="dispatch-log-item">
                            <div className="dispatch-log-top">
                              <span className="dispatch-owl-name">✦ {dispatch.owlName}</span>
                              <span className="dispatch-time">{dispatch.time}</span>
                            </div>
                            <div className="dispatch-log-sub">
                              <span className="dispatch-recipient">From: {dispatch.recipient}</span>
                              <span className="dispatch-badge-status">✓ {dispatch.status}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Decorative Stack of Jute-Tied Parchment Scrolls */}
                  <div className="ledger-scrolls-stack-illustration" aria-hidden="true">
                    <svg
                      viewBox="0 0 240 75"
                      className="desk-scrolls-stack-svg tactile-shelving-art"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Shelf Shadow */}
                      <ellipse cx="120" cy="70" rx="105" ry="5" fill="#000000" opacity="0.35" />

                      {/* Scroll 1 (Bottom Left) */}
                      <g>
                        <rect x="20" y="44" width="85" height="18" rx="3.5" fill="#f5edd8" stroke="#a88544" strokeWidth="1.2" />
                        <ellipse cx="20" cy="53" rx="4" ry="9" fill="#e8d9be" stroke="#a88544" strokeWidth="1.2" />
                        <path d="M 19 50 A 2 5 0 0 1 21 56" stroke="#8a6729" strokeWidth="1" fill="none" />
                        {/* Jute Twine Cord */}
                        <line x1="58" y1="44" x2="58" y2="62" stroke="#8c6239" strokeWidth="3" />
                        <line x1="57" y1="44" x2="59" y2="62" stroke="#d4af37" strokeWidth="1" strokeDasharray="2,2" />
                      </g>

                      {/* Scroll 2 (Bottom Right) */}
                      <g>
                        <rect x="105" y="46" width="95" height="18" rx="3.5" fill="#f8f1de" stroke="#a88544" strokeWidth="1.2" />
                        <ellipse cx="200" cy="55" rx="4" ry="9" fill="#e8d9be" stroke="#a88544" strokeWidth="1.2" />
                        <path d="M 199 52 A 2 5 0 0 0 201 58" stroke="#8a6729" strokeWidth="1" fill="none" />
                        {/* Jute Twine Cord */}
                        <line x1="152" y1="46" x2="152" y2="64" stroke="#8c6239" strokeWidth="3" />
                        <line x1="151" y1="46" x2="153" y2="64" stroke="#d4af37" strokeWidth="1" strokeDasharray="2,2" />
                      </g>

                      {/* Scroll 3 (Middle Layer) */}
                      <g transform="rotate(-3 100 36)">
                        <rect x="42" y="28" width="92" height="18" rx="3.5" fill="#fbf7ec" stroke="#a88544" strokeWidth="1.2" />
                        <ellipse cx="42" cy="37" rx="4" ry="9" fill="#e4d4b6" stroke="#a88544" strokeWidth="1.2" />
                        {/* Twine */}
                        <line x1="86" y1="28" x2="86" y2="46" stroke="#8c6239" strokeWidth="3" />
                        <line x1="85" y1="28" x2="87" y2="46" stroke="#d4af37" strokeWidth="1" strokeDasharray="2,2" />
                        <circle cx="86" cy="37" r="3.5" fill="#7a4f23" />
                      </g>

                      {/* Scroll 4 (Top of Pyramid) */}
                      <g transform="rotate(2 110 18)">
                        <rect x="75" y="10" width="88" height="18" rx="3.5" fill="#fffdf7" stroke="#bfa05d" strokeWidth="1.2" />
                        <ellipse cx="163" cy="19" rx="4" ry="9" fill="#eedec1" stroke="#bfa05d" strokeWidth="1.2" />
                        {/* Twine Bow */}
                        <line x1="116" y1="10" x2="116" y2="28" stroke="#8c6239" strokeWidth="3" />
                        <line x1="115" y1="10" x2="117" y2="28" stroke="#d4af37" strokeWidth="1" strokeDasharray="2,2" />
                        {/* Bow Loop */}
                        <path d="M 112 16 Q 116 11 120 16 M 112 22 Q 116 27 120 22" fill="none" stroke="#7a4f23" strokeWidth="1.8" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* SHELF 3: BOTTOM TIER — Rolled Scroll, Inkwell, Feather Quill, Wax Sticks & Seal */}
                <div className="shelf-tier shelf-bottom">
                  <div className="shelf-plank-surface" aria-hidden="true" />
                  <div className="ledger-inkwell-illustration" aria-hidden="true">
                    <svg
                      viewBox="0 0 240 85"
                      className="desk-still-life-svg tactile-shelving-art"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Shelf Base Shadow */}
                      <ellipse cx="120" cy="80" rx="110" ry="4" fill="#000000" opacity="0.3" />

                      {/* Rolled Scroll on Left Tied with Twine */}
                      <g>
                        <rect x="14" y="52" width="76" height="16" rx="3" fill="#f8f1df" stroke="#a88544" strokeWidth="1.2" />
                        <ellipse cx="14" cy="60" rx="3.5" ry="8" fill="#e8d9be" stroke="#a88544" strokeWidth="1.2" />
                        <line x1="48" y1="52" x2="48" y2="68" stroke="#8c6239" strokeWidth="2.8" />
                        <line x1="47" y1="52" x2="49" y2="68" stroke="#d4af37" strokeWidth="1" strokeDasharray="2,2" />
                        {/* Twine knot */}
                        <circle cx="48" cy="60" r="2.5" fill="#7a4f23" />
                      </g>

                      {/* Stamped Red Wax Seal Badge on Shelf */}
                      <g transform="translate(108, 62)">
                        <circle cx="10" cy="8" r="9" fill="#991919" stroke="#540a0a" strokeWidth="0.8" />
                        <circle cx="10" cy="8" r="7" fill="none" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="3,1" />
                        <text x="10" y="11" fontSize="7.5" fontFamily="serif" textAnchor="middle" fill="#fff3c4" fontWeight="bold">D</text>
                      </g>

                      {/* Faceted Glass/Brass Antique Inkwell */}
                      <g transform="translate(142, 38)">
                        {/* Brass Beveled Cap Rim */}
                        <rect x="14" y="10" width="16" height="5" rx="1.5" fill="#c9a44b" stroke="#7a5518" strokeWidth="0.8" />
                        {/* Square Glass Body */}
                        <path d="M 8 36 L 12 15 L 32 15 L 36 36 Z" fill="#2d3748" stroke="#8c6d3f" strokeWidth="1.2" />
                        {/* Black Ink Core */}
                        <path d="M 11 34 L 14 18 L 30 18 L 33 34 Z" fill="#090d14" />
                        {/* Glass Gloss Reflection */}
                        <path d="M 14 17 L 16 32" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.45" strokeLinecap="round" />
                      </g>

                      {/* Natural Feather Quill Dipped in Inkwell */}
                      <g transform="translate(146, 2) rotate(22 14 48)">
                        {/* Quill Shaft */}
                        <line x1="14" y1="2" x2="14" y2="52" stroke="#e2d4bc" strokeWidth="1.8" strokeLinecap="round" />
                        <line x1="14" y1="46" x2="14" y2="52" stroke="#120c06" strokeWidth="2" strokeLinecap="round" />
                        {/* Feather Vane (Left) */}
                        <path d="M 14 4 C 6 12 4 26 14 42 C 14 42 14 4 14 4 Z" fill="#e8dec8" stroke="#a39274" strokeWidth="0.8" />
                        {/* Feather Vane (Right) */}
                        <path d="M 14 4 C 22 13 24 28 14 44 C 14 44 14 4 14 4 Z" fill="#d9cdb4" stroke="#a39274" strokeWidth="0.8" />
                        {/* Fine Feather Barbs */}
                        <line x1="14" y1="14" x2="7" y2="20" stroke="#a39274" strokeWidth="0.7" opacity="0.6" />
                        <line x1="14" y1="22" x2="6" y2="28" stroke="#a39274" strokeWidth="0.7" opacity="0.6" />
                        <line x1="14" y1="30" x2="8" y2="36" stroke="#a39274" strokeWidth="0.7" opacity="0.6" />
                        <line x1="14" y1="16" x2="21" y2="22" stroke="#a39274" strokeWidth="0.7" opacity="0.6" />
                        <line x1="14" y1="25" x2="22" y2="31" stroke="#a39274" strokeWidth="0.7" opacity="0.6" />
                      </g>

                      {/* 2 Rectangular Sticks of Red Sealing Wax */}
                      <g transform="translate(182, 58)">
                        {/* Wax Stick 1 */}
                        <rect x="0" y="5" width="26" height="8" rx="1.2" fill="#991919" stroke="#540a0a" strokeWidth="0.8" />
                        <line x1="3" y1="7.5" x2="23" y2="7.5" stroke="#c42929" strokeWidth="1" />
                        {/* Wax Stick 2 (Angled Behind) */}
                        <rect x="6" y="-3" width="26" height="7.5" rx="1.2" fill="#b01f1f" stroke="#540a0a" strokeWidth="0.8" transform="rotate(14 18 0)" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* BOTTOM PLAQUE: Direct Post & Portals with Screws and Star Sparkle */}
                <div className="plaque-shelf-container">
                  <div className="wooden-brass-plaque">
                    <span className="plaque-screw top-left" aria-hidden="true" />
                    <span className="plaque-screw top-right" aria-hidden="true" />
                    <span className="plaque-screw bottom-left" aria-hidden="true" />
                    <span className="plaque-screw bottom-right" aria-hidden="true" />

                    <ul className="plaque-channel-list">
                      <li className="plaque-channel-item">
                        <span className="plaque-sigil" aria-hidden="true">✦</span>
                        <div className="plaque-channel-content">
                          <span className="plaque-label">LinkedIn</span>
                          <a
                            href="https://www.linkedin.com/in/devanshipatel1103"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="plaque-link"
                          >
                            /in/devanshipatel1103
                          </a>
                        </div>
                      </li>
                      <li className="plaque-channel-item">
                        <span className="plaque-sigil" aria-hidden="true">✦</span>
                        <div className="plaque-channel-content">
                          <span className="plaque-label">GitHub</span>
                          <a
                            href="https://github.com/Dpatel1103"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="plaque-link"
                          >
                            /Dpatel1103
                          </a>
                        </div>
                      </li>
                      <li className="plaque-channel-item">
                        <span className="plaque-sigil" aria-hidden="true">✦</span>
                        <div className="plaque-channel-content">
                          <span className="plaque-label">Direct Owl Post</span>
                          <a
                            href="mailto:devanshi1303@gmail.com"
                            className="plaque-email-link"
                          >
                            devanshi1303@gmail.com
                          </a>
                        </div>
                      </li>
                    </ul>

                    {/* Quick Copy & Mail Action Row */}
                    <div className="plaque-copy-action-row">
                      <button
                        type="button"
                        className={`plaque-copy-btn ${copied ? 'is-copied' : ''}`}
                        onClick={handleCopy}
                        aria-label="Copy email address devanshi1303@gmail.com to clipboard"
                      >
                        <span>{copied ? 'Copied to parchment ✓' : 'Copy Email Address'}</span>
                      </button>
                      <a
                        href="mailto:devanshi1303@gmail.com?subject=Owl%20Post%20for%20Devanshi"
                        className="plaque-mail-btn"
                      >
                        Open Mail App ↗
                      </a>
                    </div>

                    {/* 4-Point Diamond Star Sparkle in Corner */}
                    <span className="plaque-star-sparkle" aria-hidden="true">✦</span>
                  </div>
                </div>

              </div>
            </aside>
          </div>

        </div>
      </div>

      {/* =========================================================================
          SWOOPING CARRIER OWL SILHOUETTE (CUSTOMIZED FOR THE CHOSEN OWL)
          ========================================================================= */}
      {owlFlightActive && (
        <div className={`carrier-owl-flight-container ${activeOwlObj.id}`} aria-hidden="true">
          <div className={`carrier-owl-sprite sprite-${activeOwlObj.id}`}>
            <svg
              viewBox="0 0 120 70"
              className="carrier-owl-svg"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Head & Body */}
              <path d="M 55 35 C 52 30 54 22 62 22 C 70 22 72 30 68 37 C 65 44 58 46 55 35 Z" />
              <path d="M 68 28 L 73 30 L 68 32 Z" />
              {/* Left Wing */}
              <path d="M 54 30 C 45 18 32 8 12 4 C 20 14 26 25 36 33 C 43 38 49 37 54 30 Z" />
              {/* Right Wing */}
              <path d="M 64 28 C 76 16 94 8 114 6 C 104 15 96 26 82 34 C 74 38 68 36 64 28 Z" />
              {/* Tail */}
              <path d="M 52 42 C 46 48 40 52 34 55 C 42 52 48 48 54 44 Z" />
              {/* Talons */}
              <path d="M 60 44 L 62 50 L 66 49 L 64 43 Z" />
              {/* Sealed Parchment Letter */}
              <rect
                x="58"
                y="49"
                width="16"
                height="10"
                rx="1.5"
                fill="#fdfaf3"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <line x1="58" y1="49" x2="66" y2="54" stroke="currentColor" strokeWidth="0.9" />
              <line x1="74" y1="49" x2="66" y2="54" stroke="currentColor" strokeWidth="0.9" />
              {/* Crimson Wax Seal */}
              <circle cx="66" cy="54" r="2.2" fill="#a62626" />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
}
