
import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';

@Module({
  imports: [],
  controllers: [AiController],
  providers: [], // AiService has been removed
})
export class AiModule {}
