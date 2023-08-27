import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class cascadeOnDelete1693006038639 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product-color-size', 'FK_6a7f9ff3e0d9866adf80e795990');
    await queryRunner.createForeignKey('product-color-size', new TableForeignKey({
      columnNames: ['colorId'],
      referencedTableName: 'color',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));

    await queryRunner.dropForeignKey('product-color-size', 'FK_013eba5bb3b8144532168583d7b');
    await queryRunner.createForeignKey('product-color-size', new TableForeignKey({
      columnNames: ['sizeId'],
      referencedTableName: 'size',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));

    await queryRunner.dropForeignKey('product-color-image', 'FK_b8c0463cde6526087fddb1ae1be');
    await queryRunner.createForeignKey('product-color-image', new TableForeignKey({
      columnNames: ['colorId'],
      referencedTableName: 'color',
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
    
    await queryRunner.dropForeignKey('product', 'FK_5a0c91560b6cb1641b516084a97');
    await queryRunner.createForeignKey('product', new TableForeignKey({
      columnNames: ['modelId'],
      referencedTableName: 'model',
      referencedColumnNames: ['id'],
      onDelete: 'CASCADE',
    }));
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('product-color-size', 'FK_6a7f9ff3e0d9866adf80e795990');
    await queryRunner.createForeignKey('product-color-size', new TableForeignKey({
      columnNames: ['colorId'],
      referencedTableName: 'color',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    }));

    await queryRunner.dropForeignKey('product-color-size', 'FK_013eba5bb3b8144532168583d7b');
    await queryRunner.createForeignKey('product-color-size', new TableForeignKey({
      columnNames: ['sizeId'],
      referencedTableName: 'size',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    }));

    await queryRunner.dropForeignKey('product-color-image', 'FK_b8c0463cde6526087fddb1ae1be');
    await queryRunner.createForeignKey('product-color-image', new TableForeignKey({
      columnNames: ['colorId'],
      referencedTableName: 'color',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    }));

    await queryRunner.dropForeignKey('product', 'FK_ff0c0301a95e517153df97f6812');
    await queryRunner.createForeignKey('product', new TableForeignKey({
      columnNames: ['categoryId'],
      referencedTableName: 'category',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    }));

    await queryRunner.dropForeignKey('product', 'FK_5a0c91560b6cb1641b516084a97');
    await queryRunner.createForeignKey('product', new TableForeignKey({
      columnNames: ['modelId'],
      referencedTableName: 'model',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
    }));
  }

}
