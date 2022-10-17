import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class colorEntity1666042022821 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
              name: 'color',
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'firstColor',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: false,
                },
                {
                  name: 'secondColor',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: true,
                }, 
              ],
            }),
            false,
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE color');

  }

}
