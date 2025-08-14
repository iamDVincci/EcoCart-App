import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { mockUser, mockOrders } from '@/lib/mockData.ts';
import StarRating from '@/components/StarRating.tsx';

// Dashboard Component
const Dashboard: React.FC = () => {
  const user = mockUser;
  const recentOrders = mockOrders.slice(0, 3);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h2>
        <p className="text-gray-600">Here's your sustainability impact overview</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 mb-8 md:grid-cols-3">
        <div className="bg-emerald-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🌱</div>
            <div>
              <p className="text-sm font-medium text-emerald-600">Total CO₂ Saved</p>
              <p className="text-2xl font-bold text-emerald-800">{user.sustainabilityStats.totalCO2Saved} kg</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">📦</div>
            <div>
              <p className="text-sm font-medium text-blue-600">Total Orders</p>
              <p className="text-2xl font-bold text-blue-800">{user.sustainabilityStats.totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🏆</div>
            <div>
              <p className="text-sm font-medium text-purple-600">Impact Rank</p>
              <p className="text-lg font-bold text-purple-800">{user.sustainabilityStats.impactRank}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Goal Progress */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly CO₂ Savings Goal</h3>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{user.sustainabilityStats.currentMonthSaved} kg saved</span>
            <span>{user.sustainabilityStats.monthlyGoal} kg goal</span>
          </div>
          <div className="bg-gray-200 rounded-full h-3">
            <div 
              className="bg-emerald-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min((user.sustainabilityStats.currentMonthSaved / user.sustainabilityStats.monthlyGoal) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          You're {((user.sustainabilityStats.currentMonthSaved / user.sustainabilityStats.monthlyGoal) * 100).toFixed(0)}% of the way to your monthly goal!
        </p>
      </div>

      {/* Recent Orders */}
      <div className="bg-white border rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
          <Link to="orders" className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
            View all orders →
          </Link>
        </div>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">🌱</span>
                <span>{order.carbonSaved} kg CO₂ saved</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Orders Component
const Orders: React.FC = () => {
  const orders = mockOrders;
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [reorderItems, setReorderItems] = useState<any[]>([]);

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const handleReorder = (order: any) => {
    setReorderItems(order.items);
    setShowReorderModal(true);
  };

  const confirmReorder = () => {
    // Add items to cart logic would go here
    console.log('Reordering items:', reorderItems);
    setShowReorderModal(false);
    setReorderItems([]);
    // Show success message
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
        <p className="text-gray-600">Track your purchases and environmental impact</p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {['all', 'delivered', 'processing', 'shipped'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              filter === status
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            {/* Environmental Impact */}
            <div className="bg-emerald-50 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🌱</span>
                <div>
                  <p className="font-medium text-emerald-800">Environmental Impact</p>
                  <p className="text-emerald-700">{order.carbonSaved} kg CO₂ saved from this order</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Items ({order.items.length})</h4>
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="h-16 w-16 rounded-lg object-cover bg-gray-200" 
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900">{item.product.name}</h5>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <StarRating rating={item.product.rating} size="sm" />
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">${(item.priceAtTime * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">${item.priceAtTime.toFixed(2)} each</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Actions */}
            <div className="mt-4 flex justify-end space-x-3">
              <button 
                onClick={() => handleViewDetails(order)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                View Details
              </button>
              <button 
                onClick={() => handleReorder(order)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700"
              >
                Reorder Items
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Order Summary */}
              <div className="border-b pb-4 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-medium">#{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      selectedOrder.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      selectedOrder.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-medium">${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-emerald-50 rounded-lg p-4 mb-4">
                <h4 className="font-medium text-emerald-800 mb-2">Environmental Impact</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-emerald-700">CO₂ Saved: {selectedOrder.carbonSaved} kg</p>
                  </div>
                  <div>
                    <p className="text-emerald-700">Trees Equivalent: {Math.round(selectedOrder.carbonSaved * 0.02)}</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Items</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="h-16 w-16 rounded-lg object-cover bg-gray-200" 
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{item.product.name}</h5>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-600">CO₂ Saved: {(item.product.carbonSavedKg * item.quantity).toFixed(1)} kg</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${(item.priceAtTime * item.quantity).toFixed(2)}</p>
                        <p className="text-sm text-gray-600">${item.priceAtTime.toFixed(2)} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reorder Modal */}
      {showReorderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Reorder Items</h3>
              <p className="text-gray-600 mb-4">
                Add all {reorderItems.length} items from this order to your cart?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowReorderModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReorder}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sustainability Component
const Sustainability: React.FC = () => {
  const user = mockUser;
  const monthlyData = [
    { month: 'Aug', saved: 7.2 },
    { month: 'Jul', saved: 8.5 },
    { month: 'Jun', saved: 6.8 },
    { month: 'May', saved: 9.2 },
    { month: 'Apr', saved: 5.4 },
    { month: 'Mar', saved: 8.6 },
  ];

  const achievements = [
    { icon: '🌱', title: 'First Purchase', description: 'Made your first sustainable purchase', date: '2024-03-15', earned: true },
    { icon: '🏆', title: 'Eco Champion', description: 'Saved 25+ kg of CO₂', date: '2024-06-20', earned: true },
    { icon: '📦', title: 'Loyal Customer', description: 'Completed 10+ orders', date: '2024-11-15', earned: true },
    { icon: '🌍', title: 'Planet Protector', description: 'Save 50+ kg of CO₂', date: null, earned: false },
    { icon: '⭐', title: 'Review Master', description: 'Leave 20+ product reviews', date: null, earned: false },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Sustainability Journey</h2>
        <p className="text-gray-600">Track your environmental impact and progress</p>
      </div>

      {/* Impact Summary */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-2">🌱</div>
          <p className="text-2xl font-bold text-green-800">{user.sustainabilityStats.totalCO2Saved} kg</p>
          <p className="text-sm text-green-600">Total CO₂ Saved</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-2">🌳</div>
          <p className="text-2xl font-bold text-blue-800">{Math.round(user.sustainabilityStats.totalCO2Saved * 0.02)}</p>
          <p className="text-sm text-blue-600">Trees Equivalent</p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-2">📦</div>
          <p className="text-2xl font-bold text-purple-800">{user.sustainabilityStats.totalOrders}</p>
          <p className="text-sm text-purple-600">Eco Orders</p>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-6 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <p className="text-lg font-bold text-orange-800">{user.sustainabilityStats.impactRank}</p>
          <p className="text-sm text-orange-600">Current Rank</p>
        </div>
      </div>

      {/* Monthly Progress Chart */}
      <div className="bg-white border rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly CO₂ Savings</h3>
        <div className="flex items-end justify-between h-40 space-x-2">
          {monthlyData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="bg-emerald-500 rounded-t w-full min-h-[20px] transition-all duration-300 hover:bg-emerald-600"
                style={{ height: `${(data.saved / 10) * 100}%` }}
                title={`${data.month}: ${data.saved} kg CO₂ saved`}
              ></div>
              <div className="text-xs text-gray-600 mt-2">{data.month}</div>
              <div className="text-xs font-medium text-gray-900">{data.saved}</div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Your average monthly CO₂ savings: {(monthlyData.reduce((sum, month) => sum + month.saved, 0) / monthlyData.length).toFixed(1)} kg
        </p>
      </div>

      {/* Achievements */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-lg border-2 ${
                achievement.earned 
                  ? 'border-emerald-200 bg-emerald-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${achievement.earned ? 'text-emerald-800' : 'text-gray-600'}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${achievement.earned ? 'text-emerald-600' : 'text-gray-500'}`}>
                    {achievement.description}
                  </p>
                  {achievement.earned && achievement.date && (
                    <p className="text-xs text-emerald-500 mt-1">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {achievement.earned && (
                  <div className="text-emerald-600">
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Profile Settings Component
const Profile: React.FC = () => {
  const [user, setUser] = useState(mockUser);
  const [showSustainabilityGoals, setShowSustainabilityGoals] = useState(false);

  const handlePreferenceChange = (preference: keyof typeof mockUser.preferences) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference]
      }
    }));
  };

  const handleGoalChange = (goal: string, value: number) => {
    setUser(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        sustainabilityGoals: {
          ...prev.preferences.sustainabilityGoals!,
          [goal]: value
        }
      }
    }));
  };

  const categories = [
    'Personal Care', 'Home & Kitchen', 'Fashion', 'Electronics', 
    'Health & Wellness', 'Food & Beverages', 'Sports & Outdoors'
  ];

  const certifications = [
    'Fair Trade', 'Organic', 'B-Corp', 'Carbon Neutral', 
    'Recyclable Packaging', 'Cruelty-Free', 'Energy Star'
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
        <p className="text-gray-600">Manage your account information and preferences</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              value={user.name}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              value={user.email}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
          <p className="text-gray-600">{new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Newsletter</h4>
              <p className="text-sm text-gray-600">Receive our weekly sustainability newsletter</p>
            </div>
            <button
              onClick={() => handlePreferenceChange('newsletter')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                user.preferences.newsletter ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  user.preferences.newsletter ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Sustainability Updates</h4>
              <p className="text-sm text-gray-600">Get notified about your environmental impact</p>
            </div>
            <button
              onClick={() => handlePreferenceChange('sustainabilityUpdates')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                user.preferences.sustainabilityUpdates ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  user.preferences.sustainabilityUpdates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Order Updates</h4>
              <p className="text-sm text-gray-600">Receive notifications about your orders</p>
            </div>
            <button
              onClick={() => handlePreferenceChange('orderUpdates')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                user.preferences.orderUpdates ? 'bg-emerald-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  user.preferences.orderUpdates ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Sustainability Preferences */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Sustainability Preferences</h3>
          <button
            onClick={() => setShowSustainabilityGoals(!showSustainabilityGoals)}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            {showSustainabilityGoals ? 'Hide Goals' : 'Set Goals'}
          </button>
        </div>

        {/* Preferred Categories */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Preferred Categories</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm ${
                  user.preferences.preferredCategories?.includes(category)
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                } border`}
                onClick={() => {
                  const current = user.preferences.preferredCategories || [];
                  const updated = current.includes(category)
                    ? current.filter(c => c !== category)
                    : [...current, category];
                  setUser(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      preferredCategories: updated
                    }
                  }));
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Certifications */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Preferred Certifications</h4>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <button
                key={cert}
                className={`px-3 py-1 rounded-full text-sm ${
                  user.preferences.sustainabilityGoals?.preferredCertifications?.includes(cert)
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                } border`}
                onClick={() => {
                  const current = user.preferences.sustainabilityGoals?.preferredCertifications || [];
                  const updated = current.includes(cert)
                    ? current.filter(c => c !== cert)
                    : [...current, cert];
                  setUser(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      sustainabilityGoals: {
                        ...prev.preferences.sustainabilityGoals!,
                        preferredCertifications: updated
                      }
                    }
                  }));
                }}
              >
                {cert}
              </button>
            ))}
          </div>
        </div>

        {/* Sustainability Goals */}
        {showSustainabilityGoals && (
          <div className="space-y-4 p-4 bg-emerald-50 rounded-lg">
            <h4 className="font-medium text-emerald-900">Your Sustainability Goals</h4>
            
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Monthly CO₂ Savings Target (kg)
              </label>
              <input
                type="number"
                value={user.preferences.sustainabilityGoals?.monthlyCO2Target || 0}
                onChange={(e) => handleGoalChange('monthlyCO2Target', Number(e.target.value))}
                className="w-full rounded-md border border-emerald-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                min="0"
                max="1000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Annual CO₂ Savings Target (kg)
              </label>
              <input
                type="number"
                value={user.preferences.sustainabilityGoals?.annualCO2Target || 0}
                onChange={(e) => handleGoalChange('annualCO2Target', Number(e.target.value))}
                className="w-full rounded-md border border-emerald-300 px-3 py-2 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                min="0"
                max="10000"
              />
            </div>
            
            <p className="text-sm text-emerald-700">
              Setting goals helps us recommend products that align with your sustainability targets.
            </p>
          </div>
        )}
      </div>

      {/* Account Actions */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        <div className="space-y-3">
          <button className="w-full sm:w-auto px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 text-sm font-medium">
            Save Changes
          </button>
          <button className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium ml-0 sm:ml-3">
            Change Password
          </button>
          <button className="w-full sm:w-auto px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 text-sm font-medium ml-0 sm:ml-3">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Account Component
const Account: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    if (path === '' && location.pathname === '/account') return true;
    return location.pathname.includes(path);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64">
          <nav className="space-y-2" aria-label="Account navigation">
            <Link 
              to="/account" 
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                isActive('') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-700 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-center">
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 1v2m8-2v2" />
                </svg>
                Dashboard
              </div>
            </Link>
            
            <Link 
              to="/account/orders" 
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                isActive('orders') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-700 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-center">
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Orders
              </div>
            </Link>
            
            <Link 
              to="/account/sustainability" 
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                isActive('sustainability') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-700 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-center">
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Sustainability
              </div>
            </Link>
            
            <Link 
              to="/account/profile" 
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                isActive('profile') 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'text-gray-700 hover:bg-emerald-50'
              }`}
            >
              <div className="flex items-center">
                <svg className="mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </div>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 rounded-lg border bg-white shadow-sm">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="sustainability" element={<Sustainability />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Account;
