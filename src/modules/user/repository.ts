import { PostgresRepository } from '@infra/repository/postgres/service';
import { UserSchema } from '@infra/database/postgres-type-orm/schemas/user.schema';
import { UserEntity } from '@/core/user/user.entity';
import { IUserRepository } from '@/core/user/user.repository';
import { Repository } from 'typeorm';

type Model = UserSchema & UserEntity;

export class UserRepository
  extends PostgresRepository<Model>
  implements IUserRepository
{
  constructor(readonly repository: Repository<Model>) {
    super(repository);
  }
}
