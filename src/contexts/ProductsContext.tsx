import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/types/index.d';

// Mock data for now
import { mockProducts } from '@/lib/mockData';

interface ProductsContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API loading
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Simulate potential error (2% chance)
        if (Math.random() < 0.02) {
          throw new Error('Failed to load products');
        }
        
        setProducts(mockProducts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductById = (id: string) => products.find(p => p.id === id);

  return (
    <ProductsContext.Provider value={{ products, loading, error, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
};
