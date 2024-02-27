import { LoggerModule } from '@/infra/logger';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';
import { User } from '@/infra/database/postgres-type-orm/schemas/user';
import { IUserCreateUseCaseAdapter } from './adapter';
import { IUserRepository } from '@/core/user/repository';
import { UserRepositoryProviderModule } from './provider';
import { UserCreateUseCase } from '@/core/user/use-cases/create';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([User]),
    UserRepositoryProviderModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: IUserCreateUseCaseAdapter,
      useFactory: (repository: IUserRepository) => {
        return new UserCreateUseCase(repository);
      },
      inject: [IUserRepository],
    },
  ],
})
export class UserModule {}
