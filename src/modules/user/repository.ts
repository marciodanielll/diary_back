import { PostgresRepository } from './../../infra/repository/postgres/service';
import { User } from '../../infra/database/postgres-type-orm/schemas/user';
import { UserEntity } from '../../core/user/user.entity';
import { IUserRepository } from '@/core/user/repository';
import { Repository } from 'typeorm';

type Model = User & UserEntity;

export class UserRepository
  extends PostgresRepository<Model>
  implements IUserRepository
{
  constructor(readonly repository: Repository<Model>) {
    super(repository);
  }
}
