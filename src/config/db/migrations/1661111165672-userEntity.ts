import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class userEntity1661111165672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(
          new Table({
              name: 'user',
              columns: [
                  {
                      name: 'id',
                      type: 'int4',
                      isPrimary: true,
                      isGenerated: true,
                      generationStrategy: 'increment',
                  },
                  {
                      name: 'login',
                      type: 'varchar',
                      isUnique: true,
                      isNullable: false,
                  },
                  {
                      name: 'password',
                      type: 'varchar',
                      isNullable: false,
                  },
                  {
                      name: 'name',
                      type: 'varchar',
                      isNullable: false,
                  },
              ],
          }),
          false,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE user');
    }

}
