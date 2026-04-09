import Link from 'next/link';
import { GiIndiaGate } from 'react-icons/gi';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GiIndiaGate className="text-primary-400 text-3xl" />
              <div>
                <p className="font-heading font-bold text-white text-lg leading-tight">
                  Sai Durga Events
                </p>
                <p className="text-xs text-gray-400 leading-tight">South Indian Event Specialists</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Creating timeless memories through authentic South Indian event management. From weddings
              to housewarmings, we bring your vision to life.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-pink-400 transition-colors">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-400 transition-colors">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-red-400 transition-colors">
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/events', label: 'Our Events' },
                { href: '/services', label: 'Services' },
                { href: '/gallery', label: 'Gallery' },
                { href: '/about', label: 'About Us' },
                { href: '/booking', label: 'Book Now' },
                { href: '/contact', label: 'Contact Us' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event types */}
          <div>
            <h3 className="text-white font-semibold mb-4">Event Types</h3>
            <ul className="space-y-2 text-sm">
              {[
                'Wedding Ceremonies',
                'Engagement Functions',
                'Mehandi & Haldi',
                'House Warming',
                'Office Inauguration',
                'Birthday & Baby Shower',
              ].map((e) => (
                <li key={e} className="text-gray-400">
                  {e}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-primary-400 mt-1 shrink-0" />
                <span>Hyderabad, Telangana, India</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-primary-400 shrink-0" />
                <a href="tel:+919000000000" className="hover:text-primary-400 transition-colors">
                  +91 90000 00000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-primary-400 shrink-0" />
                <a
                  href="mailto:info@saidurgaevents.com"
                  className="hover:text-primary-400 transition-colors"
                >
                  info@saidurgaevents.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <p className="text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Sai Durga Events. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
