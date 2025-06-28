const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const orderSchema = new mongoose.Schema({
  orderType: { type: String, enum: ['sales', 'purchase'], required: true },
  items: [orderItemSchema],
  customerName: { type: String },
  supplierName: { type: String },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  orderStatus: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  paymentStatus: { type: String, enum: ['unpaid', 'paid', 'partial'], default: 'unpaid' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
