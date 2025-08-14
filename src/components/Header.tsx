import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext.tsx';
import { useProducts } from '@/contexts/ProductsContext.tsx';
import { useUser } from '@/contexts/UserContext.tsx';
import { Product } from '@/types/index.d';

interface SearchResult {
  id: string;
  name: string;
  category: string;
  price: number;
  sustainabilityScore: number;
}

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const { products } = useProducts();
  const { user, isAuthenticated, logout } = useUser();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      const filteredProducts = products
        .filter(product => 
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
        .map(product => ({
          id: product.id,
          name: product.name,
          category: product.category || 'Uncategorized',
          price: product.price,
          sustainabilityScore: product.sustainabilityScore,
        }));
      
      setSearchResults(filteredProducts);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery, products]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearchResults(false);
      setSearchQuery('');
    }
  };

  const handleSearchResultClick = (productId: string) => {
    navigate(`/products/${productId}`);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
        <header className="sticky top-0 z-50 border-b bg-white shadow-sm" role="banner">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-semibold text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md" 
          onClick={closeMobileMenu}
          aria-label="EcoCart Home"
        >
          <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 1.32-.21 2.58-.64 3.75-1.25C19.8 26.1 22 21.4 22 17V7l-10-5zM12 4.3L20 8.5v8.5c0 3.4-1.8 6.9-4.5 8.9C14.2 24.6 13.1 24 12 24s-2.2.6-3.5 1.9C5.8 23.4 4 19.9 4 16.5V8.5l8-4.2z"/>
            <path d="M8 12l2 2 6-6"/>
          </svg>
          <span className="text-xl">EcoCart</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden gap-8 md:flex" role="navigation" aria-label="Main navigation">
          <Link 
            to="/products" 
            className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
          >
            Products
          </Link>
          <Link 
            to="/impact" 
            className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
          >
            Impact
          </Link>
          <Link 
            to="/about" 
            className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-md px-2 py-1"
          >
            About
          </Link>
        </nav>

        {/* Desktop Search & Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Enhanced Search */}
          <div className="relative" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sustainable products..."
                className="w-80 rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Search Results Dropdown */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSearchResultClick(result.id)}
                    className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-gray-50"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900">{result.name}</div>
                      <div className="text-xs text-gray-500">{result.category}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">${result.price}</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800">
                        {result.sustainabilityScore}
                      </span>
                    </div>
                  </button>
                ))}
                {searchQuery && (
                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={() => handleSearchSubmit({ preventDefault: () => {} } as React.FormEvent)}
                      className="w-full px-4 py-2 text-left text-sm text-emerald-600 hover:bg-gray-50"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Carbon Neutral Badge */}
          <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
            Carbon Neutral Shipping
          </div>
          
          {/* Cart */}
          <Link 
            to="/cart" 
            aria-label="Shopping Cart" 
            className="relative text-gray-700 transition-colors hover:text-emerald-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white">
                {itemCount}
              </span>
            )}
          </Link>
          
          {/* Account/User Menu */}
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-gray-700 transition-colors hover:text-emerald-600"
                aria-label="User Menu"
              >
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 font-medium text-sm">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      to="/account/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Order History
                    </Link>
                    <Link
                      to="/account/sustainability"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowUserMenu(false)}
                    >
                      My Impact
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                        navigate('/');
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-700 transition-colors hover:text-emerald-600"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-4 md:hidden">
          <Link 
            to="/cart" 
            aria-label="Shopping Cart" 
            className="relative text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white">
                {itemCount}
              </span>
            )}
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Toggle navigation menu"
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
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sustainable products..."
                  className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>

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
              <div className="rounded-lg bg-emerald-50 p-3 text-center">
                <span className="text-sm font-medium text-emerald-800">
                  🌱 Carbon Neutral Shipping on All Orders
                </span>
              </div>
              <Link 
                to="/cart" 
                className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-base font-medium text-white hover:bg-emerald-700"
                onClick={closeMobileMenu}
              >
                View Cart {itemCount > 0 && `(${itemCount})`}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
