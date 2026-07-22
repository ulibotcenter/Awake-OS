'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Dictionary } from '@/i18n/get-dictionary';
import { triggerNeuralWave } from '@/lib/neural-api';

interface PreLaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary['modal'];
}

export default function PreLaunchModal({ isOpen, onClose, dict }: PreLaunchModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isOpen) triggerNeuralWave(0.9);
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/join-beta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(dict.success);
        triggerNeuralWave(1.4);
      } else {
        throw new Error(data.error || 'Error');
      }
    } catch {
      setStatus('error');
      setMessage(dict.error);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormData({ name: '', email: '' });
      setStatus('idle');
      setMessage('');
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="beta-modal prelaunch-modal"
          role="dialog"
          aria-modal="true"
          aria-label={dict.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            className="beta-modal-backdrop"
            aria-label={dict.close}
            onClick={handleClose}
          />
          <motion.div
            className="beta-modal-panel prelaunch-modal-panel"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="prelaunch-modal-orbit" aria-hidden />
            <button
              type="button"
              className="beta-modal-close"
              onClick={handleClose}
              aria-label={dict.close}
            >
              <X size={18} />
            </button>

            {status === 'success' ? (
              <div className="beta-modal-success">
                <div className="beta-modal-success-icon prelaunch-success-ring">✓</div>
                <h3 className="beta-modal-title">{dict.success}</h3>
                <p className="beta-modal-success-text">{dict.successSub}</p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-luminous beta-modal-submit"
                >
                  {dict.continue}
                </button>
              </div>
            ) : (
              <>
                <p className="label text-[10px] tracking-[0.28em] text-[#40F0D8] text-center mb-2">
                  PRE-LAUNCH
                </p>
                <h3 className="beta-modal-title">{dict.title}</h3>
                <p className="beta-modal-subtitle">{dict.subtitle}</p>

                <form onSubmit={handleSubmit} className="beta-modal-form">
                  <div className="beta-modal-field">
                    <label className="beta-modal-label" htmlFor="prelaunch-name">
                      {dict.name}
                    </label>
                    <input
                      id="prelaunch-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="beta-modal-input"
                      placeholder={dict.namePlaceholder}
                      autoComplete="name"
                    />
                  </div>

                  <div className="beta-modal-field">
                    <label className="beta-modal-label" htmlFor="prelaunch-email">
                      {dict.email}
                    </label>
                    <input
                      id="prelaunch-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="beta-modal-input"
                      placeholder={dict.emailPlaceholder}
                      autoComplete="email"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-[#FF6B35] text-center">{message}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-luminous beta-modal-submit disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? dict.loading : dict.submit}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
