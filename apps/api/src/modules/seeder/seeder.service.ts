
import { Injectable } from '@nestjs/common';
import { getPrimaryFirestore, getPrimaryDatabase } from '../../config/firebase.config';
import { LoggingService } from '../logging/logging.service';
import { MOCK_EMPLOYEES, MOCK_ATTENDANCE, MOCK_INVENTORY, MOCK_CUSTOMERS, MOCK_SUPPLIERS, MOCK_SALES } from '../../../../constants';

@Injectable()
export class SeederService {
  private readonly firestore = getPrimaryFirestore();
  private readonly database = getPrimaryDatabase();

  constructor(private readonly loggingService: LoggingService) {}

  async seedUsers() {
    await this.loggingService.log('info', 'Seeding detailed users to Realtime Database...');
    const usersRef = this.database.ref('users');
    await usersRef.set({
      alovelace: {
        name: 'Ada Lovelace',
        birthYear: 1815,
        contacts: { ghopper: true },
        address: {
            line1: '10 St. James\'s Square',
            city: 'London'
        }
      },
      ghopper: {
        name: 'Grace Hopper',
        birthYear: 1906,
        contacts: { alovelace: true },
        address: {
            line1: '1 Hopper St',
            city: 'Arlington'
        }
      },
      eclarke: {
        name: 'Edith Clarke',
        birthYear: 1883,
        contacts: { ghopper: true, alovelace: true },
        address: {
            line1: '12 Clarke Ave',
            city: 'Baltimore'
        }
      },
    });
    await this.loggingService.log('info', 'Detailed users seeded successfully to Realtime Database.');
  }

  async seedChats() {
    await this.loggingService.log('info', 'Seeding chats, members, and messages...');

    const chats = {
      one: {
        title: 'Historical Tech Pioneers',
        lastMessage: 'ghopper: Relay malfunction found. Cause: moth.',
        timestamp: 1459361875666,
      },
    };

    const members = {
      one: {
        ghopper: true,
        alovelace: true,
        eclarke: true,
      },
    };

    const messages = {
      one: {
        m1: {
          name: 'eclarke',
          message: 'The relay seems to be malfunctioning.',
          timestamp: 1459361875337,
        },
        m2: {
          name: 'ghopper',
          message: 'Relay malfunction found. Cause: moth.',
          timestamp: 1459361875666,
        },
      },
    };

    const batch = this.firestore.batch();

    // Seed chats
    for (const chatId in chats) {
      const chatRef = this.firestore.collection('chats').doc(chatId);
      batch.set(chatRef, chats[chatId]);
    }

    // Seed members
    for (const chatId in members) {
      const memberRef = this.firestore.collection('members').doc(chatId);
      batch.set(memberRef, members[chatId]);
    }

    // Seed messages
    for (const chatId in messages) {
      const messagesRef = this.firestore.collection('messages').doc(chatId);
      batch.set(messagesRef, messages[chatId]);
    }

    await batch.commit();
    await this.loggingService.log('info', 'Chats, members, and messages seeded successfully.', { chatCount: Object.keys(chats).length });
  }

  async seedPresence() {
    await this.loggingService.log('info', 'Seeding presence data to Realtime Database...');
    const presenceRef = this.database.ref('presence');
    await presenceRef.set({
      alovelace: 'online',
      ghopper: 'offline',
      eclarke: 'online',
    });
    await this.loggingService.log('info', 'Presence data seeded successfully.');
  }
  
  async updateUser() {
    await this.loggingService.log('info', 'Updating user data in Realtime Database...');
    const userRef = this.database.ref('users/alovelace');
    await userRef.update({
      birthYear: 1816, // Changed from 1815
    });
    await this.loggingService.log('info', 'User data updated successfully.');
    return { message: 'User updated.' };
  }

  async getUsers() {
    await this.loggingService.log('info', 'Reading users from Realtime Database...');
    const usersRef = this.database.ref('users');
    const snapshot = await usersRef.once('value');
    const users = snapshot.val();
    await this.loggingService.log('info', 'Users read successfully.');
    return users;
  }

  async clearDatabase() {
    await this.loggingService.log('info', 'Clearing database...');

    const firestoreCollections = [
      'chats',
      'members',
      'messages',
      'employees',
      'attendance',
      'inventory',
      'customers',
      'suppliers',
      'sales',
    ];

    const realtimeDatabaseNodes = [
      'users',
      'presence',
    ];

    const firestorePromises = firestoreCollections.map(collectionName => this.deleteCollection(collectionName));
    const realtimePromises = realtimeDatabaseNodes.map(nodeName => this.database.ref(nodeName).remove());

    await Promise.all([...firestorePromises, ...realtimePromises]);

    await this.loggingService.log('info', 'Database cleared successfully.');
    return { message: 'Database cleared.' };
  }

  private deleteCollection(collectionPath: string, batchSize: number = 500) {
    const collectionRef = this.firestore.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise((resolve, reject) => {
      this.deleteQueryBatch(query, resolve).catch(reject);
    });
  }

  private async deleteQueryBatch(query, resolve) {
    const snapshot = await query.get();

    if (snapshot.size === 0) {
      return resolve();
    }

    const batch = this.firestore.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    process.nextTick(() => {
      this.deleteQueryBatch(query, resolve);
    });
  }

  async seedCollection(collectionName: string, data: any[]) {
    await this.loggingService.log('info', `Seeding ${collectionName}...`);
    const batch = this.firestore.batch();
    data.forEach(item => {
      const docRef = this.firestore.collection(collectionName).doc(item.id);
      batch.set(docRef, item);
    });
    await batch.commit();
    await this.loggingService.log('info', `${collectionName} seeded successfully.`, { count: data.length });
  }

  async seedAll() {
    await this.seedUsers();
    await this.seedChats();
    await this.seedPresence();
    await this.seedCollection('employees', MOCK_EMPLOYEES);
    await this.seedCollection('attendance', MOCK_ATTENDANCE);
    await this.seedCollection('inventory', MOCK_INVENTORY);
    await this.seedCollection('customers', MOCK_CUSTOMERS);
    await this.seedCollection('suppliers', MOCK_SUPPLIERS);
    await this.seedCollection('sales', MOCK_SALES);
    return { message: 'Seeding complete.' };
  }
}
