import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext.tsx';
import { useProducts } from '@/contexts/ProductsContext.tsx';
import { useUser } from '@/contexts/UserContext.tsx';
import { Product } from '@/types/index.d';
import { Search, ShoppingCart, ShieldCheck } from 'lucide-react';

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
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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
        setIsSearchExpanded(false);
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
      setIsSearchExpanded(false);
    }
  };

  const handleSearchResultClick = (productId: string) => {
    navigate(`/products/${productId}`);
    setShowSearchResults(false);
    setSearchQuery('');
    setIsSearchExpanded(false);
  };

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex flex-shrink-0 items-center gap-2"
            onClick={closeMobileMenu}
            aria-label="EcoCart Home"
          >
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-semibold text-gray-800">EcoCart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/products" className="text-gray-600 hover:text-emerald-600 transition-colors">Products</Link>
            <Link to="/impact" className="text-gray-600 hover:text-emerald-600 transition-colors">Impact</Link>
            <Link to="/about" className="text-gray-600 hover:text-emerald-600 transition-colors">About</Link>
          </nav>
        </div>

        {/* Desktop Search & Actions */}
        <div className="hidden md:flex items-center justify-end gap-4">
          {/* Search */}
          <div className="relative flex items-center" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => {
                  if (!searchQuery) setIsSearchExpanded(false);
                }}
                placeholder="Search..."
                className={`h-10 rounded-full border bg-gray-50 pl-4 pr-10 text-sm transition-all duration-300 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 ${isSearchExpanded ? 'w-64' : 'w-0 opacity-0'}`}
              />
              <button
                type={isSearchExpanded && searchQuery ? 'submit' : 'button'}
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className={`absolute inset-y-0 right-0 flex items-center justify-center w-10 h-10 text-gray-500 hover:text-emerald-600 transition-transform duration-300 ${isSearchExpanded ? 'transform -translate-x-0' : 'transform -translate-x-0'}`}
                aria-label={isSearchExpanded ? "Submit search" : "Open search bar"}
              >
                <Search className="h-5 w-5" />
              </button>
            </form>

            {isSearchExpanded && showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-80 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
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
          
          {/* Cart */}
          <Link 
            to="/cart" 
            aria-label="Shopping Cart" 
            className="relative text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <ShoppingCart className="h-6 w-6" />
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
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-gray-500">{user?.email}</p>
                    </div>
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setShowUserMenu(false)}>My Account</Link>
                    <Link to="/account/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setShowUserMenu(false)}>Order History</Link>
                    <Link to="/account/sustainability" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setShowUserMenu(false)}>My Impact</Link>
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
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="whitespace-nowrap rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
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
            <ShoppingCart className="h-6 w-6" />
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
          <div className="px-4 py-4">
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
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <nav className="space-y-2">
              <Link to="/products" className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-emerald-600" onClick={closeMobileMenu}>Products</Link>
              <Link to="/impact" className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-emerald-600" onClick={closeMobileMenu}>Impact</Link>
              <Link to="/about" className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-emerald-600" onClick={closeMobileMenu}>About</Link>
              <Link to="/account" className="flex items-center py-2 text-base font-medium text-gray-700 hover:text-emerald-600" onClick={closeMobileMenu}>Account</Link>
            </nav>

            {/* Mobile Action Buttons */}
            {!isAuthenticated && (
              <div className="mt-6 space-y-3 border-t pt-4">
                <Link 
                  to="/login" 
                  className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-3 text-base font-medium text-gray-800 hover:bg-gray-200"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-3 text-base font-medium text-white hover:bg-emerald-700"
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;