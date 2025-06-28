import React from 'react';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Dashboard</h1>
      {user ? (
        <div>
          <p className="text-lg mb-2">Welcome, <strong>{user.username}</strong></p>
          <p className="text-lg">Role: <strong>{user.role}</strong></p>
        </div>
      ) : (
        <p>Please login to see your dashboard.</p>
      )}
    </div>
  );
}

export default Dashboard;
