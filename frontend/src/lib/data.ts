export type ProductVariant = {
  label: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  type: 'whey' | 'plant';
  rating: number;
  discount: string;
  variants: ProductVariant[];
  ingredients: string[];
  nutritionLabel: {
    servingSize: string;
    calories: number;
    protein: string;
    carbs: string;
    fats: string;
  };
  usage: string[];
};

export const products: Product[] = [
  {
    id: 'whey-mandwa',
    slug: 'whey-mandwa-protein-blend',
    name: 'Whey + Mandwa Protein Blend',
    description: 'Premium whey combined with Himalayan mandwa (ragi) for steady strength.',
    image: '/images/whey-pack-premium.svg',
    type: 'whey',
    rating: 4.8,
    discount: '10% OFF',
    variants: [
      { label: 'Trial Pack (250g)', price: 420 },
      { label: 'Retail Pack (500g)', price: 800 },
      { label: 'Value Tub (1kg)', price: 1499 },
      { label: 'Single Serve Sachet', price: 35 }
    ],
    ingredients: [
      'Whey protein concentrate',
      'Himalayan mandwa (ragi)',
      'Natural cocoa',
      'Jaggery',
      'Digestive enzymes'
    ],
    nutritionLabel: {
      servingSize: '1 scoop (30g)',
      calories: 120,
      protein: '23g',
      carbs: '3g',
      fats: '1.5g'
    },
    usage: [
      'Protein Shake: Mix 1 scoop with water or milk',
      'Daily Indian Meals: Add to roti dough or paratha batter',
      'Breakfast: Mix with oats or smoothies'
    ]
  },
  {
    id: 'plant-rajma',
    slug: 'almond-milk-rajma-protein',
    name: 'Almond Milk Isolate + Rajma Protein Concentrate',
    description: 'Vegan protein alternative with almond milk isolate and rajma concentrate.',
    image: '/images/plant-pack-premium.svg',
    type: 'plant',
    rating: 4.6,
    discount: '12% OFF',
    variants: [
      { label: 'Trial Pack (250g)', price: 500 },
      { label: 'Retail Pack (500g)', price: 900 },
      { label: 'Value Tub (1kg)', price: 1699 },
      { label: 'Single Serve Sachet', price: 40 }
    ],
    ingredients: [
      'Almond milk isolate',
      'Rajma protein concentrate',
      'Flax seed',
      'Himalayan salt',
      'Prebiotic fiber'
    ],
    nutritionLabel: {
      servingSize: '1 scoop (30g)',
      calories: 118,
      protein: '21g',
      carbs: '4g',
      fats: '2g'
    },
    usage: [
      'Protein Shake: Mix 1 scoop with water or almond milk',
      'Daily Indian Meals: Add to dal or khichdi',
      'Breakfast: Blend with fruit smoothies'
    ]
  }
];
