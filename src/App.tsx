import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Header.tsx';
import ErrorBoundary from '@/components/ErrorBoundary.tsx';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';
import ProtectedRoute from '@/components/ProtectedRoute.tsx';

// Enhanced loading fallback
const PageLoadingFallback: React.FC = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-sm text-gray-600">Loading page...</p>
    </div>
  </div>
);

// Lazy-loaded route components
const Home = React.lazy(() => import('./routes/Home.tsx'));
const Products = React.lazy(() => import('./routes/Products.tsx'));
const Impact = React.lazy(() => import('./routes/Impact.tsx'));
const About = React.lazy(() => import('./routes/About.tsx'));
const ProductDetail = React.lazy(() => import('./routes/ProductDetail.tsx'));
const Account = React.lazy(() => import('./routes/Account.tsx'));
const Cart = React.lazy(() => import('./routes/Cart.tsx'));
const Login = React.lazy(() => import('./routes/Login.tsx'));
const Register = React.lazy(() => import('./routes/Register.tsx'));
const Checkout = React.lazy(() => import('./routes/Checkout.tsx'));
const OrderConfirmation = React.lazy(() => import('./routes/OrderConfirmation.tsx'));

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<PageLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/account/*" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <footer className="border-t bg-white py-8 text-sm text-gray-500">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-semibold text-gray-900">EcoCart</h3>
              <p className="mt-2 text-gray-600">Making sustainable shopping accessible and rewarding for everyone.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Shop</h4>
              <ul className="mt-2 space-y-1">
                <li><a href="/products" className="hover:text-emerald-600">All Products</a></li>
                <li><a href="/products?category=fashion" className="hover:text-emerald-600">Fashion</a></li>
                <li><a href="/products?category=home" className="hover:text-emerald-600">Home & Garden</a></li>
                <li><a href="/products?category=beauty" className="hover:text-emerald-600">Beauty</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Company</h4>
              <ul className="mt-2 space-y-1">
                <li><a href="/about" className="hover:text-emerald-600">About Us</a></li>
                <li><a href="/impact" className="hover:text-emerald-600">Our Impact</a></li>
                <li><a href="/about#partners" className="hover:text-emerald-600">Partners</a></li>
                <li><a href="/contact" className="hover:text-emerald-600">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Support</h4>
              <ul className="mt-2 space-y-1">
                <li><a href="/help" className="hover:text-emerald-600">Help Center</a></li>
                <li><a href="/shipping" className="hover:text-emerald-600">Shipping Info</a></li>
                <li><a href="/returns" className="hover:text-emerald-600">Returns</a></li>
                <li><a href="/privacy" className="hover:text-emerald-600">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            © {new Date().getFullYear()} EcoCart. Sustainability matters.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
