import { UserEntity } from './user.entity';
import { IRepository } from '@/infra/repository/postgres/adapter';

export abstract class IUserRepository extends IRepository<UserEntity> {}
