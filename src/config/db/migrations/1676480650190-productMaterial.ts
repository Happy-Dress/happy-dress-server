import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class productMaterial1676480650190 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
            new Table({
              name: 'product-material',
              columns: [
                {
                  name: 'productId',
                  type: 'int',
                  isNullable: false,
                },
                {
                  name: 'materialId',
                  type: 'int',
                  isNullable: false,
                },
              ],
            }), false, true);

    await queryRunner.createForeignKey(
            'product-material',
            new TableForeignKey({
              columnNames: ['productId'],
              referencedTableName: 'product',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            })
        );

    await queryRunner.createForeignKey(
            'product-material',
            new TableForeignKey({
              columnNames: ['materialId'],
              referencedTableName: 'material',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            })
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE product-material');
  }

}
