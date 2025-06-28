const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  cylinderType: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  warehouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Warehouse', required: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' },
  barcode: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
