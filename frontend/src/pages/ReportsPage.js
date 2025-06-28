import React, { useState, useEffect } from 'react';
import ReportTable from '../components/ReportTable';

function ReportsPage() {
  const [reportType, setReportType] = useState('sales');
  const [branchId, setBranchId] = useState('');
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch branches for filter dropdown
    const fetchBranches = async () => {
      try {
        const res = await fetch('/api/branches');
        const data = await res.json();
        if (res.ok) setBranches(data);
      } catch (err) {
        // ignore
      }
    };
    fetchBranches();
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    setError('');
    setReportData([]);
    try {
      let url = `/api/reports/${reportType}?`;
      if (branchId) url += `branchId=${branchId}&`;
      if (userId) url += `userId=${userId}&`;
      if (startDate) url += `startDate=${startDate}&`;
      if (endDate) url += `endDate=${endDate}&`;

      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setReportData(data);
      } else {
        setError(data.message || 'Failed to fetch report');
      }
    } catch (err) {
      setError('Server error');
    }
    setLoading(false);
  };

  const columnsMap = {
    sales: [
      { Header: 'Branch', accessor: 'branchName' },
      { Header: 'Total Sales', accessor: 'totalSales' },
      { Header: 'Count', accessor: 'count' },
    ],
    'inventory-status': [
      { Header: 'Warehouse', accessor: 'warehouseName' },
      { Header: 'Total Quantity', accessor: 'totalQuantity' },
    ],
    'attendance-summary': [
      { Header: 'Type', accessor: '_id' },
      { Header: 'Count', accessor: 'count' },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Reports</h1>
      <div className="mb-6 space-y-4 max-w-md">
        <div>
          <label className="block text-gray-700 mb-2">Report Type</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="sales">Sales Report</option>
            <option value="inventory-status">Inventory Status</option>
            <option value="attendance-summary">Attendance Summary</option>
          </select>
        </div>
        {(reportType === 'sales' || reportType === 'inventory-status') && (
          <div>
            <label className="block text-gray-700 mb-2">Branch</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
            >
              <option value="">All Branches</option>
              {branches.map((b) => (
                <option key={b._id} value={b._id}>{b.name}</option>
              ))}
            </select>
          </div>
        )}
        {reportType === 'attendance-summary' && (
          <div>
            <label className="block text-gray-700 mb-2">User ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="User ID"
            />
          </div>
        )}
        <div>
          <label className="block text-gray-700 mb-2">Start Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">End Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={fetchReport}
          disabled={loading}
          className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          {loading ? 'Loading...' : 'Generate Report'}
        </button>
      </div>
      <div>
        <ReportTable columns={columnsMap[reportType]} data={reportData} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default ReportsPage;
