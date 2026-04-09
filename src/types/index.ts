import { Timestamp } from 'firebase/firestore';

export interface EventCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  priceRange: string;
  isActive: boolean;
  features: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  eventCategory: string;
  isFeatured: boolean;
  order: number;
  createdAt?: Timestamp;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventCategory: string;
  eventDate: string;
  eventVenue: string;
  numberOfGuests: number;
  selectedServices: string[];
  additionalNotes: string;
  status: BookingStatus;
  totalBudget?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  isRead: boolean;
  createdAt?: Timestamp;
}

export interface AdminUser {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'superadmin';
}
