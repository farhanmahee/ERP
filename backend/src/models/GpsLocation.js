const mongoose = require('mongoose');

const gpsLocationSchema = new mongoose.Schema({
  entityType: { type: String, enum: ['customer', 'supplier', 'vehicle'], required: true },
  entityId: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

gpsLocationSchema.index({ entityType: 1, entityId: 1 });

module.exports = mongoose.model('GpsLocation', gpsLocationSchema);
