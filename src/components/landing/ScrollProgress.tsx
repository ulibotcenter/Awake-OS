'use client';

import { motion } from 'framer-motion';
import type { Dictionary } from '@/i18n/get-dictionary';

const STEPS = [
  { id: 'hero', key: 'boot' as const },
  { id: 'the-overload', key: 'diagnostic' as const },
  { id: 'the-architecture', key: 'architecture' as const },
  { id: 'the-modules', key: 'modules' as const },
  { id: 'the-architect', key: 'architect' as const },
  { id: 'join-prelaunch', key: 'install' as const },
];

interface ScrollProgressProps {
  activeId: string;
  dict: Dictionary['systemStatus'];
  onJump: (id: string) => void;
}

export default function ScrollProgress({ activeId, dict, onJump }: ScrollProgressProps) {
  const activeIndex = Math.max(
    0,
    STEPS.findIndex((s) => s.id === activeId),
  );

  return (
    <div className="system-rail hidden lg:flex fixed left-5 top-1/2 -translate-y-1/2 z-40 flex-col gap-3">
      {STEPS.map((step, i) => {
        const active = i === activeIndex || (activeId === 'hero' && i === 0);
        const done = i < activeIndex;
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => onJump(step.id === 'hero' ? 'top' : step.id)}
            className="group flex items-center gap-2 text-left"
            aria-current={active ? 'step' : undefined}
          >
            <span
              className={`relative flex h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                active
                  ? 'border-[#40F0D8] bg-[#40F0D8] shadow-[0_0_12px_rgba(64,240,216,0.8)] scale-110'
                  : done
                    ? 'border-[#40F0D8]/60 bg-[#40F0D8]/40'
                    : 'border-[rgba(64,240,216,0.28)] bg-transparent'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="rail-pulse"
                  className="absolute inset-[-4px] rounded-full border border-[#40F0D8]/35"
                />
              )}
            </span>
            <span
              className={`label text-[9px] tracking-[0.18em] transition-colors duration-300 ${
                active ? 'text-[#40F0D8]' : 'text-[#B8F5FF]/45 group-hover:text-[#B8F5FF]'
              }`}
            >
              {dict[step.key]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
