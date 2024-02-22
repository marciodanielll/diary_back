import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustUser1708615007480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "isActive" TO "is_active"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "is_active" TO "isActive"`,
    );
  }
}
