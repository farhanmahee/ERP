import React, { useEffect, useState } from 'react';

function BranchList({ onEdit }) {
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBranches = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/branches');
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to fetch branches');
      } else {
        setBranches(data);
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this branch?')) return;
    setError('');
    try {
      const response = await fetch(`/api/branches/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        setError(data.message || 'Failed to delete branch');
      } else {
        setBranches(branches.filter(branch => branch._id !== id));
      }
    } catch (err) {
      setError('Server error');
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Branches</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading branches...</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Name</th>
              <th className="border border-gray-300 p-2 text-left">Address</th>
              <th className="border border-gray-300 p-2 text-left">Contact</th>
              <th className="border border-gray-300 p-2 text-left">Email</th>
              <th className="border border-gray-300 p-2 text-left">Manager</th>
              <th className="border border-gray-300 p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.map(branch => (
              <tr key={branch._id}>
                <td className="border border-gray-300 p-2">{branch.name}</td>
                <td className="border border-gray-300 p-2">{branch.address}</td>
                <td className="border border-gray-300 p-2">{branch.contactNumber || '-'}</td>
                <td className="border border-gray-300 p-2">{branch.email || '-'}</td>
                <td className="border border-gray-300 p-2">{branch.manager || '-'}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => onEdit(branch)}
                    className="mr-2 bg-gray-900 text-white px-2 py-1 rounded hover:bg-gray-800 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(branch._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {branches.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4">No branches found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BranchList;
