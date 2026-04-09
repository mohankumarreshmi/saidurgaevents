'use client';

import { useEffect, useState } from 'react';
import { getBookings, updateBooking, deleteBooking } from '@/lib/firestore';
import type { Booking, BookingStatus } from '@/types';
import toast from 'react-hot-toast';
import { EVENT_CATEGORIES } from '@/lib/data';
import { MdDelete, MdRefresh } from 'react-icons/md';

const STATUS_COLORS: Record<BookingStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
  completed: 'bg-blue-100 text-blue-700',
};

export default function BookingsAdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | BookingStatus>('all');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const data = await getBookings();
      setBookings(data);
    } catch {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleStatusChange = async (id: string, status: BookingStatus) => {
    try {
      await updateBooking(id, { status });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b)),
      );
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this booking? This action cannot be undone.')) return;
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
      toast.success('Booking deleted');
    } catch {
      toast.error('Failed to delete booking');
    }
  };

  const getEventLabel = (slug: string) =>
    EVENT_CATEGORIES.find((e) => e.slug === slug)?.name ?? slug;

  const filtered =
    filter === 'all' ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
          <p className="text-gray-500 text-sm">{bookings.length} total booking(s)</p>
        </div>
        <button onClick={fetchBookings} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600">
          <MdRefresh className="text-lg" /> Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              filter === s
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">Loading bookings...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No bookings found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((b) => (
            <div key={b.id} className="admin-card">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">{b.clientName}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${STATUS_COLORS[b.status]}`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-600">
                    <p>📞 {b.clientPhone}</p>
                    <p>✉️ {b.clientEmail}</p>
                    <p>🎉 {getEventLabel(b.eventCategory)}</p>
                    <p>📅 {b.eventDate}</p>
                    <p>📍 {b.eventVenue}</p>
                    <p>👥 {b.numberOfGuests} guests</p>
                    {b.totalBudget && <p>💰 {b.totalBudget}</p>}
                  </div>
                  {b.selectedServices?.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      Services: {b.selectedServices.join(', ')}
                    </p>
                  )}
                  {b.additionalNotes && (
                    <p className="text-sm text-gray-500 mt-2 italic">&ldquo;{b.additionalNotes}&rdquo;</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 min-w-fit">
                  <select
                    value={b.status}
                    onChange={(e) =>
                      handleStatusChange(b.id, e.target.value as BookingStatus)
                    }
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-400"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="flex items-center justify-center gap-1 text-red-500 hover:text-red-700 text-sm border border-red-200 hover:border-red-400 rounded-lg px-3 py-1.5 transition-colors"
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
