import React, { useState } from 'react';
import { SalesOrder, Customer } from '../types';
import { Button } from './Button';
import { ShoppingCart, FileText, Plus, ArrowLeft } from 'lucide-react';

interface SalesViewProps {
  sales: SalesOrder[];
  customers: Customer[];
}

export const SalesView: React.FC<SalesViewProps> = ({ sales, customers }) => {
  const [viewMode, setViewMode] = useState<'list' | 'return'>('list');

  const handleCreateReturn = () => setViewMode('return');
  const handleBack = () => setViewMode('list');

  if (viewMode === 'return') {
      return (
          <div className="animate-fade-in space-y-6">
              <div className="flex items-center gap-4 mb-4">
                  <Button variant="secondary" onClick={handleBack} className="p-2 rounded-full">
                      <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl font-bold text-slate-800">New Sales Return</h2>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-soft border border-slate-100 flex items-center justify-center min-h-[300px] text-slate-400">
                   Sales Return Form Implementation Placeholder
              </div>
          </div>
      )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-soft border border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Sales</h2>
          <p className="text-sm text-slate-500">Orders & Returns</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={handleCreateReturn}>
                Return
            </Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4 mr-2" /> Sales Order
            </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-slate-100 overflow-hidden">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-indigo-50/50 border-b border-indigo-100">
            <tr>
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Customer</th>
              <th className="px-6 py-3 text-right">Total</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Payment</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((order) => (
              <tr key={order.id} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{order.id}</td>
                <td className="px-6 py-4">{order.customerName}</td>
                <td className="px-6 py-4 text-right font-bold text-slate-900">৳ {order.totalAmount.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {order.paymentStatus}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-indigo-600"><ShoppingCart className="h-4 w-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};