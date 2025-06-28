import React, { useState, useEffect } from 'react';

function OrderForm({ order, onSave, onCancel }) {
  const [orderType, setOrderType] = useState('sales');
  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [branch, setBranch] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [orderStatus, setOrderStatus] = useState('pending');
  const [paymentStatus, setPaymentStatus] = useState('unpaid');
  const [inventoryOptions, setInventoryOptions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch inventory, branches, and warehouses for dropdowns
    const fetchData = async () => {
      try {
        const [inventoryRes, branchesRes, warehousesRes] = await Promise.all([
          fetch('/api/inventory'),
          fetch('/api/branches'),
          fetch('/api/warehouses'),
        ]);
        const inventoryData = await inventoryRes.json();
        const branchesData = await branchesRes.json();
        const warehousesData = await warehousesRes.json();
        if (inventoryRes.ok) setInventoryOptions(inventoryData);
        if (branchesRes.ok) setBranches(branchesData);
        if (warehousesRes.ok) setWarehouses(warehousesData);
      } catch (err) {
        // Ignore errors here
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (order) {
      setOrderType(order.orderType || 'sales');
      setItems(order.items || []);
      setCustomerName(order.customerName || '');
      setSupplierName(order.supplierName || '');
      setBranch(order.branch ? order.branch._id || order.branch : '');
      setWarehouse(order.warehouse ? order.warehouse._id || order.warehouse : '');
      setOrderStatus(order.orderStatus || 'pending');
      setPaymentStatus(order.paymentStatus || 'unpaid');
    } else {
      setOrderType('sales');
      setItems([]);
      setCustomerName('');
      setSupplierName('');
      setBranch('');
      setWarehouse('');
      setOrderStatus('pending');
      setPaymentStatus('unpaid');
    }
  }, [order]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { inventory: '', quantity: 1 }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!branch || !warehouse || items.length === 0) {
      setError('Branch, Warehouse, and at least one item are required');
      return;
    }
    if (orderType === 'sales' && !customerName) {
      setError('Customer name is required for sales orders');
      return;
    }
    if (orderType === 'purchase' && !supplierName) {
      setError('Supplier name is required for purchase orders');
      return;
    }
    for (const item of items) {
      if (!item.inventory || !item.quantity || item.quantity <= 0) {
        setError('All items must have valid inventory and quantity');
        return;
      }
    }
    const orderData = {
      orderType,
      items,
      customerName,
      supplierName,
      branch,
      warehouse,
      orderStatus,
      paymentStatus,
    };
    try {
      const response = await fetch(order ? `/api/orders/${order._id}` : '/api/orders', {
        method: order ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to save order');
      } else {
        onSave();
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4 overflow-auto max-h-[600px]">
      <h2 className="text-xl font-bold mb-4">{order ? 'Edit Order' : 'Add Order'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="orderType">Order Type *</label>
          <select
            id="orderType"
            className="w-full border border-gray-300 p-2 rounded"
            value={orderType}
            onChange={(e) => setOrderType(e.target.value)}
            required
          >
            <option value="sales">Sales</option>
            <option value="purchase">Purchase</option>
          </select>
        </div>
        {orderType === 'sales' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="customerName">Customer Name *</label>
            <input
              id="customerName"
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
        )}
        {orderType === 'purchase' && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="supplierName">Supplier Name *</label>
            <input
              id="supplierName"
              type="text"
              className="w-full border border-gray-300 p-2 rounded"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="branch">Branch *</label>
          <select
            id="branch"
            className="w-full border border-gray-300 p-2 rounded"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required
          >
            <option value="">Select Branch</option>
            {branches.map(b => (
              <option key={b._id} value={b._id}>{b.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="warehouse">Warehouse *</label>
          <select
            id="warehouse"
            className="w-full border border-gray-300 p-2 rounded"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            required
          >
            <option value="">Select Warehouse</option>
            {warehouses.map(w => (
              <option key={w._id} value={w._id}>{w.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Order Items *</label>
          {items.map((item, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <select
                className="flex-1 border border-gray-300 p-2 rounded"
                value={item.inventory || ''}
                onChange={(e) => handleItemChange(index, 'inventory', e.target.value)}
                required
              >
                <option value="">Select Inventory</option>
                {inventoryOptions.map(inv => (
                  <option key={inv._id} value={inv._id}>{inv.cylinderType} (Qty: {inv.quantity})</option>
                ))}
              </select>
              <input
                type="number"
                min="1"
                className="w-20 border border-gray-300 p-2 rounded"
                value={item.quantity || 1}
                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="bg-red-600 text-white px-2 rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Add Item
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="orderStatus">Order Status</label>
          <select
            id="orderStatus"
            className="w-full border border-gray-300 p-2 rounded"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="paymentStatus">Payment Status</label>
          <select
            id="paymentStatus"
            className="w-full border border-gray-300 p-2 rounded"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default OrderForm;
