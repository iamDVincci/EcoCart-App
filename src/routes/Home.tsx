import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext.tsx';
import ProductCard from '@/components/ProductCard.tsx';
import ImpactCounter from '@/components/ImpactCounter.tsx';
import { useImpact } from '@/contexts/ImpactContext.tsx';

const Home: React.FC = () => {
  const { products } = useProducts();
  const { metrics } = useImpact();
  
  // Get first 4 products as featured
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      <section className="bg-emerald-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Sustainable Shopping Made Simple</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">Discover eco‑friendly products and track your positive impact in real time.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/products" className="rounded-md bg-emerald-600 px-6 py-3 text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">Browse Products</Link>
            <Link to="/impact" className="rounded-md bg-white px-6 py-3 text-emerald-700 shadow border border-emerald-200 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">View Impact</Link>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Our Collective Impact</h2>
            <p className="mt-4 text-lg text-gray-600">Together, we're making a difference for our planet</p>
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
            <p className="mt-4 text-lg text-gray-600">Discover our most popular eco-friendly items</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link 
              to="/products" 
              className="inline-flex items-center rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              View All Products
              <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-emerald-600 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white">Stay Updated on Sustainability</h2>
            <p className="mt-4 text-lg text-emerald-100">Get the latest eco-friendly products and impact updates delivered to your inbox</p>
            <div className="mt-8 flex max-w-md mx-auto">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-1 rounded-l-md border-0 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-shrink-0 rounded-r-md bg-emerald-800 px-6 py-3 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-600"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
