import { Module } from '@nestjs/common';
import { InfraModule } from './infra/modules';
import { CryptoModule } from './libs/crypto';
import { TokenModule } from './libs/token/module';
import { IAModule } from './libs/ia';
import { UserModule } from './modules/user/module';
import { DiaryModule } from './modules/diary/module';

@Module({
  imports: [
    InfraModule,
    UserModule,
    CryptoModule,
    TokenModule,
    IAModule,
    DiaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
