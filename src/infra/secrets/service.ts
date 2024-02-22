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

  readonly MONGO_URL = `mongodb://${this.MONGO_DB_USER}:${this.MONGO_DB_PASSWORD}@${this.MONGO_DB_HOST}:${this.MONGO_DB_PORT}`;

  readonly TZ = this.configService.get<string>('TZ');
  DATE_FORMAT = this.configService.get<string>('DATE_FORMAT');

  private readonly POSTGRES_DB_PORT = Number(
    this.configService.get<string>('POSTGRES_DB_PORT'),
  );

  private readonly POSTGRES_USER =
    this.configService.get<string>('POSTGRES_USER');

  private readonly POSTGRES_PASSWORD =
    this.configService.get<string>('POSTGRES_PASSWORD');

  private readonly POSTGRES_DB = this.configService.get<string>('POSTGRES_DB');

  private readonly POSTGRES_HOST =
    this.configService.get<string>('POSTGRES_HOST');

  readonly POSTGRES_URL = `postgres://${this.POSTGRES_USER}:${this.POSTGRES_PASSWORD}@${this.POSTGRES_HOST}:${this.POSTGRES_DB_PORT}/${this.POSTGRES_DB}`;

  readonly NODE_ENV = this.configService.get<string>('NODE_ENV');
}
