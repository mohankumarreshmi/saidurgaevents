'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addInquiry } from '@/lib/firestore';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setLoading(true);
    try {
      await addInquiry({ ...data, isRead: false });
      setSubmitted(true);
      reset();
      toast.success('Message sent successfully!');
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-300 max-w-2xl mx-auto px-4">
          Have questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond
          within 24 hours.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          <div className="space-y-6 mb-8">
            {[
              {
                icon: <FaPhone className="text-primary-600 text-xl" />,
                title: 'Phone',
                content: '+91 90000 00000',
                link: 'tel:+919000000000',
              },
              {
                icon: <FaEnvelope className="text-primary-600 text-xl" />,
                title: 'Email',
                content: 'info@saidurgaevents.com',
                link: 'mailto:info@saidurgaevents.com',
              },
              {
                icon: <FaMapMarkerAlt className="text-primary-600 text-xl" />,
                title: 'Location',
                content: 'Hyderabad, Telangana, India',
              },
              {
                icon: <FaClock className="text-primary-600 text-xl" />,
                title: 'Working Hours',
                content: 'Mon – Sat: 9:00 AM – 7:00 PM',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="bg-primary-50 p-3 rounded-full">{item.icon}</div>
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  {item.link ? (
                    <a href={item.link} className="text-gray-500 hover:text-primary-600 transition-colors">
                      {item.content}
                    </a>
                  ) : (
                    <p className="text-gray-500">{item.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div className="rounded-xl overflow-hidden h-56 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-400 text-sm">Map — Hyderabad, Telangana</p>
          </div>
        </div>

        {/* Form */}
        <div>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
              <MdCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Message Sent!</h3>
              <p className="text-gray-500 mb-6">
                Thank you for reaching out. We will get back to you within 24 hours.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn-primary">
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-2xl shadow-md p-8 space-y-5"
            >
              <h2 className="text-xl font-bold text-gray-800 border-b pb-3">Send a Message</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Your Name *</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="form-input"
                    placeholder="Full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="form-label">Phone Number</label>
                  <input
                    {...register('phone')}
                    className="form-input"
                    placeholder="+91 XXXXX XXXXX"
                    type="tel"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Email Address *</label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                  })}
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Subject *</label>
                <select
                  {...register('subject', { required: 'Please select a subject' })}
                  className="form-input"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Enquiry</option>
                  <option value="booking">Event Booking</option>
                  <option value="pricing">Pricing & Packages</option>
                  <option value="vendor">Vendor Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="form-label">Message *</label>
                <textarea
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' },
                  })}
                  className="form-input resize-none"
                  rows={5}
                  placeholder="Tell us how we can help you..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
