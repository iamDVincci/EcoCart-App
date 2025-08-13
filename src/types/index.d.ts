// Shared domain models
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sustainabilityScore: number; // 0-100
  carbonSavedKg: number; // carbon saving per purchase
  rating: number; // 0-5
  images: string[];
  category?: string;
  brand?: string;
  certifications?: string[];
  materials?: string[];
  packaging?: string;
  availability?: 'in-stock' | 'low-stock' | 'out-of-stock';
  features?: string[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  reviews?: ProductReview[];
  relatedProducts?: string[]; // product IDs
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export interface ImpactMetrics {
  co2SavedKg: number;
  treesPlanted: number;
  plasticReducedKg: number;
  waterSavedLiters: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  preferences: UserPreferences;
  sustainabilityStats: SustainabilityStats;
  isAuthenticated: boolean;
}

export interface UserPreferences {
  newsletter: boolean;
  sustainabilityUpdates: boolean;
  orderUpdates: boolean;
  preferredCategories?: string[];
  sustainabilityGoals?: SustainabilityGoals;
}

export interface SustainabilityGoals {
  monthlyCO2Target: number;
  annualCO2Target: number;
  preferredCertifications: string[];
}

export interface SustainabilityStats {
  totalCO2Saved: number;
  totalOrders: number;
  favoriteCategory: string;
  impactRank: string;
  monthlyGoal: number;
  currentMonthSaved: number;
  streak: number; // days of consecutive sustainable shopping
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  dateEarned: string;
  category: 'environmental' | 'social' | 'milestone';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  carbonSaved: number;
  items: Array<{
    product: Product;
    quantity: number;
    priceAtTime: number;
  }>;
  shipping: ShippingInfo;
  billing: BillingInfo;
  tracking?: string;
}

export interface ShippingInfo {
  address: Address;
  method: 'carbon-neutral' | 'express-eco' | 'standard-eco';
  estimatedDelivery: string;
  packaging: 'minimal' | 'recyclable' | 'compostable';
}

export interface BillingInfo {
  address: Address;
  method: 'card' | 'paypal' | 'apple-pay' | 'google-pay';
  carbonOffset: boolean;
  donation?: {
    organization: string;
    amount: number;
  };
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface FilterOptions {
  category?: string;
  priceRange?: [number, number];
  sustainabilityScore?: [number, number];
  carbonFootprint?: [number, number];
  certifications?: string[];
  brands?: string[];
  availability?: string[];
  rating?: number;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  averageSustainabilityScore: number;
  subcategories?: Category[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  sustainabilityScore: number;
  certifications: string[];
  story: string;
  founded: string;
  headquarters: string;
  website: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  content: string;
  rating: number;
  products?: string[]; // product IDs mentioned
  impactStats?: {
    co2Saved: number;
    ordersPlaced: number;
  };
}

export interface NewsletterSignup {
  email: string;
  preferences: {
    weekly: boolean;
    newProducts: boolean;
    sustainability: boolean;
    deals: boolean;
  };
}
