'use client';

import { motion } from 'framer-motion';
import type { Dictionary } from '@/i18n/get-dictionary';
import Reveal from './Reveal';
import AmbientParticles from './AmbientParticles';

interface FinalCtaProps {
  dict: Dictionary['finalCta'];
  onCta: () => void;
}

export default function FinalCta({ dict, onCta }: FinalCtaProps) {
  return (
    <section id="join-prelaunch" className="relative py-16 sm:py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,229,192,0.06)] to-[rgba(255,107,53,0.05)]" />
        <AmbientParticles count={36} className="opacity-70" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
        <Reveal>
          <div className="final-cta final-cta-epic rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center border border-[rgba(0,229,192,0.32)] relative overflow-hidden">
            <div className="final-cta-ring" aria-hidden />
            <div className="final-cta-ring final-cta-ring-delay" aria-hidden />
            <div className="final-cta-grid" aria-hidden />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(64,240,216,0.35)] bg-[rgba(8,24,36,0.55)] px-3 py-1 mb-5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#40F0D8] animate-pulse shadow-[0_0_8px_#40F0D8]" />
                <span className="label text-[10px] tracking-[0.28em] text-[#40F0D8]">
                  {dict.status}
                </span>
              </div>

              <span className="label block text-[10px] sm:text-xs tracking-[3.5px] text-[#B8F5FF]">
                {dict.eyebrow}
              </span>

              <h2 className="display mt-4 sm:mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.048em] leading-none">
                {dict.title}
              </h2>
              <p className="mt-3 text-xl sm:text-2xl md:text-3xl font-medium tracking-[-0.03em] text-[#40F0D8] text-shadow-cyan">
                {dict.subtitle}
              </p>

              <p className="mt-5 sm:mt-6 max-w-lg mx-auto text-[#E0F7FF] text-base sm:text-lg tracking-[-0.01em]">
                {dict.body}
              </p>

              <p className="mt-4 font-mono text-[11px] sm:text-xs tracking-[0.22em] text-[#FF6B35]">
                {dict.launchNote}
              </p>

              <ul className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {[dict.perk1, dict.perk2, dict.perk3].map((perk) => (
                  <li
                    key={perk}
                    className="rounded-full border border-[rgba(64,240,216,0.22)] bg-[rgba(8,24,36,0.45)] px-3 py-1.5 text-[11px] sm:text-xs text-[#B8F5FF] tracking-wide"
                  >
                    {perk}
                  </li>
                ))}
              </ul>

              <motion.button
                type="button"
                onClick={onCta}
                className="btn-luminous btn-epic mt-8 sm:mt-10 w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-4 sm:py-5 rounded-full font-semibold text-sm sm:text-base tracking-[-0.01em]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {dict.button}
                <span className="text-lg opacity-80" aria-hidden>
                  →
                </span>
              </motion.button>

              <div className="mt-8 text-xs text-[#B8F5FF] tracking-[1px]">{dict.trust}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
