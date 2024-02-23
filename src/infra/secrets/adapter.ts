import { LogLevelTuple } from '../logger/';

export abstract class ISecretsAdapter {
  PORT: number;
  LOGGER_LEVEL: LogLevelTuple[number];
  MONGO_DB_PORT: number;
  MONGO_DB_HOST: string;
  MONGO_DB_USER: string;
  MONGO_DB_PASSWORD: string;
  MONGO_URL: string;
  TZ: string;
  DATE_FORMAT: string;
  POSTGRES_DB_PORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_HOST: string;
  NODE_ENV: string;
}
