import { Controller, Post, Body } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('firestore')
  syncFirestore(@Body() body: { collectionName: string }) {
    return this.syncService.syncCollection(body.collectionName);
  }
}
