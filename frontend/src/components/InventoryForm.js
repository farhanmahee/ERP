import React, { useState, useEffect } from 'react';

function InventoryForm({ inventory, onSave, onCancel }) {
  const [cylinderType, setCylinderType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [branch, setBranch] = useState('');
  const [status, setStatus] = useState('available');
  const [barcode, setBarcode] = useState('');
  const [warehouses, setWarehouses] = useState([]);
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch warehouses and branches for dropdowns
    const fetchData = async () => {
      try {
        const [warehousesRes, branchesRes] = await Promise.all([
          fetch('/api/warehouses'),
          fetch('/api/branches'),
        ]);
        const warehousesData = await warehousesRes.json();
        const branchesData = await branchesRes.json();
        if (warehousesRes.ok) setWarehouses(warehousesData);
        if (branchesRes.ok) setBranches(branchesData);
      } catch (err) {
        // Ignore errors here
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inventory) {
      setCylinderType(inventory.cylinderType || '');
      setQuantity(inventory.quantity || '');
      setWarehouse(inventory.warehouse ? inventory.warehouse._id || inventory.warehouse : '');
      setBranch(inventory.branch ? inventory.branch._id || inventory.branch : '');
      setStatus(inventory.status || 'available');
      setBarcode(inventory.barcode || '');
    } else {
      setCylinderType('');
      setQuantity('');
      setWarehouse('');
      setBranch('');
      setStatus('available');
      setBarcode('');
    }
  }, [inventory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!cylinderType || !quantity || !warehouse || !branch) {
      setError('Cylinder Type, Quantity, Warehouse, and Branch are required');
      return;
    }
    const inventoryData = { cylinderType, quantity, warehouse, branch, status, barcode };
    try {
      const response = await fetch(inventory ? `/api/inventory/${inventory._id}` : '/api/inventory', {
        method: inventory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inventoryData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to save inventory item');
      } else {
        onSave();
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">{inventory ? 'Edit Inventory Item' : 'Add Inventory Item'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cylinderType">Cylinder Type *</label>
          <input
            id="cylinderType"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={cylinderType}
            onChange={(e) => setCylinderType(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="quantity">Quantity *</label>
          <input
            id="quantity"
            type="number"
            min="0"
            className="w-full border border-gray-300 p-2 rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="warehouse">Warehouse *</label>
          <select
            id="warehouse"
            className="w-full border border-gray-300 p-2 rounded"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            required
          >
            <option value="">Select Warehouse</option>
            {warehouses.map(w => (
              <option key={w._id} value={w._id}>{w.name}</option>
            ))}
            default value(generator=response for react async (params) => {
              
            })
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="branch">Branch *</label>
          <select
            id="branch"
            className="w-full border border-gray-300 p-2 rounded"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            <option value="">Select Branch</option>
            {branches.map(b => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
          <select
            id="status"
            className="w-full border border-gray-300 p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="available">Available</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="barcode">Barcode</label>
          <input
            id="barcode"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default InventoryForm;
