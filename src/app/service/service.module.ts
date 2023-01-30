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
import { IGoodsService } from './goods/goods.service.abstraction';
import { GoodsService } from './goods/impl/goods.service';
import { GoodConverter } from './goods/util/converters/good.converter.service';
import { GoodsCrudService } from './goods/crud/goods.crud.service';
import { GoodEntity } from '../repository/goods/entity/good.entity';

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
    {
      provide: IGoodsService,
      useClass: GoodsService,
    },

    // Validators
    ImageValidator,


    // Converters
    ImageUrlConverter,
    SimpleListSettingConverter,
    CategoryConverter,
    ColorConverter,
    GoodConverter,

    // Crud services
    MaterialsCrudService,
    ColorsCrudService,
    ModelsCrudService,
    CategoriesCrudService,
    GoodsCrudService,
  ],
  imports: [
    ClientModule,
        TypeOrmModule.forFeature([UserEntity, CategoryEntity, ModelEntity, MaterialEntity, ColorEntity, GoodEntity]),
  ],
  exports: [IImageService, IUserService, IAuthenticationService, ISettingsService, IGoodsService],
})
export class ServiceModule {}
