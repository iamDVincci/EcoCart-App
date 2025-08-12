import React from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/contexts/ProductsContext.tsx';
import { useCart } from '@/contexts/CartContext.tsx';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const product = getProductById(id!);

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <p className="text-sm text-gray-500"><span aria-hidden="true">← </span>Product Detail</p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900">{product.name}</h1>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="text-gray-700">{product.description}</p>
          <div className="mt-6 space-y-4">
            <div className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</div>
            <button 
              onClick={() => addToCart(product)}
              className="rounded-md bg-emerald-600 px-6 py-3 text-white shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
