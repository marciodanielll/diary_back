import { ILoggerAdapter, LoggerModule } from '@/infra/logger';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller';
import { UserSchema } from '@infra/database/postgres-type-orm/schemas/user.schema';
import { ISingInUseCaseUseCaseAdapter, ISingUpUseCaseAdapter } from './adapter';
import { IUserRepository } from '@core/user/user.repository';
import { UserRepositoryProviderModule } from './provider';
import { SignUpUseCase } from '@core/user/use-cases/sign-up.usecase';
import { SingInUseCase } from '@core/user/use-cases/sign-in.usecase';
import { TokenModule } from '@libs/token/module';
import { CryptoModule, ICryptoAdapter } from '@/libs/crypto';
import { ITokenAdapter } from '@libs/token/adapter';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([UserSchema]),
    UserRepositoryProviderModule,
    TokenModule,
    CryptoModule,
  ],
  controllers: [UserController],
  providers: [
    {
      provide: ISingUpUseCaseAdapter,
      useFactory: (
        repository: IUserRepository,
        logger: ILoggerAdapter,
        cryptoService: ICryptoAdapter,
        tokenService: ITokenAdapter,
      ) => {
        return new SignUpUseCase(
          repository,
          logger,
          cryptoService,
          tokenService,
        );
      },
      inject: [IUserRepository, ILoggerAdapter, ICryptoAdapter, ITokenAdapter],
    },
    {
      provide: ISingInUseCaseUseCaseAdapter,
      useFactory: (
        repository: IUserRepository,
        logger: ILoggerAdapter,
        cryptoService: ICryptoAdapter,
        tokenService: ITokenAdapter,
      ) => {
        return new SingInUseCase(
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
