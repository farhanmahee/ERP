import React, { useEffect, useState } from 'react';

function OrderList({ onEdit }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to fetch orders');
      } else {
        setOrders(data);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this order?')) return;
    try {
      const response = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to delete order');
      } else {
        setOrders(orders.filter(order => order._id !== id));
      }
    } catch (err) {
      setError('Server error');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Orders</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Order Type</th>
            <th className="border border-gray-300 p-2 text-left">Customer/Supplier</th>
            <th className="border border-gray-300 p-2 text-left">Branch</th>
            <th className="border border-gray-300 p-2 text-left">Warehouse</th>
            <th className="border border-gray-300 p-2 text-left">Order Status</th>
            <th className="border border-gray-300 p-2 text-left">Payment Status</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td className="border border-gray-300 p-2">{order.orderType}</td>
              <td className="border border-gray-300 p-2">{order.customerName || order.supplierName || '-'}</td>
              <td className="border border-gray-300 p-2">{order.branch ? order.branch.name : '-'}</td>
              <td className="border border-gray-300 p-2">{order.warehouse ? order.warehouse.name : '-'}</td>
              <td className="border border-gray-300 p-2">{order.orderStatus}</td>
              <td className="border border-gray-300 p-2">{order.paymentStatus}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => onEdit(order)}
                  className="mr-2 bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;
