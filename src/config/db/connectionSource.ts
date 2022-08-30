import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const connectionSource: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'user',
    password: 'password',
    database: 'happy-dress-dev',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/config/db/migrations/**/*{.ts,.js}'],
    synchronize: false,
    migrationsTableName: 'migrations_typeorm',
    migrationsRun: true,
};
