'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { slugify } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminProductEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    image_url: '',
    category_id: '',
    stock: '0',
    is_active: true,
  });

  useEffect(() => {
    Promise.all([
      fetch(`/api/products/${id}`).then((r) => r.json()),
      fetch('/api/categories').then((r) => r.json()),
    ])
      .then(([productData, categoriesData]) => {
        const p = productData.product;
        if (p) {
          setForm({
            name: p.name || '',
            slug: p.slug || '',
            description: p.description || '',
            price: String(p.price || ''),
            image_url: p.image_url || '',
            category_id: p.category_id || '',
            stock: String(p.stock ?? 0),
            is_active: p.is_active !== false,
          });
        }
        setCategories(categoriesData.categories || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugify(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          category_id: form.category_id || null,
        }),
      });
      if (res.ok) {
        router.push('/admin/products');
      } else {
        const data = await res.json();
        alert(data.error || 'Erreur lors de la mise à jour');
      }
    } catch {
      alert('Erreur lors de la mise à jour');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Modifier le produit</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm p-6 space-y-5">
        <Input
          label="Nom"
          value={form.name}
          onChange={(e) => handleNameChange(e.target.value)}
          required
          fullWidth
        />

        <Input
          label="Slug"
          value={form.slug}
          onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
          required
          fullWidth
        />

        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            rows={3}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
          />
        </div>

        <Input
          label="Prix (RWF)"
          type="number"
          value={form.price}
          onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
          required
          min="0"
          fullWidth
        />

        <Input
          label="URL de l'image"
          value={form.image_url}
          onChange={(e) => setForm((p) => ({ ...p, image_url: e.target.value }))}
          fullWidth
        />

        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select
            value={form.category_id}
            onChange={(e) => setForm((p) => ({ ...p, category_id: e.target.value }))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 appearance-none bg-white"
          >
            <option value="">-- Aucune catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <Input
          label="Stock"
          type="number"
          value={form.stock}
          onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))}
          min="0"
          fullWidth
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="is_active"
            checked={form.is_active}
            onChange={(e) => setForm((p) => ({ ...p, is_active: e.target.checked }))}
            className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
            Produit actif
          </label>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/products')}
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}
