'use client';

import { useEffect, useState } from 'react';
import { getServices, addService, updateService, deleteService } from '@/lib/firestore';
import type { Service } from '@/types';
import toast from 'react-hot-toast';
import { SERVICE_CATEGORIES } from '@/lib/data';
import { MdAdd, MdDelete, MdEdit, MdClose, MdCheck } from 'react-icons/md';

const EMPTY_FORM: Omit<Service, 'id'> = {
  name: '',
  category: '',
  description: '',
  imageUrl: '',
  priceRange: '',
  isActive: true,
  features: [],
};

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, 'id'>>(EMPTY_FORM);
  const [featuresInput, setFeaturesInput] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      setServices(await getServices());
    } catch {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFeaturesInput('');
    setShowForm(true);
  };

  const openEdit = (svc: Service) => {
    setEditing(svc);
    setForm({
      name: svc.name,
      category: svc.category,
      description: svc.description,
      imageUrl: svc.imageUrl,
      priceRange: svc.priceRange,
      isActive: svc.isActive,
      features: svc.features,
    });
    setFeaturesInput(svc.features.join('\n'));
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.description) {
      toast.error('Name, category and description are required');
      return;
    }
    setSaving(true);
    const data = {
      ...form,
      features: featuresInput.split('\n').map((f) => f.trim()).filter(Boolean),
    };
    try {
      if (editing) {
        await updateService(editing.id, data);
        toast.success('Service updated');
      } else {
        await addService(data);
        toast.success('Service added');
      }
      await fetchServices();
      closeForm();
    } catch {
      toast.error('Failed to save service');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success('Service deleted');
    } catch {
      toast.error('Failed to delete service');
    }
  };

  const toggleActive = async (svc: Service) => {
    try {
      await updateService(svc.id, { isActive: !svc.isActive });
      setServices((prev) =>
        prev.map((s) => (s.id === svc.id ? { ...s, isActive: !svc.isActive } : s)),
      );
    } catch {
      toast.error('Failed to update service');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Services</h1>
          <p className="text-gray-500 text-sm">{services.length} service(s)</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm py-2">
          <MdAdd className="text-lg" /> Add Service
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="admin-card mb-6 border-2 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">
              {editing ? 'Edit Service' : 'Add New Service'}
            </h2>
            <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <MdClose className="text-xl" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Service Name *</label>
              <input
                className="form-input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Nadaswaram Band"
              />
            </div>
            <div>
              <label className="form-label">Category *</label>
              <select
                className="form-input"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option value="">Select category</option>
                {SERVICE_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Description *</label>
              <textarea
                className="form-input resize-none"
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Service description"
              />
            </div>
            <div>
              <label className="form-label">Price Range</label>
              <input
                className="form-input"
                value={form.priceRange}
                onChange={(e) => setForm({ ...form, priceRange: e.target.value })}
                placeholder="e.g. ₹15,000 – ₹40,000"
              />
            </div>
            <div>
              <label className="form-label">Image URL</label>
              <input
                className="form-input"
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Features (one per line)</label>
              <textarea
                className="form-input resize-none"
                rows={4}
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 accent-primary-600"
              />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2 text-sm py-2 disabled:opacity-60"
            >
              <MdCheck /> {saving ? 'Saving...' : 'Save Service'}
            </button>
            <button onClick={closeForm} className="btn-secondary text-sm py-2">Cancel</button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">Loading...</div>
      ) : services.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No services found. Add your first service.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc) => (
            <div key={svc.id} className="admin-card flex flex-col">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{svc.name}</h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    svc.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {svc.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-xs text-primary-600 mb-2 capitalize">
                {SERVICE_CATEGORIES.find((c) => c.value === svc.category)?.label ?? svc.category}
              </p>
              <p className="text-gray-500 text-sm flex-grow mb-3">{svc.description}</p>
              {svc.priceRange && (
                <p className="text-sm font-medium text-primary-600 mb-4">{svc.priceRange}</p>
              )}
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => openEdit(svc)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 border border-gray-200 hover:border-primary-400 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => toggleActive(svc)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-yellow-600 border border-gray-200 hover:border-yellow-400 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {svc.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button
                  onClick={() => handleDelete(svc.id)}
                  className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors ml-auto"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
