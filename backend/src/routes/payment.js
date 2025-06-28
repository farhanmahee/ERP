const express = require('express');
const SSLCommerz = require('../services/paymentService');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Initiate payment
router.post('/initiate', authenticateToken, authorizeRoles('admin', 'manager', 'employee'), async (req, res) => {
  try {
    const paymentData = req.body;
    const response = await SSLCommerz.initiatePayment(paymentData);
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Payment success callback
router.post('/success', (req, res) => {
  // Handle payment success logic here
  res.send('Payment success');
});

// Payment fail callback
router.post('/fail', (req, res) => {
  // Handle payment failure logic here
  res.send('Payment failed');
});

// Payment cancel callback
router.post('/cancel', (req, res) => {
  // Handle payment cancellation logic here
  res.send('Payment cancelled');
});

module.exports = router;
