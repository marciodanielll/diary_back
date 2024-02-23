import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ISecretsAdapter } from './adapter';
import { LogLevelTuple } from '../logger';

@Injectable()
export class SecretsService implements ISecretsAdapter {
  constructor(private readonly configService: ConfigService) {}

  readonly PORT = Number(this.configService.get<string>('PORT'));

  readonly LOGGER_LEVEL = this.configService.get<string>(
    'LOGGER_LEVEL',
  ) as LogLevelTuple[number];

  readonly MONGO_DB_PORT = Number(
    this.configService.get<string>('MONGO_DB_PORT'),
  );

  readonly MONGO_DB_HOST = this.configService.get<string>('MONGO_DB_HOST');

  readonly MONGO_DB_USER = this.configService.get<string>(
    'MONGO_INITDB_ROOT_USERNAME',
  );

  readonly MONGO_DB_PASSWORD = this.configService.get<string>(
    'MONGO_INITDB_ROOT_PASSWORD',
  );

  readonly MONGO_URL = `mongodb://${this.MONGO_DB_USER}:${this.MONGO_DB_PASSWORD}@${this.MONGO_DB_HOST}:${this.MONGO_DB_PORT}`;

  readonly TZ = this.configService.get<string>('TZ');
  DATE_FORMAT = this.configService.get<string>('DATE_FORMAT');

  readonly POSTGRES_DB_PORT = Number(
    this.configService.get<string>('POSTGRES_DB_PORT'),
  );

  readonly POSTGRES_USER = this.configService.get<string>('POSTGRES_USER');

  readonly POSTGRES_PASSWORD =
    this.configService.get<string>('POSTGRES_PASSWORD');

  readonly POSTGRES_DB = this.configService.get<string>('POSTGRES_DB');

  readonly POSTGRES_HOST = this.configService.get<string>('POSTGRES_HOST');

  readonly NODE_ENV = this.configService.get<string>('NODE_ENV');

  readonly MONGO_PROD = this.configService.get<string>('MONGO_PROD');

  readonly POSTGRES_PROD = this.configService.get<string>('POSTGRES_PROD');

  readonly CRYPTO_SECRET = this.configService.get<string>('CRYPTO_SECRET');

  readonly CRYPTO_SALT = Number(this.configService.get<string>('CRYPTO_SALT'));
}
