import { SecretsService } from '../../secrets/service';
import { ConfigService } from '@nestjs/config';

import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const secrets = new SecretsService(new ConfigService());

const dataSource = new DataSource({
  type: 'postgres',
  url: secrets.POSTGRES_URL,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  migrationsTableName: 'migration_collection',
  entities: ['./src/infra/database/postgres-type-orm/schemas/*.ts'],
  migrations: ['./src/infra/database/postgres-type-orm/migrations/*.ts'],
});

export default dataSource;
