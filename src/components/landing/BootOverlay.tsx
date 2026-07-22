'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { Dictionary } from '@/i18n/get-dictionary';

interface BootOverlayProps {
  open: boolean;
  dict: Dictionary['boot'];
}

export default function BootOverlay({ open, dict }: BootOverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="boot-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050f16]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
          aria-hidden={!open}
        >
          <div className="absolute inset-0 space-background opacity-80" />
          <div className="absolute inset-0 terminal-scanlines" />
          <motion.div
            className="relative z-10 text-center px-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-[#40F0D8] mb-6">
              {dict.status}
            </p>
            <div className="boot-bar mx-auto mb-6 h-[2px] w-48 sm:w-64 overflow-hidden rounded-full bg-[rgba(64,240,216,0.15)]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#40F0D8] via-[#00E5C0] to-[#FF6B35]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.15, ease: [0.23, 1, 0.32, 1] }}
              />
            </div>
            <div className="space-y-1.5 font-mono text-[10px] sm:text-[11px] tracking-[0.12em] text-[#B8F5FF]/85">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {dict.line1}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                {dict.line2}
              </motion.p>
              <motion.p
                className="text-[#40F0D8]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                {dict.line3}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
