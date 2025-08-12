import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext.tsx';
import { useCart } from '@/contexts/CartContext.tsx';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const product = getProductById(id!);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        <Link 
          to="/products" 
          className="mt-4 inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
        >
          ← Back to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const sustainabilityFeatures = [
    { 
      icon: "🌱", 
      title: "Carbon Neutral", 
      description: `Saves ${product.carbonSavedKg} kg CO₂ compared to conventional alternatives` 
    },
    { 
      icon: "♻️", 
      title: "Eco-Friendly Materials", 
      description: "Made with sustainable and recycled materials" 
    },
    { 
      icon: "🌍", 
      title: "Ethical Production", 
      description: "Manufactured with fair labor practices and environmental responsibility" 
    },
    { 
      icon: "📦", 
      title: "Minimal Packaging", 
      description: "Uses recyclable and minimal packaging materials" 
    }
  ];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      rating: 5,
      comment: "Absolutely love this product! Great quality and I feel good about supporting sustainable brands.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      author: "Mike R.",
      rating: 4,
      comment: "Good quality product. Delivery was fast and packaging was minimal which I appreciate.",
      date: "1 month ago"
    },
    {
      id: 3,
      author: "Emily K.",
      rating: 5,
      comment: "Exceeded my expectations! Will definitely be purchasing more eco-friendly products.",
      date: "2 months ago"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-emerald-600">Home</Link>
        <span>›</span>
        <Link to="/products" className="hover:text-emerald-600">Products</Link>
        <span>›</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 relative">
            <img 
              src={product.images[selectedImage] || product.images[0]} 
              alt={product.name} 
              className="h-full w-full object-cover" 
            />
            <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              {product.carbonSavedKg} kg CO₂ Saved
            </span>
            <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-sm font-medium text-white">
              Sustainability Score: {product.sustainabilityScore}
            </span>
          </div>
          
          {/* Thumbnail images (mock - using same image) */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square w-20 overflow-hidden rounded-md border-2 ${
                  selectedImage === index ? 'border-emerald-600' : 'border-gray-200'
                }`}
              >
                <img 
                  src={product.images[0]} 
                  alt={`${product.name} view ${index + 1}`} 
                  className="h-full w-full object-cover" 
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex">{renderStars(Math.round(product.rating))}</div>
              <span className="text-sm text-gray-500">({product.rating} out of 5)</span>
              <span className="text-sm text-gray-500">• 47 reviews</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</div>

          <p className="text-lg text-gray-700">{product.description}</p>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>

            <div className="flex space-x-4">
              <button className="flex-1 rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Add to Wishlist
              </button>
              <button className="flex-1 rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                Share
              </button>
            </div>
          </div>

          {/* Sustainability Info */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sustainability Features</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {sustainabilityFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <div>
                    <h4 className="font-medium text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Customer Reviews</h2>
        
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Review Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                <div className="flex justify-center mt-1">{renderStars(Math.round(product.rating))}</div>
                <div className="text-sm text-gray-600 mt-2">Based on 47 reviews</div>
              </div>
              
              <div className="mt-6 space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{stars}</span>
                    <span className="text-yellow-400">★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${stars === 5 ? 60 : stars === 4 ? 25 : stars === 3 ? 10 : 3}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {stars === 5 ? 28 : stars === 4 ? 12 : stars === 3 ? 5 : stars === 2 ? 1 : 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{review.author}</span>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}

            <button className="w-full rounded-md border border-gray-300 px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
              View All Reviews
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16 border-t pt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Related Products</h2>
        <p className="text-gray-600 mb-8">Discover more sustainable products you might like</p>
        <div className="text-center">
          <Link 
            to="/products" 
            className="inline-flex items-center rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Browse All Products
            <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
