import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-400 rounded-full px-4 py-2 mb-8 animate-fade-in border border-primary-200 dark:border-primary-500/20 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
              </span>
              <span className="text-sm font-semibold tracking-wide uppercase">Nouveautés 2026 Disponibles</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 animate-slide-up tracking-tight text-gray-900 dark:text-white leading-tight">
              L&apos;expérience <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400">
                e-commerce
              </span> ultime au Rwanda
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
                <Button size="lg" variant="glass" className="w-full sm:w-auto text-lg px-8 py-4 hover:-translate-y-1 transition-transform bg-white/50 dark:bg-dark-card/50">
                  Explorer
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-dark-border/50 animate-slide-up" style={{ animationDelay: '300ms' }}>
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

          {/* Visual Showcase */}
          <div className="hidden lg:block relative h-[600px] animate-fade-in" style={{ animationDelay: '400ms' }}>
            {/* Abstract Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-pulse-glow" />
            
            {/* Main Mockup Cards */}
            <div className="absolute top-10 right-10 w-64 h-80 bg-white/10 dark:bg-dark-card/40 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl shadow-glass transform rotate-6 animate-float z-20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-transparent opacity-50" />
              <div className="p-6 h-full flex flex-col justify-end">
                <div className="w-full h-32 bg-white/20 rounded-xl mb-4 animate-pulse" />
                <div className="w-3/4 h-4 bg-white/30 rounded mb-2" />
                <div className="w-1/2 h-4 bg-white/20 rounded" />
              </div>
            </div>

            <div className="absolute bottom-10 left-10 w-72 h-64 bg-white/10 dark:bg-dark-card/40 backdrop-blur-xl border border-white/20 dark:border-white/5 rounded-3xl shadow-glass transform -rotate-3 animate-float z-30 overflow-hidden" style={{ animationDelay: '1s' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary-500/30 to-transparent opacity-50" />
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-white/20" />
                  <div>
                    <div className="w-24 h-4 bg-white/30 rounded mb-2" />
                    <div className="w-16 h-3 bg-white/20 rounded" />
                  </div>
                </div>
                <div className="w-full h-24 bg-white/20 rounded-xl" />
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-[2rem] shadow-2xl z-10 overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-bg dark:to-dark-border relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="w-32 h-5 bg-gray-200 dark:bg-dark-border rounded mb-2" />
                    <div className="w-20 h-4 bg-gray-100 dark:bg-dark-bg rounded" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <span className="w-6 h-6 bg-primary-500 rounded-full" />
                  </div>
                </div>
                <div className="w-full h-10 bg-primary-50 dark:bg-primary-900/20 rounded-xl mt-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
