import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';
import { ISecretsAdapter, SecretsModule } from '@/infra/secrets';

const pathEntities = `${path.resolve(__dirname, 'schemas')}/*.{ts}`;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: ({
        POSTGRES_URL,
        NODE_ENV,
        POSTGRES_PROD,
      }: ISecretsAdapter) => {
        console.log(POSTGRES_URL);
        const isLocal = NODE_ENV === 'local';
        return {
          type: 'postgres',
          url: isLocal ? POSTGRES_URL : POSTGRES_PROD,
          timeout: 5000,
          connectTimeout: 5000,
          logging: isLocal,
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: isLocal,
          migrationsTableName: 'migration_collection',
          entities: [pathEntities],
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
