import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext.tsx';
import { useCart } from '@/contexts/CartContext.tsx';
import StarRating from '@/components/StarRating.tsx';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';
import ErrorBoundary from '@/components/ErrorBoundary.tsx';
import ProductCard from '@/components/ProductCard.tsx';
import type { Product } from '@/types/index.d.ts';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'sustainability' | 'reviews' | 'qa'>('details');

  const product = products.find(p => p.id === id);

  // Get related products (same category, excluding current product)
  const relatedProducts = product 
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  useEffect(() => {
    if (!loading && !product) {
      navigate('/products');
    }
  }, [product, loading, navigate]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await addToCart(product, quantity);
      // Could show a success toast here
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const tabs = [
    { id: 'details', label: 'Product Details' },
    { id: 'sustainability', label: 'Sustainability' },
    { id: 'reviews', label: `Reviews (${product.reviews?.length || 0})` },
    { id: 'qa', label: 'Q&A' }
  ];

  return (
    <ErrorBoundary>
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </li>
            <li>
              <Link to="/products" className="text-gray-400 hover:text-gray-500">
                Products
              </Link>
            </li>
            <li>
              <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
            </li>
            <li>
              <span className="text-gray-500 font-medium truncate">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Product Images */}
          <div className="flex flex-col-reverse">
            {/* Image thumbnails */}
            <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-4 gap-6">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-25 ${
                      selectedImage === index ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-cover object-center rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main image */}
            <div className="w-full aspect-square relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-center object-cover sm:rounded-lg"
              />
              {/* Sustainability Badge */}
              <div className="absolute top-4 right-4 bg-emerald-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                {product.sustainabilityScore}/100
              </div>
              {/* Carbon Savings Badge */}
              <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                -{product.carbonSavedKg} kg CO₂
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            
            {/* Brand */}
            {product.brand && (
              <p className="mt-2 text-lg text-gray-600">by {product.brand}</p>
            )}

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">${product.price}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3 flex items-center">
              <StarRating rating={product.rating} />
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <a href="#reviews" className="ml-3 text-sm font-medium text-emerald-600 hover:text-emerald-500">
                {product.reviews?.length || 0} reviews
              </a>
            </div>

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Impact Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-2xl">🌱</span>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-emerald-900">Carbon Saved</p>
                    <p className="text-lg font-bold text-emerald-600">{product.carbonSavedKg} kg CO₂</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-2xl">♻️</span>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-900">Sustainability</p>
                    <p className="text-lg font-bold text-blue-600">{product.sustainabilityScore}/100</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to cart section */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <div className="flex items-center space-x-4 mb-6">
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="rounded-md border border-gray-300 bg-white py-2 px-3 text-base leading-6 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-emerald-600 py-3 px-8 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
                
                <button className="w-full flex items-center justify-center rounded-md border border-gray-300 bg-white py-3 px-8 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                  Add to Wishlist
                </button>
              </div>

              {/* Shipping Info */}
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Free carbon-neutral shipping on orders over $50
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  30-day returns & exchanges
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Plastic-free packaging
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'details' && (
              <div className="prose prose-lg max-w-none">
                <h3>Product Description</h3>
                <p>{product.description}</p>
                
                {product.materials && (
                  <>
                    <h4>Materials</h4>
                    <ul>
                      {product.materials.map((material, index) => (
                        <li key={index}>{material}</li>
                      ))}
                    </ul>
                  </>
                )}

                <h4>Key Features</h4>
                <ul>
                  <li>Made from sustainable materials</li>
                  <li>Carbon-neutral manufacturing process</li>
                  <li>Recyclable and biodegradable packaging</li>
                  <li>Ethically sourced components</li>
                  <li>Fair trade certified</li>
                </ul>
              </div>
            )}

            {activeTab === 'sustainability' && (
              <div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Environmental Impact</h3>
                    <div className="space-y-4">
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-medium text-green-900">Carbon Footprint</h4>
                        <p className="text-green-700 text-sm mt-1">
                          This product saves {product.carbonSavedKg} kg of CO₂ compared to conventional alternatives
                        </p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900">Water Usage</h4>
                        <p className="text-blue-700 text-sm mt-1">
                          Manufacturing uses 40% less water than traditional methods
                        </p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-medium text-purple-900">Packaging</h4>
                        <p className="text-purple-700 text-sm mt-1">
                          100% recyclable and plastic-free packaging materials
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Sustainability Score Breakdown</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Materials', score: 85 },
                        { label: 'Manufacturing', score: 78 },
                        { label: 'Packaging', score: 95 },
                        { label: 'Transportation', score: 72 },
                        { label: 'End of Life', score: 88 }
                      ].map((item) => (
                        <div key={item.label}>
                          <div className="flex justify-between text-sm font-medium">
                            <span>{item.label}</span>
                            <span>{item.score}/100</span>
                          </div>
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-emerald-600 h-2 rounded-full" 
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      <StarRating rating={product.rating} size="lg" />
                      <span className="ml-3 text-2xl font-bold">{product.rating}</span>
                      <span className="ml-2 text-gray-600">out of 5</span>
                    </div>
                    <span className="ml-4 text-gray-600">({product.reviews?.length || 0} reviews)</span>
                  </div>
                  
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                    Write a Review
                  </button>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="border-b border-gray-200 pb-6">
                        <div className="flex items-center mb-2">
                          <StarRating rating={review.rating} />
                          <span className="ml-3 font-medium">{review.author}</span>
                          <span className="ml-2 text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <h4 className="font-medium mb-2">{review.title}</h4>
                        <p className="text-gray-600">{review.comment}</p>
                        {review.verified && (
                          <span className="inline-flex items-center mt-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            ✓ Verified Purchase
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'qa' && (
              <div>
                <div className="mb-8">
                  <button className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                    Ask a Question
                  </button>
                </div>
                
                <div className="text-center py-8">
                  <p className="text-gray-500">No questions yet. Be the first to ask about this product!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default ProductDetail;
