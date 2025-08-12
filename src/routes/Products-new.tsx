import React, { useState, useMemo } from 'react';
import { useProducts } from '@/contexts/ProductsContext.tsx';
import ProductCard from '@/components/ProductCard.tsx';
import { ProductGridSkeleton } from '@/components/LoadingSkeleton.tsx';
import ErrorBoundary from '@/components/ErrorBoundary.tsx';

interface Filters {
  search: string;
  category: string;
  priceRange: [number, number];
  sustainabilityScore: [number, number];
  carbonSaved: [number, number];
  rating: number;
  sortBy: string;
}

const Products: React.FC = () => {
  const { products, loading, error } = useProducts();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    category: '',
    priceRange: [0, 100],
    sustainabilityScore: [0, 100],
    carbonSaved: [0, 10],
    rating: 0,
    sortBy: 'relevance'
  });

  // Categories extracted from products
  const categories = [
    'All Categories',
    'Personal Care',
    'Home & Kitchen',
    'Electronics',
    'Clothing & Accessories',
    'Health & Wellness'
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !product.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }

      // Sustainability score filter
      if (product.sustainabilityScore < filters.sustainabilityScore[0] || 
          product.sustainabilityScore > filters.sustainabilityScore[1]) {
        return false;
      }

      // Carbon saved filter
      if (product.carbonSavedKg < filters.carbonSaved[0] || 
          product.carbonSavedKg > filters.carbonSaved[1]) {
        return false;
      }

      // Rating filter
      if (product.rating < filters.rating) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'sustainability':
        filtered.sort((a, b) => b.sustainabilityScore - a.sustainabilityScore);
        break;
      case 'carbon-impact':
        filtered.sort((a, b) => b.carbonSavedKg - a.carbonSavedKg);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [products, filters]);

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      priceRange: [0, 100],
      sustainabilityScore: [0, 100],
      carbonSaved: [0, 10],
      rating: 0,
      sortBy: 'relevance'
    });
  };

  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sustainable Products</h1>
          <p className="mt-2 text-gray-600">
            Discover eco-friendly products that make a positive impact on our planet
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div>
            <div className="mb-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="h-12 bg-gray-200 rounded-md max-w-lg flex-1 animate-pulse" />
                <div className="flex items-center gap-4">
                  <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse" />
                  <div className="h-10 w-32 bg-gray-200 rounded-md animate-pulse" />
                </div>
              </div>
            </div>
            <ProductGridSkeleton count={8} />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load products</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <>
            {/* Search and Filter Controls */}
            <div className="mb-8">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                {/* Search Bar */}
                <div className="flex-1 max-w-lg">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={filters.search}
                      onChange={(e) => updateFilter('search', e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
                      showFilters
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Filters
                  </button>

                  {/* Sort Dropdown */}
                  <select
                    value={filters.sortBy}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="relevance">Sort by Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="sustainability">Sustainability Score</option>
                    <option value="carbon-impact">Carbon Impact</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>

              {/* Filter Panel */}
              {showFilters && (
                <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={filters.category}
                        onChange={(e) => updateFilter('category', e.target.value)}
                        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        {categories.map(category => (
                          <option key={category} value={category === 'All Categories' ? '' : category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={filters.priceRange[1]}
                          onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Sustainability Score */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sustainability Score: {filters.sustainabilityScore[0]}+
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={filters.sustainabilityScore[0]}
                        onChange={(e) => updateFilter('sustainabilityScore', [Number(e.target.value), 100])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    {/* Carbon Impact */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min CO₂ Saved: {filters.carbonSaved[0]} kg
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={filters.carbonSaved[0]}
                        onChange={(e) => updateFilter('carbonSaved', [Number(e.target.value), 10])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating: {filters.rating} stars
                    </label>
                    <div className="flex items-center space-x-2">
                      {[0, 1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          onClick={() => updateFilter('rating', rating)}
                          className={`flex items-center px-3 py-1 rounded-md text-sm ${
                            filters.rating === rating
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {rating}+ ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Header */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              
              {/* Active Filters */}
              <div className="flex items-center gap-2">
                {filters.search && (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                    Search: "{filters.search}"
                    <button
                      onClick={() => updateFilter('search', '')}
                      className="ml-2 text-emerald-500 hover:text-emerald-700"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.rating > 0 && (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                    {filters.rating}+ stars
                    <button
                      onClick={() => updateFilter('rating', 0)}
                      className="ml-2 text-emerald-500 hover:text-emerald-700"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More (placeholder for pagination) */}
            {filteredProducts.length > 0 && filteredProducts.length >= 12 && (
              <div className="mt-12 text-center">
                <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50">
                  Load More Products
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Products;
