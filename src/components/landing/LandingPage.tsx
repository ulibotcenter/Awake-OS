'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { NeuralMood } from '@/lib/neural-api';
import { setNeuralMood, triggerNeuralWave } from '@/lib/neural-api';
import PreLaunchModal from '@/components/PreLaunchModal';
import SiteNav from './SiteNav';
import FloatingBook from './FloatingBook';
import BootOverlay from './BootOverlay';
import ScrollProgress from './ScrollProgress';
import AmbientParticles from './AmbientParticles';
import CoverLightbox, { type LightboxKey } from './CoverLightbox';
import FinalCta from './FinalCta';
import Reveal from './Reveal';

const NeuralUniverse = dynamic(() => import('@/components/three/NeuralUniverse'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[200px] bg-[#081824] flex items-center justify-center">
      <div
        className="w-7 h-7 rounded-full border border-[rgba(64,240,216,0.25)] border-t-[#40F0D8] animate-spin"
        aria-hidden
      />
    </div>
  ),
});

interface BookTrace {
  x: number;
  y: number;
  t: number;
}

interface LandingPageProps {
  locale: Locale;
  dict: Dictionary;
}

const NAV_HEIGHT = 80;

const SECTION_MOOD: Record<string, NeuralMood> = {
  hero: 'boot',
  'the-book': 'calm',
  'the-overload': 'overload',
  'the-architecture': 'stable',
  'the-modules': 'focus',
  'the-architect': 'calm',
  'join-prelaunch': 'install',
};

export default function LandingPage({ locale, dict }: LandingPageProps) {
  const [bookOpened, setBookOpened] = useState(false);
  const [traces, setTraces] = useState<BookTrace[]>([]);
  const [isReturnVisit, setIsReturnVisit] = useState(false);
  const [coverLightbox, setCoverLightbox] = useState<LightboxKey | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [booting, setBooting] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [heroMood, setHeroMood] = useState<NeuralMood>('boot');
  const substrateRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const scrollTo = useCallback((id: string) => {
    if (id === 'top' || id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('awake_booted') === '1') {
        setBooting(false);
        return;
      }
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => {
      setBooting(false);
      try {
        sessionStorage.setItem('awake_booted', '1');
      } catch {
        /* ignore */
      }
      triggerNeuralWave(1.4);
      setNeuralMood('calm');
      setHeroMood('calm');
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (booting) return;
    const t = setTimeout(() => triggerNeuralWave(0.65), 400);
    return () => clearTimeout(t);
  }, [booting]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      if (now - last > 160) {
        last = now;
        const sim = (window as Window & {
          __awakeNeuralSim?: {
            getRenderData?: () => {
              specialNodes?: [number, number, number, number][];
            };
          };
        }).__awakeNeuralSim;
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
          root.style.setProperty(
            '--neural-activity',
            Math.min(0.48, Math.max(activity, parseFloat(getComputedStyle(root).getPropertyValue('--neural-activity') || '0.18'))).toFixed(3),
          );
          root.style.setProperty('--neural-phase', ((now * 0.012) % 360).toFixed(1));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!coverLightbox && !modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (coverLightbox) setCoverLightbox(null);
      if (modalOpen) setModalOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [coverLightbox, modalOpen]);

  useEffect(() => {
    try {
      const opened = localStorage.getItem('awakeOS_bookOpened') === 'true';
      const savedTraces = localStorage.getItem('awakeOS_bookTraces');
      const visitCount = parseInt(localStorage.getItem('awakeOS_visitCount') || '0', 10);
      setBookOpened(opened);
      if (savedTraces) setTraces(JSON.parse(savedTraces));
      if (visitCount > 1 || opened) setIsReturnVisit(true);
      localStorage.setItem('awakeOS_visitCount', String(visitCount + 1));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (bookOpened) localStorage.setItem('awakeOS_bookOpened', 'true');
      if (traces.length > 0) localStorage.setItem('awakeOS_bookTraces', JSON.stringify(traces));
    } catch {
      /* ignore */
    }
  }, [bookOpened, traces]);

  useEffect(() => {
    const ids = [
      'hero',
      'the-book',
      'the-overload',
      'the-architecture',
      'the-modules',
      'the-architect',
      'join-prelaunch',
    ];
    const elements = ids
      .map((id) => ({ id, el: id === 'hero' ? document.getElementById('hero-section') : document.getElementById(id) }))
      .filter((x): x is { id: string; el: HTMLElement } => !!x.el);

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible[0]) return;
        const id =
          visible[0].target.id === 'hero-section'
            ? 'hero'
            : visible[0].target.id;
        setActiveSection(id);
        const mood = SECTION_MOOD[id] ?? 'calm';
        setNeuralMood(mood);
        if (id === 'hero' || id === 'the-book') setHeroMood(mood === 'boot' ? 'calm' : mood);
        if (id === 'the-overload') triggerNeuralWave(0.35);
        if (id === 'the-architecture') triggerNeuralWave(0.85);
        if (id === 'join-prelaunch') triggerNeuralWave(1.05);
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: '-15% 0px -35% 0px' },
    );

    elements.forEach(({ el }) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

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
      triggerNeuralWave(1.6);
      setTimeout(() => triggerNeuralWave(1.15), 180);
      setTimeout(() => triggerNeuralWave(0.9), 520);
      const frame = document.getElementById('neural-book-frame');
      if (frame) {
        frame.style.transition = 'box-shadow 420ms cubic-bezier(0.23,1,0.32,1)';
        frame.style.boxShadow =
          '0 28px 68px -18px rgba(0,0,0,0.68), 0 10px 28px -10px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.115), inset 0 -1px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(64,240,216,0.32), 0 0 48px -6px rgba(0,229,192,0.38)';
        setTimeout(() => {
          if (frame) frame.style.boxShadow = '';
        }, 1350);
      }
    }

    if (bookOpened && traces.length < 9) {
      const newTrace: BookTrace = {
        x: Math.max(6, Math.min(94, x + (Math.random() - 0.5) * 1.6)),
        y: Math.max(8, Math.min(91, y + (Math.random() - 0.5) * 1.4)),
        t: Date.now(),
      };
      if (Math.random() < 0.72 || traces.length < 2) {
        setTraces((prev) => [...prev, newTrace].slice(-9));
      }
    }

    if (isReturnVisit && Math.random() < 0.38) {
      setTimeout(() => triggerNeuralWave(0.55), 90);
    }
  };

  const h = dict.hero;
  const book = dict.book;
  const modules = dict.modules;

  return (
    <>
      <BootOverlay open={booting} dict={dict.boot} />
      <SiteNav dict={dict.nav} locale={locale} onCta={openModal} onScrollTo={scrollTo} />
      <ScrollProgress activeId={activeSection} dict={dict.systemStatus} onJump={scrollTo} />

      {/* HERO — immersive 3D */}
      <header
        id="hero-section"
        className="relative min-h-[100svh] pt-20 flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <NeuralUniverse
            contained={false}
            interactive
            mood={heroMood}
            enableZoom={false}
            className="opacity-[0.72] sm:opacity-80"
          />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,31,46,0.55)] via-[rgba(11,31,46,0.25)] to-[rgba(11,31,46,0.88)]" />
          <div className="absolute inset-0 neural-grid opacity-40" />
          <div className="absolute inset-0 terminal-scanlines" />
          <AmbientParticles count={42} className="opacity-60" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 pt-8 sm:pt-12 pb-14 sm:pb-20 w-full pointer-events-none">
          <div className="grid md:grid-cols-12 gap-y-10 gap-x-8 lg:gap-x-12 items-center">
            <div className="md:col-span-5 lg:col-span-5 max-w-[38rem] text-center md:text-left mx-auto md:mx-0 w-full pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: booting ? 0 : 1, y: booting ? 20 : 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="mb-4 sm:mb-5">
                  <span className="hero-author-label label block">{h.author}</span>
                </div>
                <h1 className="display text-[2.75rem] sm:text-[3.5rem] md:text-[5.6rem] lg:text-[6.1rem] leading-[0.94] font-semibold tracking-[-0.055em] mb-3 sm:mb-4">
                  {h.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-[1.45rem] leading-snug tracking-[-0.02em] text-[#40F0D8] max-w-[36ch] mx-auto md:mx-0 mb-4 sm:mb-5 font-medium">
                  {h.subtitle}
                </p>
                <p className="text-xl sm:text-2xl md:text-[1.72rem] leading-tight tracking-[-0.018em] text-[#E0F7FF] max-w-[38ch] mx-auto md:mx-0 mb-5 sm:mb-6">
                  {h.tagline}
                </p>
                <p className="text-lg sm:text-xl md:text-[1.25rem] leading-snug tracking-[-0.015em] text-[#E0F7FF] max-w-[40ch] mx-auto md:mx-0 mb-4 sm:mb-5">
                  {h.lead}{' '}
                  <span className="text-[#40F0D8] font-medium">{h.leadHighlight}</span>.
                </p>
                <p className="text-sm sm:text-base md:text-[1.05rem] leading-relaxed tracking-[-0.01em] text-[#B8F5FF] max-w-[42ch] mx-auto md:mx-0 mb-8 sm:mb-10">
                  {h.bodyBefore} <span className="text-[#40F0D8]">{h.bodyHighlight1}</span>{' '}
                  {h.bodyMid} <span className="text-[#40F0D8]">{h.bodyHighlight2}</span>{' '}
                  {h.bodyAfter}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 mb-8 sm:mb-10">
                  <div className="h-px w-9 bg-[rgba(64,240,216,0.55)] shadow-[0_0_8px_rgba(64,240,216,0.4)]" />
                  <span className="label text-[10px] sm:text-xs text-[#B8F5FF] tracking-[3px]">
                    {h.badge}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={openModal}
                  className="btn-luminous w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium tracking-[-0.01em] active:scale-[0.985] cursor-pointer"
                >
                  <span className="sm:hidden">{h.ctaMobile}</span>
                  <span className="hidden sm:inline">{h.cta}</span>
                  <span className="text-lg opacity-80" aria-hidden>
                    →
                  </span>
                </button>
                <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-[#B8F5FF] tracking-[0.8px]">
                  {h.trust}
                </p>
              </motion.div>
            </div>

            <div className="md:col-span-7 lg:col-span-7 mt-2 sm:mt-6 md:mt-0 flex justify-center md:justify-end pointer-events-auto">
              <FloatingBook
                src="/images/awake-os-cover.jpg"
                alt={h.coverAlt}
                ariaLabel={h.coverAria}
                onOpen={() => setCoverLightbox('front')}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollTo('the-book')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 z-20 bg-transparent border-0 cursor-pointer pointer-events-auto"
        >
          <span className="label text-[10px] tracking-[3px] text-[#B8F5FF]">{h.scroll}</span>
          <div className="w-px h-7 bg-gradient-to-b from-[rgba(64,240,216,0.65)] to-transparent shadow-[0_0_6px_rgba(64,240,216,0.3)]" />
        </button>
      </header>

      {/* THE BOOK */}
      <section
        id="the-book"
        className="relative py-14 sm:py-20 md:py-28 border-t border-[rgba(0,229,192,0.28)]"
      >
        <div className="absolute inset-0 bg-[rgba(0,229,192,0.03)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <Reveal className="text-center mb-10 sm:mb-12 md:mb-16">
            <span className="label text-[10px] sm:text-xs text-[#B8F5FF] tracking-[3.5px]">
              {book.label}
            </span>
            <h2 className="section-title mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.035em]">
              {book.title}
            </h2>
            <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-[#E0F7FF] text-sm sm:text-base md:text-lg leading-relaxed tracking-[-0.01em] px-1">
              {book.body} <span className="text-[#40F0D8]">{book.bodyHighlight}</span>{' '}
              {book.bodyAfter}
            </p>
          </Reveal>
          <div className="grid md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 max-w-6xl mx-auto items-stretch">
            <Reveal className="md:col-span-7 lg:col-span-8 flex flex-col order-1" delay={0.05}>
              <p className="label text-[10px] text-[#40F0D8] tracking-[3px] mb-3 sm:mb-4 text-center md:text-left">
                {book.spreadLabel}
              </p>
              <button
                type="button"
                onClick={() => setCoverLightbox('spread')}
                className="book-spread-glow book-cover-clickable h-[240px] sm:h-[340px] md:h-[400px] lg:h-[480px] w-full flex items-center justify-center p-2 sm:p-3 cursor-zoom-in flex-1"
                aria-label={book.spreadAria}
              >
                <Image
                  src="/images/front-and-back-cover.jpg"
                  alt={book.spreadAlt}
                  width={3544}
                  height={2625}
                  className="pointer-events-none max-h-full max-w-full h-full w-auto object-contain rounded-md"
                  sizes="(max-width: 640px) 92vw, (max-width: 768px) 90vw, 58vw"
                  quality={82}
                />
              </button>
              <p className="mt-2 sm:mt-3 text-[10px] text-[#B8F5FF]/80 tracking-[1px] text-center md:text-left">
                {book.spreadHint}
              </p>
            </Reveal>
            <Reveal className="md:col-span-5 lg:col-span-4 flex flex-col order-2" delay={0.12}>
              <p className="label text-[10px] text-[#40F0D8] tracking-[3px] mb-3 sm:mb-4 text-center md:text-left">
                {book.neuralLabel}
              </p>
              <div
                id="neural-book-frame"
                className="book-frame neural-frame book-section-neural relative w-full flex-1 min-h-[220px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[400px] rounded-2xl p-2 sm:p-3"
              >
                <div className="relative w-full h-full min-h-[200px] sm:min-h-[260px] rounded-xl overflow-hidden bg-[#081824] border border-[rgba(0,229,192,0.28)]">
                  <div
                    ref={substrateRef}
                    className="relative w-full h-full min-h-[190px] sm:min-h-[240px] cursor-grab active:cursor-grabbing touch-action-none overscroll-contain"
                    style={{ touchAction: 'none' }}
                    onClick={handleBookRitualInteraction}
                    onTouchStart={handleBookRitualInteraction}
                    role="img"
                    aria-label={book.neuralAria}
                  >
                    <NeuralUniverse contained mood="calm" registerGlobal={false} />
                    {traces.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none z-[3]">
                        {traces.map((trace, idx) => (
                          <div
                            key={`${trace.t}-${idx}`}
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
                    {book.neuralHint}
                  </div>
                </div>
              </div>
              <p className="mt-3 text-[10px] text-[#B8F5FF]/80 tracking-[1px] text-center md:text-left">
                {book.neuralCaption}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OVERLOAD */}
      <section
        id="the-overload"
        className="relative py-14 sm:py-20 md:py-24 border-t border-[rgba(0,229,192,0.28)]"
      >
        <div className="live-filament absolute top-0 left-0 right-0" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 text-center">
          <Reveal>
            <h2 className="display text-[2.25rem] sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.05em] leading-none mb-7 sm:mb-9">
              {dict.overload.title}
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-2xl md:text-3xl text-[#E0F7FF] tracking-[-0.012em] leading-tight">
                {dict.overload.body}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section
        id="the-architecture"
        className="relative py-16 md:py-20 bg-[rgba(0,229,192,0.05)]"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <Reveal className="text-center mb-12 md:mb-16">
            <span className="label text-xs text-[#B8F5FF] tracking-[3.5px]">
              {dict.architecture.label}
            </span>
            <h3 className="section-title mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.035em]">
              {dict.architecture.title}
            </h3>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <Reveal delay={0.05}>
              <div className="arch-panel glass-strong rounded-3xl p-10 lg:p-12 accent-cyan h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#40F0D8]" />
                  <span className="label text-xs text-[#40F0D8] tracking-[3px]">
                    {dict.architecture.softwareLabel}
                  </span>
                </div>
                <h4 className="text-4xl font-semibold tracking-[-0.03em] mb-6">
                  {dict.architecture.softwareTitle}
                </h4>
                <div className="space-y-5 text-[#E0F7FF] text-[15.2px] leading-relaxed">
                  <p>{dict.architecture.softwareP1}</p>
                  <p>{dict.architecture.softwareP2}</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="arch-panel glass-strong rounded-3xl p-10 lg:p-12 accent-gold h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]" />
                  <span className="label text-xs text-[#FF6B35] tracking-[3px]">
                    {dict.architecture.hardwareLabel}
                  </span>
                </div>
                <h4 className="text-4xl font-semibold tracking-[-0.03em] mb-6">
                  {dict.architecture.hardwareTitle}
                </h4>
                <div className="space-y-5 text-[#E0F7FF] text-[15.2px] leading-relaxed">
                  <p>{dict.architecture.hardwareP1}</p>
                  <p>{dict.architecture.hardwareP2}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section
        id="the-modules"
        className="relative py-20 md:py-24 border-t border-[rgba(0,229,192,0.28)]"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="label text-xs text-[#B8F5FF] tracking-[3.5px]">{modules.label}</span>
              <h3 className="section-title mt-2 text-4xl md:text-5xl font-semibold tracking-[-0.03em]">
                {modules.title}
              </h3>
            </div>
            <p className="max-w-xs text-[#E0F7FF] text-sm md:text-[13.5px] md:text-right tracking-[-0.005em]">
              {modules.intro}
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: modules.m01Label, title: modules.m01Title, body: modules.m01Body },
              { label: modules.m02Label, title: modules.m02Title, body: modules.m02Body },
              { label: modules.m03Label, title: modules.m03Title, body: modules.m03Body },
            ].map((m, i) => (
              <Reveal key={m.label} delay={0.05 * i}>
                <div className="module-card glass rounded-2xl p-8 border border-[rgba(0,229,192,0.28)] h-full">
                  <div className="text-[#40F0D8] text-xs tracking-[4px] font-medium mb-5">
                    {m.label}
                  </div>
                  <h5 className="text-2xl font-semibold tracking-[-0.025em] leading-tight mb-4">
                    {m.title}
                  </h5>
                  <p className="text-[#E0F7FF] text-sm leading-relaxed">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <p className="text-center text-xs text-[#B8F5FF] tracking-[2px] mb-4">{modules.more}</p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-w-3xl mx-auto">
              {Array.from({ length: 9 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={openModal}
                  className="module-locked glass rounded-lg px-2 py-3 text-[9px] sm:text-[10px] tracking-[1.5px] text-[#B8F5FF] border border-[rgba(0,229,192,0.2)] hover:border-[#FF6B35]/50 hover:text-[#FF6B35] transition-colors cursor-pointer"
                >
                  M{String(i + 4).padStart(2, '0')} · {modules.locked}
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] text-[#B8F5FF]/75 tracking-[1px] mt-3">
              {modules.lockedHint}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ARCHITECT */}
      <section
        id="the-architect"
        className="relative py-20 md:py-24 bg-[rgba(0,229,192,0.05)] border-t border-[rgba(0,229,192,0.28)]"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <Reveal>
            <div className="grid md:grid-cols-12 gap-x-12 items-center">
              <div className="md:col-span-4 lg:col-span-3 mb-8 md:mb-0 flex justify-center md:justify-start">
                <button
                  type="button"
                  onClick={() => setCoverLightbox('logo')}
                  className="author-portrait author-portrait-clickable glass-strong rounded-2xl w-full max-w-[148px] aspect-square flex items-center justify-center relative p-2.5 cursor-zoom-in"
                  aria-label={dict.architect.logoAria}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[rgba(64,240,216,0.06)] via-transparent to-[rgba(255,107,53,0.03)] pointer-events-none" />
                  <Image
                    src="/images/logo-somatic-labs.png"
                    alt={dict.architect.logoAlt}
                    width={148}
                    height={148}
                    className="publisher-logo author-portrait-logo pointer-events-none relative z-[1] w-[88%] h-[88%] object-contain opacity-[0.95]"
                    sizes="148px"
                    quality={90}
                  />
                </button>
              </div>
              <div className="md:col-span-8 lg:col-span-9">
                <span className="label text-xs text-[#B8F5FF] tracking-[3.5px]">
                  {dict.architect.label}
                </span>
                <h3 className="section-title mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.03em] mb-8">
                  {dict.architect.title}
                </h3>
                <div className="max-w-[46ch] text-lg text-[#E0F7FF] leading-relaxed tracking-[-0.005em]">
                  {dict.architect.lead}
                </div>
                <div className="mt-8 text-sm text-[#B8F5FF]">{dict.architect.body}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FinalCta dict={dict.finalCta} onCta={openModal} />

      <footer className="site-footer border-t border-[rgba(0,229,192,0.28)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 md:py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="site-footer-copy text-xs sm:text-[0.8rem] text-[#B8F5FF] leading-relaxed max-w-xl">
              {dict.footer.copy}
            </p>
            <Link
              href={`/${locale}/privacy`}
              className="site-footer-link text-xs sm:text-[0.8rem] text-[#40F0D8] hover:text-[#E0F7FF] transition-colors"
            >
              {dict.footer.privacy}
            </Link>
          </div>
        </div>
      </footer>

      <PreLaunchModal isOpen={modalOpen} onClose={closeModal} dict={dict.modal} />
      <CoverLightbox
        active={coverLightbox}
        onClose={() => setCoverLightbox(null)}
        dict={dict.lightbox}
      />
    </>
  );
}
