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
import { IProductsService } from './products/products.service.abstraction';
import { ProductsService } from './products/impl/products.service';
import { ProductConverter } from './products/util/converters/product.converter';
import { ProductEntity } from '../repository/product/entity/product.entity';
import { SizesCrudService } from './settings/crud/sizes.crud.service';
import { SizeConverter } from './settings/util/converters/size.converter';
import { SizeEntity } from '../repository/settings/size/enitity/size.entity';

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
      provide: IProductsService,
      useClass: ProductsService,
    },

    // Validators
    ImageValidator,


    // Converters
    ImageUrlConverter,
    SimpleListSettingConverter,
    CategoryConverter,
    ColorConverter,
    ProductConverter,
    SizeConverter,

    // Crud services
    MaterialsCrudService,
    ColorsCrudService,
    ModelsCrudService,
    CategoriesCrudService,
    SizesCrudService,
  ],
  imports: [
    ClientModule,
        TypeOrmModule.forFeature([UserEntity, CategoryEntity, ModelEntity, MaterialEntity, ColorEntity,
          SizeEntity, ProductEntity]),
  ],
  exports: [IImageService, IUserService, IAuthenticationService, ISettingsService, IProductsService],
})
export class ServiceModule {}
