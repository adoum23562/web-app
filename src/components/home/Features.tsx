export default function Features() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: 'Qualité Premium',
      description: 'Sélection rigoureuse des meilleurs produits pour vous',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10'
    },
    {
      icon: (
        <svg className="w-8 h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Livraison Express',
      description: 'Livraison dans tout le Rwanda en 24-48h garantie',
      color: 'text-violet-500',
      bg: 'bg-violet-50 dark:bg-violet-500/10'
    },
    {
      icon: (
        <svg className="w-8 h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Paiement Sécurisé',
      description: 'Mobile Money et cartes bancaires cryptées',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-500/10'
    },
    {
      icon: (
        <svg className="w-8 h-8" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Support 24/7',
      description: 'Une équipe dévouée toujours à votre écoute',
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-500/10'
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-dark-bg relative border-y border-gray-200 dark:border-dark-border">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Pourquoi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">nous choisir</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Une expérience d&apos;achat pensée pour votre confort et votre sécurité à chaque étape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-card rounded-3xl p-8 border border-gray-100 dark:border-dark-border shadow-soft hover:shadow-glow transition-all duration-300 group hover:-translate-y-2"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${feature.bg} ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
