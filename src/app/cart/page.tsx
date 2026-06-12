'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center py-12">
            <svg
              aria-hidden="true"
              className="mx-auto w-24 h-24 text-gray-300 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Votre panier est vide
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Découvrez nos produits et ajoutez-les à votre panier
            </p>
            <Link href="/products">
              <Button size="lg">Voir nos produits</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Votre Panier
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            {items.length} article{items.length > 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} padding="none">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Image */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      aria-label={`Voir le produit ${item.product.name}`}
                      className="relative w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 dark:bg-dark-card rounded-lg overflow-hidden"
                    >
                      {item.product.image_url ? (
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg aria-hidden="true" className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-400 transition-colors block mb-2"
                        >
                          {item.product.name}
                        </Link>
                        {item.product.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                            {item.product.description}
                          </p>
                        )}
                        <p className="text-xl font-bold text-primary-700 dark:text-primary-400">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300" id={`qty-label-${item.product.id}`}>
                            Quantité:
                          </span>
                          <div className="flex items-center gap-2" role="group" aria-labelledby={`qty-label-${item.product.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              aria-label={`Diminuer la quantité de ${item.product.name}`}
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </Button>
                            <span className="text-lg font-semibold min-w-[3rem] text-center text-gray-900 dark:text-white" aria-live="polite">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              aria-label={`Augmenter la quantité de ${item.product.name}`}
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                            >
                              <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          aria-label={`Supprimer ${item.product.name} du panier`}
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <svg aria-hidden="true" className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-dark-border flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sous-total:</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-end">
              {confirmClear ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Vider le panier ?</span>
                  <Button
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white border-none"
                    onClick={() => { clearCart(); setConfirmClear(false); }}
                  >
                    Confirmer
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setConfirmClear(false)}>
                    Annuler
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setConfirmClear(true)}
                  className="text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Vider le panier
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Résumé de la commande
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Livraison</span>
                  <span className="text-primary-700 dark:text-primary-400 font-medium">Gratuite</span>
                </div>
                <div className="border-t border-gray-200 dark:border-dark-border pt-3 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary-700 dark:text-primary-400">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <Link href="/checkout">
                <Button variant="primary" size="lg" fullWidth className="mb-3">
                  Passer la commande
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" fullWidth>
                  Continuer les achats
                </Button>
              </Link>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border space-y-3 text-sm text-gray-700 dark:text-gray-300">
                {[
                  { path: 'M5 13l4 4L19 7', text: 'Livraison gratuite dès 50 000 RWF' },
                  { path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Paiement sécurisé' },
                  { path: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', text: 'Mobile Money accepté' },
                ].map(({ path, text }) => (
                  <div key={text} className="flex items-start gap-2">
                    <svg aria-hidden="true" className="w-5 h-5 text-primary-700 dark:text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
                    </svg>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
