'use client';

import ProductCard from '@/components/ProductCard';
import SectionTitle from '@/components/SectionTitle';
import { products } from '@/lib/data';

export default function ProductsPage() {
  return (
    <section className="section-shell py-14">
      <SectionTitle eyebrow="All Products" title="Every Proteonix blend" />
      <div className="grid gap-6 md:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
