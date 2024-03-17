import { DiaryEntity } from './diary.entity';
import { IRepository } from '@/infra/repository/postgres/adapter';

export abstract class IDiaryRepository extends IRepository<DiaryEntity> {}
