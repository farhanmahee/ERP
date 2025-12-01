import React, { useState } from 'react';
import { Item, ItemType } from '../types';
import { Button } from './Button';
import { Search, Plus, Package, MoreHorizontal, Upload, Pencil, ArrowLeft } from 'lucide-react';

interface InventoryViewProps {
  inventory: Item[];
}

type ViewMode = 'list' | 'create' | 'edit';

export const InventoryView: React.FC<InventoryViewProps> = ({ inventory }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [filterType, setFilterType] = useState<string>('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Item | 'stockInTransit' | 'stockWithCustomer'; direction: 'asc' | 'desc' } | null>(null);

  const filteredInventory = filterType === 'All' 
    ? inventory 
    : inventory.filter(item => item.type === filterType);

  const groupedItems: Record<string, Item[]> = {
    'Refill Items': filteredInventory.filter(i => i.type === ItemType.REFILL_CYLINDER),
    'Empty Cylinders': filteredInventory.filter(i => i.type === ItemType.EMPTY_CYLINDER),
    'General Items': filteredInventory.filter(i => i.type === ItemType.GENERAL),
  };

  const handleSort = (key: keyof Item | 'stockInTransit' | 'stockWithCustomer') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortItems = (items: Item[]) => {
    if (!sortConfig) return items;
    return [...items].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleEdit = (item: Item) => {
      setEditingItem(item);
      setViewMode('edit');
  };

  const handleCreate = () => {
      setEditingItem(null);
      setViewMode('create');
  };

  const handleBack = () => {
      setEditingItem(null);
      setViewMode('list');
  };

  if (viewMode === 'create' || viewMode === 'edit') {
      const isEdit = viewMode === 'edit';
      
      return (
          <div className="animate-fade-in space-y-6">
               <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                   <span className="cursor-pointer hover:text-indigo-700" onClick={handleBack}>Product</span>
                   <span>{'>'}</span>
                   <span className="text-indigo-900 font-semibold">{isEdit ? 'Edit' : 'New'}</span>
               </div>

               <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-4">
                       <Button variant="secondary" onClick={handleBack} className="p-2 rounded-full">
                           <ArrowLeft className="h-4 w-4" />
                       </Button>
                       <h2 className="text-2xl font-bold text-slate-800">{isEdit ? 'Edit Product' : 'Create New Product'}</h2>
                   </div>
               </div>
               
               {/* Form Content reuse from previous step, just ensure styles match */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                   <div className="lg:col-span-2 space-y-6">
                       <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100">
                           <div className="space-y-4">
                               {/* ... Inputs ... */}
                               <div>
                                   <label className="block text-sm font-medium text-slate-700 mb-1">Name <span className="text-red-500">*</span></label>
                                   <input type="text" className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition-all" defaultValue={isEdit ? editingItem?.name : ''} />
                               </div>
                               {/* ... other inputs simplified for brevity ... */}
                           </div>
                       </div>
                   </div>
                   <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-soft border border-slate-100 space-y-4">
                             {/* ... Category/Brand inputs ... */}
                             <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors">
                                 <Upload className="h-8 w-8 mb-2 text-indigo-500"/>
                                 <span className="text-sm font-medium text-slate-600">Upload Image</span>
                             </div>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex-1 bg-white border border-slate-200 text-slate-700 py-2 rounded-lg font-medium hover:bg-slate-50 transition-colors" onClick={handleBack}>Cancel</button>
                            <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-soft" onClick={handleBack}>
                                {isEdit ? 'Update' : 'Save'}
                            </button>
                        </div>
                   </div>
               </div>
          </div>
      )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-4 rounded-xl shadow-soft border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
         <h2 className="text-xl font-bold text-slate-800">Inventory</h2>
         
         <div className="flex gap-2 items-center">
             <div className="relative">
                <input type="text" className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-sm" placeholder="Search products..." />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
             </div>
             
             <select 
                className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-400"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
             >
                 <option value="All">All Types</option>
                 <option value={ItemType.EMPTY_CYLINDER}>Empty Cylinder</option>
                 <option value={ItemType.REFILL_CYLINDER}>Refill/Package</option>
                 <option value={ItemType.GENERAL}>General Item</option>
                 <option value={ItemType.SERVICE}>Service</option>
             </select>

             <Button variant="primary" onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-700">
                 <Plus className="h-4 w-4 mr-1" /> Add Product
             </Button>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-soft border border-slate-100 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500">
               <thead className="text-xs text-slate-700 uppercase bg-indigo-50/50 border-b border-indigo-100">
                  <tr>
                     <th className="px-6 py-3 cursor-pointer hover:text-indigo-700" onClick={() => handleSort('name')}>Product</th>
                     <th className="px-6 py-3 text-center">Stock (House)</th>
                     <th className="px-6 py-3 text-center cursor-pointer hover:text-indigo-700" onClick={() => handleSort('stockInTransit')}>Transit</th>
                     <th className="px-6 py-3 text-center cursor-pointer hover:text-indigo-700" onClick={() => handleSort('stockWithCustomer')}>Customer</th>
                     <th className="px-6 py-3 text-right">Price</th>
                     <th className="px-6 py-3 text-right">Action</th>
                  </tr>
               </thead>
               <tbody>
                  {Object.entries(groupedItems).map(([groupName, items]) => (
                      items.length > 0 && (
                        <React.Fragment key={groupName}>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <td colSpan={6} className="px-6 py-2 font-bold text-indigo-900 text-xs uppercase tracking-wider">
                                    {groupName}
                                </td>
                            </tr>
                            {sortItems(items).map((item) => (
                                <tr key={item.id} className="border-b border-slate-100 hover:bg-indigo-50/30 transition-colors cursor-pointer" onClick={() => handleEdit(item)}>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-800">{item.name}</div>
                                        <div className="text-xs text-slate-400">{item.code} • {item.brand}</div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`font-semibold ${item.stockInHouse <= (item.alertQuantity || 0) ? 'text-red-600' : 'text-slate-700'}`}>
                                            {item.stockInHouse} <span className="text-xs font-normal text-slate-400">{item.unit}</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {item.stockInTransit > 0 ? (
                                            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                                {item.stockInTransit}
                                            </span>
                                        ) : <span className="text-slate-300">-</span>}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {item.stockWithCustomer > 0 ? (
                                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                                {item.stockWithCustomer}
                                            </span>
                                        ) : <span className="text-slate-300">-</span>}
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                                        ৳ {item.salesPrice.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                                            <Pencil className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                      )
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};