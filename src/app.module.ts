import { Module } from '@nestjs/common';
import { InfraModule } from './infra/modules';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [InfraModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
