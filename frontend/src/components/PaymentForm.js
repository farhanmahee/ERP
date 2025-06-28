import React, { useState } from 'react';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPaymentUrl('');
    if (!amount || !customerName || !customerEmail || !customerPhone) {
      setError('All fields are required');
      return;
    }
    const paymentData = {
      amount,
      transactionId: `TXN${Date.now()}`,
      successUrl: `${window.location.origin}/payment-success`,
      failUrl: `${window.location.origin}/payment-fail`,
      cancelUrl: `${window.location.origin}/payment-cancel`,
      ipnUrl: `${window.location.origin}/api/payments/ipn`,
      productName: 'Gas Cylinder Order',
      customerName,
      customerEmail,
      customerPhone,
      customerAddress: '',
      currency: 'BDT',
    };
    try {
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      const data = await response.json();
      if (data.GatewayPageURL) {
        setPaymentUrl(data.GatewayPageURL);
      } else {
        setError('Failed to initiate payment');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  if (paymentUrl) {
    window.location.href = paymentUrl;
    return <p>Redirecting to payment gateway...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Initiate Payment</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">Amount (BDT)</label>
          <input
            id="amount"
            type="number"
            min="1"
            className="w-full border border-gray-300 p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="customerName">Customer Name</label>
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
          <label className="block text-gray-700 mb-2" htmlFor="customerEmail">Customer Email</label>
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
          <label className="block text-gray-700 mb-2" htmlFor="customerPhone">Customer Phone</label>
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
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
