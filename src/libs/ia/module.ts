import { Module } from '@nestjs/common';
import { ISecretsAdapter, SecretsModule } from '@infra/secrets';
import { ILoggerAdapter, LoggerModule } from '@infra/logger';
import { IAAdapter } from './adapter';
import { IAService } from './service';

@Module({
  imports: [SecretsModule, LoggerModule],
  providers: [
    {
      provide: IAAdapter,
      useFactory: (secrets: ISecretsAdapter, logger: ILoggerAdapter) => {
        return new IAService(secrets, logger);
      },
      inject: [ISecretsAdapter, ILoggerAdapter],
    },
  ],
  exports: [IAAdapter],
})
export class IAModule {}
