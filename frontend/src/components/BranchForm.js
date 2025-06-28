import React, { useState, useEffect } from 'react';

function BranchForm({ branch, onSave, onCancel }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [manager, setManager] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (branch) {
      setName(branch.name || '');
      setAddress(branch.address || '');
      setContactNumber(branch.contactNumber || '');
      setEmail(branch.email || '');
      setManager(branch.manager || '');
    } else {
      setName('');
      setAddress('');
      setContactNumber('');
      setEmail('');
      setManager('');
    }
  }, [branch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !address) {
      setError('Name and Address are required');
      return;
    }
    const branchData = { name, address, contactNumber, email, manager };
    try {
      const response = await fetch(branch ? `/api/branches/${branch._id}` : '/api/branches', {
        method: branch ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(branchData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to save branch');
      } else {
        onSave();
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4">
      <h2 className="text-xl font-bold mb-4">{branch ? 'Edit Branch' : 'Add Branch'}</h2>
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
          <label className="block text-gray-700 mb-2" htmlFor="address">Address *</label>
          <input
            id="address"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="contactNumber">Contact Number</label>
          <input
            id="contactNumber"
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default BranchForm;
