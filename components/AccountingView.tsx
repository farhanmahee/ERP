import React from 'react';
import { Button } from './Button';
import { DollarSign, PieChart, FileText } from 'lucide-react';

export const AccountingView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-soft border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Accounting</h2>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">Journal Entry</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">New Voucher</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-soft border border-slate-100">
            <h3 className="text-lg font-semibold mb-4 text-slate-800">Overview</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-emerald-50/50 rounded-lg border border-emerald-100">
                    <div>
                        <p className="font-medium text-emerald-900">Total Assets</p>
                    </div>
                    <p className="text-xl font-bold text-emerald-700">৳ 1,250,000</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-rose-50/50 rounded-lg border border-rose-100">
                    <div>
                        <p className="font-medium text-rose-900">Total Liabilities</p>
                    </div>
                    <p className="text-xl font-bold text-rose-700">৳ 450,000</p>
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100">
             <h3 className="text-lg font-semibold mb-4 text-slate-800">Reports</h3>
             <ul className="space-y-1">
                 <li><button className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg text-sm text-slate-600 flex items-center transition-colors"><PieChart className="h-4 w-4 mr-3 text-indigo-400"/> Balance Sheet</button></li>
                 <li><button className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-lg text-sm text-slate-600 flex items-center transition-colors"><FileText className="h-4 w-4 mr-3 text-indigo-400"/> P&L Statement</button></li>
             </ul>
        </div>
      </div>
    </div>
  );
};