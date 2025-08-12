import React from 'react';

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square w-full bg-gray-200 rounded-lg mb-4" />
      
      {/* Content skeleton */}
      <div className="space-y-3">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        
        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
        
        {/* Price and badges */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-16" />
          <div className="h-4 bg-gray-200 rounded w-12" />
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
          ))}
          <div className="h-3 bg-gray-200 rounded w-8 ml-2" />
        </div>
        
        {/* Sustainability info */}
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
};

const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export { ProductCardSkeleton, ProductGridSkeleton };
