const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String },
  manager: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Branch', branchSchema);
