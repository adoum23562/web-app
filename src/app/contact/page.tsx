'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const SUBJECTS = [
  { value: 'order', label: 'Commande' },
  { value: 'delivery', label: 'Livraison' },
  { value: 'product', label: 'Produit' },
  { value: 'other', label: 'Autre' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'order', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-32 pb-24 bg-gray-50 dark:bg-dark-bg min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Nous contacter
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Une question, un problème ? Notre équipe est là pour vous aider.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-dark-card rounded-3xl p-8 shadow-soft border border-gray-100 dark:border-dark-border">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message envoyé !</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Merci pour votre message. Notre équipe vous répondra dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: 'order', message: '' }); }}
                    className="mt-6 text-primary-600 dark:text-primary-400 font-medium hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Nom complet"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    required
                    fullWidth
                    placeholder="Jean Uwimana"
                  />
                  <Input
                    label="Adresse e-mail"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    required
                    fullWidth
                    placeholder="jean@example.com"
                  />

                  <div className="flex flex-col w-full">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Sujet <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      required
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 appearance-none bg-white"
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500 ml-1">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      required
                      rows={5}
                      placeholder="Décrivez votre question ou problème..."
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                    />
                  </div>

                  <Button type="submit" disabled={loading} fullWidth>
                    {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Informations de contact */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-dark-border">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-primary-500/10 rounded-xl flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Adresse</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">KG 15 Avenue, Kimihurura<br />Kigali, Rwanda</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-dark-border">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-primary-500/10 rounded-xl flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                  <a href="mailto:contact@rwandamarket.rw" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    contact@rwandamarket.rw
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-soft border border-gray-100 dark:border-dark-border">
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-primary-500/10 rounded-xl flex-shrink-0">
                  <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Téléphone</h3>
                  <a href="tel:+250788000000" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    +250 788 000 000
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
