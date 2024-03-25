import { AppExceptionFilter } from './utils/filters/http-exception.filter';
import { ExceptionInterceptor } from './utils/interceptors/http-exception.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ISecretsAdapter } from './infra/secrets/';
import { ILoggerAdapter } from './infra/logger';
import { name } from '../package.json';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import express from 'express';

(async () => {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
    logger: ['error'],
  });

  app.use(express.json());

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  const { PORT, NODE_ENV } = app.get(ISecretsAdapter);

  const logger = app.get(ILoggerAdapter);
  logger.setApplication(name);
  app.useLogger(logger);

  app.useGlobalInterceptors(new ExceptionInterceptor());

  app.useGlobalFilters(new AppExceptionFilter(logger));

  const configSwagger = new DocumentBuilder()
    .setTitle(name)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: {
      security: [{ bearer: [] }],
    },
  });

  await app.listen(PORT, () => {
    logger.log(`Server is running on port ${PORT}`);
    if (NODE_ENV === 'local') {
      logger.log(`Swagger is running http://localhost:${PORT}/doc`);
    }
  });
})();
