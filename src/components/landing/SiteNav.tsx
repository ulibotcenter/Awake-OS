'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import { localeLabels, locales } from '@/i18n/config';

interface SiteNavProps {
  dict: Dictionary['nav'];
  locale: Locale;
  onCta: () => void;
  onScrollTo: (id: string) => void;
}

export default function SiteNav({ dict, locale, onCta, onScrollTo }: SiteNavProps) {
  const pathname = usePathname() || `/${locale}`;

  const switchHref = (next: Locale) => {
    const parts = pathname.split('/');
    if (parts[1] && locales.includes(parts[1] as Locale)) {
      parts[1] = next;
      return parts.join('/') || `/${next}`;
    }
    return `/${next}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-20 flex items-center justify-between gap-3">
        <a href={`/${locale}`} className="flex items-center shrink-0">
          <span className="text-xl sm:text-2xl font-semibold tracking-[-0.04em]">Awake OS</span>
        </a>

        <div className="hidden lg:flex items-center gap-7 text-sm">
          <button
            type="button"
            onClick={() => onScrollTo('the-overload')}
            className="nav-link text-[#E0F7FF] text-[13px] tracking-[0.5px] font-medium cursor-pointer bg-transparent border-0"
          >
            {dict.premise}
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('the-architecture')}
            className="nav-link text-[#E0F7FF] text-[13px] tracking-[0.5px] font-medium cursor-pointer bg-transparent border-0"
          >
            {dict.architecture}
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('the-modules')}
            className="nav-link text-[#E0F7FF] text-[13px] tracking-[0.5px] font-medium cursor-pointer bg-transparent border-0"
          >
            {dict.modules}
          </button>
          <button
            type="button"
            onClick={() => onScrollTo('the-architect')}
            className="nav-link text-[#E0F7FF] text-[13px] tracking-[0.5px] font-medium cursor-pointer bg-transparent border-0"
          >
            {dict.architect}
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="lang-switcher flex items-center gap-0.5 rounded-full border border-[rgba(64,240,216,0.22)] bg-[rgba(8,24,36,0.55)] p-0.5"
            role="navigation"
            aria-label="Language"
          >
            {locales.map((l) => (
              <Link
                key={l}
                href={switchHref(l)}
                hrefLang={l}
                className={`px-2 py-1 rounded-full text-[10px] font-mono tracking-[0.12em] transition-colors ${
                  l === locale
                    ? 'bg-[rgba(64,240,216,0.18)] text-[#40F0D8]'
                    : 'text-[#B8F5FF]/70 hover:text-[#E0F7FF]'
                }`}
                onClick={() => {
                  try {
                    document.cookie = `NEXT_LOCALE=${l};path=/;max-age=31536000;samesite=lax`;
                  } catch {
                    /* ignore */
                  }
                }}
              >
                {localeLabels[l]}
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={onCta}
            className="btn-luminous px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-[-0.01em] cursor-pointer"
          >
            <span className="sm:hidden">{dict.ctaShort}</span>
            <span className="hidden sm:inline">{dict.cta}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
