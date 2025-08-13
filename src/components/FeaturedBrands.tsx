import React from 'react';
import { Link } from 'react-router-dom';
import { mockBrands } from '@/lib/mockData';
import { Brand } from '@/types/index.d';

interface FeaturedBrandsProps {
  className?: string;
}

const FeaturedBrands: React.FC<FeaturedBrandsProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Featured Sustainable Brands
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Partner brands committed to environmental responsibility and transparency
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {mockBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/about#partners"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700"
          >
            View All Partner Brands
            <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
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

interface BrandCardProps {
  brand: Brand;
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  return (
    <div className="group rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-md">
      {/* Brand Logo */}
      <div className="mb-4 flex items-center justify-center rounded-lg bg-gray-50 p-6">
        <div className="text-2xl font-bold text-emerald-600">
          {brand.name.split(' ').map(word => word[0]).join('')}
        </div>
      </div>

      {/* Brand Info */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-emerald-600">
          {brand.name}
        </h3>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">
          {brand.description}
        </p>

        {/* Sustainability Score */}
        <div className="mt-4 flex items-center justify-center">
          <span className="text-sm text-gray-500 mr-2">Sustainability Score:</span>
          <div className="flex items-center">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
              {brand.sustainabilityScore}/100
            </span>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-4">
          <div className="flex flex-wrap justify-center gap-1">
            {brand.certifications.slice(0, 3).map((cert, index) => (
              <span
                key={index}
                className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800"
              >
                {cert}
              </span>
            ))}
            {brand.certifications.length > 3 && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                +{brand.certifications.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Brand Story Preview */}
        <div className="mt-4 text-xs text-gray-500">
          <p className="line-clamp-2">{brand.story}</p>
        </div>

        {/* Founded & Location */}
        <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
          <span>Founded {brand.founded}</span>
          <span>•</span>
          <span>{brand.headquarters}</span>
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link
            to={`/products?brand=${brand.slug}`}
            className="inline-flex items-center rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            Shop {brand.name}
            <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBrands;
