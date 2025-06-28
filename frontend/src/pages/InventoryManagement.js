import React, { useState } from 'react';
import InventoryList from '../components/InventoryList';
import InventoryForm from '../components/InventoryForm';

function InventoryManagement() {
  const [editingInventory, setEditingInventory] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (inventory) => {
    setEditingInventory(inventory);
  };

  const handleSave = () => {
    setEditingInventory(null);
    setRefreshKey(oldKey => oldKey + 1);
  };

  const handleCancel = () => {
    setEditingInventory(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Inventory Management</h1>
      <InventoryList key={refreshKey} onEdit={handleEdit} />
      <InventoryForm inventory={editingInventory} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}

export default InventoryManagement;
