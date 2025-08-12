import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext.tsx';
import ProductCard from '@/components/ProductCard.tsx';

const Products: React.FC = () => {
  const { products } = useProducts();
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900">Products</h1>
      <p className="mt-2 text-gray-600">Browse our collection of sustainable products.</p>
      <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map(product => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
