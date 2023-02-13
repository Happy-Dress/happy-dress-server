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
import { ProductColorSizeEntity } from '../../../repository/product/product-color-size/entity/product-color-size.entity';
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
    const partialProductEntity = await this.getPartialEntity(product);
    const savedProductEntity = await this.productsRepository.save(partialProductEntity);

    const productColorSizeEntities = await this.getProductColorSizes(product.productColorSizes, savedProductEntity);
    const savedProductColorSizeEntities = await this.productColorSizesRepository.save(productColorSizeEntities);

    return this.productConverter.convertToViewDto(savedProductEntity, savedProductColorSizeEntities);
  }

  async deleteProduct(id: number): Promise<void> {
    const deleteResult = await this.productsRepository.delete({ id: id } as FindOptionsWhere<ProductEntity>);
    if (deleteResult.affected === 0) {
      throw new EntityNotFoundByIdException(id);
    }
    await this.productColorSizesRepository.delete({ product: {
      id: id,
    } } as FindOptionsWhere<ProductColorSizeEntity>);
  }

  async getProduct(id: number): Promise<ProductViewDto> {
    const productEntity = await this.findProductById(id);
    if (productEntity === null) {
      throw new EntityNotFoundByIdException(id);
    }
    const productColorSizeEntities = await this.productColorSizesRepository.findBy({ product: {
      id: id,
    } } as FindOptionsWhere<ProductColorSizeEntity>);
    return this.productConverter.convertToViewDto(productEntity, productColorSizeEntities);
  }

  async updateProduct(id: number, product: ProductDto): Promise<ProductViewDto> {
    const partialProductEntity = await this.getPartialEntity(product);
    if (await this.findProductById(id) === null) {
      throw new EntityNotFoundByIdException(id);
    }

    partialProductEntity.id = id;

    const savedProductEntity = await this.productsRepository.save(partialProductEntity);

    await this.productColorSizesRepository.delete({ product: savedProductEntity } as FindOptionsWhere<ProductColorSizeEntity>);
    const productColorSizeEntities = await this.getProductColorSizes(product.productColorSizes, savedProductEntity);
    const savedProductColorSizeEntities = await this.productColorSizesRepository.save(productColorSizeEntities);

    return this.productConverter.convertToViewDto(savedProductEntity, savedProductColorSizeEntities);
  }

  private async getProductColorSizes(productColorSizes: ProductColorSizeDto[], productEntity: ProductEntity): Promise<ProductColorSizeEntity[]> {
    const colorIds = new Set(productColorSizes.map(productColorSize => productColorSize.colorId));
    const sizeIds = new Set(productColorSizes.map(productColorSize => productColorSize.sizeId));

    const colorEntities = await this.settingsService.getSettingEntitiesByIds<ColorEntity>(Array.from(colorIds), SettingType.COLORS);
    const sizeEntities = await this.settingsService.getSettingEntitiesByIds<SizeEntity>(Array.from(sizeIds), SettingType.SIZES);

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

  private async findProductById(id: number): Promise<ProductEntity> {
    return this.productsRepository.findOne({ where: { id: id } as FindOptionsWhere<ProductEntity> });
  }
}
