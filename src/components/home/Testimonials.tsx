export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Cliente fidèle',
      content: "J'adore faire mes achats ici. L'interface est magnifique et les produits arrivent toujours à l'heure au Rwanda. Le service client est au top !",
      initials: 'SM',
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    {
      name: 'Jean P.',
      role: 'Entrepreneur',
      content: "La qualité des équipements électroniques que j'ai commandés pour mon bureau à Kigali est exceptionnelle. C'est devenu mon site de référence.",
      initials: 'JP',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      name: 'Alice K.',
      role: 'Étudiante',
      content: "Des prix abordables pour une qualité incroyable. J'ai adoré l'expérience d'achat sur mobile, tellement fluide et rapide.",
      initials: 'AK',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    },
  ];

  return (
    <section id="temoignages" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ils nous font{' '}
            <span className="text-primary-600 dark:text-primary-400">confiance</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Découvrez ce que nos clients pensent de leur expérience avec Rwanda Market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-3xl p-8 shadow-soft hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-6 text-primary-200 dark:text-primary-800">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-base ${testimonial.color}`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
