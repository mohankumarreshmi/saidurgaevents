'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import {
  MdDashboard,
  MdEventNote,
  MdBookOnline,
  MdBuild,
  MdPhotoLibrary,
  MdMessage,
  MdLogout,
} from 'react-icons/md';
import { GiIndiaGate } from 'react-icons/gi';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: MdDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: MdBookOnline },
  { href: '/admin/services', label: 'Services', icon: MdBuild },
  { href: '/admin/gallery', label: 'Gallery', icon: MdPhotoLibrary },
  { href: '/admin/inquiries', label: 'Inquiries', icon: MdMessage },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <GiIndiaGate className="text-primary-400 text-2xl" />
          <div>
            <p className="font-semibold text-sm">Sai Durga Events</p>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/admin' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="text-lg" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white w-full transition-colors"
        >
          <MdLogout className="text-lg" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
