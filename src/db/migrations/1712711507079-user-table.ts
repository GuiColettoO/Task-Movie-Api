import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1712711507079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
    CREATE TABLE "user" (
      id UUID NOT NULL DEFAULT uuid_generate_v4(),
      username VARCHAR(255) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      CONSTRAINT user_pk_id PRIMARY KEY (id),
      CONSTRAINT user_uq_username UNIQUE (username)
  );

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS user;`);
  }
}
