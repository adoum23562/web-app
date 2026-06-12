'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/slug/${slug}`);
        const data = await response.json();

        if (response.ok) {
          setProduct(data.product);

          // Fetch related products from same category
          if (data.product.category_id) {
            const relatedResponse = await fetch(
              `/api/products?limit=4&category=${data.product.categories?.slug}`
            );
            const relatedData = await relatedResponse.json();
            setRelatedProducts(
              relatedData.products.filter((p: Product) => p.id !== data.product.id)
            );
          }
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label="Chargement du produit" className="min-h-screen flex justify-center items-center">
        <div aria-hidden="true" className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-20">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Produit non trouvé
        </h1>
        <Link href="/products">
          <Button>Retour aux produits</Button>
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="mb-8 flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-primary-700 dark:hover:text-primary-400">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link href="/products" className="hover:text-primary-700 dark:hover:text-primary-400">Produits</Link>
          {product.categories && (
            <>
              <span aria-hidden="true">/</span>
              <Link
                href={`/products?category=${product.categories.slug}`}
                className="hover:text-primary-700 dark:hover:text-primary-400"
              >
                {product.categories.name}
              </Link>
            </>
          )}
          <span aria-hidden="true">/</span>
          <span className="text-gray-900 dark:text-white" aria-current="page">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="bg-white dark:bg-dark-card rounded-lg overflow-hidden shadow-sm border border-gray-200/50 dark:border-dark-border">
            <div className="relative w-full h-96 lg:h-[600px]">
              {product.image_url ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-dark-card">
                  <svg aria-hidden="true" className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              {product.categories && (
                <Link
                  href={`/products?category=${product.categories.slug}`}
                  className="text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                >
                  {product.categories.name}
                </Link>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-primary-700 dark:text-primary-400">
                {formatPrice(product.price)}
              </span>
              {isOutOfStock ? (
                <Badge variant="error" size="lg">Rupture de stock</Badge>
              ) : product.stock <= 10 && (
                <Badge variant="warning" size="lg">
                  Plus que {product.stock} en stock
                </Badge>
              )}
            </div>

            {product.description && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            {!isOutOfStock && (
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block" id="qty-label">
                  Quantité
                </label>
                <div className="flex items-center gap-3" role="group" aria-labelledby="qty-label">
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label="Diminuer la quantité"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </Button>
                  <span className="text-xl font-semibold min-w-[3rem] text-center text-gray-900 dark:text-white" aria-live="polite">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label="Augmenter la quantité"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </Button>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex gap-3 mb-8">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                {isOutOfStock ? 'Indisponible' : 'Ajouter au panier'}
              </Button>
            </div>

            {/* Additional Info */}
            <Card className="bg-gray-50 dark:bg-dark-card">
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-5 h-5 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Livraison gratuite dès 50,000 RWF</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-5 h-5 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Garantie satisfaction 30 jours</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-5 h-5 text-primary-700 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Paiement sécurisé</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.slug}`}
                  className="block"
                >
                  <Card hover className="h-full">
                    <div className="relative w-full h-48 mb-4">
                      {relatedProduct.image_url ? (
                        <Image
                          src={relatedProduct.image_url}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 rounded-md" />
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xl font-bold text-primary-600">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
