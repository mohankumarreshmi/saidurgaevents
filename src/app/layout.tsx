import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/components/AuthProvider';
import './globals.css';

// This app uses Firebase (client-side only); disable static prerendering
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Sai Durga Events – South Indian Event Management',
  description:
    'Professional event management for weddings, engagements, Mehandi, Haldi, house warmings, and South Indian cultural functions in Hyderabad.',
  keywords:
    'South Indian events, wedding planner Hyderabad, Mehandi ceremony, Haldi function, Nadaswaram band, orchestra, house warming',
  openGraph: {
    title: 'Sai Durga Events',
    description: 'Creating timeless memories through authentic South Indian event management.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
