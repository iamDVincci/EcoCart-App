import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/types/index.d';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[]; // changed from cartItems
  addToCart: (product: Product, quantity?: number) => Promise<void>; // updated signature
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  total: number; // changed from totalPrice
  totalCarbonSaved: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = async (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev => 
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalCarbonSaved = cartItems.reduce((sum, item) => sum + (item.carbonSavedKg * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items: cartItems, // changed from cartItems
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      itemCount, 
      total, // changed from totalPrice
      totalCarbonSaved 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
