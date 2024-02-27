import { CreatedModel } from './types';

export abstract class IRepository<T> {
  abstract create<TOptions = unknown>(
    document: T,
    saveOptions?: TOptions,
  ): Promise<CreatedModel>;

  abstract findOne<TQuery = Partial<T>, TOptions = unknown>(
    filter: TQuery,
    options?: TOptions | null,
  ): Promise<T | null>;

  abstract find<TQuery = Partial<T>, TOptions = unknown>(
    filter: TQuery,
    options?: TOptions | null,
  ): Promise<T[]>;
}
