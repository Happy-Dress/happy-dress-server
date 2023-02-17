import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class productColorImageEntity1676481186028 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
              name: 'product-color-image',
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
                  name: 'imageUrls',
                  type: 'text',
                },
              ],
            }), false, true);

    await queryRunner.createForeignKey(
            'product-color-image',
            new TableForeignKey({
              columnNames: ['productId'],
              referencedTableName: 'product',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            })
        );

    await queryRunner.createForeignKey(
            'product-color-image',
            new TableForeignKey({
              columnNames: ['colorId'],
              referencedTableName: 'color',
              referencedColumnNames: ['id'],
              onDelete: 'SET NULL',
            })
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE product-color-image');
  }

}
