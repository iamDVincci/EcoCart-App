import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext.tsx';
import { useUser } from '@/contexts/UserContext.tsx';
import LoadingSpinner from '@/components/LoadingSpinner.tsx';
import ErrorBoundary from '@/components/ErrorBoundary.tsx';

interface CheckoutForm {
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billing: {
    sameAsShipping: boolean;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  payment: {
    method: 'credit' | 'paypal' | 'apple_pay';
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  };
  options: {
    carbonNeutralShipping: boolean;
    expressShipping: boolean;
    giftMessage: string;
  };
}

const Checkout: React.FC = () => {
  const { items, total, itemCount, clearCart } = useCart();
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState<CheckoutForm>({
    shipping: {
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      email: user?.email || '',
      phone: '',
      address: user?.addresses?.[0]?.street || '',
      city: user?.addresses?.[0]?.city || '',
      state: user?.addresses?.[0]?.state || '',
      zipCode: user?.addresses?.[0]?.zipCode || '',
      country: user?.addresses?.[0]?.country || 'United States'
    },
    billing: {
      sameAsShipping: true,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    payment: {
      method: 'credit',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: user?.name || ''
    },
    options: {
      carbonNeutralShipping: true,
      expressShipping: false,
      giftMessage: ''
    }
  });

  const shippingCost = form.options.expressShipping ? 15.99 : (total > 50 ? 0 : 5.99);
  const carbonOffset = form.options.carbonNeutralShipping ? 2.99 : 0;
  const tax = total * 0.08; // 8% tax rate
  const finalTotal = total + shippingCost + carbonOffset + tax;

  const totalImpact = items.reduce((acc, item) => ({
    carbonSaved: acc.carbonSaved + (item.product.carbonSavedKg * item.quantity),
    plasticReduced: acc.plasticReduced + (0.5 * item.quantity), // Mock data
    waterSaved: acc.waterSaved + (2.3 * item.quantity) // Mock data
  }), { carbonSaved: 0, plasticReduced: 0, waterSaved: 0 });

  if (itemCount === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some sustainable products to get started!</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (section: keyof CheckoutForm, field: string, value: string | boolean) => {
    setForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateStep = (currentStep: string): boolean => {
    if (currentStep === 'shipping') {
      const { firstName, lastName, email, address, city, state, zipCode } = form.shipping;
      return !!(firstName && lastName && email && address && city && state && zipCode);
    }
    if (currentStep === 'payment') {
      const { cardNumber, expiryDate, cvv, nameOnCard } = form.payment;
      return !!(cardNumber && expiryDate && cvv && nameOnCard);
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep(step)) {
      setError('Please fill in all required fields');
      return;
    }
    setError(null);
    
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') setStep('review');
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect to success page
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderNumber: 'ECO-' + Date.now(),
          total: finalTotal,
          impact: totalImpact
        }
      });
    } catch (err) {
      setError('Failed to process order. Please try again.');
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {[
                { key: 'shipping', label: 'Shipping', icon: '📦' },
                { key: 'payment', label: 'Payment', icon: '💳' },
                { key: 'review', label: 'Review', icon: '✅' }
              ].map((stepInfo, index) => (
                <div key={stepInfo.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step === stepInfo.key 
                      ? 'bg-emerald-600 text-white' 
                      : index < ['shipping', 'payment', 'review'].indexOf(step)
                        ? 'bg-emerald-200 text-emerald-800'
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    <span>{stepInfo.icon}</span>
                  </div>
                  <span className="ml-2 text-sm font-medium">{stepInfo.label}</span>
                  {index < 2 && <div className="w-8 h-px bg-gray-300 ml-8" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {step === 'shipping' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          value={form.shipping.firstName}
                          onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          value={form.shipping.lastName}
                          onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          value={form.shipping.email}
                          onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={form.shipping.phone}
                          onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        value={form.shipping.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          value={form.shipping.city}
                          onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          value={form.shipping.state}
                          onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          value={form.shipping.zipCode}
                          onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    {/* Shipping Options */}
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-medium mb-4">Shipping Options</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={form.options.carbonNeutralShipping}
                            onChange={(e) => handleInputChange('options', 'carbonNeutralShipping', e.target.checked)}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm">
                            Carbon-neutral shipping (+$2.99) 🌱
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={form.options.expressShipping}
                            onChange={(e) => handleInputChange('options', 'expressShipping', e.target.checked)}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                          />
                          <span className="ml-3 text-sm">
                            Express shipping (+$15.99) ⚡
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {step === 'payment' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Payment Method
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'credit', label: 'Credit/Debit Card', icon: '💳' },
                          { value: 'paypal', label: 'PayPal', icon: '🟦' },
                          { value: 'apple_pay', label: 'Apple Pay', icon: '🍎' }
                        ].map((method) => (
                          <label key={method.value} className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.value}
                              checked={form.payment.method === method.value}
                              onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                            />
                            <span className="ml-3 text-sm flex items-center">
                              <span className="mr-2">{method.icon}</span>
                              {method.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {form.payment.method === 'credit' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name on Card *
                          </label>
                          <input
                            type="text"
                            value={form.payment.nameOnCard}
                            onChange={(e) => handleInputChange('payment', 'nameOnCard', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={form.payment.cardNumber}
                            onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={form.payment.expiryDate}
                              onChange={(e) => handleInputChange('payment', 'expiryDate', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV *
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              value={form.payment.cvv}
                              onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {form.payment.method === 'paypal' && (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">You'll be redirected to PayPal to complete your payment</p>
                      </div>
                    )}

                    {form.payment.method === 'apple_pay' && (
                      <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">Use Touch ID or Face ID to pay with Apple Pay</p>
                      </div>
                    )}
                  </div>
                )}

                {step === 'review' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Order Review</h2>
                    
                    {/* Order Items */}
                    <div className="border rounded-lg p-4 mb-6">
                      <h3 className="font-medium mb-4">Order Items</h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.product.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={item.product.images[0]} 
                                alt={item.product.name}
                                className="h-12 w-12 rounded-md object-cover"
                              />
                              <div>
                                <p className="font-medium text-sm">{item.product.name}</p>
                                <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Environmental Impact */}
                    <div className="bg-emerald-50 rounded-lg p-4 mb-6">
                      <h3 className="font-medium text-emerald-900 mb-3">🌱 Your Environmental Impact</h3>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-xl font-bold text-emerald-600">{totalImpact.carbonSaved.toFixed(1)} kg</p>
                          <p className="text-sm text-emerald-700">CO₂ Saved</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-emerald-600">{totalImpact.plasticReduced.toFixed(1)} kg</p>
                          <p className="text-sm text-emerald-700">Plastic Reduced</p>
                        </div>
                        <div>
                          <p className="text-xl font-bold text-emerald-600">{totalImpact.waterSaved.toFixed(1)} L</p>
                          <p className="text-sm text-emerald-700">Water Saved</p>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="border rounded-lg p-4 mb-6">
                      <h3 className="font-medium mb-2">Shipping Address</h3>
                      <div className="text-sm text-gray-600">
                        <p>{form.shipping.firstName} {form.shipping.lastName}</p>
                        <p>{form.shipping.address}</p>
                        <p>{form.shipping.city}, {form.shipping.state} {form.shipping.zipCode}</p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      if (step === 'payment') setStep('shipping');
                      else if (step === 'review') setStep('payment');
                      else navigate('/cart');
                    }}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    {step === 'shipping' ? 'Back to Cart' : 'Back'}
                  </button>
                  
                  {step === 'review' ? (
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 flex items-center"
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span className="ml-2">Processing...</span>
                        </>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  {carbonOffset > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Carbon Offset 🌱</span>
                      <span>${carbonOffset.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t">
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">🔒</span>
                      Secure 256-bit SSL encryption
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">📦</span>
                      Plastic-free packaging
                    </div>
                    <div className="flex items-center">
                      <span className="text-green-500 mr-2">↩️</span>
                      30-day return policy
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Checkout;
