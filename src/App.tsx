import React, { useState, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext.tsx';
import ErrorBoundary from '@/components/ErrorBoundary.tsx';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';

// Enhanced loading fallback
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-sm text-gray-600">Loading page...</p>
    </div>
  </div>
);

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 h-16 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          {/* Logo */}
          <Link to="/" className="font-semibold text-emerald-600" onClick={closeMobileMenu}>
            EcoCart
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-6 md:flex">
            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
              Products
            </Link>
            <Link to="/impact" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
              Impact
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
              About
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <Link to="/cart" aria-label="Cart" className="relative text-sm font-medium text-gray-700 hover:text-emerald-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            
            <Link to="/account" aria-label="Account" className="text-sm font-medium text-gray-700 hover:text-emerald-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 md:hidden">
            <Link to="/cart" aria-label="Cart" className="relative text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Toggle menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-45' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute left-0 right-0 top-16 border-b bg-white shadow-lg md:hidden">
            <div className="mx-auto max-w-7xl px-4 py-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="space-y-4">
                <Link 
                  to="/products" 
                  className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-emerald-600"
                  onClick={closeMobileMenu}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Products
                </Link>
                
                <Link 
                  to="/impact" 
                  className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-emerald-600"
                  onClick={closeMobileMenu}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Impact
                </Link>
                
                <Link 
                  to="/about" 
                  className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-emerald-600"
                  onClick={closeMobileMenu}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About
                </Link>
                
                <Link 
                  to="/account" 
                  className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-emerald-600"
                  onClick={closeMobileMenu}
                >
                  <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Account
                </Link>
              </nav>

              {/* Mobile Action Buttons */}
              <div className="mt-6 space-y-3 border-t pt-4">
                <Link 
                  to="/cart" 
                  className="flex w-full items-center justify-center rounded-md bg-emerald-600 px-4 py-2 text-base font-medium text-white hover:bg-emerald-700"
                  onClick={closeMobileMenu}
                >
                  View Cart ({itemCount})
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/about" element={<About />} />
              <Route path="/account/*" element={<Account />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <footer className="border-t bg-white py-8 text-sm text-gray-500">
        <div className="mx-auto max-w-7xl px-4">© {new Date().getFullYear()} EcoCart. Sustainability matters.</div>
      </footer>
    </div>
  );
};

export default App;
