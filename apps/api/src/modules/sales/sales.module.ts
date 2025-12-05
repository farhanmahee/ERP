import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { LoggingService } from '../logging/logging.service';

@Module({
  controllers: [SalesController],
  providers: [SalesService, LoggingService],
})
export class SalesModule {}
