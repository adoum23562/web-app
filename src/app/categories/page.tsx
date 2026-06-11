'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Category } from '@/types';
import Card from '@/components/ui/Card';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const categoryIcons: { [key: string]: string } = {
    'electronique': '📱',
    'mode': '👕',
    'maison-jardin': '🏠',
    'alimentation': '🍽️',
    'beaute-sante': '💄',
    'sports-loisirs': '⚽',
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Toutes les Catégories
          </h1>
          <p className="text-lg text-gray-600">
            Explorez nos {categories.length} catégories de produits
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
            >
              <Card hover className="h-full cursor-pointer group">
                <div className="text-center">
                  <div className="text-7xl mb-4">
                    {categoryIcons[category.slug] || '📦'}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-gray-600">
                      {category.description}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
