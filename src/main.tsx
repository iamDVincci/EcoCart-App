import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles.css';
import { ImpactProvider } from './contexts/ImpactContext.tsx';
import { ProductsProvider } from './contexts/ProductsContext.tsx';
import { CartProvider } from './contexts/CartContext.tsx';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing');

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <ImpactProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ImpactProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
