import React, { useEffect, useState } from 'react';

function AttendanceList({ userId }) {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;

    const fetchRecords = async () => {
      try {
        const response = await fetch(`/api/attendance/user/${userId}`);
        const data = await response.json();
        if (!response.ok) {
          setError(data.message || 'Failed to fetch attendance records');
        } else {
          setRecords(data);
        }
      } catch (err) {
        setError('Server error');
      }
    };

    fetchRecords();
  }, [userId]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Attendance Records</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {records.length === 0 ? (
        <p>No attendance records found.</p>
      ) : (
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Type</th>
              <th className="border border-gray-300 p-2 text-left">Device ID</th>
              <th className="border border-gray-300 p-2 text-left">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record._id}>
                <td className="border border-gray-300 p-2">{record.type}</td>
                <td className="border border-gray-300 p-2">{record.deviceId}</td>
                <td className="border border-gray-300 p-2">{new Date(record.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AttendanceList;
