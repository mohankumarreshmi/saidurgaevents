import Link from 'next/link';
import Image from 'next/image';
import { EVENT_CATEGORIES, SERVICES_DATA, TESTIMONIALS } from '@/lib/data';
import { FaStar } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';

export default function HomePage() {
  const featuredEvents = EVENT_CATEGORIES.slice(0, 6);
  const featuredServices = SERVICES_DATA.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <p className="text-primary-300 font-semibold tracking-widest uppercase text-sm mb-4">
            South Indian Event Specialists
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Creating{' '}
            <span className="text-primary-400">Timeless</span>
            <br />
            Celebrations
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            From grand South Indian weddings to intimate Mehandi ceremonies — we bring your vision to
            life with passion, authenticity, and unmatched attention to detail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="btn-primary text-base">
              Book Your Event
            </Link>
            <Link
              href="/events"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-6 py-3 rounded-full transition-all duration-200"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary-600 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { value: '500+', label: 'Events Organised' },
              { value: '15+', label: 'Years Experience' },
              { value: '50+', label: 'Expert Team' },
              { value: '99%', label: 'Client Satisfaction' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-bold">{s.value}</p>
                <p className="text-primary-100 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Events We Specialise In</h2>
          <p className="section-subtitle">
            From traditional South Indian weddings to modern corporate events — we cover every
            occasion with grace and expertise.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((ev) => (
              <Link key={ev.slug} href={`/events`} className="card group block">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={ev.imageUrl}
                    alt={ev.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute top-3 left-3 text-3xl">{ev.icon}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg text-gray-800 mb-2">{ev.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{ev.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/events" className="btn-secondary inline-block">
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Services highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Premium Services</h2>
          <p className="section-subtitle">
            We offer a full suite of event services — from traditional Nadaswaram bands to cinematic
            wedding films.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map((svc) => (
              <div key={svc.name} className="card p-6 text-center">
                <span className="text-5xl mb-4 block">{svc.icon}</span>
                <h3 className="font-bold text-gray-800 mb-2">{svc.name}</h3>
                <p className="text-gray-500 text-sm mb-3 leading-relaxed">{svc.description}</p>
                <p className="text-primary-600 font-semibold text-sm">{svc.priceRange}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-primary inline-block">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Why Choose Sai Durga Events?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With over 15 years of experience in South Indian event management, we bring deep
                cultural knowledge, professional expertise, and heartfelt dedication to every
                celebration we organise.
              </p>
              <ul className="space-y-4">
                {[
                  'Deep expertise in South Indian traditions and customs',
                  'End-to-end event management from planning to execution',
                  'Extensive network of trusted vendors across Hyderabad',
                  'Customised packages to fit every budget',
                  'Experienced team of 50+ event professionals',
                  'Real-time updates and transparent communication',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <MdCheckCircle className="text-primary-600 text-xl mt-0.5 shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
              <Link href="/about" className="btn-primary inline-block mt-8">
                Learn More About Us
              </Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
                alt="South Indian wedding ceremony"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">
            Real stories from families who trusted us to make their special day unforgettable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-800">{t.name}</p>
                  <p className="text-sm text-primary-600">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Plan Your Dream Event?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Get in touch today for a free consultation and personalised quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
