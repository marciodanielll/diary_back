import { BaseEntity, FindOneOptions, Repository, SaveOptions } from 'typeorm';

import { IEntity } from '@/utils/entity';
import { IRepository } from './adapter';
import { CreatedModel } from './types';

type Model = BaseEntity & IEntity;

export class PostgresRepository<T extends Model> implements IRepository<T> {
  constructor(readonly repository: Repository<T>) {}

  async create<TOptions = unknown>(
    document: T,
    saveOptions?: TOptions,
  ): Promise<CreatedModel> {
    const entity = this.repository.create(document);

    if (saveOptions !== undefined) {
      const model = await entity.save(saveOptions as SaveOptions);
      return { created: model.hasId(), id: model.id };
    }

    const model = await entity.save();
    return { created: model.hasId(), id: model.id };
  }

  async findOne<TQuery = Partial<T>>(filter: TQuery): Promise<T | null> {
    return this.repository.findOne({
      where: { ...filter, deleted_at: null },
    } as FindOneOptions<T>);
  }

  async find<TQuery = Partial<T>>(filter: TQuery): Promise<T[]> {
    return this.repository.find({
      where: { ...filter, deleted_at: null },
    } as FindOneOptions<T>);
  }
}
