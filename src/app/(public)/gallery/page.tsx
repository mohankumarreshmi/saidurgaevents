'use client';

import Image from 'next/image';
import { useState } from 'react';
import { EVENT_CATEGORIES } from '@/lib/data';

const GALLERY_ITEMS = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
    caption: 'Grand Wedding Ceremony',
    category: 'wedding',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80',
    caption: 'Elegant Engagement Ring Exchange',
    category: 'engagement',
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c?w=600&q=80',
    caption: 'Beautiful Mehandi Ceremony',
    category: 'mehandi',
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1591861937702-c4c3d50f52e1?w=600&q=80',
    caption: 'Joyful Haldi Function',
    category: 'haldi',
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80',
    caption: 'House Warming Ceremony',
    category: 'house-warming',
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80',
    caption: 'Grand Birthday Celebration',
    category: 'birthday',
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
    caption: 'Traditional Bride Ceremony',
    category: 'bride-groom-functions',
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    caption: 'Corporate Gala Night',
    category: 'corporate',
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&q=80',
    caption: 'Baby Shower Celebration',
    category: 'baby-shower',
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    caption: 'Office Inauguration',
    category: 'office-warming',
  },
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
    caption: 'Wedding Reception Decor',
    category: 'wedding',
  },
  {
    id: '12',
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80',
    caption: 'Floral Stage Decoration',
    category: 'engagement',
  },
];

const FILTER_OPTIONS = [
  { value: 'all', label: 'All Events' },
  ...EVENT_CATEGORIES.map((e) => ({ value: e.slug, label: e.name })),
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered =
    activeFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((img) => img.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
        <p className="text-gray-300 max-w-2xl mx-auto px-4">
          A glimpse into the beautiful events we have had the privilege to organise.
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((img) => (
            <div
              key={img.id}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
              onClick={() => setLightbox(img.url)}
            >
              <Image
                src={img.url}
                alt={img.caption}
                width={600}
                height={400}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 rounded-xl flex items-end p-4">
                <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-20 text-lg">
            No images in this category yet.
          </p>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full">
            <Image
              src={lightbox}
              alt="Gallery image"
              fill
              className="object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
