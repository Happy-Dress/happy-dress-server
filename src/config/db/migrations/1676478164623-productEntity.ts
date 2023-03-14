import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class productEntity1676478164623 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
              name: 'product',
              columns: [
                {
                  name: 'id',
                  type: 'int',
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
                {
                  name: 'description',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: false,
                },
                {
                  name: 'mainImageUrl',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: false,
                },
                {
                  name: 'categoryId',
                  type: 'int',
                  isNullable: true,
                },
                {
                  name: 'modelId',
                  type: 'int',
                  isNullable: true,
                },
              ],
            }), false, true);

    await queryRunner.createForeignKey(
            'product',
            new TableForeignKey({
              columnNames: ['categoryId'],
              referencedTableName: 'category',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL',
            })
        );

    await queryRunner.createForeignKey(
            'product',
            new TableForeignKey({
              columnNames: ['modelId'],
              referencedTableName: 'model',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL',
            })
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE product');
  }

}
