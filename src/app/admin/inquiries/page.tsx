'use client';

import { useEffect, useState } from 'react';
import { getInquiries, markInquiryAsRead, deleteInquiry } from '@/lib/firestore';
import type { Inquiry } from '@/types';
import toast from 'react-hot-toast';
import { MdMarkEmailRead, MdDelete, MdRefresh } from 'react-icons/md';

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      setInquiries(await getInquiries());
    } catch {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, []);

  const handleMarkRead = async (id: string) => {
    try {
      await markInquiryAsRead(id);
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, isRead: true } : i)));
    } catch {
      toast.error('Failed to mark as read');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      toast.success('Inquiry deleted');
    } catch {
      toast.error('Failed to delete inquiry');
    }
  };

  const filtered =
    filter === 'all'
      ? inquiries
      : filter === 'unread'
      ? inquiries.filter((i) => !i.isRead)
      : inquiries.filter((i) => i.isRead);

  const unreadCount = inquiries.filter((i) => !i.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inquiries</h1>
          <p className="text-gray-500 text-sm">
            {inquiries.length} total · {unreadCount} unread
          </p>
        </div>
        <button
          onClick={fetchInquiries}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600"
        >
          <MdRefresh className="text-lg" /> Refresh
        </button>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {(['all', 'unread', 'read'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              filter === f
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {f === 'all' ? `All (${inquiries.length})` : f === 'unread' ? `Unread (${unreadCount})` : `Read (${inquiries.length - unreadCount})`}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400 animate-pulse">Loading inquiries...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No inquiries found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((inq) => (
            <div
              key={inq.id}
              className={`admin-card transition-all ${!inq.isRead ? 'border-l-4 border-l-primary-500' : ''}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-gray-800">{inq.name}</h3>
                    {!inq.isRead && (
                      <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 mb-2 space-x-4">
                    <span>✉️ {inq.email}</span>
                    {inq.phone && <span>📞 {inq.phone}</span>}
                    {inq.subject && <span className="capitalize">📌 {inq.subject}</span>}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {inq.message}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!inq.isRead && (
                    <button
                      onClick={() => handleMarkRead(inq.id)}
                      className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-600 border border-gray-200 hover:border-green-400 px-3 py-1.5 rounded-lg transition-colors"
                      title="Mark as read"
                    >
                      <MdMarkEmailRead /> Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(inq.id)}
                    className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <MdDelete />
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
