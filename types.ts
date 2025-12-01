// --- HR Types ---
export enum EmployeeStatus {
  ACTIVE = 'Active',
  RESIGNED = 'Resigned',
  TERMINATED = 'Terminated'
}

export enum EmployeeType {
  MANAGER = 'Middle Manager',
  OPERATIONAL = 'Operational Staff',
  DRIVER = 'Driver',
  HR = 'HR Staff'
}

export interface Employee {
  id: string;
  name: string;
  designation: string;
  department: string;
  type: EmployeeType;
  phone: string;
  email: string;
  joinDate: string;
  basicSalary: number;
  status: EmployeeStatus;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  hours: number;
}

// --- Inventory Types (SRS 3.1) ---
export enum ItemType {
  EMPTY_CYLINDER = 'Empty Cylinder',
  REFILL_CYLINDER = 'Refill/Package',
  GENERAL = 'General Item',
  SERVICE = 'Service'
}

export interface Item {
  id: string;
  name: string;
  code: string;
  type: ItemType;
  category: string;
  brand: string; // Linde, MTE, etc.
  unit: string;
  purchasePrice: number;
  salesPrice: number;
  stockInHouse: number;
  stockWithCustomer: number; // For Cylinders
  stockInTransit: number;    // From Supplier
  alertQuantity?: number;
}

// --- Sales Types (SRS 3.3) ---
export interface Customer {
  id: string;
  name: string;
  address: string;
  phone: string;
  balance: number; // Financial balance
  cylindersHeld: Record<string, number>; // ItemID -> Quantity
}

export interface SalesOrder {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  items: {
    itemId: string;
    itemName: string;
    quantity: number;
    rate: number;
    total: number;
  }[];
  totalAmount: number;
  status: 'Pending' | 'In-Transit' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid' | 'Partial' | 'Unpaid';
}

// --- Purchase Types (SRS 3.2) ---
export interface Supplier {
  id: string;
  name: string;
  contact: string;
  balance: number; // Payable
  pendingTransitCylinders: Record<string, number>; // Cylinders sent to supplier but not returned
}

export interface TransitEntry {
  id: string;
  date: string;
  supplierId: string;
  supplierName: string;
  driverName: string;
  vehicleNo: string;
  items: {
    itemId: string;
    itemName: string;
    quantity: number; // Empty cylinders sent
  }[];
  status: 'In-Transit' | 'Delivered';
}

// --- Accounting Types (SRS 3.4) ---
export interface Account {
  id: string;
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  balance: number;
}

export enum ViewState {
  DASHBOARD = 'dashboard',
  INVENTORY = 'inventory',
  SALES = 'sales',
  PURCHASE = 'purchase',
  ACCOUNTING = 'accounting',
  HR = 'hr',
  REPORTS = 'reports',
  SETTINGS = 'settings'
}