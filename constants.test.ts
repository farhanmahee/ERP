
import {
  DEPARTMENTS,
  MOCK_EMPLOYEES,
  MOCK_ATTENDANCE,
  MOCK_INVENTORY,
  MOCK_CUSTOMERS,
  MOCK_SUPPLIERS,
  MOCK_SALES,
} from './constants';

describe('Constants', () => {
  it('should have a non-empty list of departments', () => {
    expect(DEPARTMENTS).toBeDefined();
    expect(DEPARTMENTS.length).toBeGreaterThan(0);
  });

  it('should have a non-empty list of mock employees', () => {
    expect(MOCK_EMPLOYEES).toBeDefined();
    expect(MOCK_EMPLOYEES.length).toBeGreaterThan(0);
  });

  it('should have a non-empty list of mock attendance records', () => {
    expect(MOCK_ATTENDANCE).toBeDefined();
    expect(MOCK_ATTENDANCE.length).toBeGreaterThan(0);
  });

  it('should have a non-empty list of mock inventory items', () => {
    expect(MOCK_INVENTORY).toBeDefined();
    expect(MOCK_INVENTORY.length).toBeGreaterThan(0);
  });

  it('should have a non-empty list of mock customers', () => {
    expect(MOCK_CUSTOMERS).toBeDefined();
    expect(MOCK_CUSTOMERS.length).toBeGreaterThan(0);
  });

  it('should have a non-empty list of mock suppliers', () => {
    expect(MOCK_SUPPLIERS).toBeDefined();
    expect(MOCK_SUPPLIERS.length).toBeGreaterThan(0);
  });

  it('should have a non-empty list of mock sales orders', () => {
    expect(MOCK_SALES).toBeDefined();
    expect(MOCK_SALES.length).toBeGreaterThan(0);
  });

  it('mock employees should have valid properties', () => {
    MOCK_EMPLOYEES.forEach(employee => {
      expect(employee).toHaveProperty('id');
      expect(employee).toHaveProperty('name');
      expect(employee).toHaveProperty('designation');
      expect(employee).toHaveProperty('department');
      expect(employee).toHaveProperty('type');
      expect(employee).toHaveProperty('phone');
      expect(employee).toHaveProperty('email');
      expect(employee).toHaveProperty('joinDate');
      expect(employee).toHaveProperty('basicSalary');
      expect(employee).toHaveProperty('status');
    });
  });

  it('mock attendance should have valid properties', () => {
    MOCK_ATTENDANCE.forEach(record => {
      expect(record).toHaveProperty('id');
      expect(record).toHaveProperty('employeeId');
      expect(record).toHaveProperty('employeeName');
      expect(record).toHaveProperty('date');
      expect(record).toHaveProperty('checkIn');
      expect(record).toHaveProperty('checkOut');
      expect(record).toHaveProperty('status');
      expect(record).toHaveProperty('hours');
    });
  });

    it('mock inventory should have valid properties', () => {
    MOCK_INVENTORY.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
        expect(item).toHaveProperty('code');
        expect(item).toHaveProperty('type');
        expect(item).toHaveProperty('category');
        expect(item).toHaveProperty('brand');
        expect(item).toHaveProperty('unit');
        expect(item).toHaveProperty('purchasePrice');
        expect(item).toHaveProperty('salesPrice');
        expect(item).toHaveProperty('stockInHouse');
        expect(item).toHaveProperty('stockWithCustomer');
        expect(item).toHaveProperty('stockInTransit');
        expect(item).toHaveProperty('alertQuantity');
    });
    });

    it('mock customers should have valid properties', () => {
    MOCK_CUSTOMERS.forEach(customer => {
        expect(customer).toHaveProperty('id');
        expect(customer).toHaveProperty('name');
        expect(customer).toHaveProperty('address');
        expect(customer).toHaveProperty('phone');
        expect(customer).toHaveProperty('balance');
        expect(customer).toHaveProperty('cylindersHeld');
    });
    });

    it('mock suppliers should have valid properties', () => {
    MOCK_SUPPLIERS.forEach(supplier => {
        expect(supplier).toHaveProperty('id');
        expect(supplier).toHaveProperty('name');
        expect(supplier).toHaveProperty('contact');
        expect(supplier).toHaveProperty('balance');
        expect(supplier).toHaveProperty('pendingTransitCylinders');
    });
    });

    it('mock sales should have valid properties', () => {
    MOCK_SALES.forEach(sale => {
        expect(sale).toHaveProperty('id');
        expect(sale).toHaveProperty('date');
        expect(sale).toHaveProperty('customerId');
        expect(sale).toHaveProperty('customerName');
        expect(sale).toHaveProperty('items');
        expect(sale).toHaveProperty('totalAmount');
        expect(sale).toHaveProperty('status');
        expect(sale).toHaveProperty('paymentStatus');
    });
    });

});
