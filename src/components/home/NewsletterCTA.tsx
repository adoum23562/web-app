'use client';

import Button from '@/components/ui/Button';

export default function NewsletterCTA() {
  return (
    <section id="newsletter" className="py-24 relative overflow-hidden bg-gray-50 dark:bg-dark-bg border-t border-gray-200 dark:border-dark-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">
            10% de réduction sur votre{' '}
            <span className="text-primary-600 dark:text-primary-400">première commande</span>
          </h2>
          <p className="text-xl mb-10 text-gray-600 dark:text-gray-400">
            Inscrivez-vous à notre newsletter et recevez l&apos;offre directement dans votre boîte mail.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex-grow">
              <label htmlFor="newsletter-email" className="sr-only">
                Adresse email
              </label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Votre adresse email"
                className="w-full px-4 py-3.5 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow text-gray-900 dark:text-white placeholder-gray-400"
                required
              />
            </div>
            <Button size="lg" className="px-6 py-3.5 shadow-glow whitespace-nowrap rounded-xl">
              S&apos;inscrire
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Désabonnez-vous à tout moment. Nous respectons votre vie privée.
          </p>
        </div>
      </div>
    </section>
  );
}
