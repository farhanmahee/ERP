import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { LoggingService } from '../logging/logging.service';

@Module({
  controllers: [InventoryController],
  providers: [InventoryService, LoggingService],
})
export class InventoryModule {}
