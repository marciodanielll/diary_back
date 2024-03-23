import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedAtInDiaries1709082105104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
  ALTER TABLE diaries
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW();
    `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE diaries
      DROP COLUMN created_at;
    `);
  }
}
