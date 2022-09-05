import { Module } from '@nestjs/common';
import { ControllerModule } from './app/controller/controller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DatabaseConnectionService } from './config/db/connectionSource';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useClass: DatabaseConnectionService,
        }),
        ControllerModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
