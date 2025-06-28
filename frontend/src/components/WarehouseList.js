import React, { useEffect, useState } from 'react';

function WarehouseList({ onEdit }) {
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState('');

  const fetchWarehouses = async () => {
    try {
      const response = await fetch('/api/warehouses');
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to fetch warehouses');
      } else {
        setWarehouses(data);
      }
    } catch (err) {
      setError('Server error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this warehouse?')) return;
    try {
      const response = await fetch(`/api/warehouses/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to delete warehouse');
      } else {
        setWarehouses(warehouses.filter(warehouse => warehouse._id !== id));
      }
    } catch (err) {
      setError('Server error');
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Warehouses</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Branch</th>
            <th className="border border-gray-300 p-2 text-left">Location</th>
            <th className="border border-gray-300 p-2 text-left">Capacity</th>
            <th className="border border-gray-300 p-2 text-left">Manager</th>
            <th className="border border-gray-300 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map(warehouse => (
            <tr key={warehouse._id}>
              <td className="border border-gray-300 p-2">{warehouse.name}</td>
              <td className="border border-gray-300 p-2">{warehouse.branch ? warehouse.branch.name : '-'}</td>
              <td className="border border-gray-300 p-2">{warehouse.location}</td>
              <td className="border border-gray-300 p-2">{warehouse.capacity || '-'}</td>
              <td className="border border-gray-300 p-2">{warehouse.manager || '-'}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => onEdit(warehouse)}
                  className="mr-2 bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-800 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(warehouse._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {warehouses.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center p-4">No warehouses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default WarehouseList;
