import { PostgresRepository } from '@infra/repository/postgres/service';
import { DiarySchema } from '@infra/database/postgres-type-orm/schemas/diary.schema';
import { DiaryEntity } from '@core/diary/diary.entity';
import { IDiaryRepository } from '@core/diary/diary.repository';
import { Repository } from 'typeorm';

type Model = DiarySchema & DiaryEntity;

export class DiaryRepository<T extends Model>
  extends PostgresRepository<T>
  implements IDiaryRepository
{
  constructor(readonly repository: Repository<T>) {
    super(repository);
  }
}
