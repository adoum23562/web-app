import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section id="hero" className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 animate-slide-up tracking-tight text-gray-900 dark:text-white leading-tight">
              L&apos;expérience <br className="hidden lg:block" />
              <span className="text-primary-600 dark:text-primary-400">
                e-commerce
              </span>{' '}
              ultime au Rwanda
            </h1>

            <p
              className="text-xl md:text-2xl mb-10 text-gray-600 dark:text-gray-300 animate-slide-up leading-relaxed"
              style={{ animationDelay: '100ms' }}
            >
              Découvrez notre sélection premium. Des milliers de produits de qualité livrés chez vous en 24h.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start animate-slide-up"
              style={{ animationDelay: '200ms' }}
            >
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4 shadow-glow group hover:-translate-y-1 transition-transform">
                  <span>Acheter maintenant</span>
                  <svg
                    className="w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 hover:-translate-y-1 transition-transform">
                  Explorer les catégories
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-dark-border/50 animate-slide-up"
              style={{ animationDelay: '300ms' }}
            >
              <div>
                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">50k+</p>
                <p className="text-sm text-gray-500 font-medium">Clients satisfaits</p>
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">24h</p>
                <p className="text-sm text-gray-500 font-medium">Livraison express</p>
              </div>
              <div>
                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">10k+</p>
                <p className="text-sm text-gray-500 font-medium">Produits uniques</p>
              </div>
            </div>
          </div>

          {/* Product Category Grid */}
          <div
            className="hidden lg:grid grid-cols-2 gap-4 h-[560px] animate-fade-in"
            style={{ animationDelay: '400ms' }}
            aria-hidden="true"
          >
            {/* Large left: Electronics */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop"
                alt="Électronique et gadgets"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1280px) 25vw, 320px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-white dark:bg-dark-card rounded-xl px-3 py-2 shadow-lg">
                <p className="text-sm font-bold text-gray-900 dark:text-white">Électronique</p>
              </div>
            </div>

            {/* Right column: Fashion + Home stacked */}
            <div className="flex flex-col gap-4">
              <div className="relative rounded-3xl overflow-hidden shadow-xl flex-1 group">
                <Image
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop"
                  alt="Mode et beauté"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1280px) 25vw, 240px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white dark:bg-dark-card rounded-xl px-3 py-1.5 shadow-lg">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Mode</p>
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-xl flex-1 group">
                <Image
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=600&auto=format&fit=crop"
                  alt="Maison et décoration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1280px) 25vw, 240px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white dark:bg-dark-card rounded-xl px-3 py-1.5 shadow-lg">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Maison</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
