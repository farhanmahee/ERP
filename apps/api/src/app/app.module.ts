import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SeederModule } from '../modules/seeder/seeder.module';
import { LoggingModule } from '../modules/logging/logging.module';
import { InventoryModule } from '../modules/inventory/inventory.module';
import { SalesModule } from '../modules/sales/sales.module';
import { EmployeesModule } from '../modules/employees/employees.module';
import { CustomersModule } from '../modules/customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SeederModule,
    LoggingModule,
    InventoryModule,
    SalesModule,
    EmployeesModule,
    CustomersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
