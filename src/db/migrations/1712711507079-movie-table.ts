import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovieTable1712711507079 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(`
    CREATE TABLE movie (
      id UUID NOT NULL DEFAULT uuid_generate_v4(),
      title VARCHAR(255) NOT NULL,
      director VARCHAR(255) NOT NULL,
      year_release DATE NOT NULL,
      classification VARCHAR(255) NOT NULL,
      CONSTRAINT movie_pk_id PRIMARY KEY (id)
  );

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS movie;`);
  }
}
