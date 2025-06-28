const express = require('express');
const Inventory = require('../models/Inventory');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Create a new inventory item
router.post('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const inventoryItems = await Inventory.find().populate('warehouse').populate('branch');
    res.json(inventoryItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get an inventory item by ID
router.get('/:id', async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id).populate('warehouse').populate('branch');
    if (!inventory) return res.status(404).json({ message: 'Inventory item not found' });
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an inventory item by ID
router.put('/:id', async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inventory) return res.status(404).json({ message: 'Inventory item not found' });
    res.json(inventory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an inventory item by ID
router.delete('/:id', async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!inventory) return res.status(404).json({ message: 'Inventory item not found' });
    res.json({ message: 'Inventory item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
