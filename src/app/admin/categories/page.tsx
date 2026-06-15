'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { slugify } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });

  const loadCategories = () => {
    fetch('/api/admin/categories')
      .then((r) => r.json())
      .then((data) => setCategories(data.categories || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleNameChange = (value: string) => {
    setForm((prev) => ({ ...prev, name: value, slug: slugify(value) }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.slug) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: '', slug: '', description: '' });
        loadCategories();
      } else {
        const data = await res.json();
        alert(data.error || 'Erreur lors de la création');
      }
    } catch {
      alert('Erreur lors de la création');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Supprimer la catégorie "${name}" ?`)) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        loadCategories();
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Catégories</h1>

      {/* Formulaire d'ajout */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ajouter une catégorie</h2>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[160px]">
            <Input
              label="Nom"
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              fullWidth
            />
          </div>
          <div className="flex-1 min-w-[160px]">
            <Input
              label="Slug"
              value={form.slug}
              onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
              required
              fullWidth
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <Input
              label="Description"
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              fullWidth
            />
          </div>
          <Button type="submit" disabled={saving} size="sm">
            {saving ? 'Ajout...' : 'Ajouter'}
          </Button>
        </form>
      </div>

      {/* Liste des catégories */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-dark-bg/50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nom</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Slug</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-400">Aucune catégorie</td>
                  </tr>
                ) : (
                  categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                      <td className="px-6 py-4 font-mono text-gray-500 dark:text-gray-400 text-xs">{cat.slug}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400 max-w-[300px]">
                        <span className="line-clamp-2">{cat.description || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors font-medium"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
