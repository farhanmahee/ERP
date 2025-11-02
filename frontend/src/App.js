import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import BranchManagement from './pages/BranchManagement';
import WarehouseManagement from './pages/WarehouseManagement';
import InventoryManagement from './pages/InventoryManagement';
import OrderManagement from './pages/OrderManagement';
import PaymentForm from './components/PaymentForm';
import PaymentStatus from './pages/PaymentStatus';
import GpsTracking from './pages/GpsTracking';
import CodeGenerator from './pages/CodeGenerator';
import ECommerce from './pages/ECommerce'; 
import AttendancePage from './pages/AttendancePage';
import ReportsPage from './pages/ReportsPage';
import './i18n';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/branches" element={isAuthenticated ? <BranchManagement /> : <Navigate to="/login" />} />
        <Route path="/warehouses" element={isAuthenticated ? <WarehouseManagement /> : <Navigate to="/login" />} />
        <Route path="/inventory" element={isAuthenticated ? <InventoryManagement /> : <Navigate to="/login" />} />
        <Route path="/orders" element={isAuthenticated ? <OrderManagement /> : <Navigate to="/login" />} />
        <Route path="/payment" element={isAuthenticated ? <PaymentForm /> : <Navigate to="/login" />} />
        <Route path="/payment-success" element={<PaymentStatus />} />
        <Route path="/payment-fail" element={<PaymentStatus />} />
        <Route path="/payment-cancel" element={<PaymentStatus />} />
        <Route path="/gps-tracking" element={isAuthenticated ? <GpsTracking /> : <Navigate to="/login" />} />
        <Route path="/code-generator" element={isAuthenticated ? <CodeGenerator /> : <Navigate to="/login" />} />
        <Route path="/ecommerce" element={isAuthenticated ? <ECommerce /> : <Navigate to="/login" />} />
        <Route path="/attendance" element={isAuthenticated ? <AttendancePage /> : <Navigate to="/login" />} />
        <Route path="/reports" element={isAuthenticated ? <ReportsPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
