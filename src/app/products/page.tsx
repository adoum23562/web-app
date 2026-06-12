'use client';

import { useState, useEffect } from 'react';
import { Product, Category } from '@/types';
import ProductGrid from '@/components/products/ProductGrid';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [offset, setOffset] = useState(0);
  const limit = 12;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: offset.toString(),
          sort: sortBy,
          order: 'desc',
        });

        if (selectedCategory) {
          params.append('category', selectedCategory);
        }

        if (search) {
          params.append('search', search);
        }

        const response = await fetch(`/api/products?${params.toString()}`);
        const data = await response.json();

        setProducts(data.products || []);
        setTotal(data.total || 0);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, sortBy, offset, search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setOffset(0);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setOffset(0);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setOffset(0);
  };

  const handleNextPage = () => {
    if (offset + limit < total) {
      setOffset(offset + limit);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (offset > 0) {
      setOffset(Math.max(0, offset - limit));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Nos Produits
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Découvrez notre sélection de {total} produits de qualité
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-sm p-6 mb-8 border border-gray-200/50 dark:border-dark-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="md:col-span-1">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  fullWidth
                />
                <Button type="submit" variant="primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Button>
              </div>
            </form>

            {/* Category Filter */}
            <Select
              label="Catégorie"
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={[
                { value: '', label: 'Toutes les catégories' },
                ...categories.map((cat) => ({
                  value: cat.slug,
                  label: cat.name,
                })),
              ]}
              fullWidth
            />

            {/* Sort */}
            <Select
              label="Trier par"
              value={sortBy}
              onChange={handleSortChange}
              options={[
                { value: 'created_at', label: 'Plus récents' },
                { value: 'name', label: 'Nom (A-Z)' },
                { value: 'price', label: 'Prix croissant' },
              ]}
              fullWidth
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div role="status" aria-live="polite" aria-label="Chargement des produits" className="flex justify-center items-center py-20">
            <div aria-hidden="true" className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <>
            <ProductGrid products={products} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Page {currentPage} sur {totalPages} ({total} produits au total)
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handlePrevPage}
                    disabled={offset === 0}
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleNextPage}
                    disabled={offset + limit >= total}
                  >
                    Suivant
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
