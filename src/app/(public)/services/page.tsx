import { SERVICE_CATEGORIES, SERVICES_DATA } from '@/lib/data';
import Link from 'next/link';
import { MdCheckCircle } from 'react-icons/md';

export const metadata = {
  title: 'Services | Sai Durga Events',
  description:
    'Explore our full suite of South Indian event services — Nadaswaram bands, orchestras, classical dance, photography, catering and more.',
};

export default function ServicesPage() {
  const categories = SERVICE_CATEGORIES.map((cat) => ({
    ...cat,
    services: SERVICES_DATA.filter((s) => s.category === cat.value),
  })).filter((cat) => cat.services.length > 0);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-700 to-secondary-500 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-secondary-100 max-w-2xl mx-auto px-4">
          From traditional Nadaswaram bands to cinematic videography — we offer everything you need
          for a perfect South Indian celebration.
        </p>
      </div>

      {/* Services by category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {categories.map((cat) => (
          <section key={cat.value}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 border-l-4 border-primary-500 pl-4">
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.services.map((svc) => (
                <div
                  key={svc.name}
                  className="card p-6 flex flex-col"
                >
                  <span className="text-4xl mb-4 block">{svc.icon}</span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{svc.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-grow">
                    {svc.description}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <MdCheckCircle className="text-primary-500 mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-primary-600 font-semibold text-sm">{svc.priceRange}</span>
                    <Link
                      href="/booking"
                      className="bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Custom quote CTA */}
      <section className="bg-gray-50 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Need a Custom Package?</h2>
        <p className="text-gray-500 mb-6 max-w-xl mx-auto">
          Tell us about your event and we will put together a fully customised service package
          within your budget.
        </p>
        <Link href="/contact" className="btn-primary">
          Get a Free Quote
        </Link>
      </section>
    </div>
  );
}
