'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';

type OrderSummary = {
  name: string;
  items: Array<{ name: string; variant: string; quantity: number; price: number }>;
  totalPrice: number;
};

export default function SuccessPage() {
  const [summary, setSummary] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem('proteonix-last-order');
    if (raw) {
      setSummary(JSON.parse(raw));
    }
  }, []);

  return (
    <section className="section-shell py-16">
      <div className="card-surface p-10 text-center space-y-6">
        <h1 className="font-display text-4xl tracking-tight">Payment Successful</h1>
        <p className="text-muted">Order received! Our team will contact you on WhatsApp.</p>
        {summary && (
          <div className="text-left max-w-lg mx-auto space-y-2 text-sm text-muted">
            <p className="text-white font-semibold">Customer: {summary.name}</p>
            {summary.items.map((item) => (
              <p key={`${item.name}-${item.variant}`}>
                {item.name} ({item.variant}) x {item.quantity}
              </p>
            ))}
            <p className="text-white font-semibold">Total: {formatPrice(summary.totalPrice)}</p>
          </div>
        )}
        <Link
          href="/products"
          className="inline-flex items-center justify-center rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-ink shadow-glow transition hover:bg-leafDark"
        >
          Continue Shopping
        </Link>
      </div>
    </section>
  );
}
