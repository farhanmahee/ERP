const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  location: { type: String, required: true },
  capacity: { type: Number },
  manager: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Warehouse', warehouseSchema);
