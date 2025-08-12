import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext.tsx';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    itemCount, 
    totalPrice, 
    totalCarbonSaved 
  } = useCart();

  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08; // 8% tax
  const finalTotal = totalPrice + shipping + tax;

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  if (itemCount === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Your cart is empty</h1>
          <p className="mt-4 text-lg text-gray-600">Start shopping for sustainable products to make a positive impact!</p>
          <div className="mt-8">
            <Link 
              to="/products" 
              className="inline-flex items-center rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Browse Products
              <svg className="ml-2 -mr-1 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>
        <p className="mt-2 text-sm text-gray-600">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-12 sm:items-center">
                  {/* Product Image */}
                  <div className="sm:col-span-3">
                    <Link to={`/products/${item.id}`}>
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="aspect-square w-full rounded-lg object-cover hover:opacity-75"
                      />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="sm:col-span-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      <Link to={`/products/${item.id}`} className="hover:text-emerald-600">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{item.description.substring(0, 100)}...</p>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {item.carbonSavedKg} kg CO₂ saved
                      </span>
                      <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                        Score: {item.sustainabilityScore}
                      </span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="sm:col-span-3">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label htmlFor={`quantity-${item.id}`} className="text-sm font-medium text-gray-700">
                          Qty:
                        </label>
                        <select
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                          className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Actions */}
          <div className="mt-6 flex justify-between">
            <Link 
              to="/products" 
              className="flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
            
            <button
              onClick={clearCart}
              className="text-sm font-medium text-gray-600 hover:text-gray-500"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="space-y-6">
            {/* Environmental Impact */}
            <div className="rounded-lg border border-gray-200 bg-emerald-50 p-6">
              <h2 className="text-lg font-medium text-gray-900">Your Environmental Impact</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2 text-2xl">🌱</span>
                    <span className="text-sm text-gray-700">CO₂ Saved</span>
                  </div>
                  <span className="font-medium text-emerald-700">
                    {totalCarbonSaved.toFixed(1)} kg
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="mr-2 text-2xl">🌳</span>
                    <span className="text-sm text-gray-700">Equivalent Trees</span>
                  </div>
                  <span className="font-medium text-emerald-700">
                    {Math.round(totalCarbonSaved * 0.02)} trees
                  </span>
                </div>
                <div className="border-t border-emerald-200 pt-4">
                  <p className="text-xs text-emerald-700">
                    Thank you for choosing sustainable products! 🌍
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="text-gray-900">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-emerald-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                
                {shipping > 0 && (
                  <div className="rounded-md bg-blue-50 p-3">
                    <p className="text-xs text-blue-800">
                      Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-medium text-gray-900">Total</span>
                    <span className="text-base font-medium text-gray-900">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                className="mt-6 w-full rounded-md bg-emerald-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </button>
              
              <p className="mt-3 text-center text-xs text-gray-500">
                Secure checkout with 256-bit SSL encryption
              </p>
            </div>

            {/* Payment Methods */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-medium text-gray-900 mb-3">We Accept</h3>
              <div className="flex space-x-2">
                <div className="h-8 w-12 bg-gray-100 rounded border flex items-center justify-center text-xs font-medium">
                  VISA
                </div>
                <div className="h-8 w-12 bg-gray-100 rounded border flex items-center justify-center text-xs font-medium">
                  MC
                </div>
                <div className="h-8 w-12 bg-gray-100 rounded border flex items-center justify-center text-xs font-medium">
                  AMEX
                </div>
                <div className="h-8 w-12 bg-gray-100 rounded border flex items-center justify-center text-xs font-medium">
                  PP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
