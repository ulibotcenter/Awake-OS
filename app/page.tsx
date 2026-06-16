'use client';
import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import JoinBetaModal from '@/components/JoinBetaModal';

const NeuralUniverse = dynamic(
  () => import('@/components/three/NeuralUniverse'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[200px] bg-[#081824] flex items-center justify-center">
        <div
          className="w-7 h-7 rounded-full border border-[rgba(64,240,216,0.25)] border-t-[#40F0D8] animate-spin"
          aria-hidden="true"
        />
      </div>
    ),
  }
);

interface BookTrace {
  x: number;
  y: number;
  t: number;
}

const BETA_ACCESS_LINK = 'https://booksprout.co/reviewer/review-copy/view/287649/awake-os';

export default function AwakeOS() {
  const NAV_HEIGHT = 80;

  /* Living Codex Ritual State */
  const [bookOpened, setBookOpened] = useState(false);
  const [traces, setTraces] = useState<BookTrace[]>([]);
  const [isReturnVisit, setIsReturnVisit] = useState(false);
  const [coverLightbox, setCoverLightbox] = useState<'front' | 'spread' | 'logo' | null>(null);
  const [betaModalOpen, setBetaModalOpen] = useState(false);

  const lightboxAssets = {
    front: {
      src: '/images/awake-os-cover.jpg',
      alt: 'Awake OS — front cover (enlarged)',
      title: 'Front Cover',
    },
    spread: {
      src: '/images/front-and-back-cover.jpg',
      alt: 'Awake OS — full jacket spread (enlarged)',
      title: 'Full Jacket — Front & Back',
    },
    logo: {
      src: '/images/logo-somatic-labs.png',
      alt: 'Somatic Labs Publishing (enlarged)',
      title: 'Somatic Labs Publishing',
    },
  } as const;

  const substrateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      const sim = (window as any).__awakeNeuralSim;
      if (sim?.triggerCalmingWave) sim.triggerCalmingWave(0.65);
    }, 920);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last > 160) {
        last = now;
        const sim = (window as any).__awakeNeuralSim;
        if (sim?.getRenderData) {
          const data = sim.getRenderData();
          const specials = data.specialNodes || [];
          let maxStr = 0.72;
          let activity = 0.12;
          for (let i = 0; i < 4; i++) {
            const s = specials[i]?.[3] || 0.9;
            maxStr = Math.max(maxStr, s);
            if (s > 1.05) activity += 0.07;
          }
          const root = document.documentElement;
          root.style.setProperty('--neural-strength', Math.min(1.0, maxStr * 0.82).toFixed(3));
          root.style.setProperty('--neural-activity', Math.min(0.48, activity).toFixed(3));
          root.style.setProperty('--neural-phase', ((now * 0.012) % 360).toFixed(1));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!coverLightbox && !betaModalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (coverLightbox) setCoverLightbox(null);
      if (betaModalOpen) setBetaModalOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [coverLightbox, betaModalOpen]);

  useEffect(() => {
    try {
      const opened = localStorage.getItem('awakeOS_bookOpened') === 'true';
      const savedTraces = localStorage.getItem('awakeOS_bookTraces');
      const visitCount = parseInt(localStorage.getItem('awakeOS_visitCount') || '0', 10);
      setBookOpened(opened);
      if (savedTraces) setTraces(JSON.parse(savedTraces));
      if (visitCount > 1 || opened) setIsReturnVisit(true);
      localStorage.setItem('awakeOS_visitCount', String(visitCount + 1));
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      if (bookOpened) localStorage.setItem('awakeOS_bookOpened', 'true');
      if (traces.length > 0) localStorage.setItem('awakeOS_bookTraces', JSON.stringify(traces));
    } catch (_) {}
  }, [bookOpened, traces]);

  const handleBookRitualInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const container = substrateRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;

    if (!bookOpened) {
      setBookOpened(true);
      const sim = (window as any).__awakeNeuralSim;
      if (sim?.triggerCalmingWave) {
        sim.triggerCalmingWave(1.6);
        setTimeout(() => sim.triggerCalmingWave(1.15), 180);
        setTimeout(() => sim.triggerCalmingWave(0.9), 520);
      }
      const frame = document.getElementById('neural-book-frame');
      if (frame) {
        frame.style.transition = 'box-shadow 420ms cubic-bezier(0.23,1,0.32,1)';
        frame.style.boxShadow = '0 28px 68px -18px rgba(0,0,0,0.68), 0 10px 28px -10px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.115), inset 0 -1px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(64,240,216,0.32), 0 0 48px -6px rgba(0,229,192,0.38)';
        setTimeout(() => {
          if (frame) frame.style.boxShadow = '';
        }, 1350);
      }
    }

    if (bookOpened && traces.length < 9) {
      const newTrace: BookTrace = {
        x: Math.max(6, Math.min(94, x + (Math.random() - 0.5) * 1.6)),
        y: Math.max(8, Math.min(91, y + (Math.random() - 0.5) * 1.4)),
        t: Date.now()
      };
      if (Math.random() < 0.72 || traces.length < 2) {
        const updated = [...traces, newTrace].slice(-9);
        setTraces(updated);
      }
    }

    if (isReturnVisit && Math.random() < 0.38) {
      const sim = (window as any).__awakeNeuralSim;
      if (sim?.triggerCalmingWave) setTimeout(() => sim.triggerCalmingWave(0.55), 90);
    }
  };

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  const openBetaModal = () => {
    setBetaModalOpen(true);
  };

  const closeBetaModal = () => {
    setBetaModalOpen(false);
  };

  return (
    <>
      {/* FIXED GLASS NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <span className="text-2xl font-semibold tracking-[-0.04em]">Awake OS</span>
          </a>
          <div className="hidden md:flex items-center gap-9 text-sm">
            <a onClick={() => scrollTo('the-overload')} className="nav-link text-[#E0F7FF] text-[13px] tracking-[0.5px] font-medium cursor-pointer">The Premise</a>
            <a onClick={() => scrollTo('the-architecture')} className="nav-link text-[#E0F7FF] text-[13px] tracking-[0.5px] font-medium cursor-pointer">The Architecture</a>
            <a onClick={() => scrollTo('the-modules')} className="nav-link text-[#E0F7FF] text-[13px] tracking-[0.5px] font-medium cursor-pointer">The Modules</a>
            <a onClick={() => scrollTo('the-architect')} className="nav-link text-[#E0F7FF] text-[13px] tracking-[0.5px] font-medium cursor-pointer">The Architect</a>
          </div>
          <div className="hidden md:block">
            <button type="button" onClick={openBetaModal} className="btn-luminous px-5 py-2.5 rounded-full text-sm font-medium tracking-[-0.01em] cursor-pointer">
              Join Beta
            </button>
          </div>
          <div className="md:hidden">
            <button type="button" onClick={openBetaModal} className="btn-luminous px-4 py-2 rounded-full text-xs font-medium tracking-[-0.01em] cursor-pointer">
              Join Beta
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-[100svh] pt-20 flex items-center">
        <div className="absolute inset-0 space-background"></div>
        <div className="absolute inset-0 neural-grid"></div>
        <div className="absolute inset-0 terminal-scanlines"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(64,240,216,0.08)] via-transparent to-[rgba(26,58,77,0.18)]"></div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-8 sm:pt-12 pb-14 sm:pb-20">
          <div className="grid md:grid-cols-12 gap-y-10 gap-x-8 lg:gap-x-12 items-center">
            <div className="md:col-span-5 lg:col-span-5 max-w-[38rem] text-center md:text-left mx-auto md:mx-0 w-full">
              <div className="mb-4 sm:mb-5">
                <span className="hero-author-label label block">ARIEL URI</span>
              </div>
              <h1 className="display text-[2.75rem] sm:text-[3.5rem] md:text-[5.6rem] lg:text-[6.1rem] leading-[0.94] font-semibold tracking-[-0.055em] mb-5 sm:mb-7">
                Awake OS
              </h1>
              <p className="text-xl sm:text-2xl md:text-[1.72rem] leading-tight tracking-[-0.018em] text-[#E0F7FF] max-w-[38ch] mx-auto md:mx-0 mb-6 sm:mb-8">
                Upgrade your Mind. Reset your Hardware.
              </p>
              <p className="text-lg sm:text-xl md:text-[1.35rem] leading-snug tracking-[-0.015em] text-[#E0F7FF] max-w-[40ch] mx-auto md:mx-0 mb-4 sm:mb-5">
                You weren&apos;t built for this world — but you can{' '}
                <span className="text-[#40F0D8] font-medium">upgrade</span>.
              </p>
              <p className="text-sm sm:text-base md:text-[1.05rem] leading-relaxed tracking-[-0.01em] text-[#B8F5FF] max-w-[42ch] mx-auto md:mx-0 mb-8 sm:mb-10">
                End the <span className="text-[#40F0D8]">hidden stress loop</span> and reclaim{' '}
                <span className="text-[#40F0D8]">calm, clarity, and authentic presence</span> — no endless meditation needed.
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 mb-8 sm:mb-10">
                <div className="h-px w-9 bg-[rgba(64,240,216,0.55)] shadow-[0_0_8px_rgba(64,240,216,0.4)]"></div>
                <span className="label text-[10px] sm:text-xs text-[#B8F5FF] tracking-[3px]">THE HARDWARE RESET</span>
              </div>
              <button 
                type="button" 
                onClick={openBetaModal} 
                className="btn-luminous w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium tracking-[-0.01em] active:scale-[0.985] cursor-pointer"
              >
                <span className="sm:hidden">Join Beta</span>
                <span className="hidden sm:inline">Begin the Upgrade — Join Beta</span>
                <span className="text-lg opacity-80">→</span>
              </button>
              <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-[#B8F5FF] tracking-[0.8px]">Limited early access · No spam · Just results</p>
            </div>

            <div className="md:col-span-7 lg:col-span-7 mt-2 sm:mt-6 md:mt-0 flex justify-center md:justify-end">
              <button
                type="button"
                onClick={() => setCoverLightbox('front')}
                className="hero-cover-glow book-cover-glow book-cover-clickable relative z-[1] w-full max-w-[240px] sm:max-w-[300px] md:max-w-[380px] lg:max-w-[440px] flex items-center justify-center p-3 sm:p-4 md:p-5 cursor-zoom-in"
                aria-label="View Awake OS front cover enlarged"
              >
                <Image
                  src="/images/awake-os-cover.jpg"
                  alt="Awake OS — front cover"
                  width={1650}
                  height={2550}
                  className="pointer-events-none w-full h-auto max-h-[min(58vh,520px)] sm:max-h-[min(65vh,580px)] md:max-h-[min(72vh,640px)] object-contain rounded-md"
                  sizes="(max-width: 640px) 70vw, (max-width: 768px) 75vw, (max-width: 1024px) 42vw, 440px"
                  quality={85}
                  priority
                />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 z-20">
          <span className="label text-[10px] tracking-[3px] text-[#B8F5FF]">SCROLL TO BEGIN</span>
          <div className="w-px h-7 bg-gradient-to-b from-[rgba(64,240,216,0.65)] to-transparent shadow-[0_0_6px_rgba(64,240,216,0.3)]"></div>
        </div>
      </header>

      {/* THE BOOK */}
      <section id="the-book" className="relative py-14 sm:py-20 md:py-28 border-t border-[rgba(0,229,192,0.28)]">
        <div className="absolute inset-0 bg-[rgba(0,229,192,0.03)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="label text-[10px] sm:text-xs text-[#B8F5FF] tracking-[3.5px]">THE OPERATING MANUAL</span>
            <h2 className="section-title mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em]">The Book</h2>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-[#E0F7FF] text-sm sm:text-base md:text-lg leading-relaxed tracking-[-0.01em] px-1">
              The complete <span className="text-[#40F0D8]">Awake OS</span> protocol — mind as software, body as hardware — in one luminous field guide.
            </p>
          </div>
          <div className="grid md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
            <div className="md:col-span-7 lg:col-span-8 flex flex-col order-1">
              <p className="label text-[10px] text-[#40F0D8] tracking-[3px] mb-3 sm:mb-4 text-center md:text-left">FULL JACKET — FRONT &amp; BACK</p>
              <button
                type="button"
                onClick={() => setCoverLightbox('spread')}
                className="book-spread-glow book-cover-clickable h-[240px] sm:h-[340px] md:h-[400px] lg:h-[480px] w-full flex items-center justify-center p-2 sm:p-3 cursor-zoom-in flex-1"
                aria-label="View front and back cover spread enlarged"
              >
                <Image
                  src="/images/front-and-back-cover.jpg"
                  alt="Awake OS — front and back cover spread with full back-cover text"
                  width={3544}
                  height={2625}
                  className="pointer-events-none max-h-full max-w-full h-full w-auto object-contain rounded-md"
                  sizes="(max-width: 640px) 92vw, (max-width: 768px) 90vw, 58vw"
                  quality={82}
                />
              </button>
              <p className="mt-2 sm:mt-3 text-[10px] text-[#B8F5FF]/80 tracking-[1px] text-center md:text-left">Tap to read back-cover text</p>
            </div>
            <div className="md:col-span-5 lg:col-span-4 flex flex-col order-2">
              <p className="label text-[10px] text-[#40F0D8] tracking-[3px] mb-3 sm:mb-4 text-center md:text-left">NEURAL FIELD</p>
              <div id="neural-book-frame" className="book-frame neural-frame book-section-neural relative w-full flex-1 min-h-[220px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[400px] rounded-2xl p-2 sm:p-3">
                <div className="relative w-full h-full min-h-[200px] sm:min-h-[260px] rounded-xl overflow-hidden bg-[#081824] border border-[rgba(0,229,192,0.28)]">
                  <div
                    ref={substrateRef}
                    className="relative w-full h-full min-h-[190px] sm:min-h-[240px] cursor-grab active:cursor-grabbing touch-action-none overscroll-contain"
                    style={{ touchAction: 'none' }}
                    onClick={handleBookRitualInteraction}
                    onTouchStart={handleBookRitualInteraction}
                    role="img"
                    aria-label="Living neural substrate — drag to rotate, tap to calm"
                  >
                    <NeuralUniverse contained />
                    {traces.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none z-[3]">
                        {traces.map((trace, idx) => (
                          <div
                            key={idx}
                            className="absolute w-[3px] h-[3px] rounded-full bg-[#FF6B35] opacity-[0.17] shadow-[0_0_3px_rgba(255,107,53,0.35)]"
                            style={{
                              left: `${trace.x}%`,
                              top: `${trace.y}%`,
                              transform: `translate(-50%, -50%) rotate(${(trace.t % 17) - 8}deg)`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="book-etch" />
                  <div className="neural-vignette absolute inset-0 pointer-events-none rounded-xl" />
                  <div className="neural-hint neural-hint-compact absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none select-none">
                    DRAG — TAP
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[10px] text-[#B8F5FF]/80 tracking-[1px] text-center md:text-left">Drag to rotate · Tap to calm</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE OVERLOAD */}
      <section id="the-overload" className="relative py-14 sm:py-20 md:py-24 border-t border-[rgba(0,229,192,0.28)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 text-center">
          <h2 className="display text-[2.25rem] sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.05em] leading-none mb-7 sm:mb-9">
            Your System is Overloaded.
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl text-[#E0F7FF] tracking-[-0.012em] leading-tight">
              Modern life is running corrupt scripts in your mind. Endless tabs, decision fatigue,
              and chronic stress are consuming your bandwidth. It's time for a system reboot.
            </p>
          </div>
        </div>
      </section>

      {/* THE ARCHITECTURE */}
      <section id="the-architecture" className="relative py-16 md:py-20 bg-[rgba(0,229,192,0.05)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-12 md:mb-16">
            <span className="label text-xs text-[#B8F5FF] tracking-[3.5px]">THE FOUNDATION</span>
            <h3 className="section-title mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.035em]">The Architecture</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="arch-panel glass-strong rounded-3xl p-10 lg:p-12 accent-cyan">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-[#40F0D8]"></div>
                <span className="label text-xs text-[#40F0D8] tracking-[3px]">SOFTWARE LAYER</span>
              </div>
              <h4 className="text-4xl font-semibold tracking-[-0.03em] mb-6">Mind = OS</h4>
              <div className="space-y-5 text-[#E0F7FF] text-[15.2px] leading-relaxed">
                <p>Your mind is running outdated software. Constant notifications and infinite feeds are consuming your cognitive resources.</p>
                <p>Awake OS teaches you to audit your internal algorithms, reclaim mental bandwidth, and install cleaner protocols for focus and presence.</p>
              </div>
            </div>
            <div className="arch-panel glass-strong rounded-3xl p-10 lg:p-12 accent-gold">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]"></div>
                <span className="label text-xs text-[#FF6B35] tracking-[3px]">PHYSICAL LAYER</span>
              </div>
              <h4 className="text-4xl font-semibold tracking-[-0.03em] mb-6">Body = Hardware</h4>
              <div className="space-y-5 text-[#E0F7FF] text-[15.2px] leading-relaxed">
                <p>Your nervous system is the hardware running the operating system. Chronic stress has left it in a permanent state of high alert.</p>
                <p>Through precise 60-second somatic resets, Awake OS shows you how to ground the hardware and restore natural regulation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE MODULES */}
      <section id="the-modules" className="relative py-20 md:py-24 border-t border-[rgba(0,229,192,0.28)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="label text-xs text-[#B8F5FF] tracking-[3.5px]">SYSTEM PROTOCOLS</span>
              <h3 className="section-title mt-2 text-4xl md:text-5xl font-semibold tracking-[-0.03em]">The Modules</h3>
            </div>
            <p className="max-w-xs text-[#E0F7FF] text-sm md:text-[13.5px] md:text-right tracking-[-0.005em]">
              Twelve precise protocols for auditing and rewriting your internal operating system.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="module-card glass rounded-2xl p-8 border border-[rgba(0,229,192,0.28)]">
              <div className="text-[#40F0D8] text-xs tracking-[4px] font-medium mb-5">MODULE 01</div>
              <h5 className="text-2xl font-semibold tracking-[-0.025em] leading-tight mb-4">The Kernel Panic</h5>
              <p className="text-[#E0F7FF] text-sm leading-relaxed">Recognizing when your system has crashed and how to perform an emergency shutdown before permanent damage occurs.</p>
            </div>
            <div className="module-card glass rounded-2xl p-8 border border-[rgba(0,229,192,0.28)]">
              <div className="text-[#40F0D8] text-xs tracking-[4px] font-medium mb-5">MODULE 02</div>
              <h5 className="text-2xl font-semibold tracking-[-0.025em] leading-tight mb-4">Safe Mode</h5>
              <p className="text-[#E0F7FF] text-sm leading-relaxed">Booting into a minimal state where only essential processes run, allowing you to isolate and remove corrupted mental patterns.</p>
            </div>
            <div className="module-card glass rounded-2xl p-8 border border-[rgba(0,229,192,0.28)]">
              <div className="text-[#40F0D8] text-xs tracking-[4px] font-medium mb-5">MODULE 03</div>
              <h5 className="text-2xl font-semibold tracking-[-0.025em] leading-tight mb-4">Task Manager</h5>
              <p className="text-[#E0F7FF] text-sm leading-relaxed">Identifying which background processes are consuming your attention and how to forcefully end them with precision.</p>
            </div>
          </div>
          <p className="text-center text-xs text-[#B8F5FF] tracking-[2px] mt-10">+ 9 MORE PROTOCOLS IN THE COMPLETE SYSTEM</p>
        </div>
      </section>

      {/* THE ARCHITECT */}
      <section id="the-architect" className="relative py-20 md:py-24 bg-[rgba(0,229,192,0.05)] border-t border-[rgba(0,229,192,0.28)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-12 gap-x-12 items-center">
            <div className="md:col-span-4 lg:col-span-3 mb-8 md:mb-0 flex justify-center md:justify-start">
              <button
                type="button"
                onClick={() => setCoverLightbox('logo')}
                className="author-portrait author-portrait-clickable glass-strong rounded-2xl w-full max-w-[148px] aspect-square flex items-center justify-center relative p-2.5 cursor-zoom-in"
                aria-label="View Somatic Labs Publishing logo enlarged"
              >
                <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[rgba(64,240,216,0.06)] via-transparent to-[rgba(255,107,53,0.03)] pointer-events-none" />
                <Image
                  src="/images/logo-somatic-labs.png"
                  alt="Somatic Labs Publishing"
                  width={148}
                  height={148}
                  className="publisher-logo author-portrait-logo pointer-events-none relative z-[1] w-[88%] h-[88%] object-contain opacity-[0.95]"
                  sizes="148px"
                  quality={90}
                />
              </button>
            </div>
            <div className="md:col-span-8 lg:col-span-9">
              <span className="label text-xs text-[#B8F5FF] tracking-[3.5px]">THE CREATOR</span>
              <h3 className="section-title mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.03em] mb-8">Ariel Uri</h3>
              <div className="max-w-[46ch] text-lg text-[#E0F7FF] leading-relaxed tracking-[-0.005em]">
                Ariel Uri engineered the Awake OS protocol not as a mystic, but as a system architect for the human condition.
              </div>
              <div className="mt-8 text-sm text-[#B8F5FF]">
                After years studying the intersection of neuroscience, systems thinking, and contemplative practice,
                he built a practical framework for upgrading the human operating system.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="join-beta" className="relative py-14 sm:py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12">
          <div className="final-cta rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center border border-[rgba(0,229,192,0.28)]">
            <span className="label text-[10px] sm:text-xs tracking-[3.5px] text-[#B8F5FF]">BEGIN THE UPGRADE</span>
            <h2 className="display mt-4 sm:mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.048em] leading-none">
              Ready to reboot?
            </h2>
            <p className="mt-4 sm:mt-6 max-w-md mx-auto text-[#E0F7FF] text-base sm:text-lg tracking-[-0.01em]">
              Limited early access to the complete Awake OS protocol is now open.
            </p>
            <button type="button" onClick={openBetaModal} className="btn-luminous mt-7 sm:mt-9 w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base tracking-[-0.01em] active:scale-[0.985]">
              Join the Beta
            </button>
            <div className="mt-8 text-xs text-[#B8F5FF] tracking-[1px]">No spam. No endless meditation. Just results.</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="site-footer border-t border-[rgba(0,229,192,0.28)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 md:py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="site-footer-copy text-xs sm:text-[0.8rem] text-[#B8F5FF] leading-relaxed max-w-xl">
              Copyright © 2026 Ariel Uri / Somatic Labs Publishing. All rights reserved.
            </p>
            <Link
              href="/privacy"
              className="site-footer-link text-xs sm:text-[0.8rem] text-[#40F0D8] hover:text-[#E0F7FF] transition-colors"
            >
              Privacy &amp; Legal
            </Link>
          </div>
        </div>
      </footer>

      {/* NOVO MODAL - Join Beta com Google Sheets */}
      <JoinBetaModal 
        isOpen={betaModalOpen} 
        onClose={closeBetaModal} 
      />

      {/* Cover Lightbox */}
      {coverLightbox && (
        <div
          className="cover-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxAssets[coverLightbox].title}
          onClick={() => setCoverLightbox(null)}
        >
          <div className="cover-lightbox-backdrop" aria-hidden="true" />
          <div className="cover-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="cover-lightbox-close"
              onClick={() => setCoverLightbox(null)}
              aria-label="Close enlarged view"
            >
              ×
            </button>
            <p className="cover-lightbox-title">{lightboxAssets[coverLightbox].title}</p>
            <img
              src={lightboxAssets[coverLightbox].src}
              alt={lightboxAssets[coverLightbox].alt}
              className={`cover-lightbox-image${coverLightbox === 'logo' ? ' cover-lightbox-image-logo' : ''}`}
            />
            <p className="cover-lightbox-hint">Press Escape or click outside to close</p>
          </div>
        </div>
      )}
    </>
  );
}