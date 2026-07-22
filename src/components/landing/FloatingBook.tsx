'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FloatingBookProps {
  src: string;
  alt: string;
  ariaLabel: string;
  onOpen: () => void;
  width?: number;
  height?: number;
}

export default function FloatingBook({
  src,
  alt,
  ariaLabel,
  onOpen,
  width = 1801,
  height = 2702,
}: FloatingBookProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 120, damping: 18 });
  const glow = useSpring(useTransform(mx, [-0.5, 0.5], [0.85, 1.15]), {
    stiffness: 100,
    damping: 20,
  });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-label={ariaLabel}
      className="hero-cover-glow book-cover-glow book-cover-clickable floating-book relative z-[1] w-full max-w-[240px] sm:max-w-[300px] md:max-w-[380px] lg:max-w-[440px] flex items-center justify-center p-3 sm:p-4 md:p-5 cursor-zoom-in"
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <motion.div
        className="floating-book-aura absolute inset-0 rounded-xl pointer-events-none"
        style={{ opacity: glow }}
        aria-hidden
      />
      <motion.div
        className="relative w-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="pointer-events-none w-full h-auto max-h-[min(58vh,520px)] sm:max-h-[min(65vh,580px)] md:max-h-[min(72vh,640px)] object-contain rounded-md"
          sizes="(max-width: 640px) 70vw, (max-width: 768px) 75vw, (max-width: 1024px) 42vw, 440px"
          quality={85}
          priority
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-60"
          style={{ transform: 'translateZ(24px)' }}
          aria-hidden
        />
      </motion.div>
    </motion.button>
  );
}
