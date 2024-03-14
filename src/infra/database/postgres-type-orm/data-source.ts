import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import dotenv from 'dotenv';

dotenv.config();

export const generatePostgresUrl = (): string => {
  if (process.env.NODE_ENV === 'local') {
    const user = process.env.POSTGRES_USER;
    const password = process.env.POSTGRES_PASSWORD;
    const host = process.env.POSTGRES_HOST;
    const port = process.env.POSTGRES_DB_PORT;
    const database = process.env.POSTGRES_DB;

    return `postgres://${user}:${password}@${host}:${port}/${database}`;
  }

  return process.env.POSTGRES_PROD!;
};

const dataSource = new DataSource({
  type: 'postgres',
  url: generatePostgresUrl(),
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: false,
  migrationsTableName: 'migration_collection',
  entities: ['./src/infra/database/postgres-type-orm/schemas/*.ts'],
  migrations: ['./src/infra/database/postgres-type-orm/migrations/*.ts'],
});

export default dataSource;
