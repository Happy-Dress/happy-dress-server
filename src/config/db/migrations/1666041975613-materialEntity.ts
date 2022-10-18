import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class materialEntity1666041975613 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
              name: 'material',
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'name',
                  type: 'varchar',
                  isUnique: true,
                  isNullable: false,
                },
              ],
            }),
            false,
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE material');

  }

}
