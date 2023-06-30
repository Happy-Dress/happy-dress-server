import { Inject, Injectable } from '@nestjs/common';
import { ProductViewDto } from '../../../../repository/model/product.view.dto';
import { CategoryConverter } from '../../../settings/util/converters/category.converter';
import { SimpleListSettingConverter } from '../../../util/converter/simple.list.setting.converter';
import { ProductDto } from '../../../../repository/model/product.dto';
import { ProductEntity } from '../../../../repository/product/entity/product.entity';
import { ProductColorSizeEntity } from '../../../../repository/product/product-color-size/entity/product-color-size.entity';
import { ProductColorSizeViewDto } from '../../../../repository/model/product-color-size.view.dto';
import {
  ProductColorImageEntity,
} from '../../../../repository/product/product-color-image/entity/product-color-image.entity';
import { ProductColorImageViewDto } from '../../../../repository/model/product-color-image.view.dto';


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
        mainImageUrl: productColorImage.mainImageUrl,
        imageURLs: productColorImage.imageUrls,
      };
    });
  }

  convertToPartialEntity(productDto: ProductDto): Partial<ProductEntity> {
    return {
      id: productDto.id,
      name: productDto.name,
      description: productDto.description,
    };
  }


}
