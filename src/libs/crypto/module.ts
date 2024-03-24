import { Module } from '@nestjs/common';
import { ISecretsAdapter, SecretsModule } from '@infra/secrets';
import { ILoggerAdapter, LoggerModule } from '@infra/logger';
import { ICryptoAdapter } from './adapter';
import { CryptoService } from './service';

@Module({
  imports: [LoggerModule, SecretsModule],
  providers: [
    {
      provide: ICryptoAdapter,
      useFactory: (secrets: ISecretsAdapter, logger: ILoggerAdapter) => {
        return new CryptoService(secrets, logger);
      },
      inject: [ISecretsAdapter, ILoggerAdapter],
    },
  ],
  exports: [ICryptoAdapter],
})
export class CryptoModule {}
