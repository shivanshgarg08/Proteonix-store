'use client';

import Link from 'next/link';
import QuantityControl from '@/components/QuantityControl';
import { useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <section className="section-shell py-16">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="text-muted mt-3">Start with a best seller.</p>
        <Link href="/products" className="inline-block mt-6 text-leaf">
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section className="section-shell py-14">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={`${item.id}-${item.variant}`} className="card-surface p-5 flex flex-col md:flex-row md:items-center gap-6">
              <div>
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-muted text-sm">{item.variant}</p>
              </div>
              <div className="md:ml-auto flex items-center gap-4">
                <QuantityControl value={item.quantity} onChange={(value) => updateQuantity(item.id, item.variant, value)} />
                <p className="w-24 text-right font-semibold">{formatPrice(item.price * item.quantity)}</p>
                <button
                  type="button"
                  onClick={() => removeItem(item.id, item.variant)}
                  className="text-sm text-red-400"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="card-surface p-6 space-y-4 h-fit">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="flex items-center justify-between text-muted">
            <span>Total</span>
            <span className="text-white font-semibold">{formatPrice(totalPrice)}</span>
          </div>
          <Link
            href="/checkout"
            className="w-full inline-flex items-center justify-center rounded-full bg-leaf px-6 py-3 text-sm font-semibold text-ink shadow-glow transition hover:bg-leafDark"
          >
            Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
