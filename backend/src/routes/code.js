const express = require('express');
const CodeGenerator = require('../services/codeGenerator');

const router = express.Router();

// Generate QR code for given text
router.get('/qrcode', async (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ message: 'Text query parameter is required' });
  }
  try {
    const dataUrl = await CodeGenerator.generateQRCode(text);
    res.json({ dataUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate barcode for given text
router.get('/barcode', async (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ message: 'Text query parameter is required' });
  }
  try {
    const dataUrl = await CodeGenerator.generateBarcode(text);
    res.json({ dataUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
