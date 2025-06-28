import React, { useState } from 'react';
import OrderList from '../components/OrderList';
import OrderForm from '../components/OrderForm';

function OrderManagement() {
  const [editingOrder, setEditingOrder] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleSave = () => {
    setEditingOrder(null);
    setRefreshKey(oldKey => oldKey + 1);
  };

  const handleCancel = () => {
    setEditingOrder(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Order Management</h1>
      <OrderList key={refreshKey} onEdit={handleEdit} />
      <OrderForm order={editingOrder} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}

export default OrderManagement;
