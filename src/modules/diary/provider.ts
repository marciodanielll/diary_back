import { Module, Provider } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DiaryEntity } from '@/core/diary/diary.entity';
import { IDiaryRepository } from '@/core/diary/diary.repository';
import { DiarySchema } from '@/infra/database/postgres-type-orm/schemas/diary.schema';

import { DiaryRepository } from './repository';
import { Repository } from 'typeorm';

const diaryRepositoryProvider: Provider = {
  provide: IDiaryRepository,
  useFactory(repository: Repository<DiarySchema & DiaryEntity>) {
    return new DiaryRepository(repository);
  },
  inject: [getRepositoryToken(DiarySchema)],
};
@Module({
  imports: [TypeOrmModule.forFeature([DiarySchema])],
  providers: [diaryRepositoryProvider],
  exports: [IDiaryRepository],
})
export class DiaryRepositoryProviderModule {}
