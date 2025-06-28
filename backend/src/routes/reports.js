const express = require('express');
const Order = require('../models/Order');
const Inventory = require('../models/Inventory');
const Attendance = require('../models/Attendance');
const Branch = require('../models/Branch');

const router = express.Router();

// Sales report by branch and date range
router.get('/sales', async (req, res) => {
  const { branchId, startDate, endDate } = req.query;
  try {
    const match = { orderType: 'sales' };
    if (branchId) match.branch = branchId;
    if (startDate || endDate) {
      match.createdAt = {};
      if (startDate) match.createdAt.$gte = new Date(startDate);
      if (endDate) match.createdAt.$lte = new Date(endDate);
    }
    const sales = await Order.aggregate([
      { $match: match },
      { $unwind: '$items' },
      { $group: {
          _id: '$branch',
          totalSales: { $sum: { $multiply: ['$items.quantity', 1] } }, // Assuming quantity * 1 as price placeholder
          count: { $sum: 1 }
        }
      },
      { $lookup: {
          from: 'branches',
          localField: '_id',
          foreignField: '_id',
          as: 'branch'
        }
      },
      { $unwind: '$branch' },
      { $project: {
          branchName: '$branch.name',
          totalSales: 1,
          count: 1
        }
      }
    ]);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Inventory status report
router.get('/inventory-status', async (req, res) => {
  try {
    const inventoryStatus = await Inventory.aggregate([
      { $group: {
          _id: '$warehouse',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      { $lookup: {
          from: 'warehouses',
          localField: '_id',
          foreignField: '_id',
          as: 'warehouse'
        }
      },
      { $unwind: '$warehouse' },
      { $project: {
          warehouseName: '$warehouse.name',
          totalQuantity: 1
        }
      }
    ]);
    res.json(inventoryStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Attendance summary report by user and date range
router.get('/attendance-summary', async (req, res) => {
  const { userId, startDate, endDate } = req.query;
  try {
    const match = {};
    if (userId) match.userId = require('mongoose').Types.ObjectId(userId);
    if (startDate || endDate) {
      match.timestamp = {};
      if (startDate) match.timestamp.$gte = new Date(startDate);
      if (endDate) match.timestamp.$lte = new Date(endDate);
    }
    const attendanceSummary = await Attendance.aggregate([
      { $match: match },
      { $group: {
          _id: '$type',
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(attendanceSummary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
