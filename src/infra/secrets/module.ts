import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SecretsService } from './service';
import { ISecretsAdapter } from './adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [{ provide: ISecretsAdapter, useClass: SecretsService }],
  exports: [ISecretsAdapter],
})
export class SecretsModule {}
