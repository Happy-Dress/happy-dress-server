import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class updateProductEntity1693088518917 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product', 'FK_5a0c91560b6cb1641b516084a97');
    await queryRunner.createForeignKey('product', new TableForeignKey({
      columnNames: ['modelId'],
      referencedTableName: 'model',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));

    await queryRunner.dropForeignKey('product', 'FK_ff0c0301a95e517153df97f6812');
    await queryRunner.createForeignKey('product', new TableForeignKey({
      columnNames: ['categoryId'],
      referencedTableName: 'category',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));

    await queryRunner.query('ALTER TABLE `product` MODIFY COLUMN `categoryId` INT NOT NULL');

    await queryRunner.query('ALTER TABLE `product` MODIFY COLUMN `modelId` INT NOT NULL');


  }

  public down(queryRunner: QueryRunner): Promise<void> {
    return null;
  }

}
