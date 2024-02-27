import { Module } from '@nestjs/common';

import { SecretsModule } from './secrets/module';
import { LoggerModule } from './logger/module';
import { PostgresDatabaseModule } from './database/postgres-type-orm/module';

@Module({
  imports: [SecretsModule, LoggerModule, PostgresDatabaseModule],
})
export class InfraModule {}
