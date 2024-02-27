import { jwtAlgorithms } from '@/libs/token/types';
import { LogLevelTuple } from '../logger/';
import { ChatCompletionMessageParam } from 'openai/resources';

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
  MONGO_PROD: string;
  POSTGRES_PROD: string;
  CRYPTO_SECRET: string;
  CRYPTO_SALT: number;
  JWT_SECRET: string;
  JWT_ALGORITHM: (typeof jwtAlgorithms)[number];
  JWT_EXPIRES_IN: string;
  IA_KEY: string;
  IA_MODEL: string;
  IA_MAX_TOKENS: number;
  IA_TEMPERATURE: number;
  IA_CONTEXT: string;
  IA_USER: ChatCompletionMessageParam['role'];
  IA_COMMAND: string;
  POSTGRES_URL: string;
}
