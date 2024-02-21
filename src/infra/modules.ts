import { Module } from '@nestjs/common';

import { SecretsModule } from './secrets/module';
import { LoggerModule } from './logger/module';

@Module({
  imports: [SecretsModule, LoggerModule],
})
export class InfraModule {}
