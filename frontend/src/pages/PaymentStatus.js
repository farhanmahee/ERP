import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentStatus() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get('status') || 'unknown';
  const tranId = query.get('tran_id') || '';

  let message = '';
  if (status === 'VALID') {
    message = 'Payment successful!';
  } else if (status === 'FAILED') {
    message = 'Payment failed. Please try again.';
  } else if (status === 'CANCELLED') {
    message = 'Payment was cancelled.';
  } else {
    message = 'Payment status unknown.';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Payment Status</h2>
        <p className="mb-4">{message}</p>
        {tranId && <p>Transaction ID: <strong>{tranId}</strong></p>}
      </div>
    </div>
  );
}

export default PaymentStatus;
