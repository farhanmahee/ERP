import React from 'react';
import { Supplier } from '../types';
import { Button } from './Button';
import { Truck, AlertCircle } from 'lucide-react';

interface PurchaseViewProps {
  suppliers: Supplier[];
}

export const PurchaseView: React.FC<PurchaseViewProps> = ({ suppliers }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-soft border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Purchase</h2>
          <p className="text-sm text-slate-500">Transit & GRN</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Truck className="h-4 w-4 mr-2" /> New Transit
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Transit Section */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-slate-800">
                <Truck className="h-5 w-5 mr-2 text-indigo-500" /> Active Transit
            </h3>
            <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-indigo-200 transition-colors">
                    <div className="flex justify-between mb-2">
                        <span className="font-medium text-slate-900">TR-2023-885</span>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">In Transit</span>
                    </div>
                    <p className="text-sm text-slate-600">Supplier: <span className="font-medium text-slate-800">Linde Bangladesh</span></p>
                    <div className="mt-4 text-right">
                        <Button size="sm" variant="outline" className="text-xs">Receive (GRN)</Button>
                    </div>
                </div>
            </div>
        </div>

        {/* Suppliers Balance */}
        <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-slate-800">
                <AlertCircle className="h-5 w-5 mr-2 text-purple-500" /> Supplier Payables
            </h3>
            <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50/50">
                    <tr>
                        <th className="px-4 py-2">Supplier</th>
                        <th className="px-4 py-2 text-right">Payable</th>
                        <th className="px-4 py-2 text-right">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(sup => (
                        <tr key={sup.id} className="border-b last:border-0 border-slate-100">
                            <td className="px-4 py-3 font-medium text-slate-900">{sup.name}</td>
                            <td className="px-4 py-3 text-right">৳ {sup.balance.toLocaleString()}</td>
                            <td className="px-4 py-3 text-right">
                                <span className="text-indigo-600 cursor-pointer hover:underline text-xs font-medium">Pay</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};