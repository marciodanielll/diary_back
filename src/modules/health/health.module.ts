import { Module } from '@nestjs/common';

import { HealthController } from './health.controller';
import {
  DatabaseModule,
  DatabaseService,
  IDatabaseService,
} from '@/infra/database/postgres';
import { ILoggerAdapter, LoggerModule } from '@/infra/logger';
import { ISecretsAdapter, SecretsModule } from '@/infra/secrets';

@Module({
  imports: [DatabaseModule, LoggerModule, SecretsModule],
  controllers: [HealthController],
  providers: [
    {
      provide: IDatabaseService,
      useFactory: (logger: ILoggerAdapter, secretsService: ISecretsAdapter) => {
        return new DatabaseService(logger, secretsService);
      },
      inject: [ILoggerAdapter, ISecretsAdapter],
    },
  ],
})
export class HealthModule {}
