'use client';

import Button from '@/components/ui/Button';

export default function NewsletterCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-gray-50 dark:bg-dark-bg border-t border-gray-200 dark:border-dark-border">
      {/* Decorative gradients */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-tr from-primary-500/10 via-secondary-500/10 to-transparent blur-3xl rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-3xl mx-auto bg-white/40 dark:bg-dark-card/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 border border-white/50 dark:border-white/10 shadow-glass">
          <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 text-sm font-semibold tracking-wider mb-6">
            RESTEZ INFORMÉS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">
            Ne manquez aucune <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">offre exclusive</span>
          </h2>
          <p className="text-xl mb-10 text-gray-600 dark:text-gray-400">
            Inscrivez-vous à notre newsletter et recevez 10% de réduction sur votre première commande.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-grow relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Votre adresse email..."
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow text-gray-900 dark:text-white placeholder-gray-400"
                required
              />
            </div>
            <Button size="lg" className="px-8 py-4 shadow-glow group hover:-translate-y-1 transition-all rounded-2xl whitespace-nowrap">
              <span>S&apos;inscrire</span>
              <svg
                className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Nous respectons votre vie privée. Désabonnez-vous à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
}
