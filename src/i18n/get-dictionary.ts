import type { Locale } from './config';
import type en from './messages/en.json';

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./messages/en.json').then((m) => m.default),
  pt: () => import('./messages/pt.json').then((m) => m.default),
  es: () => import('./messages/es.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
