import React from 'react';
import { Link } from 'react-router-dom';
import { mockCategories } from '@/lib/mockData';
import { Category } from '@/types/index.d';

interface CategoryGridProps {
  className?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover sustainable products across all your favorite categories
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {mockCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Browse All Products
            <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/products?category=${category.slug}`}
      className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-md"
    >
      {/* Category Image */}
      <div className="aspect-square bg-gradient-to-br from-emerald-50 to-green-100 p-8">
        <div className="flex h-full items-center justify-center">
          {/* Placeholder icon based on category */}
          <CategoryIcon category={category.slug} />
        </div>
      </div>

      {/* Category Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600">
          {category.name}
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {category.description}
        </p>
        
        {/* Category Stats */}
        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>{category.productCount} products</span>
          <div className="flex items-center">
            <span className="mr-1">Avg:</span>
            <span className="rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-800">
              {category.averageSustainabilityScore}
            </span>
          </div>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 rounded-lg ring-2 ring-transparent transition-all group-hover:ring-emerald-500/20" />
    </Link>
  );
};

// Category icon component
interface CategoryIconProps {
  category: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category }) => {
  const iconClass = "h-16 w-16 text-emerald-600";
  
  switch (category) {
    case 'fashion':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.89 2 6.21 3.64 4.62 6.08L8 12L4.62 17.92C6.21 20.36 8.89 22 12 22s5.79-1.64 7.38-4.08L16 12l3.38-5.92C17.79 3.64 15.11 2 12 2z"/>
        </svg>
      );
    case 'home-garden':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      );
    case 'beauty':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.7 21L10.9 18H13.1L14.3 21H16.5L13 10H11L7.5 21H9.7ZM11.5 14.5H12.5L13.2 16H10.8L11.5 14.5ZM5 21H2L5 10H7.5L6.5 13H5.5L5 21Z"/>
        </svg>
      );
    case 'electronics':
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1zm-1 9h-4v-7h4v7z"/>
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.32-.21 2.58-.64 3.75-1.25C19.8 26.1 22 21.4 22 17V7l-10-5z"/>
        </svg>
      );
  }
};

export default CategoryGrid;
