export const locales = ['en', 'pt', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  pt: 'PT',
  es: 'ES',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment && isLocale(segment) ? segment : null;
}
