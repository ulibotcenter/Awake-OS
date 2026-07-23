import type { Locale } from '@/i18n/config';
import type { PrivacyDoc } from './types';
import { privacyEn } from './en';
import { privacyPt } from './pt';
import { privacyEs } from './es';

const docs: Record<Locale, PrivacyDoc> = {
  en: privacyEn,
  pt: privacyPt,
  es: privacyEs,
};

export function getPrivacyDoc(locale: Locale): PrivacyDoc {
  return docs[locale] ?? privacyEn;
}

export type { PrivacyDoc, PrivacyBlock, PrivacySection } from './types';
