const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: { type: String, required: true },
  timestamp: { type: Date, required: true },
  type: { type: String, enum: ['checkin', 'checkout'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
