import { DiaryEntity } from './diary.entity';
import { IRepository } from '@infra/repository/postgres';

export abstract class IDiaryRepository extends IRepository<DiaryEntity> {}
