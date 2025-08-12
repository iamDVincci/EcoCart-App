import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext.tsx';

// Placeholder route components
const Home = React.lazy(() => import('./routes/Home.tsx'));
const Products = React.lazy(() => import('./routes/Products.tsx'));
const Impact = React.lazy(() => import('./routes/Impact.tsx'));
const About = React.lazy(() => import('./routes/About.tsx'));
const ProductDetail = React.lazy(() => import('./routes/ProductDetail.tsx'));
const Account = React.lazy(() => import('./routes/Account.tsx'));
const Cart = React.lazy(() => import('./routes/Cart.tsx'));

const App: React.FC = () => {
  const { itemCount } = useCart();
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 h-16 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          <Link to="/" className="font-semibold text-emerald-600">EcoCart</Link>
          <nav className="hidden gap-6 md:flex">
            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-emerald-600">Products</Link>
            <Link to="/impact" className="text-sm font-medium text-gray-700 hover:text-emerald-600">Impact</Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-emerald-600">About</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/cart" aria-label="Cart" className="relative text-sm font-medium text-gray-700 hover:text-emerald-600">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/account" aria-label="Account" className="text-sm font-medium text-gray-700 hover:text-emerald-600">Account</Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <React.Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/about" element={<About />} />
            <Route path="/account/*" element={<Account />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </React.Suspense>
      </main>
      <footer className="border-t bg-white py-8 text-sm text-gray-500">
        <div className="mx-auto max-w-7xl px-4">© {new Date().getFullYear()} EcoCart. Sustainability matters.</div>
      </footer>
    </div>
  );
};

export default App;
