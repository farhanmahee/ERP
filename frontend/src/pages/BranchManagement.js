import React, { useState } from 'react';
import BranchList from '../components/BranchList';
import BranchForm from '../components/BranchForm';

function BranchManagement() {
  const [editingBranch, setEditingBranch] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (branch) => {
    setEditingBranch(branch);
  };

  const handleSave = () => {
    setEditingBranch(null);
    setRefreshKey(oldKey => oldKey + 1);
  };

  const handleCancel = () => {
    setEditingBranch(null);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Branch Management</h1>
      <BranchList key={refreshKey} onEdit={handleEdit} />
      <BranchForm branch={editingBranch} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}

export default BranchManagement;
