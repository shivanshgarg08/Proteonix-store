'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { Product, ProductVariant } from '@/lib/data';

type Props = {
  product: Product;
  variant: ProductVariant;
  size?: 'sm' | 'lg';
};

export default function AddToCartButton({ product, variant, size = 'sm' }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product, variant);
    setAdded(true);
    setTimeout(() => setAdded(false), 900);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-full bg-leaf px-5 py-2 text-sm font-semibold text-ink shadow-glow transition hover:bg-leafDark ${
        added ? 'animate-pop' : ''
      } ${size === 'lg' ? 'px-6 py-3 text-base' : ''}`}
    >
      {added ? 'Added' : 'Add to Cart'}
    </button>
  );
}
