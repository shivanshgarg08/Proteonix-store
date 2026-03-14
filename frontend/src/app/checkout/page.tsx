'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      city: formData.get('city'),
      pincode: formData.get('pincode'),
      products: items,
      totalPrice
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Order failed');
      }
    } catch (err) {
      setError('Order received! Our team will contact you on WhatsApp.');
    }

    localStorage.setItem('proteonix-last-order', JSON.stringify({
      name: payload.name,
      items,
      totalPrice
    }));

    clearCart();
    router.push('/success');
    setLoading(false);
  };

  return (
    <section className="section-shell py-14">
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="card-surface p-6 space-y-4">
          {error && <p className="text-amber-300 text-sm">{error}</p>}
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              required
              defaultValue={user?.name || ''}
              placeholder="Full name"
              className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
            />
            <input
              name="phone"
              required
              defaultValue={user?.contact || ''}
              placeholder="Phone number"
              className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3"
            />
          </div>
          <input name="address" required placeholder="Address" className="w-full rounded-2xl bg-white/5 border border-white/10 px-4 py-3" />
          <div className="grid gap-4 md:grid-cols-2">
            <input name="city" required placeholder="City" className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3" />
            <input name="pincode" required placeholder="Pincode" className="rounded-2xl bg-white/5 border border-white/10 px-4 py-3" />
          </div>
          <div className="rounded-2xl border border-white/10 px-4 py-3">
            <p className="text-sm text-muted">Payment Method</p>
            <p className="font-semibold">Cash on Delivery (Demo)</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-ink shadow-glow transition hover:bg-leafDark disabled:opacity-60"
          >
            {loading ? 'Placing order...' : 'Place Order'}
          </button>
        </form>
        <div className="card-surface p-6 space-y-4 h-fit">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="flex items-center justify-between text-sm text-muted">
                <span>{item.name} ({item.variant})</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span>Total</span>
            <span className="text-lg font-semibold">{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
