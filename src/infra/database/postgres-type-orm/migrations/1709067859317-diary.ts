import { MigrationInterface, QueryRunner } from 'typeorm';

export class DiaryMigration1709066395902 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "diaries" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "iv" VARCHAR(255) NOT NULL,
                "encrypted_data" TEXT NOT NULL, -- Ajuste o tipo se necessário
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                "user_id" UUID,
                CONSTRAINT "fk_user"
                    FOREIGN KEY ("user_id")
                    REFERENCES "users" ("id")
                    ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "diaries";`);
  }
}
