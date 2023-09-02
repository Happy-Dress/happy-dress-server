import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class blogEntity1687892209249 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
            new Table({
              name: 'blog',
              columns: [
                {
                  name: 'id',
                  type: 'int4',
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
                  name: 'shortDescription',
                  type: 'varchar',
                  isUnique: false,
                  isNullable: false,
                },
                {
                  name: 'isPublished',
                  type: 'boolean',
                  isUnique: false,
                  isNullable: false,
                },
                {
                  name: 'htmlLinkBlog',
                  type: 'varchar',
                  isNullable: false,
                },
              ],
            }),
            false,
        );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE blog');
  }
}
