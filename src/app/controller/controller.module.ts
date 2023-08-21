import { Module } from '@nestjs/common';
import { ServiceModule } from '../service/service.module';
import { ImageSecureController } from './api/secure/image/image.secure.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AuthenticationController } from './api/unsecure/authentication/authentication.controller';
import { JwtStrategy } from './security/strategy/jwt.strategy';
import { SettingsController } from './api/unsecure/settings/settings.controller';
import { ProductsController } from './api/unsecure/products/products.controller';
import { ProductsSecureController } from './api/secure/products/products.secure.controller';
import { SettingsSecureController } from './api/secure/settings/settings.secure.controller';

@Module({
  imports: [
    ServiceModule,
        NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [
    ImageSecureController,
    AuthenticationController,
    SettingsController,
    SettingsSecureController,
    ProductsController,
    ProductsSecureController,
  ],
  providers: [JwtStrategy],
})
export class ControllerModule {}
