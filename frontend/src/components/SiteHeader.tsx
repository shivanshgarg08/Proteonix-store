'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';

export default function SiteHeader() {
  const { totalItems } = useCart();

  return (
    <header className="border-b border-white/5 bg-black/30 backdrop-blur">
      <div className="section-shell flex items-center justify-between py-5">
        <Link href="/" className="font-display text-3xl tracking-[0.2em]">
          PROTEONIX
        </Link>
        <nav className="flex items-center gap-6 text-sm uppercase tracking-[0.16em]">
          <Link href="/products" className="hover:text-leaf">Products</Link>
          <Link href="/#ingredients" className="hover:text-leaf">Ingredients</Link>
          <Link href="/#about" className="hover:text-leaf">About</Link>
          <Link href="/cart" className="hover:text-leaf">
            Cart ({totalItems})
          </Link>
          <Link href="/login" className="hover:text-leaf">Login</Link>
        </nav>
      </div>
    </header>
  );
}
