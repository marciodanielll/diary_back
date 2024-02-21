import { Module } from '@nestjs/common';

import { SecretsModule } from './secrets/module';

@Module({
  imports: [SecretsModule],
})
export class InfraModule {}
