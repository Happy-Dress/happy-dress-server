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
import { CategoryEntity } from '../repository/settings/category/entity/category.entity';
import { SimpleListSettingConverter } from './settings/util/simpleListSetting.converter';
import { ModelEntity } from '../repository/settings/model/entity/model.entity';
import { CategoryConverter } from './settings/util/category.converter';
import { ColorConverter } from './settings/util/color.converter';
import { MaterialEntity } from '../repository/settings/material/entity/material.entity';
import { ColorEntity } from '../repository/settings/color/entity/color.entity';
import { ImageUrlConverter } from './image/util/imageUrl.converter';

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
    ImageUrlConverter,
    SimpleListSettingConverter,
    CategoryConverter,
    ColorConverter,
  ],
  imports: [
    ClientModule,
        TypeOrmModule.forFeature([UserEntity, CategoryEntity, ModelEntity, MaterialEntity, ColorEntity]),
  ],
  exports: [IImageService, IUserService, IAuthenticationService, ISettingsService],
})
export class ServiceModule {}
