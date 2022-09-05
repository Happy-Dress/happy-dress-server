import { Module } from '@nestjs/common';
import { ControllerModule } from './app/controller/controller.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DatabaseConnectionService } from './config/db/connectionSource';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigModule } from './config/custom-config.module';

@Module({
  imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          useClass: DatabaseConnectionService,
        }),
        CustomConfigModule,
        ControllerModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
