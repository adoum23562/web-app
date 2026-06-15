'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  message?: string;
}

export default function AuthModal({ isOpen, onClose, onSuccess, message }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setError('');
      setName('');
      setEmail('');
      setPassword('');
      setMode('login');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'register') {
      if (!name.trim()) { setError('Le nom est requis.'); setLoading(false); return; }
      const { error } = await signUp(email, password, name);
      if (error) { setError(error); setLoading(false); return; }
      // Auto-login after register
      const { error: loginError } = await signIn(email, password);
      if (loginError) {
        setError('Compte créé. Vérifiez votre email pour confirmer, puis connectez-vous.');
        setLoading(false);
        return;
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError('Email ou mot de passe incorrect.');
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
      >
        <div className="bg-white dark:bg-dark-card rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-dark-border transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center shadow-glow">
              <span className="text-white font-black text-xl">R</span>
            </div>
          </div>

          {/* Title */}
          <h2 id="auth-modal-title" className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
            {mode === 'login' ? 'Connexion' : 'Créer un compte'}
          </h2>

          {message && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-6 bg-primary-50 dark:bg-primary-900/20 px-4 py-2 rounded-xl">
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {mode === 'register' && (
              <Input
                label="Nom complet"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Jean Uwimana"
                required
                fullWidth
                autoComplete="name"
              />
            )}
            <Input
              label="Adresse email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="jean@example.com"
              required
              fullWidth
              autoComplete="email"
            />
            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={mode === 'register' ? 'Minimum 6 caractères' : '••••••••'}
              required
              fullWidth
              minLength={6}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
            />

            {error && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              aria-busy={loading}
              className="mt-2"
            >
              {loading
                ? 'Chargement...'
                : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            {mode === 'login' ? 'Pas encore de compte ?' : 'Déjà un compte ?'}
            {' '}
            <button
              type="button"
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-primary-600 dark:text-primary-400 font-semibold hover:underline"
            >
              {mode === 'login' ? "S'inscrire" : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
