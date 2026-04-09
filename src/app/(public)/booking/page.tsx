'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addBooking } from '@/lib/firestore';
import { EVENT_CATEGORIES, SERVICES_DATA } from '@/lib/data';
import type { Booking } from '@/types';
import { MdCheckCircle } from 'react-icons/md';

type FormData = Omit<Booking, 'id' | 'status' | 'createdAt' | 'updatedAt'> & {
  selectedServices: string[];
};

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { selectedServices: [] },
  });

  const selectedServices = watch('selectedServices') as string[];

  const toggleService = (serviceId: string) => {
    const current = selectedServices || [];
    const updated = current.includes(serviceId)
      ? current.filter((s) => s !== serviceId)
      : [...current, serviceId];
    setValue('selectedServices', updated);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await addBooking({ ...data, status: 'pending' });
      setSubmitted(true);
      toast.success('Booking request submitted successfully!');
    } catch {
      toast.error('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <MdCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Booking Request Received!</h2>
          <p className="text-gray-500 mb-6">
            Thank you! Our team will contact you within 24 hours to confirm your booking and discuss
            the details.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn-primary"
          >
            Submit Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-500 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Event</h1>
        <p className="text-primary-100 max-w-2xl mx-auto px-4">
          Fill in the details below and our event specialists will get back to you within 24 hours
          with a personalised quote.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-md p-8 space-y-6"
        >
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Personal Information</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name *</label>
              <input
                {...register('clientName', { required: 'Name is required' })}
                className="form-input"
                placeholder="Your full name"
              />
              {errors.clientName && (
                <p className="text-red-500 text-xs mt-1">{errors.clientName.message}</p>
              )}
            </div>
            <div>
              <label className="form-label">Phone Number *</label>
              <input
                {...register('clientPhone', {
                  required: 'Phone is required',
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number' },
                })}
                className="form-input"
                placeholder="+91 XXXXX XXXXX"
                type="tel"
              />
              {errors.clientPhone && (
                <p className="text-red-500 text-xs mt-1">{errors.clientPhone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Email Address *</label>
            <input
              {...register('clientEmail', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
              })}
              className="form-input"
              placeholder="your@email.com"
              type="email"
            />
            {errors.clientEmail && (
              <p className="text-red-500 text-xs mt-1">{errors.clientEmail.message}</p>
            )}
          </div>

          <h2 className="text-xl font-bold text-gray-800 border-b pb-3 pt-2">Event Details</h2>

          <div>
            <label className="form-label">Event Type *</label>
            <select
              {...register('eventCategory', { required: 'Please select an event type' })}
              className="form-input"
            >
              <option value="">Select event type</option>
              {EVENT_CATEGORIES.map((ev) => (
                <option key={ev.slug} value={ev.slug}>
                  {ev.icon} {ev.name}
                </option>
              ))}
            </select>
            {errors.eventCategory && (
              <p className="text-red-500 text-xs mt-1">{errors.eventCategory.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Event Date *</label>
              <input
                {...register('eventDate', { required: 'Event date is required' })}
                className="form-input"
                type="date"
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.eventDate && (
                <p className="text-red-500 text-xs mt-1">{errors.eventDate.message}</p>
              )}
            </div>
            <div>
              <label className="form-label">Number of Guests *</label>
              <input
                {...register('numberOfGuests', {
                  required: 'Guest count is required',
                  min: { value: 10, message: 'Minimum 10 guests' },
                })}
                className="form-input"
                type="number"
                placeholder="e.g. 200"
                min="10"
              />
              {errors.numberOfGuests && (
                <p className="text-red-500 text-xs mt-1">{errors.numberOfGuests.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="form-label">Venue / Location *</label>
            <input
              {...register('eventVenue', { required: 'Venue is required' })}
              className="form-input"
              placeholder="Event venue or city"
            />
            {errors.eventVenue && (
              <p className="text-red-500 text-xs mt-1">{errors.eventVenue.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Approximate Budget</label>
            <select {...register('totalBudget')} className="form-input">
              <option value="">Select budget range</option>
              <option value="below-1L">Below ₹1 Lakh</option>
              <option value="1L-3L">₹1 – 3 Lakhs</option>
              <option value="3L-7L">₹3 – 7 Lakhs</option>
              <option value="7L-15L">₹7 – 15 Lakhs</option>
              <option value="above-15L">Above ₹15 Lakhs</option>
            </select>
          </div>

          <h2 className="text-xl font-bold text-gray-800 border-b pb-3 pt-2">Select Services</h2>
          <p className="text-gray-500 text-sm -mt-4">
            Choose the services you are interested in (optional):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SERVICES_DATA.map((svc) => {
              const isSelected = selectedServices?.includes(svc.name);
              return (
                <button
                  key={svc.name}
                  type="button"
                  onClick={() => toggleService(svc.name)}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 text-left transition-colors ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-primary-300 text-gray-700'
                  }`}
                >
                  <span className="text-2xl">{svc.icon}</span>
                  <span className="text-sm font-medium">{svc.name}</span>
                </button>
              );
            })}
          </div>

          <div>
            <label className="form-label">Additional Notes</label>
            <textarea
              {...register('additionalNotes')}
              className="form-input resize-none"
              rows={4}
              placeholder="Any specific requirements, themes, or questions..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary text-base disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit Booking Request'}
          </button>
        </form>
      </div>
    </div>
  );
}
