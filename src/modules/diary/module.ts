import { LoggerModule } from '@/infra/logger';
import { DiaryController } from './controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [LoggerModule],
  controllers: [DiaryController],
  providers: [],
})
export class DiaryModule {}
