import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Booking, Inquiry, GalleryImage, Service, EventCategory } from '@/types';

// ─── Generic helpers ──────────────────────────────────────────────────────────

async function getCollection<T extends { id: string }>(
  collectionName: string,
  orderByField = 'createdAt',
): Promise<T[]> {
  const q = query(collection(db, collectionName), orderBy(orderByField, 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

async function getDocument<T extends { id: string }>(
  collectionName: string,
  id: string,
): Promise<T | null> {
  const snap = await getDoc(doc(db, collectionName, id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as T;
}

// ─── Event Categories ─────────────────────────────────────────────────────────

export const getEventCategories = () =>
  getCollection<EventCategory>('eventCategories', 'name');

export const getActiveEventCategories = async (): Promise<EventCategory[]> => {
  const q = query(
    collection(db, 'eventCategories'),
    where('isActive', '==', true),
    orderBy('name', 'asc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as EventCategory));
};

export const getEventCategoryBySlug = async (
  slug: string,
): Promise<EventCategory | null> => {
  const q = query(
    collection(db, 'eventCategories'),
    where('slug', '==', slug),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as EventCategory;
};

export const addEventCategory = (data: Omit<EventCategory, 'id'>) =>
  addDoc(collection(db, 'eventCategories'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

export const updateEventCategory = (
  id: string,
  data: Partial<EventCategory>,
) =>
  updateDoc(doc(db, 'eventCategories', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

export const deleteEventCategory = (id: string) =>
  deleteDoc(doc(db, 'eventCategories', id));

// ─── Services ────────────────────────────────────────────────────────────────

export const getServices = () => getCollection<Service>('services', 'name');

export const getActiveServices = async (): Promise<Service[]> => {
  const q = query(
    collection(db, 'services'),
    where('isActive', '==', true),
    orderBy('name', 'asc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service));
};

export const getServicesByCategory = async (
  category: string,
): Promise<Service[]> => {
  const q = query(
    collection(db, 'services'),
    where('category', '==', category),
    where('isActive', '==', true),
    orderBy('name', 'asc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Service));
};

export const addService = (data: Omit<Service, 'id'>) =>
  addDoc(collection(db, 'services'), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

export const updateService = (id: string, data: Partial<Service>) =>
  updateDoc(doc(db, 'services', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

export const deleteService = (id: string) =>
  deleteDoc(doc(db, 'services', id));

// ─── Gallery ──────────────────────────────────────────────────────────────────

export const getGalleryImages = () =>
  getCollection<GalleryImage>('gallery', 'order');

export const getFeaturedImages = async (): Promise<GalleryImage[]> => {
  const q = query(
    collection(db, 'gallery'),
    where('isFeatured', '==', true),
    orderBy('order', 'asc'),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as GalleryImage));
};

export const addGalleryImage = (data: Omit<GalleryImage, 'id'>) =>
  addDoc(collection(db, 'gallery'), { ...data, createdAt: serverTimestamp() });

export const updateGalleryImage = (id: string, data: Partial<GalleryImage>) =>
  updateDoc(doc(db, 'gallery', id), data);

export const deleteGalleryImage = (id: string) =>
  deleteDoc(doc(db, 'gallery', id));

// ─── Bookings ────────────────────────────────────────────────────────────────

export const getBookings = () => getCollection<Booking>('bookings');

export const getBooking = (id: string) =>
  getDocument<Booking>('bookings', id);

export const addBooking = (data: Omit<Booking, 'id'>) =>
  addDoc(collection(db, 'bookings'), {
    ...data,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

export const updateBooking = (id: string, data: Partial<Booking>) =>
  updateDoc(doc(db, 'bookings', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });

export const deleteBooking = (id: string) =>
  deleteDoc(doc(db, 'bookings', id));

// ─── Inquiries ────────────────────────────────────────────────────────────────

export const getInquiries = () => getCollection<Inquiry>('inquiries');

export const addInquiry = (data: Omit<Inquiry, 'id'>) =>
  addDoc(collection(db, 'inquiries'), {
    ...data,
    isRead: false,
    createdAt: serverTimestamp(),
  });

export const markInquiryAsRead = (id: string) =>
  updateDoc(doc(db, 'inquiries', id), { isRead: true });

export const deleteInquiry = (id: string) =>
  deleteDoc(doc(db, 'inquiries', id));

// ─── Dashboard stats ──────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [bookingsSnap, inquiriesSnap, gallerySnap, servicesSnap] =
    await Promise.all([
      getDocs(collection(db, 'bookings')),
      getDocs(
        query(
          collection(db, 'inquiries'),
          where('isRead', '==', false),
        ),
      ),
      getDocs(collection(db, 'gallery')),
      getDocs(collection(db, 'services')),
    ]);

  const bookings = bookingsSnap.docs.map((d) => d.data() as DocumentData);
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(
    (b) => b.status === 'confirmed',
  ).length;

  return {
    totalBookings: bookingsSnap.size,
    pendingBookings,
    confirmedBookings,
    unreadInquiries: inquiriesSnap.size,
    totalGalleryImages: gallerySnap.size,
    totalServices: servicesSnap.size,
  };
}
