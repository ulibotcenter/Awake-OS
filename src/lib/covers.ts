import type { Locale } from '@/i18n/config';

export type CoverKey = 'front' | 'spread' | 'logo';

export interface CoverAsset {
  src: string;
  width: number;
  height: number;
}

/**
 * Locale-aware book covers.
 * - `pt` → Portuguese front + full jacket
 * - `en` / `es` → English covers (ES uses EN for now)
 */
export function getCoverAssets(locale: Locale): Record<CoverKey, CoverAsset> {
  const isPt = locale === 'pt';

  return {
    front: {
      src: isPt ? '/images/awake-os-cover-pt.jpg' : '/images/awake-os-cover.jpg',
      width: 1801,
      height: 2702,
    },
    spread: {
      src: isPt ? '/images/front-and-back-cover-pt.jpg' : '/images/front-and-back-cover.jpg',
      width: isPt ? 3821 : 3814,
      height: 2775,
    },
    logo: {
      src: '/images/logo-somatic-labs.png',
      width: 1254,
      height: 1254,
    },
  };
}

export function getCoverAsset(locale: Locale, key: CoverKey): CoverAsset {
  return getCoverAssets(locale)[key];
}
