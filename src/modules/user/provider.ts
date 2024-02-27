import { Module, Provider } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@/core/user/user.entity';
import { IUserRepository } from '@/core/user/repository';
import { User } from '@/infra/database/postgres-type-orm/schemas/user';

import { UserRepository } from './repository';
import { Repository } from 'typeorm';

const userRepositoryProvider: Provider = {
  provide: IUserRepository,
  useFactory: (repository: Repository<User & UserEntity>) => {
    return new UserRepository(repository);
  },
  inject: [getRepositoryToken(User)],
};

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [userRepositoryProvider],
  exports: [IUserRepository],
})
export class UserRepositoryProviderModule {}
