'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const { signIn, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Already logged in
  useEffect(() => {
    if (user) router.replace(redirect);
  }, [user, router, redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      setError('Email ou mot de passe incorrect.');
      setLoading(false);
      return;
    }
    router.push(redirect);
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
            Connexion
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">
            Connectez-vous pour accéder à votre compte
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="••••••••"
              required
              fullWidth
              autoComplete="current-password"
            />

            {error && (
              <p role="alert" className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading} aria-busy={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
              S&apos;inscrire gratuitement
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
