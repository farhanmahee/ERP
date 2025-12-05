import { Injectable } from '@nestjs/common';
import { getPrimaryFirestore } from '../../config/firebase.config';
import { LoggingService } from '../logging/logging.service';

@Injectable()
export class EmployeesService {
  private readonly firestore = getPrimaryFirestore();
  private readonly employeesCollection = this.firestore.collection('employees';

  constructor(private readonly loggingService: LoggingService) {}

  async create(employee: any) {
    await this.loggingService.log('info', 'Creating employee...', { employee });
    const docRef = this.employeesCollection.doc();
    await docRef.set(employee);
    await this.loggingService.log('info', 'Employee created successfully.', { id: docRef.id });
    return { id: docRef.id, ...employee };
  }

  async findAll() {
    await this.loggingService.log('info', 'Finding all employees...');
    const snapshot = await this.employeesCollection.get();
    const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    await this.loggingService.log('info', 'Found all employees successfully.', { count: employees.length });
    return employees;
  }

  async findOne(id: string) {
    await this.loggingService.log('info', `Finding employee with id: ${id}...`);
    const doc = await this.employeesCollection.doc(id).get();
    if (!doc.exists) {
      await this.loggingService.log('warn', `Employee with id: ${id} not found.`);
      return null;
    }
    const employee = { id: doc.id, ...doc.data() };
    await this.loggingService.log('info', `Found employee with id: ${id} successfully.`, { employee });
    return employee;
  }

  async update(id: string, employee: any) {
    await this.loggingService.log('info', `Updating employee with id: ${id}...`, { employee });
    await this.employeesCollection.doc(id).update(employee);
    await this.loggingService.log('info', `Employee with id: ${id} updated successfully.`);
    return { id, ...employee };
  }

  async remove(id: string) {
    await this.loggingService.log('info', `Removing employee with id: ${id}...`);
    await this.employeesCollection.doc(id).delete();
    await this.loggingService.log('info', `Employee with id: ${id} removed successfully.`);
  }
}
