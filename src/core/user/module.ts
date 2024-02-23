import {
  DatabaseModule,
  DatabaseService,
  IDatabaseService,
} from '@/infra/database/postgres';
import { Module } from '@nestjs/common';

import { UserController } from './controller';

import { UserRepository } from './repository/user.repository';
import { ISecretsAdapter, SecretsModule } from '@/infra/secrets';
import { ILoggerAdapter, LoggerModule } from '@/infra/logger';
import { UserCreateUseCase } from './use-cases/user.create';
import { UserGetAllUseCase } from './use-cases/user.getall';

@Module({
  imports: [DatabaseModule, LoggerModule, SecretsModule],
  controllers: [UserController],
  providers: [
    {
      provide: IDatabaseService,
      useFactory: (logger, secretsService) => {
        return new DatabaseService(logger, secretsService);
      },
      inject: [ILoggerAdapter, ISecretsAdapter],
    },
    {
      provide: UserRepository,
      useFactory: (databaseService: IDatabaseService) => {
        return new UserRepository(databaseService);
      },
      inject: [IDatabaseService],
    },
    {
      provide: UserCreateUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new UserCreateUseCase(userRepository);
      },
      inject: [UserRepository],
    },
    {
      provide: UserGetAllUseCase,
      useFactory: (userRepository: UserRepository) => {
        return new UserGetAllUseCase(userRepository);
      },
      inject: [UserRepository],
    },
  ],
})
export class UserModule {}
