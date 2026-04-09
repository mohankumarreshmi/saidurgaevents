'use client';

import Link from 'next/link';
import { useState } from 'react';
import { GiIndiaGate } from 'react-icons/gi';
import { HiMenu, HiX } from 'react-icons/hi';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <GiIndiaGate className="text-primary-600 text-3xl group-hover:text-primary-700 transition-colors" />
            <div>
              <p className="font-heading font-bold text-primary-700 text-lg leading-tight">
                Sai Durga Events
              </p>
              <p className="text-xs text-gray-500 leading-tight">South Indian Event Specialists</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-gray-700 hover:text-primary-600 font-medium text-sm transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2 pt-3">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-gray-700 hover:text-primary-600 font-medium px-2 py-1.5 rounded transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="bg-primary-600 text-white text-center px-4 py-2 rounded-full text-sm font-semibold mt-2"
                onClick={() => setMenuOpen(false)}
              >
                Book Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
