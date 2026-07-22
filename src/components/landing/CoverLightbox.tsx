'use client';

import type { Dictionary } from '@/i18n/get-dictionary';

export type LightboxKey = 'front' | 'spread' | 'logo';

interface CoverLightboxProps {
  active: LightboxKey | null;
  onClose: () => void;
  dict: Dictionary['lightbox'];
}

const ASSETS: Record<
  LightboxKey,
  { src: string; altKey: 'front' | 'spread' | 'logo'; titleKey: LightboxKey }
> = {
  front: {
    src: '/images/awake-os-cover.jpg',
    altKey: 'front',
    titleKey: 'front',
  },
  spread: {
    src: '/images/front-and-back-cover.jpg',
    altKey: 'spread',
    titleKey: 'spread',
  },
  logo: {
    src: '/images/logo-somatic-labs.png',
    altKey: 'logo',
    titleKey: 'logo',
  },
};

export default function CoverLightbox({ active, onClose, dict }: CoverLightboxProps) {
  if (!active) return null;
  const asset = ASSETS[active];

  return (
    <div
      className="cover-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={dict[asset.titleKey]}
      onClick={onClose}
    >
      <div className="cover-lightbox-backdrop" aria-hidden="true" />
      <div className="cover-lightbox-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="cover-lightbox-close"
          onClick={onClose}
          aria-label={dict.close}
        >
          ×
        </button>
        <p className="cover-lightbox-title">{dict[asset.titleKey]}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.src}
          alt={dict[asset.altKey]}
          className={`cover-lightbox-image${active === 'logo' ? ' cover-lightbox-image-logo' : ''}`}
        />
        <p className="cover-lightbox-hint">{dict.hint}</p>
      </div>
    </div>
  );
}
