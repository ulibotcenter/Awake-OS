'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import {
  COOKIE_CONSENT_EVENT,
  isAnalyticsAllowed,
  readCookieConsent,
} from '@/lib/cookie-consent';

const GA_MEASUREMENT_ID = 'G-56P37BHYYJ';

/**
 * Loads GA4 only when the user has accepted cookies
 * (all or necessary). Never loads after an explicit refuse.
 */
export default function ConsentGoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const sync = () => setAllowed(isAnalyticsAllowed(readCookieConsent()));
    sync();
    window.addEventListener(COOKIE_CONSENT_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  if (!allowed) return null;
  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
