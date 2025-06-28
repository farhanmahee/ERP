import React, { useEffect, useState } from 'react';

function InventoryList({ onEdit }) {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [error, setError] = useState('');

  const fetchInventory = async () => {
    try {
      const response = await fetch('/api/inventory');
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to fetch inventory');
      } else {
        setInventoryItems(data);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inventory item?')) return;
    try {
      const response = await fetch(`/api/inventory/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to delete inventory item');
      } else {
        setInventoryItems(inventoryItems.filter(item => item._id !== id));
      }
    } catch (err) {
      setError('Server error');
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Inventory</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Cylinder Type</th>
            <th className="border border-gray-300 p-2 text-left">Quantity</th>
            <th className="border border-gray-300 p-2 text-left">Warehouse</th>
            <th className="border border-gray-300 p-2 text-left">Branch</th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
            <th className="border border-gray-300 p-2 text-left">Barcode</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map(item => (
            <tr key={item._id}>
              <td className="border border-gray-300 p-2">{item.cylinderType}</td>
              <td className="border border-gray-300 p-2">{item.quantity}</td>
              <td className="border border-gray-300 p-2">{item.warehouse ? item.warehouse.name : '-'}</td>
              <td className="border border-gray-300 p-2">{item.branch ? item.branch.name : '-'}</td>
              <td className="border border-gray-300 p-2">{item.status}</td>
              <td className="border border-gray-300 p-2">{item.barcode || '-'}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => onEdit(item)}
                  className="mr-2 bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {inventoryItems.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center p-4">No inventory items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;
