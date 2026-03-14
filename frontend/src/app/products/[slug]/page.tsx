'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { products } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import AddToCartButton from '@/components/AddToCartButton';
import RatingStars from '@/components/RatingStars';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = useMemo(() => products.find((item) => item.slug === params.slug), [params.slug]);
  const [variantIndex, setVariantIndex] = useState(0);

  if (!product) {
    return (
      <section className="section-shell py-20">
        <h1 className="text-3xl font-semibold">Product not found</h1>
        <Link href="/products" className="text-leaf">
          Back to products
        </Link>
      </section>
    );
  }

  const variant = product.variants[variantIndex];

  return (
    <section className="section-shell py-14">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card-surface p-8 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/20 to-emerald-500/10">
          <Image
            src={product.image}
            alt={product.name}
            width={360}
            height={420}
            className="drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
          />
        </div>
        <div className="space-y-6">
          <span className="badge">{product.discount}</span>
          <h1 className="font-display text-4xl tracking-tight">{product.name}</h1>
          <RatingStars rating={product.rating} />
          <p className="text-muted">{product.description}</p>
          <div className="card-surface p-5 space-y-4">
            <div className="flex flex-wrap gap-3">
              {product.variants.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setVariantIndex(index)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    index === variantIndex
                      ? 'border-leaf bg-leaf/10 text-white'
                      : 'border-white/10 text-muted hover:border-white/40'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-semibold">{formatPrice(variant.price)}</p>
              <AddToCartButton product={product} variant={variant} size="lg" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card-surface p-5 space-y-3">
              <h3 className="text-lg font-semibold">Ingredients</h3>
              <ul className="space-y-2 text-muted text-sm">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>• {ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="card-surface p-5 space-y-3">
              <h3 className="text-lg font-semibold">Nutrition (per {product.nutritionLabel.servingSize})</h3>
              <div className="text-muted text-sm space-y-1">
                <p>Calories: {product.nutritionLabel.calories}</p>
                <p>Protein: {product.nutritionLabel.protein}</p>
                <p>Carbs: {product.nutritionLabel.carbs}</p>
                <p>Fats: {product.nutritionLabel.fats}</p>
              </div>
            </div>
          </div>
          <div className="card-surface p-5 space-y-3">
            <h3 className="text-lg font-semibold">Usage Suggestions</h3>
            <ul className="space-y-2 text-muted text-sm">
              {product.usage.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
