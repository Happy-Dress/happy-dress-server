import { Inject, Injectable } from '@nestjs/common';
import { IProductsService } from '../products.service.abstraction';
import { ProductDto } from '../model/product.dto';
import { ProductViewDto } from '../model/product.view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../../repository/product/entity/product.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ProductConverter } from '../util/converters/product.converter';
import { SettingType } from '../../settings/util/constant/setting.type.enum';
import { CategoryEntity } from '../../../repository/settings/category/entity/category.entity';
import { ModelEntity } from '../../../repository/settings/model/entity/model.entity';
import { MaterialEntity } from '../../../repository/settings/material/entity/material.entity';
import { ISettingsService } from '../../settings/settings.service.abstraction';
import { ProductColorSizeEntity } from '../../../repository/product-color-size/entity/product-color-size.entity';
import { ColorEntity } from '../../../repository/settings/color/entity/color.entity';
import { ProductColorSizeDto } from '../model/product-color-size.dto';
import { SizeEntity } from '../../../repository/settings/size/enitity/size.entity';
import { EntityNotFoundByIdException } from '../exception/entity-not-found-by-id.exception';


@Injectable()
export class ProductsService implements IProductsService {

  @InjectRepository(ProductEntity)
  readonly productsRepository: Repository<ProductEntity>;

  @InjectRepository(ProductColorSizeEntity)
  readonly productColorSizesRepository: Repository<ProductColorSizeEntity>;

  @Inject()
  readonly productConverter: ProductConverter;

  @Inject()
  readonly settingsService: ISettingsService;


  async createProduct(product: ProductDto): Promise<ProductViewDto> {
    const partialEntity = await this.getPartialEntity(product);
    const savedEntity = await this.productsRepository.save(partialEntity);
    const productColorSizeEntities = await this.getProductColorSizes(product.productColorSizes, savedEntity);
    savedEntity.productColorSize = await this.productColorSizesRepository.save(productColorSizeEntities);
    return this.productConverter.convertToViewDto(savedEntity);
  }

  async deleteProduct(id: number): Promise<void> {
    const deleteResult = await this.productsRepository.delete({ id: id } as FindOptionsWhere<ProductEntity>);
    if (deleteResult.affected === 0) {
      throw new EntityNotFoundByIdException(id);
    }
  }

  async getProduct(id: number): Promise<ProductViewDto> {
    const entity = await this.productsRepository.findOne({ where: { id: id } as FindOptionsWhere<ProductEntity> });
    if (entity === null) {
      throw new EntityNotFoundByIdException(id);
    }
    return this.productConverter.convertToViewDto(entity);
  }

  async updateProduct(id: number, product: ProductDto): Promise<ProductViewDto> {
    const partialEntity = await this.getPartialEntity(product);

    partialEntity.id = id;

    const savedEntity = await this.productsRepository.save(partialEntity);
    const productColorSizeEntities = await this.getProductColorSizes(product.productColorSizes, savedEntity);
    savedEntity.productColorSize = await this.productColorSizesRepository.save(productColorSizeEntities);
    return this.productConverter.convertToViewDto(savedEntity);
  }

  private async getProductColorSizes(productColorSizes: ProductColorSizeDto[], productEntity: ProductEntity): Promise<ProductColorSizeEntity[]> {
    return Promise.all(productColorSizes.map(productColorSize => this.getProductColorSize(productColorSize, productEntity)));
  }

  private async getProductColorSize(productColorSize: ProductColorSizeDto, productEntity: ProductEntity): Promise<ProductColorSizeEntity> {
    const colorEntity = await this.settingsService.getSettingEntityById<ColorEntity>(productColorSize.colorId, SettingType.COLORS);
    const sizeEntity = await this.settingsService.getSettingEntityById<SizeEntity>(productColorSize.sizeId, SettingType.SIZES);
    return {
      id: productColorSize.id,
      product: productEntity,
      color: colorEntity,
      size: sizeEntity,
      isAvailable: productColorSize.isAvailable,
    };
  }

  private async getPartialEntity(product: ProductDto): Promise<ProductEntity> {
    const categoryEntity = await this.settingsService.getSettingEntityById<CategoryEntity>(product.categoryId, SettingType.CATEGORIES);
    const modelEntity = await this.settingsService.getSettingEntityById<ModelEntity>(product.modelId, SettingType.MODELS);
    const materialEntities = await this.settingsService.getSettingEntitiesByIds<MaterialEntity>(product.materialIds, SettingType.MATERIALS);
    const partialEntity = this.productConverter.convertToPartialEntity(product);

    partialEntity.category = categoryEntity;
    partialEntity.model = modelEntity;
    partialEntity.materials = materialEntities;

    return partialEntity as ProductEntity;
  }
}
