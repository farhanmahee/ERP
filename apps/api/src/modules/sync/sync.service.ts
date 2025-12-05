import { Injectable } from '@nestjs/common';
import {
  getPrimaryFirestore,
  getSecondaryFirestore,
} from '../../config/firebase.config';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class SyncService {
  private readonly primaryFirestore = getPrimaryFirestore();
  private readonly secondaryFirestore = getSecondaryFirestore();

  constructor(private readonly loggingService: LoggingService) {}

  async syncCollection(collectionName: string) {
    await this.loggingService.log('info', `Sync started for collection: ${collectionName}.`, {
      collectionName,
    });

    try {
      const sourceCollection = this.primaryFirestore.collection(collectionName);
      const destinationCollection = this.secondaryFirestore.collection(collectionName);

      const snapshot = await sourceCollection.get();

      if (snapshot.empty) {
        await this.loggingService.log(
          'warn',
          `Source collection '${collectionName}' is empty. No documents to sync.`,
          { collectionName },
        );
        return { message: 'No documents to sync.', documentsCopied: 0 };
      }

      const batch = this.secondaryFirestore.batch();
      snapshot.docs.forEach(doc => {
        const docRef = destinationCollection.doc(doc.id);
        batch.set(docRef, doc.data());
      });

      await batch.commit();

      const successMessage = `Successfully synced ${snapshot.size} documents from '${collectionName}' to the secondary database.`;
      await this.loggingService.log('info', successMessage, {
        collectionName,
        documentsCopied: snapshot.size,
      });

      return {
        message: successMessage,
        documentsCopied: snapshot.size,
      };
    } catch (error) {
      await this.loggingService.log(
        'error',
        `Error syncing collection '${collectionName}'.`,
        { collectionName, error: error.message },
      );
      throw error; // Re-throw the error to be handled by NestJS
    }
  }
}
