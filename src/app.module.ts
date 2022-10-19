import { Module } from '@nestjs/common';
import { ControllerModule } from './app/controller/controller.module';
import { CustomConfigModule } from './config/custom-config.module';
import { HealthModule } from './health.module';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    CustomConfigModule,
    ControllerModule,
    HealthModule,
    TerminusModule,
    HttpModule,
  ],
})
export class AppModule {}
