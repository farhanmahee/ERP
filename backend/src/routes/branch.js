const express = require('express');
const Branch = require('../models/Branch');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const logAudit = require('../middleware/auditLog');

const router = express.Router();

// Create a new branch
router.post('/', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const branch = new Branch(req.body);
    await branch.save();
    logAudit({ user: req.user?.id, action: 'create', resource: 'branch', details: branch });
    res.status(201).json(branch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all branches
router.get('/', async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a branch by ID
router.get('/:id', async (req, res) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });
    res.json(branch);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a branch by ID
router.put('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!branch) return res.status(404).json({ message: 'Branch not found' });
    logAudit({ user: req.user?.id, action: 'update', resource: 'branch', details: branch });
    res.json(branch);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a branch by ID
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'manager'), async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) return res.status(404).json({ message: 'Branch not found' });
    logAudit({ user: req.user?.id, action: 'delete', resource: 'branch', details: branch });
    res.json({ message: 'Branch deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
