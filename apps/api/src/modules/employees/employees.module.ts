import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { LoggingService } from '../logging/logging.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, LoggingService],
})
export class EmployeesModule {}
