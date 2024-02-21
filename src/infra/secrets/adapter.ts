import { LogLevelTuple } from '../logger/';

export abstract class ISecretsAdapter {
  PORT: number;
  LOGGER_LEVEL: LogLevelTuple[number];
}
