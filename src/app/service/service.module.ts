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
import { SimpleListSettingConverter } from './util/converter/simple.list.setting.converter';
import { ModelEntity } from '../repository/settings/model/entity/model.entity';
import { CategoryConverter } from './settings/util/converters/category.converter';
import { ColorConverter } from './settings/util/converters/color.converter';
import { MaterialEntity } from '../repository/settings/material/entity/material.entity';
import { ColorEntity } from '../repository/settings/color/entity/color.entity';
import { ImageUrlConverter } from './image/util/imageUrl.converter';
import { MaterialsCrudService } from './settings/crud/materials.crud.service';
import { ColorsCrudService } from './settings/crud/colors.crud.service';
import { ModelsCrudService } from './settings/crud/models.crud.service';
import { CategoriesCrudService } from './settings/crud/categories.crud.service';

@Module({
  // Delegates
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

    // Validators
    ImageValidator,


    // Converters
    ImageUrlConverter,
    SimpleListSettingConverter,
    CategoryConverter,
    ColorConverter,

    // Crud services
    MaterialsCrudService,
    ColorsCrudService,
    ModelsCrudService,
    CategoriesCrudService,
  ],
  imports: [
    ClientModule,
        TypeOrmModule.forFeature([UserEntity, CategoryEntity, ModelEntity, MaterialEntity, ColorEntity]),
  ],
  exports: [IImageService, IUserService, IAuthenticationService, ISettingsService],
})
export class ServiceModule {}
