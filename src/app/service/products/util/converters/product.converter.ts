import { Inject, Injectable } from '@nestjs/common';
import { ProductViewDto } from '../../model/product.view.dto';
import { CategoryConverter } from '../../../settings/util/converters/category.converter';
import { SimpleListSettingConverter } from '../../../util/converter/simple.list.setting.converter';
import { ProductDto } from '../../model/product.dto';
import { ProductEntity } from '../../../../repository/product/entity/product.entity';
import { ProductColorSizeEntity } from '../../../../repository/product/product-color-size/entity/product-color-size.entity';
import { ProductColorSizeViewDto } from '../../model/product-color-size.view.dto';
import {
  ProductColorImageEntity,
} from '../../../../repository/product/product-color-image/entity/product-color-image.entity';
import { ProductColorImageViewDto } from '../../model/product-color-image.view.dto';
import { ProductOrderViewDto } from '../../model/product-order-view.dto';


@Injectable()
export class ProductConverter  {

  @Inject()
  readonly categoryConverter: CategoryConverter;

  @Inject()
  readonly simpleListSettingConverter: SimpleListSettingConverter;


  async convertToViewDto(productEntity: ProductEntity, productColorSizeEntities: ProductColorSizeEntity[],
    productColorImageEntities: ProductColorImageEntity[]): Promise<ProductViewDto> {

    const categoryEntity = await productEntity.category;
    const categoryDto = categoryEntity === null ? null : await this.categoryConverter.convertToDTO(categoryEntity);

    const modelEntity = await productEntity.model;
    const modelDto = modelEntity === null ? null : await this.simpleListSettingConverter.convertToDTO(modelEntity);

    const materialEntities = productEntity.materials;
    const materialDtos = materialEntities === null ? null : await this.simpleListSettingConverter.convertToDTOs(materialEntities);

    const productColorSizeDtos = productColorSizeEntities === null ? null : this.convertToProductColorSizeViewDtos(productColorSizeEntities);
    const productColorImageDtos = productColorImageEntities === null ? null : this.convertToProductColorImageViewDtos(productColorImageEntities);
    return {
      id: productEntity.id,
      name: productEntity.name,
      description: productEntity.description,
      mainImageUrl: productEntity.mainImageUrl,
      category: categoryDto,
      model: modelDto,
      materials: materialDtos,
      productColorSizes: productColorSizeDtos,
      productColorImages: productColorImageDtos,
    };
  }

  convertToProductColorSizeViewDtos(productColorSizes: ProductColorSizeEntity[]): ProductColorSizeViewDto[] {
    return productColorSizes.map(productColorSize => {
      return {
        color: productColorSize.color,
        size: productColorSize.size,
      };
    });
  }

  convertToProductColorImageViewDtos(productColorImages: ProductColorImageEntity[]): ProductColorImageViewDto[] {
    return productColorImages.map(productColorImage => {
      return {
        color: productColorImage.color,
        imageURLs: productColorImage.imageUrls,
      };
    });
  }
  
  async convertToProductOrderedViewDto(productEntity: ProductEntity, productColorImageEntity: ProductColorImageEntity, productColorSizeEntity: ProductColorSizeEntity): Promise<ProductOrderViewDto> {
    const productViewDto = await this.convertToViewDto(productEntity, [productColorSizeEntity], [productColorImageEntity]);
    const productColorImageViewDto = this.convertToProductColorImageViewDtos([productColorImageEntity])[0];
    const productColorSizeViewDto = this.convertToProductColorSizeViewDtos([productColorSizeEntity])[0];

    return {
      id: productViewDto.id,
      name: productViewDto.name,
      description: productViewDto.description,
      mainImageUrl: productColorImageViewDto.imageURLs[0],
      category: productViewDto.category,
      model: productViewDto.model,
      materials: productViewDto.materials,
      productColorSize: productColorSizeViewDto,
      productColorImage: productColorImageViewDto,
    };
  }

  convertToPartialEntity(productDto: ProductDto): Partial<ProductEntity> {
    return {
      id: productDto.id,
      name: productDto.name,
      description: productDto.description,
    };
  }


}
