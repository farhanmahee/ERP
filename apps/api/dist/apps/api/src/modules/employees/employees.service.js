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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../config/firebase.config");
const logging_service_1 = require("../logging/logging.service");
let EmployeesService = class EmployeesService {
    constructor(loggingService) {
        this.loggingService = loggingService;
        this.firestore = (0, firebase_config_1.getPrimaryFirestore)();
        this.employeesCollection = this.firestore.collection('employees');
    }
    async create(employee) {
        await this.loggingService.log('info', 'Creating employee...', { employee });
        const docRef = this.employeesCollection.doc();
        await docRef.set(employee);
        await this.loggingService.log('info', 'Employee created successfully.', { id: docRef.id });
        return Object.assign({ id: docRef.id }, employee);
    }
    async findAll() {
        await this.loggingService.log('info', 'Finding all employees...');
        const snapshot = await this.employeesCollection.get();
        const employees = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        await this.loggingService.log('info', 'Found all employees successfully.', { count: employees.length });
        return employees;
    }
    async findOne(id) {
        await this.loggingService.log('info', `Finding employee with id: ${id}...`);
        const doc = await this.employeesCollection.doc(id).get();
        if (!doc.exists) {
            await this.loggingService.log('warn', `Employee with id: ${id} not found.`);
            return null;
        }
        const employee = Object.assign({ id: doc.id }, doc.data());
        await this.loggingService.log('info', `Found employee with id: ${id} successfully.`, { employee });
        return employee;
    }
    async update(id, employee) {
        await this.loggingService.log('info', `Updating employee with id: ${id}...`, { employee });
        await this.employeesCollection.doc(id).update(employee);
        await this.loggingService.log('info', `Employee with id: ${id} updated successfully.`);
        return Object.assign({ id }, employee);
    }
    async remove(id) {
        await this.loggingService.log('info', `Removing employee with id: ${id}...`);
        await this.employeesCollection.doc(id).delete();
        await this.loggingService.log('info', `Employee with id: ${id} removed successfully.`);
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logging_service_1.LoggingService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map