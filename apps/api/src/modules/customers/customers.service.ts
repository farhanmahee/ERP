import { Injectable } from '@nestjs/common';
import { getPrimaryFirestore } from '../../config/firebase.config';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class CustomersService {
  private readonly firestore = getPrimaryFirestore();
  private readonly customersCollection = this.firestore.collection('customers');

  constructor(private readonly loggingService: LoggingService) {}

  async create(customer: any) {
    await this.loggingService.log('info', 'Creating customer...', { customer });
    const docRef = this.customersCollection.doc();
    await docRef.set(customer);
    await this.loggingService.log('info', 'Customer created successfully.', { id: docRef.id });
    return { id: docRef.id, ...customer };
  }

  async findAll() {
    await this.loggingService.log('info', 'Finding all customers...');
    const snapshot = await this.customersCollection.get();
    const customers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    await this.loggingService.log('info', 'Found all customers successfully.', { count: customers.length });
    return customers;
  }

  async findOne(id: string) {
    await this.loggingService.log('info', `Finding customer with id: ${id}...`);
    const doc = await this.customersCollection.doc(id).get();
    if (!doc.exists) {
      await this.loggingService.log('warn', `Customer with id: ${id} not found.`);
      return null;
    }
    const customer = { id: doc.id, ...doc.data() };
    await this.loggingService.log('info', `Found customer with id: ${id} successfully.`, { customer });
    return customer;
  }

  async update(id: string, customer: any) {
    await this.loggingService.log('info', `Updating customer with id: ${id}...`, { customer });
    await this.customersCollection.doc(id).update(customer);
    await this.loggingService.log('info', `Customer with id: ${id} updated successfully.`);
    return { id, ...customer };
  }

  async remove(id: string) {
    await this.loggingService.log('info', `Removing customer with id: ${id}...`);
    await this.customersCollection.doc(id).delete();
    await this.loggingService.log('info', `Customer with id: ${id} removed successfully.`);
  }
}
