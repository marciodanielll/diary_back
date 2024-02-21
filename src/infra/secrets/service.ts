import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ISecretsAdapter } from './adapter';
import { LogLevelTuple } from '../logger';

@Injectable()
export class SecretsService implements ISecretsAdapter {
  constructor(private readonly configService: ConfigService) {}

  PORT = Number(this.configService.get<string>('PORT'));

  LOGGER_LEVEL = this.configService.get<string>(
    'LOGGER_LEVEL',
  ) as LogLevelTuple[number];

  private readonly MONGO_DB_PORT = Number(
    this.configService.get<string>('MONGO_DB_PORT'),
  );
  private readonly MONGO_DB_HOST =
    this.configService.get<string>('MONGO_DB_HOST');
  private readonly MONGO_DB_USER = this.configService.get<string>(
    'MONGO_INITDB_ROOT_USERNAME',
  );
  private readonly MONGO_DB_PASSWORD = this.configService.get<string>(
    'MONGO_INITDB_ROOT_PASSWORD',
  );

  MONGO_URL = `mongodb://${this.MONGO_DB_USER}:${this.MONGO_DB_PASSWORD}@${this.MONGO_DB_HOST}:${this.MONGO_DB_PORT}`;
}
