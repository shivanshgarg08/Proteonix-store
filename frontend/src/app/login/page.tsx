'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '');
    const contact = String(formData.get('contact') || '');
    const password = String(formData.get('password') || '');

    try {
      if (mode === 'register') {
        await register({ name, contact, password });
      } else {
        await login({ contact, password });
      }
      router.push('/checkout');
    } catch (err) {
      setError('Auth failed. Check details and try again.');
    }

    setLoading(false);
  };

  return (
    <section className="section-shell py-16">
      <div className="max-w-xl mx-auto card-surface p-8 space-y-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`rounded-full px-4 py-2 text-sm ${mode === 'login' ? 'bg-leaf text-ink' : 'bg-white/10'}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`rounded-full px-4 py-2 text-sm ${mode === 'register' ? 'bg-leaf text-ink' : 'bg-white/10'}`}
          >
            Register
          </button>
        </div>

        <h1 className="text-3xl font-semibold">
          {mode === 'login' ? 'Welcome back' : 'Create your Proteonix account'}
        </h1>
        <p className="text-muted text-sm">Use email or phone and a password. Login is optional for checkout.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-amber-300 text-sm">{error}</p>}
          {mode === 'register' && (
            <input
              name="name"
              required
              placeholder="Full name"
              className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
            />
          )}
          <input
            name="contact"
            required
            placeholder="Email or phone"
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-ink shadow-glow transition hover:bg-leafDark disabled:opacity-60"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
      </div>
    </section>
  );
}
