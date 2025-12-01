import React, { useState } from 'react';
import { 
  ShoppingCart, 
  TrendingDown, 
  TrendingUp, 
  Calendar,
  X,
  FileText
} from 'lucide-react';
import { Employee, Item, SalesOrder } from '../types';

interface DashboardProps {
  employees: Employee[];
  inventory: Item[];
  sales: SalesOrder[];
}

export const Dashboard: React.FC<DashboardProps> = ({ employees, inventory, sales }) => {
  const [activeTab, setActiveTab] = useState('Sales');
  
  // KPI Data (Mocked to match screenshot)
  const kpiData = [
      { label: 'Purchase', amount: 0, icon: ShoppingCart, color: 'text-indigo-600', bg: 'bg-indigo-50', iconMod: 'down' },
      { label: 'Sale', amount: 0, icon: ShoppingCart, color: 'text-indigo-600', bg: 'bg-indigo-50', iconMod: 'up' },
      { label: 'Purchase Due', amount: 0, icon: ShoppingCart, color: 'text-indigo-600', bg: 'bg-indigo-50', iconMod: 'clock' },
      { label: 'Sale Due', amount: 0, icon: ShoppingCart, color: 'text-indigo-600', bg: 'bg-indigo-50', iconMod: 'clock' },
      { label: 'Expense', amount: 0, icon: TrendingDown, color: 'text-indigo-600', bg: 'bg-indigo-50', iconMod: '' },
      { label: 'Revenue', amount: 0, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', iconMod: '' },
  ];

  const tabs = ['Sales', 'Purchases', 'Expenses', 'Revenues', 'Money Transfers', 'Commissions', 'Advance Payment'];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Welcome & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
         <h1 className="text-xl font-bold text-slate-800">Welcome</h1>
         <div className="flex flex-wrap gap-2 items-center">
             <div className="bg-white rounded-lg p-1 border border-slate-200 flex shadow-sm">
                 <button className="px-4 py-1.5 text-xs font-medium bg-indigo-600 text-white rounded-md shadow-sm">Daily</button>
                 <button className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-md">Weekly</button>
                 <button className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-md">Monthly</button>
                 <button className="px-4 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 rounded-md">Yearly</button>
             </div>
             <div className="bg-white rounded-lg px-3 py-1.5 border border-slate-200 flex items-center gap-2 shadow-sm text-sm text-slate-600">
                 <Calendar className="h-4 w-4 text-slate-400" />
                 <span>30/11/25 - 30/11/25</span>
             </div>
         </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpiData.map((kpi, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                  <div className={`h-14 w-14 rounded-full ${kpi.bg} flex items-center justify-center flex-shrink-0`}>
                      <kpi.icon className={`h-7 w-7 ${kpi.color}`} />
                  </div>
                  <div>
                      <p className="text-sm text-slate-400 font-medium mb-1">{kpi.label}</p>
                      <div className="flex items-baseline gap-1">
                          <span className="text-slate-400 text-xl font-light">৳</span>
                          <span className="text-2xl font-bold text-slate-700">{kpi.amount.toFixed(2)}</span>
                      </div>
                  </div>
              </div>
          ))}
      </div>

      {/* Recent Transactions Section */}
      <div className="bg-white rounded-2xl shadow-soft border border-slate-100 overflow-hidden min-h-[400px]">
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-lg font-bold text-slate-800">Recent Transaction</h2>
              <div className="flex flex-wrap gap-1 justify-center">
                  {tabs.map(tab => (
                      <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                            activeTab === tab 
                            ? 'bg-indigo-600 text-white border-indigo-600' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-indigo-200'
                        }`}
                      >
                          {tab}
                      </button>
                  ))}
              </div>
          </div>
          
          {/* Table Header */}
          <div className="bg-[#F1F5F9] border-b border-slate-200">
              <div className="grid grid-cols-9 text-xs font-semibold text-slate-700 p-4 text-center">
                  <div>Date</div>
                  <div>Type</div>
                  <div>Payment Status</div>
                  <div>Reference No</div>
                  <div>Invoice No</div>
                  <div>Client</div>
                  <div>Sale Qty</div>
                  <div>Total Amount</div>
                  <div>Total Discount</div>
              </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-6 relative">
                   <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Papers Background */}
                        <rect x="50" y="20" width="80" height="100" rx="4" transform="rotate(-15 90 70)" fill="#E0E7FF" opacity="0.8"/>
                        <rect x="90" y="20" width="80" height="100" rx="4" transform="rotate(15 110 70)" fill="#C7D2FE" opacity="0.8"/>
                        
                        {/* Folder */}
                        <path d="M60 60 H140 V130 C140 135 135 140 130 140 H70 C65 140 60 135 60 130 V60 Z" fill="#6366F1"/>
                        <path d="M60 60 L75 45 H125 L140 60 H60 Z" fill="#4F46E5"/>
                        
                        {/* Cross Icon */}
                        <path d="M85 85 L115 115" stroke="white" strokeWidth="6" strokeLinecap="round"/>
                        <path d="M115 85 L85 115" stroke="white" strokeWidth="6" strokeLinecap="round"/>

                        {/* Plant Decoration Left */}
                        <path d="M40 140 Q 30 120 45 110" stroke="#818CF8" strokeWidth="3" strokeLinecap="round"/>
                        <path d="M45 110 Q 35 105 45 100" stroke="#818CF8" strokeWidth="3" strokeLinecap="round"/>
                        <path d="M45 110 Q 55 105 50 100" stroke="#818CF8" strokeWidth="3" strokeLinecap="round"/>

                        {/* Plant Decoration Right */}
                        <path d="M160 140 Q 170 120 155 110" stroke="#C7D2FE" strokeWidth="3" strokeLinecap="round"/>
                        <path d="M155 110 Q 165 105 155 100" stroke="#C7D2FE" strokeWidth="3" strokeLinecap="round"/>
                   </svg>
              </div>
              <p className="text-slate-500 text-xl font-medium">No Data Found</p>
          </div>
      </div>
    </div>
  );
};