'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface JoinBetaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JoinBetaModal({ isOpen, onClose }: JoinBetaModalProps) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

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
        setMessage('Obrigado! Você entrou na beta com sucesso.');
      } else {
        throw new Error(data.error || 'Erro desconhecido');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Erro ao enviar. Verifique os dados e tente novamente.');
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-[#0a0a0a] border border-cyan-500/30 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl shadow-cyan-500/10">
        
        <div className="flex justify-between items-center p-6 border-b border-cyan-500/20">
          <h3 className="text-2xl font-bold text-white tracking-tight">Join the Beta</h3>
          <button onClick={handleClose} className="text-cyan-400 hover:text-white transition-colors">
            <X size={28} />
          </button>
        </div>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-6">🚀</div>
              <p className="text-xl text-cyan-400 mb-8">{message}</p>
              
              <a
                href="https://booksprout.co/reviewer/review-copy/view/287649/awake-os"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-cyan-400 to-[#FF6B35] hover:brightness-110 text-black font-semibold px-10 py-4 rounded-2xl text-lg transition mb-6 w-full"
              >
                Acessar o Livro Agora
              </a>

              <p className="text-sm text-gray-400">Sua upgrade começou. Bem-vindo ao Awake OS.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nome completo</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-zinc-900 border border-cyan-500/30 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-zinc-900 border border-cyan-500/30 rounded-2xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
                  placeholder="seu@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-cyan-400 to-[#FF6B35] text-black font-semibold rounded-2xl text-lg hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Salvando na lista...' : 'Entrar na Beta'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}