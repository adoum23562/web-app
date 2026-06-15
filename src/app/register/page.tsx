'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function RegisterPage() {
  const router = useRouter();
  const { signUp, signIn, user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);
    const { error: signUpError } = await signUp(email, password, name);
    if (signUpError) {
      setError(signUpError);
      setLoading(false);
      return;
    }

    // Auto sign-in after registration
    const { error: signInError } = await signIn(email, password);
    if (signInError) {
      // Account created but email confirmation may be required
      setError('Compte créé ! Vérifiez votre email pour le confirmer, puis connectez-vous.');
      setLoading(false);
      return;
    }

    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center px-4 py-32">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-dark-card rounded-3xl shadow-soft border border-gray-100 dark:border-dark-border p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/" className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center shadow-glow">
              <span className="text-white font-black text-2xl">R</span>
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Créer un compte
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">
            Rejoignez Rwanda Market gratuitement
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Minimum 6 caractères"
              required
              fullWidth
              minLength={6}
              autoComplete="new-password"
            />
            <Input
              label="Confirmer le mot de passe"
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
              fullWidth
              autoComplete="new-password"
            />

            {error && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading} aria-busy={loading}>
              {loading ? 'Création...' : 'Créer mon compte'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
