'use client';

import { useEffect, useState } from 'react';
import type { Dictionary } from '@/i18n/get-dictionary';
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from '@/lib/cookie-consent';

interface CookieConsentBannerProps {
  dict: Dictionary['cookies'];
}

export default function CookieConsentBanner({ dict }: CookieConsentBannerProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show when no prior choice is stored
    setVisible(readCookieConsent() === null);
  }, []);

  const choose = (value: CookieConsent) => {
    writeCookieConsent(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label={dict.title}
    >
      <div className="cookie-banner-inner">
        <div className="cookie-banner-copy">
          <p className="cookie-banner-title">{dict.title}</p>
          <p className="cookie-banner-text">{dict.body}</p>
        </div>

        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-btn cookie-btn-primary"
            onClick={() => choose('all')}
          >
            {dict.acceptAll}
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn-secondary"
            onClick={() => choose('necessary')}
          >
            {dict.acceptNecessary}
          </button>
          <button
            type="button"
            className="cookie-btn-refuse"
            onClick={() => choose('refused')}
          >
            {dict.refuse}
          </button>
        </div>
      </div>
    </div>
  );
}
