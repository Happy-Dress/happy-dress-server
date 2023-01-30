import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class goods1675033129777 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
              name: 'goods',
              columns: [
                {
                  name: 'goodName',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: false,
                },
              ],
            }),
            false,
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE goods');
  }

}
