require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const logAudit = require('./middleware/auditLog');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logAudit);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gas-cylinder-erp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/auth', authRoutes);

const branchRoutes = require('./routes/branch');
const warehouseRoutes = require('./routes/warehouse');
const inventoryRoutes = require('./routes/inventory');
const orderRoutes = require('./routes/order');
const paymentRoutes = require('./routes/payment');
const gpsRoutes = require('./routes/gps');
const codeRoutes = require('./routes/code');
const productRoutes = require('./routes/product');
const attendanceRoutes = require('./routes/attendance');
const reportsRoutes = require('./routes/reports');

app.use('/api/branches', branchRoutes);
app.use('/api/warehouses', warehouseRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/gps', gpsRoutes);
app.use('/api/codes', codeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reports', reportsRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Gas Cylinder ERP Backend API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
