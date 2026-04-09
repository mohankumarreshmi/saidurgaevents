'use client';

import { useEffect, useState } from 'react';
import { getDashboardStats } from '@/lib/firestore';
import Link from 'next/link';
import {
  MdBookOnline,
  MdPendingActions,
  MdCheckCircle,
  MdMessage,
  MdPhotoLibrary,
  MdBuild,
} from 'react-icons/md';

interface Stats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  unreadInquiries: number;
  totalGalleryImages: number;
  totalServices: number;
}

const STAT_CARDS = (stats: Stats) => [
  {
    label: 'Total Bookings',
    value: stats.totalBookings,
    icon: MdBookOnline,
    color: 'bg-blue-50 text-blue-600',
    href: '/admin/bookings',
  },
  {
    label: 'Pending Bookings',
    value: stats.pendingBookings,
    icon: MdPendingActions,
    color: 'bg-yellow-50 text-yellow-600',
    href: '/admin/bookings',
  },
  {
    label: 'Confirmed Bookings',
    value: stats.confirmedBookings,
    icon: MdCheckCircle,
    color: 'bg-green-50 text-green-600',
    href: '/admin/bookings',
  },
  {
    label: 'Unread Inquiries',
    value: stats.unreadInquiries,
    icon: MdMessage,
    color: 'bg-red-50 text-red-600',
    href: '/admin/inquiries',
  },
  {
    label: 'Gallery Images',
    value: stats.totalGalleryImages,
    icon: MdPhotoLibrary,
    color: 'bg-purple-50 text-purple-600',
    href: '/admin/gallery',
  },
  {
    label: 'Active Services',
    value: stats.totalServices,
    icon: MdBuild,
    color: 'bg-indigo-50 text-indigo-600',
    href: '/admin/services',
  },
];

const QUICK_LINKS = [
  { label: 'View All Bookings', href: '/admin/bookings', color: 'bg-blue-600' },
  { label: 'Manage Services', href: '/admin/services', color: 'bg-indigo-600' },
  { label: 'Manage Gallery', href: '/admin/gallery', color: 'bg-purple-600' },
  { label: 'View Inquiries', href: '/admin/inquiries', color: 'bg-red-600' },
  { label: 'Visit Website', href: '/', color: 'bg-gray-600' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    unreadInquiries: 0,
    totalGalleryImages: 0,
    totalServices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard</h1>
      <p className="text-gray-500 text-sm mb-8">
        Welcome back! Here&apos;s an overview of your events business.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        {STAT_CARDS(stats).map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="admin-card hover:shadow-md transition-shadow flex items-center gap-4">
              <div className={`p-3 rounded-xl ${card.color}`}>
                <Icon className="text-2xl" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.label}</p>
                <p className="text-3xl font-bold text-gray-800">
                  {loading ? '—' : card.value}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div className="admin-card">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`${l.color} text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
