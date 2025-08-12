import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/index.d';

// Mock data for now
import { mockProducts } from '@/lib/mockData';

interface ProductsContextType {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(mockProducts);

  const getProductById = (id: string) => products.find(p => p.id === id);

  return (
    <ProductsContext.Provider value={{ products, getProductById }}>
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
