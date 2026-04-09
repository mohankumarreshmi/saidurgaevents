'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { signIn } from '@/lib/auth';
import { useAuth } from '@/components/AuthProvider';
import { GiIndiaGate } from 'react-icons/gi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  const onSubmit = async (data: LoginForm) => {
    setSigningIn(true);
    try {
      await signIn(data.email, data.password);
      toast.success('Welcome back!');
      router.push('/admin');
    } catch {
      toast.error('Invalid email or password. Please try again.');
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <GiIndiaGate className="text-primary-600 text-5xl mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-gray-800">Sai Durga Events</h1>
          <p className="text-gray-500 text-sm mt-1">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="form-label">Email Address</label>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
              type="email"
              className="form-input"
              placeholder="admin@saidurgaevents.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <input
                {...register('password', { required: 'Password is required' })}
                type={showPass ? 'text' : 'password'}
                className="form-input pr-10"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPass(!showPass)}
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={signingIn}
            className="w-full btn-primary disabled:opacity-60 disabled:cursor-not-allowed text-base py-3"
          >
            {signingIn ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          This area is restricted to authorised administrators only.
        </p>
      </div>
    </div>
  );
}
