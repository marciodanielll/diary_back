import {
  BaseEntity,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
} from 'typeorm';

import { IEntity } from '@/utils/entity';
import { IRepository } from './adapter';
import { CreatedModel, UpdatedModel } from './types';

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

  async updateOne<TQuery = Partial<T>, TUpdate = Partial<T>>(
    filter: TQuery,
    updated: TUpdate,
  ): Promise<UpdatedModel> {
    const data = await this.repository.update(
      filter as FindOptionsWhere<T>,
      updated as object,
    );

    return {
      modifiedCount: data.affected,
      upsertedCount: 0,
      upsertedId: 0,
      matchedCount: data.affected,
      acknowledged: !!data.affected,
    };
  }

  async findOne<TQuery = Partial<T>>(
    filter: TQuery,
    options?: unknown,
  ): Promise<T | null> {
    const query = {
      where: { ...filter, deleted_at: null },
    };

    if (Array.isArray(options) && options.length) {
      query['relations'] = options;
    }
    return this.repository.findOne({
      ...query,
    } as FindOneOptions<T>);
  }

  async find<TQuery = Partial<T>>(filter: TQuery): Promise<T[]> {
    return this.repository.find({
      where: { ...filter, deleted_at: null },
    } as FindOneOptions<T>);
  }
}
