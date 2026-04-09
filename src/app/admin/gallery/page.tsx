'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getGalleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/lib/firestore';
import type { GalleryImage } from '@/types';
import toast from 'react-hot-toast';
import { EVENT_CATEGORIES } from '@/lib/data';
import { MdAdd, MdDelete, MdClose, MdCheck, MdStar, MdStarBorder } from 'react-icons/md';

const EMPTY_FORM: Omit<GalleryImage, 'id'> = {
  url: '',
  caption: '',
  eventCategory: '',
  isFeatured: false,
  order: 0,
};

export default function GalleryAdminPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<GalleryImage, 'id'>>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      setImages(await getGalleryImages());
    } catch {
      toast.error('Failed to load gallery');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleSave = async () => {
    if (!form.url || !form.caption || !form.eventCategory) {
      toast.error('URL, caption and category are required');
      return;
    }
    setSaving(true);
    try {
      await addGalleryImage(form);
      toast.success('Image added to gallery');
      setShowForm(false);
      setForm(EMPTY_FORM);
      await fetchImages();
    } catch {
      toast.error('Failed to add image');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this image from the gallery?')) return;
    try {
      await deleteGalleryImage(id);
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success('Image removed');
    } catch {
      toast.error('Failed to remove image');
    }
  };

  const toggleFeatured = async (img: GalleryImage) => {
    try {
      await updateGalleryImage(img.id, { isFeatured: !img.isFeatured });
      setImages((prev) =>
        prev.map((i) => (i.id === img.id ? { ...i, isFeatured: !img.isFeatured } : i)),
      );
      toast.success(img.isFeatured ? 'Removed from featured' : 'Added to featured');
    } catch {
      toast.error('Failed to update image');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gallery</h1>
          <p className="text-gray-500 text-sm">{images.length} image(s)</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center gap-2 text-sm py-2">
          <MdAdd className="text-lg" /> Add Image
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="admin-card mb-6 border-2 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Add Gallery Image</h2>
            <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
              <MdClose className="text-xl" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="form-label">Image URL *</label>
              <input
                className="form-input"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="form-label">Caption *</label>
              <input
                className="form-input"
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                placeholder="Image caption"
              />
            </div>
            <div>
              <label className="form-label">Event Category *</label>
              <select
                className="form-input"
                value={form.eventCategory}
                onChange={(e) => setForm({ ...form, eventCategory: e.target.value })}
              >
                <option value="">Select category</option>
                {EVENT_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Display Order</label>
              <input
                type="number"
                className="form-input"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={form.isFeatured}
                onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                className="w-4 h-4 accent-primary-600"
              />
              <label htmlFor="featured" className="text-sm text-gray-700">Featured image</label>
            </div>
          </div>
          {form.url && (
            <div className="mt-4 relative h-40 rounded-xl overflow-hidden border border-gray-200">
              <Image src={form.url} alt="Preview" fill className="object-cover" unoptimized />
            </div>
          )}
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2 text-sm py-2 disabled:opacity-60"
            >
              <MdCheck /> {saving ? 'Saving...' : 'Add to Gallery'}
            </button>
            <button onClick={() => setShowForm(false)} className="btn-secondary text-sm py-2">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">Loading gallery...</div>
      ) : images.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No images yet. Add your first gallery image.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="admin-card p-0 overflow-hidden group">
              <div className="relative h-44">
                <Image
                  src={img.url}
                  alt={img.caption}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => toggleFeatured(img)}
                    className={`p-1.5 rounded-full transition-colors ${
                      img.isFeatured
                        ? 'bg-yellow-400 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-yellow-100'
                    }`}
                    title={img.isFeatured ? 'Remove from featured' : 'Add to featured'}
                  >
                    {img.isFeatured ? <MdStar /> : <MdStarBorder />}
                  </button>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-1.5 rounded-full bg-white/80 text-red-500 hover:bg-red-100 transition-colors"
                    title="Delete image"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate">{img.caption}</p>
                <p className="text-xs text-gray-400 capitalize mt-0.5">
                  {EVENT_CATEGORIES.find((e) => e.slug === img.eventCategory)?.name ?? img.eventCategory}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
