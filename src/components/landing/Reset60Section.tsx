'use client';

import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import Reveal from './Reveal';

interface Reset60SectionProps {
  dict: Dictionary['reset60'];
  onCta: () => void;
  locale: Locale;
}

export default function Reset60Section({ dict, onCta, locale }: Reset60SectionProps) {
  const items = [
    { title: dict.item1Title, body: dict.item1Body },
    { title: dict.item2Title, body: dict.item2Body },
    { title: dict.item3Title, body: dict.item3Body },
  ];

  return (
    <section
      id="reset-60s"
      className="relative py-16 sm:py-20 md:py-24 border-t border-[rgba(0,229,192,0.28)]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <Reveal className="text-center mb-10 md:mb-12">
          <span className="label text-xs text-[#40F0D8] tracking-[3.5px]">{dict.eyebrow}</span>
          <h3 className="section-title mt-3 text-4xl md:text-5xl font-semibold tracking-[-0.035em]">
            {dict.title}
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-[#E0F7FF] text-base sm:text-lg tracking-[-0.01em] leading-relaxed">
            {dict.subtitle}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i}>
              <div className="module-card glass rounded-2xl p-6 border border-[rgba(0,229,192,0.28)] h-full">
                <h4 className="text-xl font-semibold tracking-[-0.025em] leading-tight text-[#E0F7FF]">
                  {item.title}
                </h4>
                <p className="mt-2.5 text-sm text-[#B8F5FF] leading-relaxed">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 md:mt-12 text-center">
          <button
            type="button"
            onClick={onCta}
            className="btn-luminous w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-medium tracking-[-0.01em] active:scale-[0.985] cursor-pointer"
          >
            {dict.cta}
            <span className="text-lg opacity-80" aria-hidden>
              →
            </span>
          </button>
          <p className="final-cta-closing mt-7 max-w-md mx-auto">{dict.closing}</p>
          <p className="mt-4 max-w-lg mx-auto text-[10px] sm:text-[11px] text-[#B8F5FF]/70 tracking-[0.04em] leading-relaxed">
            {dict.footnote}{' '}
            <a
              href={`/${locale}/privacy#disclaimer`}
              className="text-[#40F0D8] hover:text-[#E0F7FF] transition-colors"
            >
              {dict.disclaimerLink}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
