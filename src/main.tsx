import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { UserProvider } from './contexts/UserContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';
import { ProductsProvider } from './contexts/ProductsContext.tsx';
import { ImpactProvider } from './contexts/ImpactContext.tsx';
import './styles.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing');

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <ImpactProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ImpactProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
