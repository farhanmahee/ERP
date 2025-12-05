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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase.config");
const logging_service_1 = require("../logging/logging.service");
let CustomersService = class CustomersService {
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.firestore = (0, firebase_config_1.getPrimaryFirestore)();
        this.customersCollection = this.firestore.collection('customers');
    }
    async create(customer) {
        await this.loggingService.log('info', 'Creating customer...', { customer });
        const docRef = this.customersCollection.doc();
        await docRef.set(customer);
        await this.loggingService.log('info', 'Customer created successfully.', { id: docRef.id });
        return Object.assign({ id: docRef.id }, customer);
    }
    async findAll() {
        await this.loggingService.log('info', 'Finding all customers...');
        const snapshot = await this.customersCollection.get();
        const customers = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        await this.loggingService.log('info', 'Found all customers successfully.', { count: customers.length });
        return customers;
    }
    async findOne(id) {
        await this.loggingService.log('info', `Finding customer with id: ${id}...`);
        const doc = await this.customersCollection.doc(id).get();
        if (!doc.exists) {
            await this.loggingService.log('warn', `Customer with id: ${id} not found.`);
            return null;
        }
        const customer = Object.assign({ id: doc.id }, doc.data());
        await this.loggingService.log('info', `Found customer with id: ${id} successfully.`, { customer });
        return customer;
    }
    async update(id, customer) {
        await this.loggingService.log('info', `Updating customer with id: ${id}...`, { customer });
        await this.customersCollection.doc(id).update(customer);
        await this.loggingService.log('info', `Customer with id: ${id} updated successfully.`);
        return Object.assign({ id }, customer);
    }
    async remove(id) {
        await this.loggingService.log('info', `Removing customer with id: ${id}...`);
        await this.customersCollection.doc(id).delete();
        await this.loggingService.log('info', `Customer with id: ${id} removed successfully.`);
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logging_service_1.LoggingService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map