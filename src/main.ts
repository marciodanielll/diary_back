import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ISecretsAdapter } from './infra/secrets/';
import { ILoggerAdapter } from './infra/logger';
import { name } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { PORT } = app.get(ISecretsAdapter);

  const logger = app.get(ILoggerAdapter);
  logger.setApplication(name);

  app.useLogger(logger);

  await app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`);
    console.log({ trace: process.env.LOGGER_LEVEL });
  });
}

bootstrap();
