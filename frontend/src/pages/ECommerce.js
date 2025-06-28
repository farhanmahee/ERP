import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import Checkout from '../components/Checkout';

function ECommerce() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckoutSuccess = () => {
    setCartItems([]);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">E-Commerce Storefront</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ProductList onAddToCart={handleAddToCart} />
        </div>
        <div>
          <Cart cartItems={cartItems} onRemove={handleRemoveFromCart} onClear={handleClearCart} />
          {cartItems.length > 0 && (
            <div className="mt-6">
              <Checkout cartItems={cartItems} onCheckoutSuccess={handleCheckoutSuccess} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ECommerce;
