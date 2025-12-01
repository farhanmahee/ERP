import React, { useState } from 'react';
import { Employee, EmployeeStatus } from '../types';
import { Button } from './Button';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { DEPARTMENTS } from '../constants';

interface EmployeeListProps {
  employees: Employee[];
  onAddEmployee: () => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onAddEmployee }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' || emp.department === filterDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-soft border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800">Employees</h2>
        <Button onClick={onAddEmployee} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="h-4 w-4 mr-2" /> Add Employee
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-4">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-400 outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 bg-white"
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
          >
            <option value="All">Department</option>
            {DEPARTMENTS.map(dept => <option key={dept} value={dept}>{dept}</option>)}
          </select>
        </div>

        <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50/50">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Dept</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{emp.name}</td>
                    <td className="px-6 py-4">{emp.department}</td>
                    <td className="px-6 py-4">{emp.designation}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        emp.status === EmployeeStatus.ACTIVE ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-indigo-600">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};