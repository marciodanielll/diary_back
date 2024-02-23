import { Module } from '@nestjs/common';
import { InfraModule } from './infra/modules';
import { HealthModule } from './modules/health/health.module';
import { CryptoModule } from './libs/crypto';
import { TokenModule } from './libs/token/module';

@Module({
  imports: [InfraModule, HealthModule, CryptoModule, TokenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
