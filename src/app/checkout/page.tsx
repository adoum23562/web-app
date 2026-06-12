'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/utils';

function Textarea({
  label,
  error,
  required,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea
        required={required}
        className={cn(
          'w-full px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg',
          'bg-white dark:bg-dark-card text-gray-900 dark:text-white',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'transition-colors duration-200 resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && <span className="text-sm text-red-600 mt-1">{error}</span>}
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Kigali',
    notes: '',
  });

  useEffect(() => {
    if (items.length === 0) {
      router.replace('/cart');
    }
  }, [items.length, router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    } else if (!/^(\+250|0)?[7][0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Numéro rwandais invalide (ex: 0788123456)';
    }
    if (!formData.address.trim()) newErrors.address = "L'adresse est requise";
    if (!formData.city.trim()) newErrors.city = 'La ville est requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo: formData,
          items: items.map((item) => ({
            product_id: item.product.id,
            quantity: item.quantity,
          })),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Échec de la création de la commande');
      clearCart();
      router.push(`/orders/${data.order.id}/confirmation?token=${data.order.access_token}`);
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'Une erreur est survenue' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-primary-700 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium mb-4"
          >
            <svg aria-hidden="true" className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour au panier
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Finaliser la commande
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Complétez vos informations pour passer votre commande
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Informations de livraison
              </h2>

              <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                  <Input label="Nom complet" name="name" type="text" value={formData.name} onChange={handleInputChange} error={errors.name} required fullWidth placeholder="Jean Uwimana" />
                  <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} required fullWidth placeholder="jean@example.com" />
                  <Input label="Téléphone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} error={errors.phone} required fullWidth placeholder="0788123456" />
                  <Textarea label="Adresse" name="address" value={formData.address} onChange={handleInputChange} error={errors.address} required rows={3} placeholder="KG 15 Ave, Kigali" />
                  <Input label="Ville" name="city" type="text" value={formData.city} onChange={handleInputChange} error={errors.city} required fullWidth placeholder="Kigali" />
                  <Textarea label="Notes (optionnel)" name="notes" value={formData.notes} onChange={handleInputChange} rows={3} placeholder="Instructions spéciales pour la livraison..." />

                  {errors.submit && (
                    <div role="alert" className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
                      {errors.submit}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    disabled={loading}
                    aria-busy={loading}
                  >
                    {loading ? (
                      <>
                        <svg aria-hidden="true" className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Traitement en cours...
                      </>
                    ) : 'Confirmer la commande'}
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Résumé de la commande
              </h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 dark:bg-dark-card rounded-md overflow-hidden">
                      {item.product.image_url ? (
                        <Image src={item.product.image_url} alt={item.product.name} fill className="object-cover" sizes="64px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg aria-hidden="true" className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{item.product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Qté: {item.quantity}</p>
                      <p className="text-sm font-semibold text-primary-700 dark:text-primary-400">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-dark-border pt-4 space-y-2">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Livraison</span>
                  <span className="text-primary-700 dark:text-primary-400 font-medium">Gratuite</span>
                </div>
                <div className="border-t border-gray-200 dark:border-dark-border pt-2 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary-700 dark:text-primary-400">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-border space-y-2 text-sm text-gray-700 dark:text-gray-300">
                {[
                  { path: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Paiement sécurisé' },
                  { path: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', text: 'Mobile Money accepté' },
                ].map(({ path, text }) => (
                  <div key={text} className="flex items-center gap-2">
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
