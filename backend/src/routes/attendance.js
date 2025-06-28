const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

// Get attendance records for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add attendance record (simulate device callback)
router.post('/', async (req, res) => {
  const { userId, deviceId, timestamp, type } = req.body;
  if (!userId || !deviceId || !timestamp || !type) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const attendance = new Attendance({ userId, deviceId, timestamp, type });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
