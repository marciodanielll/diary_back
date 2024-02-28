import { diarySchema, Diary } from './types';
import { BaseEntity, IEntity } from '@/utils/entity';

export class DiaryEntity
  extends BaseEntity<Diary>(diarySchema)
  implements IEntity
{
  iv: string;
  encryptedData: string;
  userId: string;

  constructor(entity: Diary) {
    super();
    Object.assign(this, this.validate(entity));
  }
}
