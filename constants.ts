import { Employee, EmployeeStatus, EmployeeType, AttendanceRecord, Item, ItemType, Customer, Supplier, SalesOrder } from './types';

export const DEPARTMENTS = ['Management', 'Accounts', 'HR', 'Logistics', 'Sales', 'IT'];

// --- HR Data ---
export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'EMP001',
    name: 'Abdul Karim',
    designation: 'General Manager',
    department: 'Management',
    type: EmployeeType.MANAGER,
    phone: '+8801711000001',
    email: 'abdul.k@erp.com',
    joinDate: '2020-01-15',
    basicSalary: 85000,
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: 'EMP002',
    name: 'Rahim Uddin',
    designation: 'Senior Accountant',
    department: 'Accounts',
    type: EmployeeType.OPERATIONAL,
    phone: '+8801711000002',
    email: 'rahim.u@erp.com',
    joinDate: '2021-03-10',
    basicSalary: 45000,
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: 'EMP003',
    name: 'Fatima Begum',
    designation: 'HR Officer',
    department: 'HR',
    type: EmployeeType.HR,
    phone: '+8801711000003',
    email: 'fatima.b@erp.com',
    joinDate: '2022-06-01',
    basicSalary: 35000,
    status: EmployeeStatus.ACTIVE,
  },
  {
    id: 'EMP004',
    name: 'Kamal Hossain',
    designation: 'Truck Driver',
    department: 'Logistics',
    type: EmployeeType.DRIVER,
    phone: '+8801711000004',
    email: 'kamal.h@erp.com',
    joinDate: '2023-01-20',
    basicSalary: 22000,
    status: EmployeeStatus.ACTIVE,
  },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'ATT001',
    employeeId: 'EMP001',
    employeeName: 'Abdul Karim',
    date: new Date().toISOString().split('T')[0],
    checkIn: '09:05',
    checkOut: null,
    status: 'Present',
    hours: 0,
  },
  {
    id: 'ATT002',
    employeeId: 'EMP002',
    employeeName: 'Rahim Uddin',
    date: new Date().toISOString().split('T')[0],
    checkIn: '08:55',
    checkOut: '17:00',
    status: 'Present',
    hours: 8,
  },
];

// --- Inventory Data ---
export const MOCK_INVENTORY: Item[] = [
  {
    id: 'ITM001',
    name: 'Oxygen Cylinder (Large)',
    code: 'OXY-L-001',
    type: ItemType.REFILL_CYLINDER,
    category: 'Medical Gas',
    brand: 'Linde',
    unit: 'Cylinder',
    purchasePrice: 500, // Refill cost
    salesPrice: 800,
    stockInHouse: 150,
    stockWithCustomer: 45,
    stockInTransit: 20
  },
  {
    id: 'ITM002',
    name: 'LPG Cylinder 12KG',
    code: 'LPG-12-001',
    type: ItemType.REFILL_CYLINDER,
    category: 'Fuel Gas',
    brand: 'Bashundhara',
    unit: 'Cylinder',
    purchasePrice: 1100,
    salesPrice: 1350,
    stockInHouse: 300,
    stockWithCustomer: 120,
    stockInTransit: 50
  },
  {
    id: 'ITM003',
    name: 'Empty Cylinder (Oxygen Large)',
    code: 'OXY-L-EMP',
    type: ItemType.EMPTY_CYLINDER,
    category: 'Cylinder Shell',
    brand: 'Linde',
    unit: 'Pcs',
    purchasePrice: 15000,
    salesPrice: 18000,
    stockInHouse: 50, // Empty shells ready to be sent for filling
    stockWithCustomer: 45, // Matches refill
    stockInTransit: 0
  },
  {
    id: 'ITM004',
    name: 'Gas Regulator High Pressure',
    code: 'REG-HP',
    type: ItemType.GENERAL,
    category: 'Accessories',
    brand: 'Generic',
    unit: 'Pcs',
    purchasePrice: 1200,
    salesPrice: 1800,
    stockInHouse: 85,
    stockWithCustomer: 0,
    stockInTransit: 0
  }
];

// --- CRM Data ---
export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 'CUST001',
    name: 'Dhaka Medical College',
    address: 'Bakshibazar, Dhaka',
    phone: '01700000000',
    balance: 150000,
    cylindersHeld: { 'ITM001': 20 }
  },
  {
    id: 'CUST002',
    name: 'Local Restaurant Chain',
    address: 'Gulshan, Dhaka',
    phone: '01800000000',
    balance: 25000,
    cylindersHeld: { 'ITM002': 50 }
  }
];

export const MOCK_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP001',
    name: 'Linde Bangladesh',
    contact: 'Sales Dept',
    balance: 500000,
    pendingTransitCylinders: { 'ITM003': 20 }
  },
  {
    id: 'SUP002',
    name: 'Bashundhara LP Gas',
    contact: 'Distributor Line',
    balance: 800000,
    pendingTransitCylinders: { 'ITM002': 0 }
  }
];

// --- Sales Data ---
export const MOCK_SALES: SalesOrder[] = [
  {
    id: 'SO-2023-001',
    date: '2023-10-25',
    customerId: 'CUST001',
    customerName: 'Dhaka Medical College',
    items: [
      { itemId: 'ITM001', itemName: 'Oxygen Cylinder (Large)', quantity: 10, rate: 800, total: 8000 }
    ],
    totalAmount: 8000,
    status: 'Delivered',
    paymentStatus: 'Paid'
  },
  {
    id: 'SO-2023-002',
    date: '2023-10-26',
    customerId: 'CUST002',
    customerName: 'Local Restaurant Chain',
    items: [
      { itemId: 'ITM002', itemName: 'LPG Cylinder 12KG', quantity: 20, rate: 1350, total: 27000 }
    ],
    totalAmount: 27000,
    status: 'Pending',
    paymentStatus: 'Unpaid'
  }
];