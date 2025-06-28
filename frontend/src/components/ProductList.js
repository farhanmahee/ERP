import React, { useEffect, useState } from 'react';

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to fetch products');
      } else {
        setProducts(data);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Product Catalog</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product._id} className="border border-gray-300 rounded p-4 flex flex-col">
            {product.imageUrl && (
              <img src={product.imageUrl} alt={product.name} className="mb-4 h-48 object-cover rounded" />
            )}
            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
            <p className="mb-2 flex-grow">{product.description}</p>
            <p className="mb-4 font-bold">Price: BDT {product.price.toFixed(2)}</p>
            <button
              onClick={() => onAddToCart(product)}
              className="bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
