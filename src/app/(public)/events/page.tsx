import Image from 'next/image';
import Link from 'next/link';
import { EVENT_CATEGORIES } from '@/lib/data';

export const metadata = {
  title: 'Events | Sai Durga Events',
  description:
    'Browse our full range of South Indian event types — weddings, Mehandi, Haldi, housewarmings, engagements and more.',
};

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-500 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Events</h1>
        <p className="text-primary-100 max-w-2xl mx-auto px-4">
          We specialise in all types of South Indian celebrations, each crafted with cultural
          authenticity and modern elegance.
        </p>
      </div>

      {/* Event grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {EVENT_CATEGORIES.map((ev) => (
              <div key={ev.slug} className="card group">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={ev.imageUrl}
                    alt={ev.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-4 left-4 text-4xl">{ev.icon}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">{ev.name}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{ev.description}</p>
                  <Link
                    href="/booking"
                    className="inline-block bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                  >
                    Book This Event
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Can&apos;t Find Your Event?</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          We handle all types of events. Reach out to us and we will create a customised package
          just for you.
        </p>
        <Link href="/contact" className="btn-primary">
          Contact Us
        </Link>
      </section>
    </div>
  );
}
