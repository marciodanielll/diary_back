import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ISecretsAdapter } from './infra/secrets';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { PORT } = app.get(ISecretsAdapter);

  await app.listen(PORT);
}

bootstrap();
