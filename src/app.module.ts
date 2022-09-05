import { Module } from '@nestjs/common';
import { ControllerModule } from './app/controller/controller.module';
import { CustomConfigModule } from './config/custom-config.module';

@Module({
  imports: [
    CustomConfigModule,
    ControllerModule,
  ],
})
export class AppModule {}
