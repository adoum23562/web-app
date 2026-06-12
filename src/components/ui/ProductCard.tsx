'use client';

import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const imageUrl = product.image_url || '/placeholder-product.png';
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group relative bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50 dark:bg-dark-bg/50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Badges */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
          {product.categories?.name && (
            <span className="bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md text-gray-800 dark:text-gray-200 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {product.categories.name}
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-red-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              Épuisé
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 relative">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 h-10">
          {product.description || 'Aucune description disponible.'}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-black text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
            className={`rounded-full w-10 h-10 p-0 flex items-center justify-center transition-all duration-300 ${isOutOfStock ? 'opacity-50 cursor-not-allowed' : 'group-hover:bg-primary-600 group-hover:text-white'}`}
            aria-label="Ajouter au panier"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
