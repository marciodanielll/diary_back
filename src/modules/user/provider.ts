import { Module, Provider } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@core/user/user.entity';
import { IUserRepository } from '@core/user/user.repository';
import { UserSchema } from '@infra/database/postgres-type-orm/schemas/user.schema';

import { UserRepository } from './repository';
import { Repository } from 'typeorm';

const userRepositoryProvider: Provider = {
  provide: IUserRepository,
  useFactory: (repository: Repository<UserSchema & UserEntity>) => {
    return new UserRepository(repository);
  },
  inject: [getRepositoryToken(UserSchema)],
};

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  providers: [userRepositoryProvider],
  exports: [IUserRepository],
})
export class UserRepositoryProviderModule {}
