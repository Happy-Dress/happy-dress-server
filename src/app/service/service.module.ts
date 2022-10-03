import { Module } from '@nestjs/common';
import { ClientModule } from '../client/client.module';
import { IImageService } from './image/image.service.abstraction';
import { ImageService } from './image/impl/image.service';
import { ImageValidator } from './image/validator/image.validator';
import { IAuthenticationService } from './authentication/authentication.service.abstraction';
import { AuthenticationService } from './authentication/impl/authentication.service';
import { IUserService } from './user/user.service.abstraction';
import { UserService } from './user/impl/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../repository/user/entity/user.entity';
import { ISettingsService } from './settings/settings.service.abstraction';
import { SettingsService } from './settings/impl/settings.service';
import { CategoryEntity } from '../repository/category/entity/category.entity';
import { SimpleListSettingConverter } from './settings/util/simpleListSetting.converter';

@Module({
  providers: [
    {
      provide: IImageService,
      useClass: ImageService,
    },
    {
      provide: IAuthenticationService,
      useClass: AuthenticationService,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },
    {
      provide: ISettingsService,
      useClass: SettingsService,
    },
    ImageValidator,
    SimpleListSettingConverter,
  ],
  imports: [
    ClientModule,
        TypeOrmModule.forFeature([UserEntity, CategoryEntity]),
  ],
  exports: [IImageService, IUserService, IAuthenticationService, ISettingsService],
})
export class ServiceModule {}
