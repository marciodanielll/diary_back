import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeletedAtInDiaries1709082105104 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  ALTER TABLE diaries
  ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
  ALTER TABLE diaries
  DROP COLUMN deleted_at;
    `,
    );
  }
}
