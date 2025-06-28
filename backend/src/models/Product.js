const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 },
  sku: { type: String, unique: true },
  inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
  imageUrl: { type: String },
  category: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
