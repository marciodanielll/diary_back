import { Module } from '@nestjs/common';
import { ISecretsAdapter, SecretsModule } from '@infra/secrets';
import { ILoggerAdapter, LoggerModule } from '@infra/logger';
import { ITokenAdapter } from './adapter';
import { TokenService } from './service';

@Module({
  imports: [SecretsModule, LoggerModule],
  providers: [
    {
      provide: ITokenAdapter,
      useFactory: (logger: ILoggerAdapter, secrets: ISecretsAdapter) => {
        return new TokenService(logger, secrets);
      },
      inject: [ILoggerAdapter, ISecretsAdapter],
    },
  ],
  exports: [ITokenAdapter],
})
export class TokenModule {}
