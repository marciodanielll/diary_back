import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { InfraModule } from './infra/modules';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
