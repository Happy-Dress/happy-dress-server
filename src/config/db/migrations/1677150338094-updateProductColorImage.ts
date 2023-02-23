import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateProductColorImages1677150338094 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
          'ALTER TABLE `product-color-image` ADD mainImageUrl varchar(255)',
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `product-color-image`');
  }

}
