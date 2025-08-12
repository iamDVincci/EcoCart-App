import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
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
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-gray-900">Featured Products (Mock)</h2>
        <p className="mt-2 text-gray-600 text-sm">Product grid coming soon.</p>
      </section>
    </div>
  );
};

export default Home;
