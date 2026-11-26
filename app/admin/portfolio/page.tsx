'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useAdminData } from '@/components/admin/AdminContext';
import { PORTFOLIO_CATEGORIES } from '@/lib/seedData';
import { slugify } from '@/lib/utils';
import type { PortfolioProject } from '@/types/database';

export default function AdminPortfolioPage() {
  const { data, mutate } = useAdminData();
  const [editing, setEditing] = useState<PortfolioProject | null>(null);

  if (!data) return null;

  const startNew = () => {
    setEditing({
      id: '',
      title: '',
      slug: '',
      category: PORTFOLIO_CATEGORIES[1],
      description: '',
      cover_image: '/events/real/wedding_mandapam.jpg',
      gallery_images: [],
      location: 'Madanapalle, Andhra Pradesh',
      services_provided: ['Decoration', 'Floral Styling'],
      instagram_post_url: '',
      is_demo: false,
      published: true,
      display_order: data.portfolio.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const slug = editing.slug || slugify(editing.title);
    await mutate('portfolio', {
      ...editing,
      id: editing.id || slug,
      slug,
    } as unknown as Record<string, unknown>);
    setEditing(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="eyebrow-label">PORTFOLIO MANAGEMENT</p>
          <h1 className="font-serif text-4xl text-espresso mt-1">
            Projects ({data.portfolio.length})
          </h1>
        </div>
        <button
          type="button"
          onClick={startNew}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-wider"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {editing && (
        <form
          onSubmit={handleSave}
          className="bg-white border border-beige rounded-2xl p-6 space-y-4"
        >
          <h2 className="font-serif text-2xl text-espresso">
            {editing.id ? `Edit: ${editing.title}` : 'New Portfolio Project'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Project title"
              value={editing.title}
              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
            <select
              value={editing.category}
              onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            >
              {PORTFOLIO_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Location"
              value={editing.location}
              onChange={(e) => setEditing({ ...editing, location: e.target.value })}
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
            <input
              type="text"
              required
              placeholder="Cover image URL"
              value={editing.cover_image}
              onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })}
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
            <input
              type="url"
              placeholder="Instagram post URL (optional)"
              value={editing.instagram_post_url || ''}
              onChange={(e) =>
                setEditing({ ...editing, instagram_post_url: e.target.value })
              }
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
            <input
              type="text"
              placeholder="Services provided (comma-separated)"
              value={editing.services_provided.join(', ')}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  services_provided: e.target.value
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              className="rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Project description"
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
          />

          <textarea
            rows={3}
            placeholder="Gallery image URLs (one per line)"
            value={editing.gallery_images.join('\n')}
            onChange={(e) =>
              setEditing({
                ...editing,
                gallery_images: e.target.value.split('\n').filter(Boolean),
              })
            }
            className="w-full rounded-xl border border-beige bg-ivory/50 px-4 py-2.5 text-sm"
          />

          <div className="flex flex-wrap gap-6 text-xs">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={editing.published}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                className="accent-mocha"
              />
              <span>Published</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={Boolean(editing.is_demo)}
                onChange={(e) => setEditing({ ...editing, is_demo: e.target.checked })}
                className="accent-mocha"
              />
              <span>Mark as Concept Showcase (Demo)</span>
            </label>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-mocha text-white text-xs font-medium uppercase tracking-wider"
            >
              Save Project
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-6 py-2.5 rounded-full border border-beige text-xs"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.portfolio.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-beige rounded-2xl overflow-hidden flex flex-col justify-between"
          >
            <div>
              <img
                src={project.cover_image}
                alt={project.title}
                className="aspect-[4/3] w-full object-cover bg-cream"
              />
              <div className="p-4 space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-mocha">
                  {project.category} · {project.published ? 'Published' : 'Draft'}
                </p>
                <h3 className="font-serif text-xl text-espresso">{project.title}</h3>
              </div>
            </div>
            <div className="px-4 py-3 border-t border-beige flex items-center justify-between gap-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(project)}
                  className="px-3 py-1 rounded-lg border border-beige text-xs"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() =>
                    mutate('portfolio', { ...project, published: !project.published })
                  }
                  className="px-3 py-1 rounded-lg border border-beige text-xs"
                >
                  {project.published ? 'Unpublish' : 'Publish'}
                </button>
              </div>
              <button
                type="button"
                onClick={() => mutate('portfolio', { id: project.id }, 'delete')}
                className="p-1.5 text-muted hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
