import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ISecretsAdapter, SecretsModule } from '@/infra/secrets';

import { PostgresService } from './service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: ({ POSTGRES_URL }: ISecretsAdapter) => {
        const conn = new PostgresService().getConnection({ URI: POSTGRES_URL });
        return {
          ...conn,
          timeout: 5000,
          connectTimeout: 5000,
          logging: true,
          namingStrategy: new SnakeNamingStrategy(),
          autoLoadEntities: true,
          synchronize: true,
          migrationsTableName: 'migration_collection',
          migrations: ['@/infra/database/postgres/migrations/*.ts'],
          entities: ['@/infra/database/postgres/entities/*.ts'],
        };
      },
      async dataSourceFactory(options) {
        return new DataSource(options);
      },
      imports: [SecretsModule],
      inject: [ISecretsAdapter],
    }),
  ],
})
export class PostgresDatabaseModule {}
