import React, { useState } from 'react';
import WarehouseList from '../components/WarehouseList';
import WarehouseForm from '../components/WarehouseForm';

function WarehouseManagement() {
  const [editingWarehouse, setEditingWarehouse] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (warehouse) => {
    setEditingWarehouse(warehouse);
  };

  const handleSave = () => {
    setEditingWarehouse(null);
    setRefreshKey(oldKey => oldKey + 1);
  };

  const handleCancel = () => {
    setEditingWarehouse(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Warehouse Management</h1>
      <WarehouseList key={refreshKey} onEdit={handleEdit} />
      <WarehouseForm warehouse={editingWarehouse} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}

export default WarehouseManagement;
