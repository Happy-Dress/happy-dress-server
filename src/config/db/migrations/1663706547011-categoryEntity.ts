import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class categories1663706547011 implements MigrationInterface {


  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
            new Table({
              name: 'category',
              columns: [
                {
                  name: 'id',
                  type: 'int4',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'description',
                  type: 'varchar',
                  isUnique: true,
                  isNullable: false,
                },
                {
                  name: 'imageUrl',
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
    await queryRunner.query('DROP TABLE category');
  }

}
