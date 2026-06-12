import Link from 'next/link';

export default function CategoryShowcase() {
  const categories = [
    {
      name: 'Électronique',
      slug: 'electronique',
      description: 'Smartphones, ordinateurs & plus',
      color: 'from-blue-500/80 to-indigo-600/80',
      span: 'col-span-1 md:col-span-2 row-span-2',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'Mode & Beauté',
      slug: 'mode',
      description: 'Vêtements, accessoires et soins',
      color: 'from-pink-500/80 to-rose-600/80',
      span: 'col-span-1 row-span-1',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500&auto=format&fit=crop',
    },
    {
      name: 'Maison',
      slug: 'maison-jardin',
      description: 'Décoration et ameublement',
      color: 'from-amber-500/80 to-orange-600/80',
      span: 'col-span-1 row-span-1',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=500&auto=format&fit=crop',
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Découvrez nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Catégories</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Plongez dans nos univers spécialement sélectionnés pour répondre à tous vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className={`group relative rounded-3xl overflow-hidden ${category.span} shadow-soft hover:shadow-glow transition-all duration-500`}
            >
              {/* Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} mix-blend-multiply opacity-80 group-hover:opacity-90 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform transition-transform duration-300 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-md">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-lg mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 drop-shadow-sm">
                    {category.description}
                  </p>
                  
                  <div className="inline-flex items-center text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    Explorer
                    <svg className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
