import { v4 as uuidv4 } from 'uuid';
import { ZodSchema, ZodType } from 'zod';
// import { DateUtils } from './date';

export const withID = (entity: { _id?: string; id?: string }) => {
  entity.id = [entity?.id, entity?._id, uuidv4()].find(Boolean) as string;
  return entity;
};

export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActivated?: boolean;
}

export const BaseEntity = <T extends { _id?: string; id?: string }>(
  schema: ZodSchema<T> | ZodType<T>,
) => {
  abstract class Entity implements IEntity {
    readonly id: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    isActivated?: boolean;

    static nameOf = (name: keyof T) => name;

    setDeleted() {
      /// this.isActivated = DateUtils.getJSDate();
    }

    validate(entity: T): T {
      const entityWithId = withID(entity);
      Object.assign(this, entityWithId);
      return schema.parse(entityWithId as T);
    }
  }

  return Entity;
};
