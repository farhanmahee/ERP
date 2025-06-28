import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

function Checkout() {
  const { cart, clearCart } = useContext(AppContext);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!customerName || !customerEmail || !customerPhone) {
      setError('Please fill in all customer details.');
      return;
    }
    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }
    setError('');
    setLoading(true);

    // Prepare order data
    const orderData = {
      orderType: 'sales',
      items: cart.map(item => ({
        inventory: item._id || null,
        quantity: 1, // Assuming quantity 1 for simplicity
      })),
      customerName,
      branch: cart[0]?.branch || null,
      warehouse: cart[0]?.warehouse || null,
      orderStatus: 'pending',
      paymentStatus: 'unpaid',
    };

    try {
      // Create order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const orderResult = await orderResponse.json();
      if (!orderResponse.ok) {
        setError(orderResult.message || 'Failed to create order.');
        setLoading(false);
        return;
      }

      // Initiate payment
      const paymentData = {
        amount: cart.reduce((sum, item) => sum + item.price, 0),
        transactionId: `TXN${Date.now()}`,
        successUrl: `${window.location.origin}/payment-success`,
        failUrl: `${window.location.origin}/payment-fail`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
        ipnUrl: `${window.location.origin}/api/payments/ipn`,
        productName: 'E-commerce Order',
        customerName,
        customerEmail,
        customerPhone,
        customerAddress: '',
        currency: 'BDT',
      };

      const paymentResponse = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      const paymentResult = await paymentResponse.json();
      if (paymentResult.GatewayPageURL) {
        window.location.href = paymentResult.GatewayPageURL;
      } else {
        setError('Failed to initiate payment.');
        setLoading(false);
      }
    } catch (err) {
      setError('Server error.');
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="customerName">Name</label>
        <input
          id="customerName"
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="customerEmail">Email</label>
        <input
          id="customerEmail"
          type="email"
          className="w-full border border-gray-300 p-2 rounded"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="customerPhone">Phone</label>
        <input
          id="customerPhone"
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          required
        />
      </div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Place Order & Pay'}
      </button>
    </div>
  );
}

export default Checkout;
