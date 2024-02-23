import { Module } from '@nestjs/common';
import { InfraModule } from './infra/modules';
import { HealthModule } from './modules/health/health.module';
import { CryptoModule } from './libs/crypto';

@Module({
  imports: [InfraModule, HealthModule, CryptoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
