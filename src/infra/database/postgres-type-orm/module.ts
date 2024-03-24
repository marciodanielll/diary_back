import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';

import { ISecretsAdapter, SecretsModule } from '@infra/secrets';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: ({
        POSTGRES_URL,
        NODE_ENV,
        POSTGRES_PROD,
      }: ISecretsAdapter) => {
        const isLocal = NODE_ENV === 'local';
        return {
          type: 'postgres',
          url: isLocal ? POSTGRES_URL : POSTGRES_PROD,
          timeout: 5000,
          connectTimeout: 5000,
          logging: true,
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: isLocal,
          migrationsTableName: 'migration_collection',
          entities: [path.join(__dirname, '/schemas/*.{ts}')],
          migrations: [path.join(__dirname, '/migrations/*.{ts}')],
        };
      },
      async dataSourceFactory(options: DataSourceOptions) {
        const dataSource = new DataSource(options);
        return dataSource.initialize();
      },
      imports: [SecretsModule],
      inject: [ISecretsAdapter],
    }),
  ],
})
export class PostgresDatabaseModule {}
