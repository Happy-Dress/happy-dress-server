import { Module } from '@nestjs/common';
import { ServiceModule } from '../service/service.module';
import { ImageController } from './api/image/image.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AuthenticationController } from './api/authentication/authentication.controller';
import { JwtStrategy } from './security/strategy/jwt.strategy';
import { SettingsController } from './api/settings/settings.controller';

@Module({
  imports: [
    ServiceModule,
        NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [
    ImageController,
    AuthenticationController,
    SettingsController,
  ],
  providers: [JwtStrategy],
})
export class ControllerModule {}
