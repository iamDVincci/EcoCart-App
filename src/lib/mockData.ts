import { Product } from '@/types/index.d';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Eco-Friendly Bamboo Toothbrush Set',
    description: 'A set of 4 biodegradable bamboo toothbrushes. A great alternative to plastic.',
    price: 12.99,
    sustainabilityScore: 95,
    carbonSavedKg: 0.5,
    rating: 4.8,
    images: ['/mock-images/toothbrush.jpg'],
  },
  {
    id: '2',
    name: 'Recycled Glass Water Bottle',
    description: '24oz water bottle made from 100% recycled glass with a protective silicone sleeve.',
    price: 24.00,
    sustainabilityScore: 88,
    carbonSavedKg: 1.2,
    rating: 4.5,
    images: ['/mock-images/bottle.jpg'],
  },
  {
    id: '3',
    name: 'Organic Cotton Tote Bag',
    description: 'Durable and stylish tote bag made from GOTS-certified organic cotton.',
    price: 18.50,
    sustainabilityScore: 92,
    carbonSavedKg: 0.8,
    rating: 4.9,
    images: ['/mock-images/tote.jpg'],
  },
  {
    id: '4',
    name: 'Solar-Powered Phone Charger',
    description: 'Portable 10,000mAh power bank with solar panels for on-the-go charging.',
    price: 45.00,
    sustainabilityScore: 85,
    carbonSavedKg: 5.3,
    rating: 4.2,
    images: ['/mock-images/charger.jpg'],
  },
];
