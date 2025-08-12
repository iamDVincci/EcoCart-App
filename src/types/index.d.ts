// Shared domain models (initial minimal)
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sustainabilityScore: number; // 0-100
  carbonSavedKg: number; // carbon saving per purchase
  rating: number; // 0-5
  images: string[];
}

export interface ImpactMetrics {
  co2SavedKg: number;
  treesPlanted: number;
  plasticReducedKg: number;
  waterSavedLiters: number;
}
