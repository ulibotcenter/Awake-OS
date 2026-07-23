export const COOKIE_CONSENT_KEY = 'awake_cookie_consent';
export const COOKIE_CONSENT_EVENT = 'awake-cookie-consent';

export type CookieConsent = 'all' | 'necessary' | 'refused';

export function isAnalyticsAllowed(value: string | null): boolean {
  return value === 'all' || value === 'necessary';
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (v === 'all' || v === 'necessary' || v === 'refused') return v;
  } catch {
    /* ignore */
  }
  return null;
}

export function writeCookieConsent(value: CookieConsent) {
  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}
