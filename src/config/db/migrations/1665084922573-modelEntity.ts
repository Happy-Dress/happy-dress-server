import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class modelEntity1665084922573 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
            new Table({
              name: 'model',
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
    await queryRunner.query('DROP TABLE model');
  }
}
