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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase.config");
const logging_service_1 = require("../logging/logging.service");
let SalesService = class SalesService {
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.firestore = (0, firebase_config_1.getPrimaryFirestore)();
        this.salesCollection = this.firestore.collection('sales');
    }
    async create(sale) {
        await this.loggingService.log('info', 'Creating sale...', { sale });
        const docRef = this.salesCollection.doc();
        await docRef.set(sale);
        await this.loggingService.log('info', 'Sale created successfully.', { id: docRef.id });
        return Object.assign({ id: docRef.id }, sale);
    }
    async findAll() {
        await this.loggingService.log('info', 'Finding all sales...');
        const snapshot = await this.salesCollection.get();
        const sales = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        await this.loggingService.log('info', 'Found all sales successfully.', { count: sales.length });
        return sales;
    }
    async findOne(id) {
        await this.loggingService.log('info', `Finding sale with id: ${id}...`);
        const doc = await this.salesCollection.doc(id).get();
        if (!doc.exists) {
            await this.loggingService.log('warn', `Sale with id: ${id} not found.`);
            return null;
        }
        const sale = Object.assign({ id: doc.id }, doc.data());
        await this.loggingService.log('info', `Found sale with id: ${id} successfully.`, { sale });
        return sale;
    }
    async update(id, sale) {
        await this.loggingService.log('info', `Updating sale with id: ${id}...`, { sale });
        await this.salesCollection.doc(id).update(sale);
        await this.loggingService.log('info', `Sale with id: ${id} updated successfully.`);
        return Object.assign({ id }, sale);
    }
    async remove(id) {
        await this.loggingService.log('info', `Removing sale with id: ${id}...`);
        await this.salesCollection.doc(id).delete();
        await this.loggingService.log('info', `Sale with id: ${id} removed successfully.`);
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logging_service_1.LoggingService])
], SalesService);
//# sourceMappingURL=sales.service.js.map