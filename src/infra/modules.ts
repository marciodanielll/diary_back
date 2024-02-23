import { Module } from '@nestjs/common';

import { SecretsModule } from './secrets/module';
import { LoggerModule } from './logger/module';
import { DatabaseModule } from './database/postgres';
import { UserModule } from '@/core/user/module';

@Module({
  imports: [SecretsModule, LoggerModule, DatabaseModule, UserModule],
})
export class InfraModule {}
