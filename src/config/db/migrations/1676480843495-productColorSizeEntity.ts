import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class productColorSizeEntity1676480843495 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
              name: 'product-color-size',
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'productId',
                  type: 'int',
                },
                {
                  name: 'colorId',
                  type: 'int',
                  isNullable: true,
                },
                {
                  name: 'sizeId',
                  type: 'int',
                  isNullable: true,
                },
              ],
            }), false, true);

    await queryRunner.createForeignKey(
            'product-color-size',
            new TableForeignKey({
              columnNames: ['productId'],
              referencedTableName: 'product',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            })
        );

    await queryRunner.createForeignKey(
            'product-color-size',
            new TableForeignKey({
              columnNames: ['colorId'],
              referencedTableName: 'color',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL',
            })
        );
    await queryRunner.createForeignKey(
          'product-color-size',
          new TableForeignKey({
            columnNames: ['sizeId'],
            referencedTableName: 'size',
            referencedColumnNames: ['id'],
            onDelete: 'SET NULL',
          })
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE product-color-size');
  }

}
