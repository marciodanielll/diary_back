import { Module } from '@nestjs/common';
import { ISecretsAdapter, SecretsModule } from '@infra/secrets';
import { ILoggerAdapter } from './adapter';
import { LoggerService } from './service';

@Module({
  imports: [SecretsModule],
  providers: [
    {
      provide: ILoggerAdapter,
      useFactory: ({
        LOGGER_LEVEL,
        MONGO_URL,
        MONGO_PROD,
        NODE_ENV,
      }: ISecretsAdapter) => {
        const logger = new LoggerService();
        logger.connect(LOGGER_LEVEL, MONGO_URL, MONGO_PROD, NODE_ENV);
        return logger;
      },
      inject: [ISecretsAdapter],
    },
  ],
  exports: [ILoggerAdapter],
})
export class LoggerModule {}
