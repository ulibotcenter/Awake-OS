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
  const [configureOpen, setConfigureOpen] = useState(false);

  useEffect(() => {
    setVisible(readCookieConsent() === null);
  }, []);

  useEffect(() => {
    if (!configureOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setConfigureOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [configureOpen]);

  const choose = (value: CookieConsent) => {
    writeCookieConsent(value);
    setConfigureOpen(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
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
              className="cookie-btn-configure"
              onClick={() => setConfigureOpen(true)}
              aria-expanded={configureOpen}
              aria-controls="cookie-configure-panel"
            >
              {dict.configure}
            </button>
          </div>
        </div>
      </div>

      {configureOpen && (
        <div
          className="cookie-config"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-config-title"
        >
          <button
            type="button"
            className="cookie-config-backdrop"
            aria-label={dict.close}
            onClick={() => setConfigureOpen(false)}
          />
          <div id="cookie-configure-panel" className="cookie-config-panel">
            <div className="cookie-config-header">
              <p id="cookie-config-title" className="cookie-config-title">
                {dict.configureTitle}
              </p>
              <button
                type="button"
                className="cookie-config-close"
                onClick={() => setConfigureOpen(false)}
                aria-label={dict.close}
              >
                ×
              </button>
            </div>

            <p className="cookie-config-intro">{dict.configureIntro}</p>

            <ul className="cookie-config-list">
              <li>
                <span className="cookie-config-chip cookie-config-chip-cyan">
                  {dict.necessaryLabel}
                </span>
                <p>{dict.necessaryDesc}</p>
              </li>
              <li>
                <span className="cookie-config-chip cookie-config-chip-orange">
                  {dict.analyticsLabel}
                </span>
                <p>{dict.analyticsDesc}</p>
              </li>
            </ul>

            <div className="cookie-config-actions">
              <button
                type="button"
                className="cookie-btn cookie-btn-primary cookie-btn-block"
                onClick={() => choose('all')}
              >
                {dict.acceptAll}
              </button>
              <button
                type="button"
                className="cookie-btn cookie-btn-secondary cookie-btn-block"
                onClick={() => choose('necessary')}
              >
                {dict.acceptNecessary}
              </button>
            </div>

            <button
              type="button"
              className="cookie-btn-refuse"
              onClick={() => choose('refused')}
            >
              {dict.refuse}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
