import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { LoggingService } from '../logging/logging.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, LoggingService],
})
export class CustomersModule {}
