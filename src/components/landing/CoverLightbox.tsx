'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import { getCoverAsset, type CoverKey } from '@/lib/covers';

export type LightboxKey = CoverKey;

interface CoverLightboxProps {
  active: LightboxKey | null;
  onClose: () => void;
  dict: Dictionary['lightbox'];
  locale: Locale;
}

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const WHEEL_SENSITIVITY = 0.0018;

export default function CoverLightbox({ active, onClose, dict, locale }: CoverLightboxProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [tx, setTx] = useState(0);
  const [ty, setTy] = useState(0);

  const dragRef = useRef({
    active: false,
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
  });
  const pinchRef = useRef<{
    dist: number;
    scale: number;
    midX: number;
    midY: number;
  } | null>(null);

  const resetView = useCallback(() => {
    setScale(1);
    setTx(0);
    setTy(0);
  }, []);

  useEffect(() => {
    if (!active) return;
    resetView();
  }, [active, locale, resetView]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === '0') resetView();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, onClose, resetView]);

  // Non-passive wheel so we can prevent page scroll while zooming.
  useEffect(() => {
    if (!active) return;
    const stage = stageRef.current;
    if (!stage) return;

    const onWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = -e.deltaY;
      setScale((prev) => {
        const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, prev * (1 + delta * WHEEL_SENSITIVITY * 12)));
        const rect = stage.getBoundingClientRect();
        const cx = e.clientX - rect.left - rect.width / 2;
        const cy = e.clientY - rect.top - rect.height / 2;
        const ratio = next / prev;
        setTx((prevTx) => (next <= MIN_SCALE ? 0 : cx - (cx - prevTx) * ratio));
        setTy((prevTy) => (next <= MIN_SCALE ? 0 : cy - (cy - prevTy) * ratio));
        return next;
      });
    };

    stage.addEventListener('wheel', onWheelNative, { passive: false });
    return () => stage.removeEventListener('wheel', onWheelNative);
  }, [active]);

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

  const zoomAt = useCallback(
    (nextScale: number, clientX: number, clientY: number) => {
      const stage = stageRef.current;
      if (!stage) {
        setScale(clampScale(nextScale));
        return;
      }
      const rect = stage.getBoundingClientRect();
      const cx = clientX - rect.left - rect.width / 2;
      const cy = clientY - rect.top - rect.height / 2;

      setScale((prevScale) => {
        const s = clampScale(nextScale);
        const ratio = s / prevScale;
        setTx((prevTx) => cx - (cx - prevTx) * ratio);
        setTy((prevTy) => cy - (cy - prevTy) * ratio);
        if (s <= MIN_SCALE) {
          setTx(0);
          setTy(0);
        }
        return s;
      });
    },
    [],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    if (scale <= MIN_SCALE) return;
    const el = e.currentTarget as HTMLElement;
    el.setPointerCapture(e.pointerId);
    dragRef.current = {
      active: true,
      x: e.clientX,
      y: e.clientY,
      tx,
      ty,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setTx(dragRef.current.tx + dx);
    setTy(dragRef.current.ty + dy);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current.active = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const touchDistance = (a: React.Touch, b: React.Touch) => {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.hypot(dx, dy);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const d = touchDistance(e.touches[0], e.touches[1]);
      pinchRef.current = {
        dist: d,
        scale,
        midX: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        midY: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      };
      dragRef.current.active = false;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchRef.current) {
      e.preventDefault();
      const d = touchDistance(e.touches[0], e.touches[1]);
      const ratio = d / Math.max(1, pinchRef.current.dist);
      const next = clampScale(pinchRef.current.scale * ratio);
      setScale(next);
      if (next <= MIN_SCALE) {
        setTx(0);
        setTy(0);
      }
    }
  };

  const onTouchEnd = () => {
    pinchRef.current = null;
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1.05) {
      resetView();
    } else {
      zoomAt(2.2, e.clientX, e.clientY);
    }
  };

  if (!active) return null;

  const asset = getCoverAsset(locale, active);
  const isLogo = active === 'logo';
  const title = dict[active];

  return (
    <div
      className="cover-lightbox cover-lightbox-fs"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="cover-lightbox-backdrop"
        aria-label={dict.close}
        onClick={onClose}
      />

      <div className="cover-lightbox-chrome">
        <p className="cover-lightbox-title">{title}</p>
        <div className="cover-lightbox-actions">
          <button
            type="button"
            className="cover-lightbox-tool"
            onClick={() => setScale((s) => clampScale(s - 0.35))}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            className="cover-lightbox-tool"
            onClick={resetView}
            aria-label="Reset zoom"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            type="button"
            className="cover-lightbox-tool"
            onClick={() => setScale((s) => clampScale(s + 0.35))}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className="cover-lightbox-close"
            onClick={onClose}
            aria-label={dict.close}
          >
            ×
          </button>
        </div>
      </div>

      <div
        ref={stageRef}
        className={`cover-lightbox-stage${scale > 1 ? ' is-zoomed' : ''}${isLogo ? ' is-logo' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onDoubleClick={onDoubleClick}
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset.src}
          alt={dict[active]}
          width={asset.width}
          height={asset.height}
          className={`cover-lightbox-image${isLogo ? ' cover-lightbox-image-logo' : ''}`}
          style={{
            transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`,
          }}
          draggable={false}
        />
      </div>

      <p className="cover-lightbox-hint">{dict.hint}</p>
    </div>
  );
}
