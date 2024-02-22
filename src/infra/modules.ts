import { Module } from '@nestjs/common';

import { SecretsModule } from './secrets/module';
import { LoggerModule } from './logger/module';
import { PostgresDatabaseModule } from './database/postgres/config/module';

@Module({
  imports: [SecretsModule, LoggerModule, PostgresDatabaseModule],
})
export class InfraModule {}
