import { Module } from '@nestjs/common';
import { InfraModule } from './infra/modules';
import { CryptoModule } from './libs/crypto';
import { TokenModule } from './libs/token/module';
import { IAModule } from './libs/ia';
import { UserModule } from './modules/user/module';

@Module({
  imports: [InfraModule, UserModule, CryptoModule, TokenModule, IAModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
