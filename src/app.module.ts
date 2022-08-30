import { Module } from '@nestjs/common';
import { ControllerModule } from './app/controller/controller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { connectionSource } from './config/db/connectionSource';

@Module({
    imports: [
        TypeOrmModule.forRoot(connectionSource),
        ControllerModule,
    ],
})
export class AppModule {
    constructor(private dataSource: DataSource) {}
}
