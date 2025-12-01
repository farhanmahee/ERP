import React from 'react';
import { Employee } from '../types';
import { Button } from './Button';
import { Download, DollarSign } from 'lucide-react';

interface PayrollViewProps {
  employees: Employee[];
}

export const PayrollView: React.FC<PayrollViewProps> = ({ employees }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-soft border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Payroll</h2>
        <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-slate-100 overflow-hidden">
          <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50/50">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3 text-right">Basic</th>
                <th className="px-6 py-3 text-right">Gross</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => {
                const gross = emp.basicSalary * 1.5;
                return (
                  <tr key={emp.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{emp.name}</td>
                    <td className="px-6 py-4 text-right">৳ {emp.basicSalary.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800">৳ {gross.toLocaleString()}</td>
                    <td className="px-6 py-4 text-center">
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Pending</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                        <Button size="sm" variant="outline" className="text-xs h-7">Slip</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>
    </div>
  );
};