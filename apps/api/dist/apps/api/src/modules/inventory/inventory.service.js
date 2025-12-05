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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase.config");
const logging_service_1 = require("../logging/logging.service");
let InventoryService = class InventoryService {
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.firestore = (0, firebase_config_1.getPrimaryFirestore)();
        this.inventoryCollection = this.firestore.collection('inventory');
    }
    async create(item) {
        await this.loggingService.log('info', 'Creating inventory item...', { item });
        const docRef = this.inventoryCollection.doc();
        await docRef.set(item);
        await this.loggingService.log('info', 'Inventory item created successfully.', { id: docRef.id });
        return Object.assign({ id: docRef.id }, item);
    }
    async findAll() {
        await this.loggingService.log('info', 'Finding all inventory items...');
        const snapshot = await this.inventoryCollection.get();
        const items = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        await this.loggingService.log('info', 'Found all inventory items successfully.', { count: items.length });
        return items;
    }
    async findOne(id) {
        await this.loggingService.log('info', `Finding inventory item with id: ${id}...`);
        const doc = await this.inventoryCollection.doc(id).get();
        if (!doc.exists) {
            await this.loggingService.log('warn', `Inventory item with id: ${id} not found.`);
            return null;
        }
        const item = Object.assign({ id: doc.id }, doc.data());
        await this.loggingService.log('info', `Found inventory item with id: ${id} successfully.`, { item });
        return item;
    }
    async update(id, item) {
        await this.loggingService.log('info', `Updating inventory item with id: ${id}...`, { item });
        await this.inventoryCollection.doc(id).update(item);
        await this.loggingService.log('info', `Inventory item with id: ${id} updated successfully.`);
        return Object.assign({ id }, item);
    }
    async remove(id) {
        await this.loggingService.log('info', `Removing inventory item with id: ${id}...`);
        await this.inventoryCollection.doc(id).delete();
        await this.loggingService.log('info', `Inventory item with id: ${id} removed successfully.`);
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logging_service_1.LoggingService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map