const express = require('express');
const Warehouse = require('../models/Warehouse');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const logAudit = require('../middleware/auditLog');

const router = express.Router();

// Create a new warehouse
router.post('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const warehouse = new Warehouse(req.body);
    await warehouse.save();
    logAudit({ user: req.user?.id, action: 'create', resource: 'warehouse', details: warehouse });
    res.status(201).json(warehouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all warehouses
router.get('/', async (req, res) => {
  try {
    const warehouses = await Warehouse.find().populate('branch');
    res.json(warehouses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a warehouse by ID
router.get('/:id', async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id).populate('branch');
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a warehouse by ID
router.put('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
    logAudit({ user: req.user?.id, action: 'update', resource: 'warehouse', details: warehouse });
    res.json(warehouse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a warehouse by ID
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
    if (!warehouse) return res.status(404).json({ message: 'Warehouse not found' });
    logAudit({ user: req.user?.id, action: 'delete', resource: 'warehouse', details: warehouse });
    res.json({ message: 'Warehouse deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
