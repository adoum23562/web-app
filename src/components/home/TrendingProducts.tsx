import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import ProductCard from '@/components/ui/ProductCard';
import { Product } from '@/types';
import Button from '@/components/ui/Button';

// This is a Server Component, it fetches data securely on the server
export default async function TrendingProducts() {
  const supabase = getSupabase();
  
  // Fetch up to 4 active products to display as trending
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name,
        slug
      )
    `)
    .eq('is_active', true)
    .limit(4);

  // If no products or an error occurs, we can show a placeholder or nothing
  if (error || !products || products.length === 0) {
    return null; // Or return a fallback UI
  }

  return (
    <section className="py-24 relative z-10 bg-gray-50/50 dark:bg-dark-bg/50 border-y border-gray-100 dark:border-dark-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tendances du <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Moment</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Découvrez les articles les plus convoités par notre communauté.
            </p>
          </div>
          <Link href="/products" className="hidden md:block">
            <Button variant="glass" className="hover:bg-primary-50 dark:hover:bg-primary-900/20">
              Voir tout
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product as Product} />
          ))}
        </div>

        <div className="mt-10 md:hidden flex justify-center">
          <Link href="/products" className="w-full">
            <Button variant="glass" className="w-full">
              Voir tous les produits
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
