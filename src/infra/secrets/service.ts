import { jwtAlgorithms } from './../../libs/token/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ISecretsAdapter } from './adapter';
import { LogLevelTuple } from '../logger';
import { ChatCompletionMessageParam } from 'openai/resources';
import { encodingsTuple } from '@/libs/crypto/types';

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

  readonly MONGO_DB_HOST = this.configService.get<string>(
    'MONGO_DB_HOST',
  ) as string;

  readonly MONGO_DB_USER = this.configService.get<string>(
    'MONGO_INITDB_ROOT_USERNAME',
  ) as string;

  readonly MONGO_DB_PASSWORD = this.configService.get<string>(
    'MONGO_INITDB_ROOT_PASSWORD',
  ) as string;

  readonly MONGO_URL = `mongodb://${this.MONGO_DB_USER}:${this.MONGO_DB_PASSWORD}@${this.MONGO_DB_HOST}:${this.MONGO_DB_PORT}`;

  readonly TZ = this.configService.get<string>('TZ') as string;

  DATE_FORMAT = this.configService.get<string>('DATE_FORMAT') as string;

  readonly POSTGRES_DB_PORT = Number(
    this.configService.get<string>('POSTGRES_DB_PORT') as string,
  );

  readonly POSTGRES_USER = this.configService.get<string>(
    'POSTGRES_USER',
  ) as string;

  readonly POSTGRES_PASSWORD = this.configService.get<string>(
    'POSTGRES_PASSWORD',
  ) as string;

  readonly POSTGRES_DB = this.configService.get<string>(
    'POSTGRES_DB',
  ) as string;

  readonly POSTGRES_HOST = this.configService.get<string>(
    'POSTGRES_HOST',
  ) as string;

  readonly POSTGRES_URL = `postgres://${this.POSTGRES_USER}:${this.POSTGRES_PASSWORD}@${this.POSTGRES_HOST}:${this.POSTGRES_DB_PORT}/${this.POSTGRES_DB}`;

  readonly NODE_ENV = this.configService.get<string>('NODE_ENV') as string;

  readonly MONGO_PROD = this.configService.get<string>('MONGO_PROD') as string;

  readonly POSTGRES_PROD = this.configService.get<string>(
    'POSTGRES_PROD',
  ) as string;

  readonly CRYPTO_SECRET = this.configService.get<string>(
    'CRYPTO_SECRET',
  ) as string;

  readonly CRYPTO_SALT = Number(
    this.configService.get<string>('CRYPTO_SALT'),
  ) as number;

  readonly JWT_SECRET = this.configService.get<string>('JWT_SECRET') as string;

  readonly JWT_ALGORITHM = this.configService.get<string>(
    'JWT_ALGORITHM',
  ) as (typeof jwtAlgorithms)[number];

  readonly JWT_EXPIRES_IN = this.configService.get<string>(
    'JWT_EXPIRES_IN',
  ) as string;

  readonly IA_KEY = this.configService.get<string>('IA_KEY') as string;

  readonly IA_MODEL = this.configService.get<string>('IA_MODEL') as string;

  readonly IA_MAX_TOKENS = Number(
    this.configService.get<string>('IA_MAX_TOKENS') as string,
  );

  readonly IA_TEMPERATURE = Number(
    this.configService.get<string>('IA_TEMPERATURE') as string,
  );

  readonly IA_CONTEXT = this.configService.get<string>('IA_CONTEXT') as string;

  readonly IA_USER = this.configService.get<string>(
    'IA_USER',
  ) as ChatCompletionMessageParam['role'];

  readonly IA_COMMAND = this.configService.get<string>('IA_COMMAND') as string;

  readonly CRYPTO_CIPHER = this.configService.get<string>(
    'CRYPTO_CIPHER',
  ) as string;

  readonly CRYPTO_ENCODING = this.configService.get<string>(
    'CRYPTO_ENCODING',
  ) as (typeof encodingsTuple)[number];
}
