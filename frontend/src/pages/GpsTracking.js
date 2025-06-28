import React, { useState } from 'react';
import GpsMap from '../components/GpsMap';

function GpsTracking() {
  const [entityType, setEntityType] = useState('vehicle');

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">GPS Tracking</h1>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="entityType">Select Entity Type</label>
        <select
          id="entityType"
          className="w-64 border border-gray-300 p-2 rounded"
          value={entityType}
          onChange={(e) => setEntityType(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="supplier">Supplier</option>
          <option value="vehicle">Vehicle</option>
        </select>
      </div>
      <GpsMap entityType={entityType} />
    </div>
  );
}

export default GpsTracking;
