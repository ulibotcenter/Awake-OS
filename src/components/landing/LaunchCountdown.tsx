'use client';

import { useEffect, useState } from 'react';

/** August 18, 2026 · 10:00 AM CEST (UTC+2) */
export const LAUNCH_AT = new Date('2026-08-18T10:00:00+02:00');

export interface CountdownLabels {
  label: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  live: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function getTimeLeft(now: number): TimeLeft {
  const total = Math.max(0, LAUNCH_AT.getTime() - now);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds, total };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

interface LaunchCountdownProps {
  labels: CountdownLabels;
}

export default function LaunchCountdown({ labels }: LaunchCountdownProps) {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTime(getTimeLeft(Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) {
    return (
      <div className="launch-countdown" aria-hidden>
        <div className="launch-countdown-units">
          {['--', '--', '--', '--'].map((v, i) => (
            <div key={i} className="launch-countdown-unit">
              <span className="launch-countdown-value">{v}</span>
              <span className="launch-countdown-label">·</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (time.total <= 0) {
    return (
      <div className="launch-countdown launch-countdown-live" role="status">
        <span className="launch-countdown-live-dot" aria-hidden />
        <span className="launch-countdown-live-text">{labels.live}</span>
      </div>
    );
  }

  const units = [
    { value: pad(time.days), label: labels.days },
    { value: pad(time.hours), label: labels.hours },
    { value: pad(time.minutes), label: labels.minutes },
    { value: pad(time.seconds), label: labels.seconds },
  ];

  return (
    <div
      className="launch-countdown"
      role="timer"
      aria-live="polite"
      aria-label={`${labels.label}: ${time.days} ${labels.days}, ${time.hours} ${labels.hours}, ${time.minutes} ${labels.minutes}, ${time.seconds} ${labels.seconds}`}
    >
      <p className="launch-countdown-eyebrow">{labels.label}</p>
      <div className="launch-countdown-units">
        {units.map((unit, i) => (
          <div key={unit.label} className="launch-countdown-unit-wrap">
            {i > 0 && (
              <span className="launch-countdown-sep" aria-hidden>
                :
              </span>
            )}
            <div className="launch-countdown-unit">
              <span className="launch-countdown-value">{unit.value}</span>
              <span className="launch-countdown-label">{unit.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
