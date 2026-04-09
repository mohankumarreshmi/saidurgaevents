import Image from 'next/image';
import Link from 'next/link';
import { MdCheckCircle } from 'react-icons/md';
import { FaAward, FaUsers, FaHandshake } from 'react-icons/fa';

export const metadata = {
  title: 'About Us | Sai Durga Events',
  description:
    'Learn about Sai Durga Events — South India\'s trusted event management team with 15+ years of experience.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-500 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-primary-100 max-w-2xl mx-auto px-4">
          15+ years of creating unforgettable South Indian celebrations with passion and expertise.
        </p>
      </div>

      {/* Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Sai Durga Events was founded with a single mission: to bring the rich traditions and
                vibrant culture of South Indian celebrations to life. What began as a small family
                venture has grown into one of Hyderabad&apos;s most trusted event management
                companies.
              </p>
              <p>
                Over the past 15 years, we have had the honour of organising more than 500 events —
                from intimate Mehandi ceremonies to grand weddings with thousands of guests. Each
                event is treated with the same level of dedication, creativity, and care.
              </p>
              <p>
                Our deep understanding of Telugu and South Indian customs allows us to execute every
                ritual flawlessly while integrating modern aesthetics to create an experience that
                is both traditional and timeless.
              </p>
            </div>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80"
              alt="Our team at a wedding"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaAward className="text-primary-500 text-4xl" />,
                title: 'Excellence',
                description:
                  'We hold ourselves to the highest standards in everything we do — from the smallest detail to the grandest decoration.',
              },
              {
                icon: <FaHandshake className="text-primary-500 text-4xl" />,
                title: 'Trust & Transparency',
                description:
                  'We believe in open communication and honest pricing. No hidden costs, no surprises — just trusted partnerships.',
              },
              {
                icon: <FaUsers className="text-primary-500 text-4xl" />,
                title: 'Family First',
                description:
                  'We treat every client like family. Your celebrations are our celebrations, and your joy is our greatest reward.',
              },
            ].map((v) => (
              <div key={v.title} className="card p-8 text-center">
                <div className="flex justify-center mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl order-last lg:order-first">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
              alt="Event setup"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What Sets Us Apart</h2>
            <ul className="space-y-3">
              {[
                'Experts in South Indian wedding traditions and customs',
                'In-house Nadaswaram and orchestral arrangements',
                'Extensive network of floral artists and décor specialists',
                'Dedicated event coordinator for every booking',
                'Real-time WhatsApp updates during the event',
                'Customised packages for every budget',
                '100% satisfaction guarantee',
              ].map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <MdCheckCircle className="text-primary-500 text-xl mt-0.5 shrink-0" />
                  <span className="text-gray-700">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Let&apos;s Create Something Beautiful Together</h2>
        <p className="text-primary-100 mb-8 max-w-xl mx-auto">
          Contact us today to start planning your dream event with our experienced team.
        </p>
        <Link href="/booking" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-3 rounded-full transition-colors">
          Book a Consultation
        </Link>
      </section>
    </div>
  );
}
