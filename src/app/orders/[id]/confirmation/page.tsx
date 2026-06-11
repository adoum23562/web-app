'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface Order {
  id: string;
  order_number: string;
  total_amount: number;
  status: string;
  payment_status: string;
  notes: string | null;
  created_at: string;
  customers: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  order_items: Array<{
    id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    products: {
      name: string;
      image_url: string | null;
      slug: string;
    };
  }>;
}

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();

        if (response.ok) {
          setOrder(data.order);
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Commande non trouvée
        </h1>
        <Link href="/">
          <Button>Retour à l'accueil</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Message */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Commande confirmée !
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              Merci pour votre commande. Nous avons bien reçu votre demande.
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-green-200">
              <span className="text-gray-600">Numéro de commande:</span>
              <span className="text-xl font-bold text-primary-600">
                {order.order_number}
              </span>
            </div>
          </div>
        </Card>

        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Customer Info */}
          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Informations de livraison
            </h2>
            <div className="space-y-2 text-gray-600">
              <div>
                <span className="font-medium text-gray-800">Nom:</span> {order.customers.name}
              </div>
              <div>
                <span className="font-medium text-gray-800">Email:</span> {order.customers.email}
              </div>
              <div>
                <span className="font-medium text-gray-800">Téléphone:</span> {order.customers.phone}
              </div>
              <div>
                <span className="font-medium text-gray-800">Adresse:</span>{' '}
                {order.customers.address}, {order.customers.city}
              </div>
            </div>
          </Card>

          {/* Order Info */}
          <Card>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Détails de la commande
            </h2>
            <div className="space-y-2 text-gray-600">
              <div>
                <span className="font-medium text-gray-800">Date:</span>{' '}
                {formatDate(order.created_at)}
              </div>
              <div>
                <span className="font-medium text-gray-800">Statut:</span>{' '}
                <Badge variant="warning" size="sm" className="ml-2">
                  {order.status === 'pending' ? 'En attente' : order.status}
                </Badge>
              </div>
              <div>
                <span className="font-medium text-gray-800">Paiement:</span>{' '}
                <Badge variant="error" size="sm" className="ml-2">
                  {order.payment_status === 'unpaid' ? 'Non payé' : order.payment_status}
                </Badge>
              </div>
              <div>
                <span className="font-medium text-gray-800">Total:</span>{' '}
                <span className="text-2xl font-bold text-primary-600">
                  {formatPrice(order.total_amount)}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Order Items */}
        <Card className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Articles commandés
          </h2>
          <div className="space-y-4">
            {order.order_items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0"
              >
                <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  {item.products.image_url ? (
                    <Image
                      src={item.products.image_url}
                      alt={item.products.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.products.slug}`}
                    className="font-medium text-gray-800 hover:text-primary-600"
                  >
                    {item.products.name}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    Quantité: {item.quantity} × {formatPrice(item.unit_price)}
                  </p>
                  <p className="text-lg font-bold text-primary-600 mt-1">
                    {formatPrice(item.total_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-800">Total</span>
              <span className="text-3xl font-bold text-primary-600">
                {formatPrice(order.total_amount)}
              </span>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Prochaines étapes
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                1
              </div>
              <p>
                Vous recevrez un email de confirmation à <strong>{order.customers.email}</strong>
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                2
              </div>
              <p>Notre équipe préparera votre commande dans les 24h</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                3
              </div>
              <p>Nous vous contacterons au <strong>{order.customers.phone}</strong> pour organiser la livraison</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                4
              </div>
              <p>Paiement à la livraison par Mobile Money ou espèces</p>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              Retour à l'accueil
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">
              Continuer les achats
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
