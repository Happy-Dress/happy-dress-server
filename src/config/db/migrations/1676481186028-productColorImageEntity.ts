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
                  isNullable: false,
                },
                {
                  name: 'colorId',
                  type: 'int',
                  isNullable: false,  
                },
                {
                  name: 'imageUrls',
                  type: 'text',
                  isNullable: false,
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
              onDelete: 'CASCADE',
            })
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE product-color-image');
  }

}
