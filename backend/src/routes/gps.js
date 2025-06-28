const express = require('express');
const GpsLocation = require('../models/GpsLocation');

const router = express.Router();

// Add or update GPS location for an entity
router.post('/', async (req, res) => {
  const { entityType, entityId, latitude, longitude } = req.body;
  if (!entityType || !entityId || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const existing = await GpsLocation.findOne({ entityType, entityId });
    if (existing) {
      existing.latitude = latitude;
      existing.longitude = longitude;
      existing.timestamp = new Date();
      await existing.save();
      res.json(existing);
    } else {
      const gpsLocation = new GpsLocation({ entityType, entityId, latitude, longitude });
      await gpsLocation.save();
      res.status(201).json(gpsLocation);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get latest GPS location for an entity
router.get('/:entityType/:entityId', async (req, res) => {
  const { entityType, entityId } = req.params;
  try {
    const gpsLocation = await GpsLocation.findOne({ entityType, entityId });
    if (!gpsLocation) return res.status(404).json({ message: 'GPS location not found' });
    res.json(gpsLocation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all GPS locations for an entity type
router.get('/:entityType', async (req, res) => {
  const { entityType } = req.params;
  try {
    const gpsLocations = await GpsLocation.find({ entityType });
    res.json(gpsLocations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
