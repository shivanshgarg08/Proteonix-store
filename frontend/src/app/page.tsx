'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import AddToCartButton from '@/components/AddToCartButton';
import { products as productCatalog } from '@/lib/data';

const products = [
  {
    title: 'Protein Tub',
    subtitle: 'Whey + Mandwa performance blend',
    image: '/images/whey-pack-premium.svg',
    price: 'INR 1499',
    cartProductIndex: 0,
    cartVariantIndex: 2
  },
  {
    title: 'Vegan Protein',
    subtitle: 'Almond + Rajma plant blend',
    image: '/images/plant-pack-premium.svg',
    price: 'INR 1699',
    cartProductIndex: 1,
    cartVariantIndex: 2
  },
  {
    title: 'Sachets',
    subtitle: 'Single serve travel protein',
    image: '/images/sachet-icon.svg',
    price: 'INR 35 - INR 40',
    cartProductIndex: 0,
    cartVariantIndex: 3
  },
  {
    title: 'Shaker',
    subtitle: '600ml BPA free shaker bottle',
    image: '/images/shaker-icon.svg',
    price: 'INR 299'
  }
];

const usage = [
  { title: 'Shake', desc: 'Shake with water', icon: '/images/icons/scoop.svg', anim: 'usage-anim-shake' },
  { title: 'Atta', desc: 'Mix into atta', icon: '/images/icons/mandwa.svg', anim: 'usage-anim-stir' },
  { title: 'Oats', desc: 'Add to oats', icon: '/images/icons/almond.svg', anim: 'usage-anim-pour' },
  { title: 'Travel', desc: 'Travel sachets', icon: '/images/icons/rajma.svg', anim: 'usage-anim-travel' }
];

const wins = [
  'Himalayan ingredients',
  '30% cheaper than imports',
  'Vegan + whey options',
  'Supports farmers'
];

const audience = [
  { label: 'Gym Users', icon: '/images/icons/dumbbell.svg' },
  { label: 'Trekkers', icon: '/images/icons/mountain.svg' },
  { label: 'Yoga Community', icon: '/images/icons/lotus.svg' },
  { label: 'Indian Families', icon: '/images/icons/home.svg' }
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const heroShift = useMemo(() => Math.min(scrollY * 0.06, 16), [scrollY]);

  const applyTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const tiltY = (x - 0.5) * 7;
    const tiltX = (0.5 - y) * 7;
    event.currentTarget.style.setProperty('--tilt-x', `${tiltX}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  const resetTilt = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <div className="grid-dots">
      <section className="hero-mountain relative overflow-hidden reveal">
        <div className="mist-overlay absolute inset-0" />
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute h-1 w-1 bg-white rounded-full left-[18%] top-[24%]" />
          <div className="absolute h-1.5 w-1.5 bg-white rounded-full left-[34%] top-[62%]" />
          <div className="absolute h-1 w-1 bg-white rounded-full left-[64%] top-[18%]" />
          <div className="absolute h-1 w-1 bg-white rounded-full left-[72%] top-[44%]" />
        </div>
        <div className="section-shell relative py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-7">
              <h1 className="font-display text-5xl md:text-7xl leading-[0.9] tracking-[0.03em]">
                THE STANDARD
                <br />
                OF STRENGTH
              </h1>
              <p className="text-lg md:text-xl text-slate-100/90 max-w-xl">
                Solving India&apos;s protein deficiency with Himalayan nutrition.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="btn-pulse rounded-full bg-leaf px-7 py-3 text-sm font-semibold text-ink shadow-glow transition duration-300 hover:scale-[1.03] hover:bg-leafDark"
                >
                  Shop Best Sellers
                </Link>
                <Link
                  href="/products/whey-mandwa-protein-blend"
                  className="btn-outline rounded-full border border-white/30 bg-black/25 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03] hover:border-white/60"
                >
                  Explore Whey + Mandwa
                </Link>
              </div>
            </div>

            <div className="relative glass-card p-8 md:p-10 min-h-[420px] flex items-center justify-center">
              <span className="ingredient-chip left-2 top-16 flex items-center gap-2">
                <Image src="/images/icons/mandwa.svg" alt="Mandwa" width={20} height={20} />
                Mandwa
              </span>
              <span className="ingredient-chip right-3 top-10 flex items-center gap-2" style={{ animationDelay: '0.9s' }}>
                <Image src="/images/icons/scoop.svg" alt="Whey" width={20} height={20} />
                Whey
              </span>
              <span className="ingredient-chip left-3 bottom-20 flex items-center gap-2" style={{ animationDelay: '1.6s' }}>
                <Image src="/images/icons/almond.svg" alt="Almond" width={20} height={20} />
                Almond
              </span>
              <span className="ingredient-chip right-4 bottom-14 flex items-center gap-2" style={{ animationDelay: '2.2s' }}>
                <Image src="/images/icons/rajma.svg" alt="Rajma" width={20} height={20} />
                Rajma
              </span>

              <div className="relative h-[360px] w-[300px]">
                <Image
                  src="/images/plant-pack-premium.svg"
                  alt="Plant protein tub"
                  width={240}
                  height={320}
                  className="absolute right-0 top-6 rotate-[8deg] opacity-80 transition duration-300 hover:rotate-[12deg]"
                  style={{ transform: `translateY(${heroShift * 0.6}px) rotate(8deg)` }}
                />
                <Image
                  src="/images/whey-pack-premium.svg"
                  alt="Whey protein tub"
                  width={250}
                  height={330}
                  className="absolute left-2 top-0 drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] transition duration-300 hover:rotate-[-3deg]"
                  style={{ transform: `translateY(${heroShift * -0.6}px)` }}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-12 md:py-14 reveal">
        <div className="grid gap-4 sm:grid-cols-3">
          {['LAB TESTED', 'GUT FRIENDLY', 'NO ADDED SUGAR'].map((badge) => (
            <div key={badge} className="glass-card p-4 text-center font-semibold tracking-[0.14em] interactive-card" onMouseMove={applyTilt} onMouseLeave={resetTilt}>
              {badge}
            </div>
          ))}
        </div>
      </section>

      <section id="products" className="section-shell py-16 md:py-20 reveal">
        <h2 className="section-title">Products</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {products.map((item) => (
            <div
              key={item.title}
              className="glass-card interactive-card p-6"
              onMouseMove={applyTilt}
              onMouseLeave={resetTilt}
            >
              <div className="rounded-2xl bg-gradient-to-br from-black/55 via-black/30 to-leaf/10 p-4 min-h-[250px] flex items-center justify-center">
                <Image src={item.image} alt={item.title} width={220} height={240} className="product-img-hover drop-shadow-[0_18px_34px_rgba(0,0,0,0.45)]" />
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
              <p className="text-muted mt-1">{item.subtitle}</p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="price-glow font-semibold text-leaf">{item.price}</p>
                {typeof item.cartProductIndex === 'number' ? (
                  <AddToCartButton
                    product={productCatalog[item.cartProductIndex]}
                    variant={productCatalog[item.cartProductIndex].variants[item.cartVariantIndex || 0]}
                  />
                ) : (
                  <Link
                    href="/products"
                    className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition hover:border-white/50"
                  >
                    View
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="ingredients" className="section-shell py-16 md:py-20 reveal">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] items-center">
          <div className="glass-card interactive-card p-3" onMouseMove={applyTilt} onMouseLeave={resetTilt}>
            <Image src="/images/mandwa-story.svg" alt="Mandwa supergrain story" width={900} height={620} className="w-full h-auto rounded-2xl" />
          </div>
          <div className="glass-card p-7 md:p-9">
            <h2 className="section-title text-3xl md:text-4xl">Himalayan Mandwa Supergrain</h2>
            <p className="text-muted mt-4 text-lg leading-relaxed">
              Mandwa is sourced from Uttarakhand&apos;s high-altitude farming communities. Its natural
              micronutrient profile, traditional relevance, and local sourcing story make it a strong
              foundation for a clean Indian protein blend.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell py-16 md:py-20 reveal">
        <h2 className="section-title">Usage</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {usage.map((item) => (
            <div key={item.title} className="glass-card interactive-card p-6 text-center" onMouseMove={applyTilt} onMouseLeave={resetTilt}>
              <div className="mx-auto h-16 w-16 rounded-2xl bg-leaf/20 border border-leaf/30 flex items-center justify-center">
                <Image src={item.icon} alt={item.title} width={44} height={44} className={item.anim} />
              </div>
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="text-muted mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="section-shell py-16 md:py-20 reveal">
        <h2 className="section-title mb-8">Target Audience</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-14">
          {audience.map((item) => (
            <div key={item.label} className="glass-card interactive-card p-6" onMouseMove={applyTilt} onMouseLeave={resetTilt}>
              <Image src={item.icon} alt={item.label} width={46} height={46} />
              <p className="mt-4 text-lg font-semibold leading-snug">{item.label}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title">Why Proteonix</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {wins.map((item) => (
            <div key={item} className="glass-card interactive-card p-5 font-semibold text-lg" onMouseMove={applyTilt} onMouseLeave={resetTilt}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-16 md:py-24 reveal">
        <div className="glass-card interactive-card relative overflow-hidden p-9 md:p-12" onMouseMove={applyTilt} onMouseLeave={resetTilt}>
          <div className="absolute inset-0 bg-gradient-to-r from-leaf/20 via-transparent to-amber-300/15" />
          <div className="relative">
            <h2 className="section-title">Fuel Your Strength with Himalayan Nutrition</h2>
            <div className="flex flex-wrap gap-4 mt-7">
              <Link
                href="/products"
                className="btn-pulse rounded-full bg-leaf px-7 py-3 text-sm font-semibold text-ink shadow-glow transition duration-300 hover:scale-[1.03] hover:bg-leafDark"
              >
                Shop Now
              </Link>
              <Link
                href="/products"
                className="btn-outline rounded-full border border-white/25 bg-black/25 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03] hover:border-white/60"
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
