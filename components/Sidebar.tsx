import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingCart, 
  Truck, 
  Wallet, 
  CreditCard, 
  RefreshCcw, 
  Database, 
  TrendingUp, 
  UserCheck,
  ChevronDown,
  Search,
  Info,
  Maximize,
  Eraser,
  Power
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.HR, label: 'Peoples', icon: Users, hasSub: true },
    { id: ViewState.SALES, label: 'Sales', icon: ShoppingCart, hasSub: true },
    { id: ViewState.PURCHASE, label: 'Purchases', icon: Truck, hasSub: true },
    { id: 'finance', label: 'Finance Operations', icon: Wallet, hasSub: true },
    { id: 'payments', label: 'Payments', icon: CreditCard, hasSub: true },
    { id: 'empty_cylinder', label: 'Empty Cylinder', icon: RefreshCcw, hasSub: true },
    { id: ViewState.INVENTORY, label: 'Transfers', icon: Database, hasSub: true }, // Mapped Inventory to Transfers concept for demo or Inventory
    { id: 'previous', label: 'Previous Data', icon: Eraser, hasSub: true },
    { id: ViewState.ACCOUNTING, label: 'Account Management', icon: TrendingUp, hasSub: true },
    { id: 'stock', label: 'Stock Managements', icon: TrendingUp, hasSub: true },
    { id: 'salesman', label: 'Salesman Allocations', icon: UserCheck, hasSub: false },
  ];

  return (
    <div className="w-64 bg-white h-screen flex flex-col fixed left-0 top-0 shadow-lg border-r border-slate-200 z-50">
      {/* Logo Area */}
      <div className="p-4 flex flex-col items-center border-b border-slate-100">
        <h1 className="text-xl font-bold text-indigo-700 tracking-tight flex items-center gap-1">
           INSIGHT <span className="text-slate-800">ERP</span>
        </h1>
        <p className="text-[10px] text-slate-400">Update your Business Smartly</p>
      </div>

      {/* Top Inputs */}
      <div className="p-4 space-y-3 bg-slate-50/50">
          <div className="relative">
              <input 
                  type="text" 
                  className="w-full bg-white border border-indigo-100 text-slate-600 text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-300 shadow-sm"
                  placeholder="Primary Warehouse"
                  readOnly
              />
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
          <div className="relative">
              <input 
                  type="text" 
                  className="w-full bg-white border border-indigo-100 text-slate-600 text-sm rounded-lg pl-9 pr-3 py-2 outline-none focus:border-indigo-300 shadow-sm"
                  placeholder="Search"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          // Partial matching for demo mapping purposes
          const isActive = currentView === item.id || (item.id === ViewState.INVENTORY && currentView === ViewState.INVENTORY); 
          
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                 <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                 <span className="text-sm">{item.label}</span>
              </div>
              {item.hasSub && (
                  <ChevronDown className={`h-3 w-3 ${isActive ? 'text-indigo-400' : 'text-slate-300'}`} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Controls */}
      <div className="p-2 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
        <div className="flex gap-1">
            <button className="p-2 text-slate-400 hover:bg-white hover:text-slate-600 rounded-md transition-colors shadow-sm border border-transparent hover:border-slate-200">
                <Info className="h-4 w-4" />
            </button>
            <button className="p-2 text-slate-400 hover:bg-white hover:text-slate-600 rounded-md transition-colors shadow-sm border border-transparent hover:border-slate-200">
                <Eraser className="h-4 w-4" />
            </button>
            <button className="p-2 text-slate-400 hover:bg-white hover:text-slate-600 rounded-md transition-colors shadow-sm border border-transparent hover:border-slate-200">
                <Maximize className="h-4 w-4" />
            </button>
        </div>
        <button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 shadow-md transition-colors">
            <Power className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};