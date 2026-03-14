'use client';

import Image from 'next/image';
import Link from 'next/link';
import RatingStars from './RatingStars';
import AddToCartButton from './AddToCartButton';
import { Product } from '@/lib/data';
import { formatPrice } from '@/lib/utils';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const defaultVariant = product.variants[2] || product.variants[0];

  return (
    <div className="card-surface p-6 space-y-5">
      <div className="flex items-start justify-between">
        <span className="badge">{product.discount}</span>
        <RatingStars rating={product.rating} />
      </div>
      <div className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-black/60 via-black/20 to-emerald-500/10 p-4">
        <span className="absolute left-4 top-4 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
          {product.type === 'plant' ? 'Plant' : 'Whey'}
        </span>
        <Image
          src={product.image}
          alt={product.name}
          width={260}
          height={340}
          className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
        />
      </div>
      <div className="space-y-2">
        <h3 className="inline-flex rounded-xl bg-black/60 px-3 py-2 text-2xl font-semibold tracking-tight">
          {product.name}
        </h3>
        <p className="text-muted text-sm">{product.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">{formatPrice(defaultVariant.price)}</p>
        <AddToCartButton product={product} variant={defaultVariant} />
      </div>
      <Link href={`/products/${product.slug}`} className="text-sm text-leaf">
        View details
      </Link>
    </div>
  );
}
