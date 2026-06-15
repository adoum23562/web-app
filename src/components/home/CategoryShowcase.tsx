import Link from 'next/link';
import Image from 'next/image';

export default function CategoryShowcase() {
  const categories = [
    {
      name: 'Électronique',
      slug: 'electronique',
      description: 'Smartphones, ordinateurs & plus',
      span: 'col-span-1 md:col-span-2 row-span-2',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop',
    },
    {
      name: 'Mode & Beauté',
      slug: 'mode',
      description: 'Vêtements, accessoires et soins',
      span: 'col-span-1 row-span-1',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=500&auto=format&fit=crop',
    },
    {
      name: 'Maison',
      slug: 'maison-jardin',
      description: 'Décoration et ameublement',
      span: 'col-span-1 row-span-1',
      image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=500&auto=format&fit=crop',
    },
  ];

  return (
    <section id="categories-section" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Découvrez nos{' '}
            <span className="text-primary-600 dark:text-primary-400">catégories</span>
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
              className={`group relative rounded-3xl overflow-hidden ${category.span} shadow-soft hover:shadow-lg transition-shadow duration-500`}
            >
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-md">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-base">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
