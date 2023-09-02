import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateColorEntity1676447022988 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        'ALTER TABLE color ADD UNIQUE (name)'
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE color');
  }

}
