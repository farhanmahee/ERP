import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{item.name} - BDT {item.price.toFixed(2)}</span>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p className="font-bold mb-4">Total: BDT {totalPrice.toFixed(2)}</p>
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
