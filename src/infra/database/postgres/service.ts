import { ILoggerAdapter } from '@/infra/logger';
import { ISecretsAdapter } from '@/infra/secrets';
import { Injectable } from '@nestjs/common';
import { Pool, QueryResultRow } from 'pg';
import { IDatabaseService } from './adapter';

@Injectable()
export class DatabaseService implements IDatabaseService {
  private static instance: DatabaseService | null = null;
  private pool: Pool;
  private logger: ILoggerAdapter;
  private secretsService: ISecretsAdapter;
  private context = DatabaseService.name;

  constructor(logger: ILoggerAdapter, secretsService: ISecretsAdapter) {
    if (!DatabaseService.instance) {
      this.logger = logger;
      this.secretsService = secretsService;

      this.pool = new Pool({
        user: this.secretsService.POSTGRES_USER,
        host: this.secretsService.POSTGRES_HOST,
        database: this.secretsService.POSTGRES_DB,
        password: this.secretsService.POSTGRES_PASSWORD,
        port: this.secretsService.POSTGRES_DB_PORT,
      });

      this.logger.info({
        message: 'Connect with success in postgres',
      });

      DatabaseService.instance = this;
    } else {
      return DatabaseService.instance;
    }
  }

  async onModuleInit() {
    try {
      await this.pool.connect();
    } catch (err) {
      this.logger.error(err, 'Error to connect in postgres');
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
    this.logger.info({
      message: 'Disconnect with success in postgres',
      context: this.context,
    });
  }

  async query<T>(
    text: string,
    params?: unknown[],
  ): Promise<T & QueryResultRow> {
    const client = await this.pool.connect();
    try {
      const result = await client.query<T & QueryResultRow>(text, params);
      return result as unknown as T & QueryResultRow;
    } finally {
      client.release();
    }
  }
}
