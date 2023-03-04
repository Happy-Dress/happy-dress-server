import { ProductColorSizeDto } from '../model/product-color-size.dto';
import { ProductEntity } from '../../../repository/product/entity/product.entity';
import { ProductColorSizeEntity } from '../../../repository/product/product-color-size/entity/product-color-size.entity';
import { ProductColorImageDto } from '../model/product-color-image.dto';
import {
  ProductColorImageEntity,
} from '../../../repository/product/product-color-image/entity/product-color-image.entity';

export abstract class IProductColorSizeImagesService {
  abstract getProductColorSizes(productColorSizes: ProductColorSizeDto[],
    productEntity: ProductEntity): Promise<ProductColorSizeEntity[]>;
  
  abstract getProductColorImages(productColorImages: ProductColorImageDto[],
    productEntity: ProductEntity): Promise<ProductColorImageEntity[]>;
}