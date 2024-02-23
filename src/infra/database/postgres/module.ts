import { Module } from '@nestjs/common';
import { DatabaseService } from './service';
import { LoggerModule } from '@/infra/logger';
import { SecretsModule } from '@/infra/secrets';
import { ILoggerAdapter } from '@/infra/logger';
import { ISecretsAdapter } from '@/infra/secrets';
import { IDatabaseService } from './adapter';

@Module({
  imports: [LoggerModule, SecretsModule],
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
export class DatabaseModule {}
