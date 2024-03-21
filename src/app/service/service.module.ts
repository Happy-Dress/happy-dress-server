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
import { ProductColorSizeEntity } from '../repository/product/product-color-size/entity/product-color-size.entity';
import { ProductColorImageEntity } from '../repository/product/product-color-image/entity/product-color-image.entity';
import {
  IProductColorSizeImagesService,
} from './products/productColorSizeImage/productColorSizeImages.service.abstraction';
import { ProductColorSizeImagesService } from './products/productColorSizeImage/impl/productColorSizeImages.service';
import { BlogConverter } from './blog/util/converters/blog.converter';
import { BlogEntity } from '../repository/blog/blog.entity';
import { IBlogService } from './blog/blog.service.abstraction';
import { BlogService } from './blog/impl/blog.service';
import { ImageConverter } from './image/util/converters/image.converter';
import { IOrdersService } from './orders/orders.service.abstraction';
import { OrdersService } from './orders/impl/orders.service';
import { OrderConverter } from './orders/util/converters/order.converter';
import { OrderEntity } from '../repository/order/entity/order.entity';
import { OrderStatusConverter } from './orders/util/converters/order-status.converter';
import { OrderStatusEntity } from '../repository/order/order-status/entity/order-status.entity';

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
      provide: IProductColorSizeImagesService,
      useClass: ProductColorSizeImagesService,
    },
    {
      provide: IProductsService,
      useClass: ProductsService,
    },
    {
      provide: IBlogService,
      useClass: BlogService,
    },
    {
      provide: IOrdersService,
      useClass: OrdersService,
    },

    // Validators
    ImageValidator,


    // Converters
    SimpleListSettingConverter,
    CategoryConverter,
    ColorConverter,
    SizeConverter,
    ProductConverter,
    BlogConverter,
    ImageConverter,
    OrderConverter,
    OrderStatusConverter,

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
          SizeEntity, ProductEntity, ProductColorSizeEntity, ProductColorImageEntity, BlogEntity, OrderEntity, OrderStatusEntity]),
  ],
  exports: [IImageService, IUserService, IAuthenticationService, ISettingsService, IProductsService, IBlogService, IOrdersService],
})
export class ServiceModule {}
