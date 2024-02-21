import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ISecretsAdapter } from './infra/secrets/';
import { ILoggerAdapter } from './infra/logger';
import { name } from '../package.json';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
    cors: true,
  });

  const { PORT } = app.get(ISecretsAdapter);

  const logger = app.get(ILoggerAdapter);
  logger.setApplication(name);
  app.useLogger(logger);

  const configSwagger = new DocumentBuilder()
    .setTitle(name)
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
