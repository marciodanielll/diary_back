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
}
