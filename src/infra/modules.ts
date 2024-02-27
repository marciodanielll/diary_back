import { Module } from '@nestjs/common';

import { SecretsModule } from './secrets/module';
import { LoggerModule } from './logger/module';
import { DatabaseModule } from './database/postgres';
import { PostgresDatabaseModule } from './database/postgres-type-orm/module';

@Module({
  imports: [
    SecretsModule,
    LoggerModule,
    DatabaseModule,
    PostgresDatabaseModule,
  ],
})
export class InfraModule {}
