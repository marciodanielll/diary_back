import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from 'dotenv';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/infra/database/postgres/schemas/*{.ts,.js}'],
  migrations: ['src/infra/database/postgres/migrations/*{.ts,.js}'],
});

export default dataSource;
