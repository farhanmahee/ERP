import React from 'react';

function ReportTable({ columns, data }) {
  if (!data || data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {columns.map((col) => (
            <th key={col.accessor} className="border border-gray-300 p-2 text-left">{col.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.accessor} className="border border-gray-300 p-2">
                {row[col.accessor] !== undefined ? row[col.accessor].toString() : ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ReportTable;
