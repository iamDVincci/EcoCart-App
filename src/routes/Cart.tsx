import React from 'react';
import { useCart } from '@/contexts/CartContext.tsx';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, itemCount } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900">Your Cart ({itemCount})</h1>
      
      {itemCount === 0 ? (
        <p className="mt-2 text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <img src={item.images[0]} alt={item.name} className="h-16 w-16 rounded-md object-cover" />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-sm font-medium text-red-600 hover:text-red-800">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
