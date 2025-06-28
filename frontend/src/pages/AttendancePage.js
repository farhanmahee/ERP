import React, { useState } from 'react';
import AttendanceList from '../components/AttendanceList';

function AttendancePage() {
  const [userId, setUserId] = useState('');
  const [submittedUserId, setSubmittedUserId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedUserId(userId);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Attendance Records</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <label htmlFor="userId" className="block text-gray-700 mb-2">Enter User ID</label>
        <input
          id="userId"
          type="text"
          className="w-full max-w-md border border-gray-300 p-2 rounded"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          required
        />
        <button
          type="submit"
          className="mt-4 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          View Attendance
        </button>
      </form>
      {submittedUserId && <AttendanceList userId={submittedUserId} />}
    </div>
  );
}

export default AttendancePage;
