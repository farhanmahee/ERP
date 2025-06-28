import React, { useState, useEffect } from 'react';

function WarehouseForm({ warehouse, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [branch, setBranch] = useState('');
  const [branches, setBranches] = useState([]);
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [manager, setManager] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch branches for dropdown
    const fetchBranches = async () => {
      try {
        const response = await fetch('/api/branches');
        const data = await response.json();
        if (response.ok) {
          setBranches(data);
        }
      } catch (err) {
        // Ignore errors here
      }
    };
    fetchBranches();
  }, []);

  useEffect(() => {
    if (warehouse) {
      setName(warehouse.name || '');
      setBranch(warehouse.branch ? warehouse.branch._id || warehouse.branch : '');
      setLocation(warehouse.location || '');
      setCapacity(warehouse.capacity || '');
      setManager(warehouse.manager || '');
    } else {
      setName('');
      setBranch('');
      setLocation('');
      setCapacity('');
      setManager('');
    }
  }, [warehouse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !branch || !location) {
      setError('Name, Branch, and Location are required');
      return;
    }
    const warehouseData = { name, branch, location, capacity, manager };
    try {
      const response = await fetch(warehouse ? `/api/warehouses/${warehouse._id}` : '/api/warehouses', {
        method: warehouse ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(warehouseData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to save warehouse');
      } else {
        onSave();
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">{warehouse ? 'Edit Warehouse' : 'Add Warehouse'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <label className="block text-gray-700 mb-2" htmlFor="location">Location *</label>
          <input
            id="location"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="capacity">Capacity</label>
          <input
            id="capacity"
            type="number"
            className="w-full border border-gray-300 p-2 rounded"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="manager">Manager</label>
          <input
            id="manager"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={manager}
            onChange={(e) => setManager(e.target.value)}
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

export default WarehouseForm;
