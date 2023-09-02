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
                  isNullable: false,
                },
                {
                  name: 'colorId',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'sizeId',
                  type: 'int',
                  isNullable: false,
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
              onDelete: 'CASCADE',
            })
        );
    await queryRunner.createForeignKey(
          'product-color-size',
          new TableForeignKey({
            columnNames: ['sizeId'],
            referencedTableName: 'size',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          })
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE product-color-size');
  }

}
