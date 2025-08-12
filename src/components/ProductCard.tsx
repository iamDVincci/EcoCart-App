import React from 'react';
import { Product } from '@/types/index.d';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow duration-300 hover:shadow-elevation">
      <span className="absolute top-2 left-2 z-10 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        {product.carbonSavedKg.toFixed(1)} kg CO₂ Saved
      </span>
      <span className="absolute top-2 right-2 z-10 inline-flex items-center rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-medium text-white">
        {product.sustainabilityScore}
      </span>
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-800">
          <Link to={`/products/${product.id}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.description.substring(0, 60)}...</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
          {/* Rating component would go here */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
