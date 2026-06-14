import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'alt';
}

export function Section({ children, className = '', id, variant = 'default' }: SectionProps) {
  const bg = variant === 'alt' ? 'bg-[#0a0a0a]' : '';

  return (
    <section
      id={id}
      className={`pt-20 md:pt-24 px-6 ${bg} ${className}`}
    >
      {/* Live neural filament as section divider — the system never fully stops */}
      <div className="live-filament max-w-5xl mx-auto mb-16 md:mb-20" />
      {children}
    </section>
  );
}
