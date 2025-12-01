import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { EmployeeList } from './components/EmployeeList';
import { PayrollView } from './components/PayrollView';
import { InventoryView } from './components/InventoryView';
import { SalesView } from './components/SalesView';
import { PurchaseView } from './components/PurchaseView';
import { AccountingView } from './components/AccountingView';
import { AIAssistant } from './components/AIAssistant';
import { ViewState, Employee, AttendanceRecord, Item, Customer, Supplier, SalesOrder } from './types';
import { MOCK_EMPLOYEES, MOCK_ATTENDANCE, MOCK_INVENTORY, MOCK_CUSTOMERS, MOCK_SUPPLIERS, MOCK_SALES } from './constants';
import { 
    Bot, 
    ChevronLeft, 
    Hash, 
    LayoutGrid, 
    Gauge, 
    Sun, 
    Bell, 
    Calculator,
    User
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [isAIOpen, setIsAIOpen] = useState(false);
  
  const [employees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [inventory] = useState<Item[]>(MOCK_INVENTORY);
  const [sales] = useState<SalesOrder[]>(MOCK_SALES);
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [suppliers] = useState<Supplier[]>(MOCK_SUPPLIERS);

  const handleAddEmployee = () => {
    alert("This would open the Add Employee Modal form.");
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <Dashboard employees={employees} inventory={inventory} sales={sales} />;
      case ViewState.INVENTORY:
        return <InventoryView inventory={inventory} />;
      case ViewState.SALES:
        return <SalesView sales={sales} customers={customers} />;
      case ViewState.PURCHASE:
        return <PurchaseView suppliers={suppliers} />;
      case ViewState.ACCOUNTING:
        return <AccountingView />;
      case ViewState.HR:
        return (
          <div className="space-y-8">
             <EmployeeList employees={employees} onAddEmployee={handleAddEmployee} />
             <PayrollView employees={employees} />
          </div>
        );
      default:
        return <Dashboard employees={employees} inventory={inventory} sales={sales} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans text-slate-900">
      {/* Sidebar */}
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4">
             <button className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400">
                 <ChevronLeft className="h-5 w-5" />
             </button>
             <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 text-sm font-medium">
                 Super Admin
             </span>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Utility Icons */}
             <div className="flex items-center gap-2 text-slate-400">
                 <button className="p-2 hover:bg-slate-50 rounded-lg"><Hash className="h-5 w-5" /></button>
                 <button className="p-2 hover:bg-slate-50 rounded-lg"><LayoutGrid className="h-5 w-5" /></button>
                 <button className="p-2 hover:bg-slate-50 rounded-lg"><Gauge className="h-5 w-5" /></button>
                 <button className="p-2 hover:bg-slate-50 rounded-lg"><Sun className="h-5 w-5" /></button>
                 <div className="relative">
                    <button className="p-2 hover:bg-slate-50 rounded-lg"><Bell className="h-5 w-5" /></button>
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                 </div>
                 <button className="p-2 hover:bg-slate-50 rounded-lg"><Calculator className="h-5 w-5 text-indigo-500" /></button>
             </div>
             
             {/* User Profile */}
             <div className="pl-2">
                 <button className="h-9 w-9 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold shadow-md shadow-indigo-200">
                     T
                 </button>
             </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-6 flex-1 overflow-auto bg-slate-50">
          {renderContent()}
        </div>
      </main>

      {/* AI Assistant FAB */}
      <button 
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-6 right-6 h-12 w-12 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-300 flex items-center justify-center hover:bg-indigo-700 transition-colors z-50"
      >
          <Bot className="h-6 w-6" />
      </button>

      {/* AI Assistant Overlay */}
      <AIAssistant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
        contextData={{ employees, inventory, sales }}
      />
    </div>
  );
};

export default App;