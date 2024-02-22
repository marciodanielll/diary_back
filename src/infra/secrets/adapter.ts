import { LogLevelTuple } from '../logger/';

export abstract class ISecretsAdapter {
  PORT: number;
  LOGGER_LEVEL: LogLevelTuple[number];
  MONGO_URL: string;
  TZ: string;
  DATE_FORMAT: string;
  POSTGRES_URL: string;
  NODE_ENV: string;
}
