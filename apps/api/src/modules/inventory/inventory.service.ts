import { Injectable } from '@nestjs/common';
import { getPrimaryFirestore } from '../../config/firebase.config';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class InventoryService {
  private readonly firestore = getPrimaryFirestore();
  private readonly inventoryCollection = this.firestore.collection('inventory');

  constructor(private readonly loggingService: LoggingService) {}

  async create(item: any) {
    await this.loggingService.log('info', 'Creating inventory item...', { item });
    const docRef = this.inventoryCollection.doc();
    await docRef.set(item);
    await this.loggingService.log('info', 'Inventory item created successfully.', { id: docRef.id });
    return { id: docRef.id, ...item };
  }

  async findAll() {
    await this.loggingService.log('info', 'Finding all inventory items...');
    const snapshot = await this.inventoryCollection.get();
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    await this.loggingService.log('info', 'Found all inventory items successfully.', { count: items.length });
    return items;
  }

  async findOne(id: string) {
    await this.loggingService.log('info', `Finding inventory item with id: ${id}...`);
    const doc = await this.inventoryCollection.doc(id).get();
    if (!doc.exists) {
      await this.loggingService.log('warn', `Inventory item with id: ${id} not found.`);
      return null;
    }
    const item = { id: doc.id, ...doc.data() };
    await this.loggingService.log('info', `Found inventory item with id: ${id} successfully.`, { item });
    return item;
  }

  async update(id: string, item: any) {
    await this.loggingService.log('info', `Updating inventory item with id: ${id}...`, { item });
    await this.inventoryCollection.doc(id).update(item);
    await this.loggingService.log('info', `Inventory item with id: ${id} updated successfully.`);
    return { id, ...item };
  }

  async remove(id: string) {
    await this.loggingService.log('info', `Removing inventory item with id: ${id}...`);
    await this.inventoryCollection.doc(id).delete();
    await this.loggingService.log('info', `Inventory item with id: ${id} removed successfully.`);
  }
}
