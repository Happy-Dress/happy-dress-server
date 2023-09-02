import { Module } from '@nestjs/common';
import { ServiceModule } from '../service/service.module';
import { ImageSecureController } from './api/secure/image/image.secure.controller';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { AuthenticationController } from './api/unsecure/authentication/authentication.controller';
import { JwtAccessStrategy } from './security/strategy/jwt.access.strategy';
import { SettingsController } from './api/unsecure/settings/settings.controller';
import { ProductsController } from './api/unsecure/products/products.controller';
import { ProductsSecureController } from './api/secure/products/products.secure.controller';
import { SettingsSecureController } from './api/secure/settings/settings.secure.controller';
import { AuthenticationSecureController } from './api/secure/authentication/authentication.secure.controller';
import { JwtRefreshStrategy } from './security/strategy/jwt.refresh.strategy';

@Module({
  imports: [
    ServiceModule,
        NestjsFormDataModule.config({ storage: MemoryStoredFile }),
  ],
  controllers: [
    ImageSecureController,
    AuthenticationController,
    AuthenticationSecureController,  
    SettingsController,
    SettingsSecureController,
    ProductsController,
    ProductsSecureController,
  ],
  providers: [JwtAccessStrategy, JwtRefreshStrategy],
})
export class ControllerModule {}
