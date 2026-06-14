'use client';

import React, { useEffect, useState, useRef } from 'react';
import NeuralUniverse from '@/components/three/NeuralUniverse';

interface BookTrace {
  x: number;
  y: number;
  t: number;
}

export default function AwakeOS() {
  // V1 exact navbar offset for smooth scroll
  const NAV_HEIGHT = 80;

  // Initial calming wave on mount so the living codex feels immediately awake (V1 hybrid magic)
  useEffect(() => {
    const t = setTimeout(() => {
      const sim = (window as any).__awakeNeuralSim;
      if (sim?.triggerCalmingWave) sim.triggerCalmingWave(0.65);
    }, 920);
    return () => clearTimeout(t);
  }, []);

  // Reactive bridge for the living neural (scoped, low cost)
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

  /* Living Codex Ritual State — everything scoped inside the book-frame only */
  const [bookOpened, setBookOpened] = useState(false);
  const [traces, setTraces] = useState<BookTrace[]>([]);
  const [isReturnVisit, setIsReturnVisit] = useState(false);
  const substrateRef = useRef<HTMLDivElement>(null);

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
        frame.style.boxShadow = '0 28px 68px -18px rgba(0,0,0,0.68), 0 10px 28px -10px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.115), inset 0 -1px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(92,200,184,0.22), 0 0 38px -8px rgba(212,175,55,0.18)';
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

  // V1 exact smooth scroll
  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const elementPosition = target.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  const joinBeta = () => {
    const btns = document.querySelectorAll('button, a');
    btns.forEach((btn) => {
      if (btn.textContent && btn.textContent.includes('Beta')) {
        const original = btn.innerHTML;
        (btn as HTMLElement).style.pointerEvents = 'none';
        btn.innerHTML = 'Opening form...';
        setTimeout(() => {
          (btn as HTMLElement).style.pointerEvents = 'auto';
          btn.innerHTML = original;
        }, 1350);
      }
    });
  };

  return (
    <>
      {/* FIXED GLASS NAVBAR — EXACT V1 */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center">
            <span className="text-2xl font-semibold tracking-[-0.04em]">Awake OS</span>
          </a>

          <div className="hidden md:flex items-center gap-9 text-sm">
            <a onClick={() => scrollTo('the-overload')} className="nav-link text-[#CFFAFE] text-[13px] tracking-[0.5px] font-medium cursor-pointer">The Premise</a>
            <a onClick={() => scrollTo('the-architecture')} className="nav-link text-[#CFFAFE] text-[13px] tracking-[0.5px] font-medium cursor-pointer">The Architecture</a>
            <a onClick={() => scrollTo('the-modules')} className="nav-link text-[#CFFAFE] text-[13px] tracking-[0.5px] font-medium cursor-pointer">The Modules</a>
            <a onClick={() => scrollTo('the-architect')} className="nav-link text-[#CFFAFE] text-[13px] tracking-[0.5px] font-medium cursor-pointer">The Architect</a>
          </div>

          <div className="hidden md:block">
            <a onClick={() => scrollTo('join-beta')} className="btn-luminous px-5 py-2.5 rounded-full text-sm font-medium tracking-[-0.01em] cursor-pointer">
              Join Beta
            </a>
          </div>

          <div className="md:hidden">
            <a onClick={() => scrollTo('join-beta')} className="btn-luminous px-4 py-2 rounded-full text-xs font-medium tracking-[-0.01em] cursor-pointer">
              Join Beta
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — EXACT V1 STRUCTURE + LIVING NEURAL IN THE BOOK FRAME */}
      <header className="relative min-h-screen pt-20 flex items-center">
        {/* Multi-layer immersive background (V1 exact) */}
        <div className="absolute inset-0 space-background"></div>
        <div className="absolute inset-0 neural-grid"></div>
        <div className="absolute inset-0 terminal-scanlines"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(64,240,216,0.06)] via-transparent to-[rgba(30,41,55,0.15)]"></div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 pt-12 pb-20">
          <div className="grid md:grid-cols-12 gap-x-8 lg:gap-x-12 items-center">

            {/* Left: Text — EXACT V1 copy and layout (slightly narrower to give more room to the neural object) */}
            <div className="md:col-span-5 lg:col-span-5 max-w-[38rem]">
              <div className="mb-5">
                <span className="label inline-block text-xs text-[#A5F3FC] tracking-[4px]">ARIEL URI</span>
              </div>

              <h1 className="display text-[4rem] leading-[0.94] md:text-[5.6rem] lg:text-[6.1rem] font-semibold tracking-[-0.055em] mb-7">
                Awake OS
              </h1>

              <p className="text-2xl md:text-[1.72rem] leading-tight tracking-[-0.018em] text-[#CFFAFE] max-w-[38ch] mb-10">
                Upgrade your Mind.<br className="hidden md:block" /> Reset your Hardware.
              </p>

              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-9 bg-[rgba(64,240,216,0.55)] shadow-[0_0_8px_rgba(64,240,216,0.4)]"></div>
                <span className="label text-xs text-[#A5F3FC] tracking-[3px]">THE HARDWARE RESET</span>
              </div>

              <a onClick={() => scrollTo('join-beta')} className="btn-luminous inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium tracking-[-0.01em] active:scale-[0.985] cursor-pointer">
                Join the Beta
                <span className="text-lg opacity-80">→</span>
              </a>

              <p className="mt-4 text-xs text-[#A5F3FC] tracking-[0.8px]">Limited Early Access</p>
            </div>

            {/* Right: THE BOOK FRAME — larger for testing fluid/modern layout + living neural */}
            <div className="md:col-span-7 lg:col-span-7 mt-14 md:mt-0 flex justify-center md:justify-end">
              <div 
                id="neural-book-frame"
                className="book-frame neural-frame relative w-full max-w-[340px] md:max-w-[420px] lg:max-w-[480px] p-5 md:p-[18px] lg:p-[22px] rounded-3xl"
              >
                <div className="relative w-full aspect-[1.15] md:aspect-[1.08] rounded-2xl overflow-hidden bg-[#05080F] border border-[rgba(64,240,216,0.2)]">
                  {/* The living neural substrate — refined V2 inside V1 frame */}
                  <div 
                    ref={substrateRef}
                    className="relative w-full h-full cursor-grab active:cursor-grabbing touch-action-none overscroll-contain"
                    style={{ touchAction: 'none' }}
                    onClick={handleBookRitualInteraction}
                    onTouchStart={handleBookRitualInteraction}
                    role="img"
                    aria-label="The living codex: the neural substrate is the sacred pages of Awake OS. Thick teal filaments are the connective tissue of thought. Drag to turn the pages. Tap to perform the Hardware Reset."
                  >
                    <NeuralUniverse contained />

                    {/* Persistent marginalia — the reader writes in the book */}
                    {traces.length > 0 && (
                      <div className="absolute inset-0 pointer-events-none z-[3]">
                        {traces.map((trace, idx) => (
                          <div
                            key={idx}
                            className="absolute w-[3.5px] h-[3.5px] rounded-full bg-[#FF6B35] opacity-[0.17] shadow-[0_0_3px_rgba(255,107,53,0.35)]"
                            style={{
                              left: `${trace.x}%`,
                              top: `${trace.y}%`,
                              transform: `translate(-50%, -50%) rotate(${(trace.t % 17) - 8}deg)`,
                            }}
                          />
                        ))}
                        {traces.slice(0, 3).map((trace, idx) => (
                          <div
                            key={`stroke-${idx}`}
                            className="absolute bg-[#F0F9FF] opacity-[0.09]"
                            style={{
                              left: `${trace.x}%`,
                              top: `${trace.y + 0.8}%`,
                              width: `${2.8 + ((trace.t % 7) * 0.1)}px`,
                              height: '0.7px',
                              transform: `translate(-40%, -50%) rotate(${(trace.t % 31) - 14}deg)`,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Etched book tactility (spine + grain) — pointer-events none */}
                  <div className="book-etch" />

                  {/* Exact V1 inner vignette */}
                  <div className="neural-vignette absolute inset-0 pointer-events-none rounded-2xl" />

                  {/* V1 exact interaction hints */}
                  <div className="neural-hint absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full glass text-[9px] text-[#A5F3FC] tracking-[1.5px] pointer-events-none select-none hidden md:block">
                    DRAG TO ROTATE • TAP TO CALM
                  </div>
                  <div className="neural-hint absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2.5 py-px rounded-full glass text-[8px] text-[#A5F3FC] tracking-[1px] pointer-events-none select-none md:hidden">
                    DRAG • TAP
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll prompt — V1 exact */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 z-20">
          <span className="label text-[10px] tracking-[3px] text-[#A5F3FC]">SCROLL TO BEGIN</span>
          <div className="w-px h-7 bg-gradient-to-b from-[rgba(64,240,216,0.65)] to-transparent shadow-[0_0_6px_rgba(64,240,216,0.3)]"></div>
        </div>
      </header>

      {/* THE OVERLOAD — exact V1 */}
      <section id="the-overload" className="relative py-20 md:py-24 border-t border-[rgba(64,240,216,0.25)]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16 text-center">
          <h2 className="display text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.05em] leading-none mb-9">
            Your System is Overloaded.
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl text-[#CFFAFE] tracking-[-0.012em] leading-tight">
              Modern life is running corrupt scripts in your mind. Endless tabs, decision fatigue, 
              and chronic stress are consuming your bandwidth. It's time for a system reboot.
            </p>
          </div>
        </div>
      </section>

      {/* THE ARCHITECTURE — exact V1 */}
      <section id="the-architecture" className="relative py-16 md:py-20 bg-[rgba(64,240,216,0.03)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-12 md:mb-16">
            <span className="label text-xs text-[#A5F3FC] tracking-[3.5px]">THE FOUNDATION</span>
            <h3 className="section-title mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.035em]">The Architecture</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mind = OS */}
            <div className="arch-panel glass-strong rounded-3xl p-10 lg:p-12 accent-cyan">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-[#40F0D8]"></div>
                <span className="label text-xs text-[#40F0D8] tracking-[3px]">SOFTWARE LAYER</span>
              </div>
              <h4 className="text-4xl font-semibold tracking-[-0.03em] mb-6">Mind = OS</h4>
              <div className="space-y-5 text-[#CFFAFE] text-[15.2px] leading-relaxed">
                <p>Your mind is running outdated software. Constant notifications and infinite feeds are consuming your cognitive resources.</p>
                <p>Awake OS teaches you to audit your internal algorithms, reclaim mental bandwidth, and install cleaner protocols for focus and presence.</p>
              </div>
            </div>

            {/* Body = Hardware */}
            <div className="arch-panel glass-strong rounded-3xl p-10 lg:p-12 accent-gold">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]"></div>
                <span className="label text-xs text-[#FF6B35] tracking-[3px]">PHYSICAL LAYER</span>
              </div>
              <h4 className="text-4xl font-semibold tracking-[-0.03em] mb-6">Body = Hardware</h4>
              <div className="space-y-5 text-[#CFFAFE] text-[15.2px] leading-relaxed">
                <p>Your nervous system is the hardware running the operating system. Chronic stress has left it in a permanent state of high alert.</p>
                <p>Through precise 60-second somatic resets, Awake OS shows you how to ground the hardware and restore natural regulation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE MODULES — exact V1 */}
      <section id="the-modules" className="relative py-20 md:py-24 border-t border-[rgba(64,240,216,0.25)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="label text-xs text-[#A5F3FC] tracking-[3.5px]">SYSTEM PROTOCOLS</span>
              <h3 className="section-title mt-2 text-4xl md:text-5xl font-semibold tracking-[-0.03em]">The Modules</h3>
            </div>
            <p className="max-w-xs text-[#CFFAFE] text-sm md:text-[13.5px] md:text-right tracking-[-0.005em]">
              Twelve precise protocols for auditing and rewriting your internal operating system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="module-card glass rounded-2xl p-8 border border-[rgba(64,240,216,0.25)]">
              <div className="text-[#40F0D8] text-xs tracking-[4px] font-medium mb-5">MODULE 01</div>
              <h5 className="text-2xl font-semibold tracking-[-0.025em] leading-tight mb-4">The Kernel Panic</h5>
              <p className="text-[#CFFAFE] text-sm leading-relaxed">Recognizing when your system has crashed and how to perform an emergency shutdown before permanent damage occurs.</p>
            </div>
            <div className="module-card glass rounded-2xl p-8 border border-[rgba(64,240,216,0.25)]">
              <div className="text-[#40F0D8] text-xs tracking-[4px] font-medium mb-5">MODULE 02</div>
              <h5 className="text-2xl font-semibold tracking-[-0.025em] leading-tight mb-4">Safe Mode</h5>
              <p className="text-[#CFFAFE] text-sm leading-relaxed">Booting into a minimal state where only essential processes run, allowing you to isolate and remove corrupted mental patterns.</p>
            </div>
            <div className="module-card glass rounded-2xl p-8 border border-[rgba(64,240,216,0.25)]">
              <div className="text-[#40F0D8] text-xs tracking-[4px] font-medium mb-5">MODULE 03</div>
              <h5 className="text-2xl font-semibold tracking-[-0.025em] leading-tight mb-4">Task Manager</h5>
              <p className="text-[#CFFAFE] text-sm leading-relaxed">Identifying which background processes are consuming your attention and how to forcefully end them with precision.</p>
            </div>
          </div>

          <p className="text-center text-xs text-[#A5F3FC] tracking-[2px] mt-10">+ 9 MORE PROTOCOLS IN THE COMPLETE SYSTEM</p>
        </div>
      </section>

      {/* THE ARCHITECT — exact V1 */}
      <section id="the-architect" className="relative py-20 md:py-24 bg-[rgba(64,240,216,0.03)] border-t border-[rgba(64,240,216,0.25)]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-12 gap-x-12 items-center">
            <div className="md:col-span-5 mb-10 md:mb-0">
              <div className="glass-strong rounded-3xl aspect-[4/3.15] flex items-center justify-center relative overflow-hidden border border-[rgba(64,240,216,0.25)]">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(64,240,216,0.06)] via-transparent to-[rgba(255,107,53,0.04)]"></div>
                <div className="relative text-center">
                  <div className="mx-auto w-20 h-20 rounded-full border border-[rgba(64,240,216,0.25)] flex items-center justify-center mb-5">
                    <span className="text-3xl font-light tracking-[-1px] text-[#F0F9FF]/70">AU</span>
                  </div>
                  <div className="text-xs text-[#A5F3FC] tracking-[3px]">AUTHOR PORTRAIT</div>
                  <div className="text-[10px] text-[#A5F3FC]/70 mt-1">Replace with real photo</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <span className="label text-xs text-[#A5F3FC] tracking-[3.5px]">THE CREATOR</span>
              <h3 className="section-title mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.03em] mb-8">Ariel Uri</h3>

              <div className="max-w-[46ch] text-lg text-[#CFFAFE] leading-relaxed tracking-[-0.005em]">
                Ariel Uri engineered the Awake OS protocol not as a mystic, but as a system architect for the human condition.
              </div>
              <div className="mt-8 text-sm text-[#A5F3FC]">
                After years studying the intersection of neuroscience, systems thinking, and contemplative practice, 
                he built a practical framework for upgrading the human operating system.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA — exact V1 */}
      <section id="join-beta" className="relative py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="final-cta rounded-3xl p-12 md:p-16 text-center border border-[rgba(64,240,216,0.25)]">
            <span className="label text-xs tracking-[3.5px] text-[#A5F3FC]">BEGIN THE UPGRADE</span>
            <h2 className="display mt-5 text-5xl md:text-6xl font-semibold tracking-[-0.048em] leading-none">
              Ready to reboot?
            </h2>
            <p className="mt-6 max-w-md mx-auto text-[#CFFAFE] text-lg tracking-[-0.01em]">
              Limited early access to the complete Awake OS protocol is now open.
            </p>

            <button onClick={joinBeta} className="btn-luminous mt-9 inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-base tracking-[-0.01em] active:scale-[0.985]">
              Join the Beta
            </button>

            <div className="mt-8 text-xs text-[#A5F3FC] tracking-[1px]">No spam. No endless meditation. Just results.</div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-y-3 text-xs text-[#A5F3FC] px-1">
            <div>© Ariel Uri. All rights reserved.</div>
            <div className="flex gap-5">
              <a href="#" className="hover:text-[#CFFAFE] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#CFFAFE] transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
