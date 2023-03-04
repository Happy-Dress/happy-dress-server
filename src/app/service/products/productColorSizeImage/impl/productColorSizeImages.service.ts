import { Inject, Injectable } from '@nestjs/common';
import { IProductColorSizeImagesService } from '../productColorSizeImages.service.abstraction';
import { ProductColorSizeDto } from '../../model/product-color-size.dto';
import { ProductEntity } from '../../../../repository/product/entity/product.entity';
import {
  ProductColorSizeEntity,
} from '../../../../repository/product/product-color-size/entity/product-color-size.entity';
import { ColorEntity } from '../../../../repository/settings/color/entity/color.entity';
import { SettingType } from '../../../settings/util/constant/setting.type.enum';
import { SizeEntity } from '../../../../repository/settings/size/enitity/size.entity';
import { ProductColorImageDto } from '../../model/product-color-image.dto';
import {
  ProductColorImageEntity,
} from '../../../../repository/product/product-color-image/entity/product-color-image.entity';
import { ISettingsService } from '../../../settings/settings.service.abstraction';

@Injectable()
export class ProductColorSizeImagesService implements IProductColorSizeImagesService {

  @Inject()
  readonly settingsService: ISettingsService;
  
  public async getProductColorSizes(productColorSizes: ProductColorSizeDto[],
    productEntity: ProductEntity): Promise<ProductColorSizeEntity[]> {
    const colorIds = new Set(productColorSizes.map(productColorSize => productColorSize.colorId));
    const sizeIds = new Set(productColorSizes.map(productColorSize => productColorSize.sizeId));

    const colorEntities = await this.settingsService.getSettingEntitiesByIds<ColorEntity>(colorIds, SettingType.COLORS);
    const sizeEntities = await this.settingsService.getSettingEntitiesByIds<SizeEntity>(sizeIds, SettingType.SIZES);

    const colorsMap = new Map<number, ColorEntity>(colorEntities.map(colorEntity => [colorEntity.id, colorEntity]));
    const sizesMap = new Map<number, SizeEntity>(sizeEntities.map(sizeEntity => [sizeEntity.id, sizeEntity]));
    return productColorSizes.map(productColorSize => {
      return {
        id: null,
        product: productEntity,
        color: colorsMap.get(productColorSize.colorId),
        size: sizesMap.get(productColorSize.sizeId),
      };
    });
  }

  public async getProductColorImages(productColorImages: ProductColorImageDto[],
    productEntity: ProductEntity): Promise<ProductColorImageEntity[]> {
    const colorIds = new Set(productColorImages.map(productColorImage => productColorImage.colorId));
    const colorEntities = await this.settingsService.getSettingEntitiesByIds<ColorEntity>(colorIds, SettingType.COLORS);
    const colorsMap = new Map<number, ColorEntity>(colorEntities.map(colorEntity => [colorEntity.id, colorEntity]));
    return productColorImages.map(productColorImage => {
      return {
        id: null,
        product: productEntity,
        color: colorsMap.get(productColorImage.colorId),
        mainImageUrl: productColorImage.mainImageUrl,
        imageUrls: productColorImage.imageURLs,
      };
    });
  }
}