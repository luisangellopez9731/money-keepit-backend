import { MigrationInterface, QueryRunner } from "typeorm";
import { TEST_CONNECTION_DB } from "connection";

export class createTestDB1636670466258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`CREATE DATABASE IF NOT EXISTS ${TEST_CONNECTION_DB};`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
