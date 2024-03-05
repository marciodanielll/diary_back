import { ILoggerAdapter, LoggerModule } from '@/infra/logger';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';
import { User } from '@/infra/database/postgres-type-orm/schemas/user';
import {
  ISingUpOutputUseCaseAdapter,
  IUserLoginUseCaseAdapter,
} from './adapter';
import { IUserRepository } from '@/core/user/repository';
import { UserRepositoryProviderModule } from './provider';
import { SingUpUseCase } from '@/core/user/use-cases/sign-up';
import { UserLoginUseCase } from '@/core/user/use-cases/login';
import { TokenModule } from '@/libs/token/module';
import { CryptoModule, ICryptoAdapter } from '@/libs/crypto';
import { ITokenAdapter } from '@/libs/token/adapter';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([User]),
    UserRepositoryProviderModule,
    TokenModule,
    CryptoModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: ISingUpOutputUseCaseAdapter,
      useFactory: (
        repository: IUserRepository,
        logger: ILoggerAdapter,
        cryptoService: ICryptoAdapter,
        tokenService: ITokenAdapter,
      ) => {
        return new SingUpUseCase(
          repository,
          logger,
          cryptoService,
          tokenService,
        );
      },
      inject: [IUserRepository, ILoggerAdapter, ICryptoAdapter, ITokenAdapter],
    },
    {
      provide: IUserLoginUseCaseAdapter,
      useFactory: (
        repository: IUserRepository,
        logger: ILoggerAdapter,
        cryptoService: ICryptoAdapter,
        tokenService: ITokenAdapter,
      ) => {
        return new UserLoginUseCase(
          repository,
          logger,
          cryptoService,
          tokenService,
        );
      },
      inject: [IUserRepository, ILoggerAdapter, ICryptoAdapter, ITokenAdapter],
    },
  ],
})
export class UserModule {}
