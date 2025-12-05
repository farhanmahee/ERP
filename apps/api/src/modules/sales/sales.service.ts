import { Injectable } from '@nestjs/common';
import { getPrimaryFirestore } from '../../config/firebase.config';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class SalesService {
  private readonly firestore = getPrimaryFirestore();
  private readonly salesCollection = this.firestore.collection('sales';

  constructor(private readonly loggingService: LoggingService) {}

  async create(sale: any) {
    await this.loggingService.log('info', 'Creating sale...', { sale });
    const docRef = this.salesCollection.doc();
    await docRef.set(sale);
    await this.loggingService.log('info', 'Sale created successfully.', { id: docRef.id });
    return { id: docRef.id, ...sale };
  }

  async findAll() {
    await this.loggingService.log('info', 'Finding all sales...');
    const snapshot = await this.salesCollection.get();
    const sales = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    await this.loggingService.log('info', 'Found all sales successfully.', { count: sales.length });
    return sales;
  }

  async findOne(id: string) {
    await this.loggingService.log('info', `Finding sale with id: ${id}...`);
    const doc = await this.salesCollection.doc(id).get();
    if (!doc.exists) {
      await this.loggingService.log('warn', `Sale with id: ${id} not found.`);
      return null;
    }
    const sale = { id: doc.id, ...doc.data() };
    await this.loggingService.log('info', `Found sale with id: ${id} successfully.`, { sale });
    return sale;
  }

  async update(id: string, sale: any) {
    await this.loggingService.log('info', `Updating sale with id: ${id}...`, { sale });
    await this.salesCollection.doc(id).update(sale);
    await this.loggingService.log('info', `Sale with id: ${id} updated successfully.`);
    return { id, ...sale };
  }

  async remove(id: string) {
    await this.loggingService.log('info', `Removing sale with id: ${id}...`);
    await this.salesCollection.doc(id).delete();
    await this.loggingService.log('info', `Sale with id: ${id} removed successfully.`);
  }
}
