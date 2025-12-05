"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase.config");
const logging_service_1 = require("../logging/logging.service");
const constants_1 = require("../../../../constants");
let SeederService = class SeederService {
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.firestore = (0, firebase_config_1.getPrimaryFirestore)();
        this.database = (0, firebase_config_1.getPrimaryDatabase)();
    }
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
        for (const chatId in chats) {
            const chatRef = this.firestore.collection('chats').doc(chatId);
            batch.set(chatRef, chats[chatId]);
        }
        for (const chatId in members) {
            const memberRef = this.firestore.collection('members').doc(chatId);
            batch.set(memberRef, members[chatId]);
        }
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
            birthYear: 1816,
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
    deleteCollection(collectionPath, batchSize = 500) {
        const collectionRef = this.firestore.collection(collectionPath);
        const query = collectionRef.orderBy('__name__').limit(batchSize);
        return new Promise((resolve, reject) => {
            this.deleteQueryBatch(query, resolve).catch(reject);
        });
    }
    async deleteQueryBatch(query, resolve) {
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
    async seedCollection(collectionName, data) {
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
        await this.seedCollection('employees', constants_1.MOCK_EMPLOYEES);
        await this.seedCollection('attendance', constants_1.MOCK_ATTENDANCE);
        await this.seedCollection('inventory', constants_1.MOCK_INVENTORY);
        await this.seedCollection('customers', constants_1.MOCK_CUSTOMERS);
        await this.seedCollection('suppliers', constants_1.MOCK_SUPPLIERS);
        await this.seedCollection('sales', constants_1.MOCK_SALES);
        return { message: 'Seeding complete.' };
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logging_service_1.LoggingService])
], SeederService);
//# sourceMappingURL=seeder.service.js.map