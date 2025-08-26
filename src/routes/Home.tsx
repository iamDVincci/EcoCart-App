import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext.tsx';
import { useImpact } from '@/contexts/ImpactContext.tsx';
import ProductCard from '@/components/ProductCard.tsx';
import ImpactCounter from '@/components/ImpactCounter.tsx';
import CategoryGrid from '@/components/CategoryGrid.tsx';
import FeaturedBrands from '@/components/FeaturedBrands.tsx';
import Testimonials from '@/components/Testimonials.tsx';
import Newsletter from '@/components/Newsletter.tsx';

const Home: React.FC = () => {
  const { products } = useProducts();
  const { metrics } = useImpact();
  
  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Sustainable Shopping
              <span className="block text-emerald-600">Made Simple</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 sm:text-xl">
              Discover eco‑friendly products that make a difference. Track your positive impact 
              in real time while supporting brands committed to environmental responsibility.
            </p>
            <div className="mt-8 flex items-center justify-center">
                <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
                    🌱 Carbon Neutral Shipping on All Orders
                </div>
            </div>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link 
                to="/products" 
                className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Start Shopping
                <svg className="ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link 
                to="/impact" 
                className="inline-flex items-center justify-center rounded-lg border-2 border-emerald-600 bg-white px-8 py-3 text-base font-medium text-emerald-700 transition-colors hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Learn About Our Impact
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">500+</div>
              <div className="text-sm text-gray-600">Verified Brands</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">10,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">50 tons</div>
              <div className="text-sm text-gray-600">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">100%</div>
              <div className="text-sm text-gray-600">Carbon Neutral Shipping</div>
            </div>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-10 hidden lg:block">
          <div className="h-20 w-20 rounded-full bg-emerald-200/50 animate-pulse"></div>
        </div>
        <div className="absolute top-40 right-20 hidden lg:block">
          <div className="h-16 w-16 rounded-full bg-green-300/30 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="relative -mt-12 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Collective Impact</h2>
            <p className="mt-4 text-lg text-gray-600">
              Together, we're making a measurable difference for our planet
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4">
            <ImpactCounter 
              value={metrics.co2SavedKg} 
              label="CO₂ Saved" 
              unit="kg" 
            />
            <ImpactCounter 
              value={metrics.treesPlanted} 
              label="Trees Planted" 
              unit="trees" 
            />
            <ImpactCounter 
              value={metrics.plasticReducedKg} 
              label="Plastic Reduced" 
              unit="kg" 
            />
            <ImpactCounter 
              value={metrics.waterSavedLiters} 
              label="Water Saved" 
              unit="liters" 
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Featured Products</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover our most popular eco-friendly items with the highest sustainability scores
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              View All Products
              <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryGrid className="bg-white" />

      {/* Featured Brands */}
      <FeaturedBrands className="bg-gray-50" />

      {/* Customer Testimonials */}
      <Testimonials className="bg-white" />

      {/* Newsletter Signup */}
      <Newsletter />
    </div>
  );
};

export default Home;
