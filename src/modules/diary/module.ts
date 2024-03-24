import { ILoggerAdapter, LoggerModule } from '@/infra/logger';
import { DiaryController } from './controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiarySchema } from '@infra/database/postgres-type-orm/schemas/diary.schema';
import { DiaryRepositoryProviderModule } from './provider';
import { CreateDiaryUseCase } from '@core/diary/uses-cases/create-diary.usecase';
import { IDiaryRepository } from '@core/diary/diary.repository';
import { IUserRepository } from '@core/user/user.repository';
import { ICreateDiaryCaseAdapter } from './adapter';
import { UserRepositoryProviderModule } from '../user/provider';
import { UserSchema } from '@infra/database/postgres-type-orm/schemas/user.schema';
import { CryptoModule, ICryptoAdapter } from '@libs/crypto';
import { TokenModule } from '@libs/token/module';
@Module({
  imports: [
    LoggerModule,
    DiaryRepositoryProviderModule,
    UserRepositoryProviderModule,
    TypeOrmModule.forFeature([DiarySchema, UserSchema]),
    CryptoModule,
    TokenModule,
  ],
  controllers: [DiaryController],
  providers: [
    {
      provide: ICreateDiaryCaseAdapter,
      useFactory: (
        diaryRepository: IDiaryRepository,
        userRepository: IUserRepository,
        logger: ILoggerAdapter,
        cryptoService: ICryptoAdapter,
      ) => {
        return new CreateDiaryUseCase(
          diaryRepository,
          userRepository,
          logger,
          cryptoService,
        );
      },
      inject: [
        IDiaryRepository,
        IUserRepository,
        ILoggerAdapter,
        ICryptoAdapter,
      ],
    },
  ],
})
export class DiaryModule {}
