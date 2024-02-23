import { IDatabaseService } from '@/infra/database/postgres';
import { QueryResultRow } from 'pg';

export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  role: string;
  is_activated: boolean;
};

export class UserRepository {
  private databaseService: IDatabaseService;
  constructor(databaseService: IDatabaseService) {
    this.databaseService = databaseService;
  }

  async findById(id: string): Promise<User> {
    const result = await this.databaseService.query<User & QueryResultRow>(
      `SELECT * FROM users WHERE id = $1`,
      [id],
    );

    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.databaseService.query<QueryResultRow>(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );

    return result.rows[0];
  }

  async findAll(): Promise<User[]> {
    const result = await this.databaseService.query<User & QueryResultRow>(
      `SELECT * FROM users`,
    );

    return result.rows;
  }

  async create(user: User): Promise<User> {
    const result = await this.databaseService.query<User & QueryResultRow>(
      `INSERT INTO users ( name, email, password, created_at, updated_at, is_activated, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        user.name,
        user.email,
        user.password,
        user.created_at,
        user.updated_at,
        user.is_activated,
        user.role,
      ],
    );
    return result.rows[0];
  }
}
