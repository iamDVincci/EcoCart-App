import React from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';

interface OrderConfirmationState {
  orderNumber: string;
  total: number;
  impact: {
    carbonSaved: number;
    plasticReduced: number;
    waterSaved: number;
  };
}

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const state = location.state as OrderConfirmationState | null;

  // Redirect if no order data
  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { orderNumber, total, impact } = state;

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed! 🎉</h1>
          <p className="text-lg text-gray-600">
            Thank you for choosing sustainable products. Your order is being prepared with care.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Order Details */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Confirmed
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Order Number</h3>
                <p className="text-lg font-mono font-medium text-gray-900">{orderNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Total Amount</h3>
                <p className="text-lg font-medium text-gray-900">${total.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Estimated Delivery</h3>
                <p className="text-lg font-medium text-gray-900">3-5 business days</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping Method</h3>
                <p className="text-lg font-medium text-gray-900">Carbon-neutral shipping</p>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="p-6 bg-emerald-50">
            <h2 className="text-xl font-semibold text-emerald-900 mb-6 flex items-center">
              <span className="mr-2">🌱</span>
              Your Environmental Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {impact.carbonSaved.toFixed(1)} kg
                </div>
                <p className="text-sm text-emerald-700 font-medium">CO₂ Saved</p>
                <p className="text-xs text-emerald-600 mt-1">vs conventional products</p>
              </div>
              <div className="text-center bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {impact.plasticReduced.toFixed(1)} kg
                </div>
                <p className="text-sm text-blue-700 font-medium">Plastic Reduced</p>
                <p className="text-xs text-blue-600 mt-1">through sustainable packaging</p>
              </div>
              <div className="text-center bg-white rounded-lg p-4">
                <div className="text-3xl font-bold text-cyan-600 mb-2">
                  {impact.waterSaved.toFixed(1)} L
                </div>
                <p className="text-sm text-cyan-700 font-medium">Water Saved</p>
                <p className="text-xs text-cyan-600 mt-1">through eco-friendly production</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-emerald-200">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🏆</span>
                <div>
                  <h3 className="font-medium text-emerald-900">Sustainability Achievement Unlocked!</h3>
                  <p className="text-sm text-emerald-700 mt-1">
                    You've saved the equivalent of {Math.round(impact.carbonSaved * 2.2)} miles of car emissions. 
                    Keep up the great work for our planet!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">What's Next?</h2>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Order Confirmation Email</h3>
                  <p className="text-sm text-gray-600">You'll receive a confirmation email with your order details shortly.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Order Preparation</h3>
                  <p className="text-sm text-gray-600">Our team will carefully prepare your order using plastic-free packaging.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Carbon-Neutral Shipping</h3>
                  <p className="text-sm text-gray-600">Your order will be shipped with zero carbon footprint, arriving in 3-5 business days.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Track Your Order</h3>
                  <p className="text-sm text-gray-600">We'll send you tracking information so you can follow your package's journey.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/account/orders"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
          >
            View Order History
          </Link>
          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Social Sharing */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Share Your Impact</h3>
          <p className="text-gray-600 mb-6">
            Help inspire others to make sustainable choices by sharing your environmental impact!
          </p>
          
          <div className="flex justify-center space-x-4">
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm">
              <span className="mr-2">📘</span>
              Share on Facebook
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors text-sm">
              <span className="mr-2">🐦</span>
              Share on Twitter
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm">
              <span className="mr-2">📱</span>
              Share via WhatsApp
            </button>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>
            Questions about your order?{' '}
            <Link to="/contact" className="text-emerald-600 hover:text-emerald-500">
              Contact our support team
            </Link>{' '}
            or email us at{' '}
            <a href="mailto:support@ecocart.com" className="text-emerald-600 hover:text-emerald-500">
              support@ecocart.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
