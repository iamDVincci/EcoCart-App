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

// Mock user data
export const mockUser = {
  id: 'user-1',
  name: 'Alex Johnson',
  email: 'alex.johnson@email.com',
  joinDate: '2024-03-15',
  avatar: '/mock-images/avatar.jpg',
  preferences: {
    newsletter: true,
    sustainabilityUpdates: true,
    orderUpdates: true,
  },
  sustainabilityStats: {
    totalCO2Saved: 45.7,
    totalOrders: 12,
    favoriteCategory: 'Personal Care',
    impactRank: 'Eco Champion',
    monthlyGoal: 10, // kg CO2
    currentMonthSaved: 7.2,
  }
};

// Mock orders data
export const mockOrders = [
  {
    id: 'order-001',
    date: '2025-01-28',
    status: 'delivered',
    total: 67.47,
    carbonSaved: 8.5,
    items: [
      { ...mockProducts[0], quantity: 2 },
      { ...mockProducts[1], quantity: 1 },
    ]
  },
  {
    id: 'order-002', 
    date: '2025-01-15',
    status: 'delivered',
    total: 18.50,
    carbonSaved: 0.8,
    items: [
      { ...mockProducts[2], quantity: 1 },
    ]
  },
  {
    id: 'order-003',
    date: '2025-01-05',
    status: 'delivered', 
    total: 45.00,
    carbonSaved: 5.3,
    items: [
      { ...mockProducts[3], quantity: 1 },
    ]
  },
  {
    id: 'order-004',
    date: '2024-12-20',
    status: 'delivered',
    total: 89.97,
    carbonSaved: 12.1,
    items: [
      { ...mockProducts[0], quantity: 1 },
      { ...mockProducts[1], quantity: 2 },
      { ...mockProducts[2], quantity: 1 },
    ]
  }
];
