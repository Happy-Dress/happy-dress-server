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
import {
  ProductColorImageEntity,
} from '../../../repository/product/product-color-image/entity/product-color-image.entity';
import { ProductColorImageDto } from '../model/product-color-image.dto';
import { Transactional } from 'typeorm-transactional';


@Injectable()
export class ProductsService implements IProductsService {

  @InjectRepository(ProductEntity)
  readonly productsRepository: Repository<ProductEntity>;

  @InjectRepository(ProductColorSizeEntity)
  readonly productColorSizesRepository: Repository<ProductColorSizeEntity>;
  
  @InjectRepository(ProductColorImageEntity)
  readonly productColorImagesRepository: Repository<ProductColorImageEntity>;

  @Inject()
  readonly productConverter: ProductConverter;

  @Inject()
  readonly settingsService: ISettingsService;

  @Transactional()
  public async createProduct(product: ProductDto): Promise<ProductViewDto> {
    const productEntity = await this.getProductEntity(product);
    const savedProductEntity = await this.productsRepository.save(productEntity);

    const productColorSizeEntities = await this.getProductColorSizes(product.productColorSizes, savedProductEntity);
    const savedProductColorSizeEntities = await this.productColorSizesRepository.save(productColorSizeEntities);
    
    const productColorImageEntities = await this.getProductColorImages(product.productColorImages, savedProductEntity);
    const savedProductColorImageEntities = await this.productColorImagesRepository.save(productColorImageEntities);

    return this.productConverter.convertToViewDto(savedProductEntity, savedProductColorSizeEntities, savedProductColorImageEntities);
  }

  @Transactional()
  public async deleteProduct(id: number): Promise<void> {
    const deleteResult = await this.productsRepository.delete({ id: id } as FindOptionsWhere<ProductEntity>);
    if (deleteResult.affected === 0) {
      throw new EntityNotFoundByIdException(id);
    }

  }

  @Transactional()
  public async getProduct(id: number): Promise<ProductViewDto> {
    const productEntity = await this.findProductById(id);
    if (productEntity === null) {
      throw new EntityNotFoundByIdException(id);
    }

    const productColorSizeEntities = await this.productColorSizesRepository.findBy({ product: {
      id: id,
    } } as FindOptionsWhere<ProductColorSizeEntity>);
    
    const productColorImageEntities = await this.productColorImagesRepository.findBy({ product: {
      id: id,
    } } as FindOptionsWhere<ProductColorSizeEntity>);

    return this.productConverter.convertToViewDto(productEntity, productColorSizeEntities, productColorImageEntities);
  }

  @Transactional()
  public async updateProduct(id: number, product: ProductDto): Promise<ProductViewDto> {
    const partialProductEntity = await this.getProductEntity(product);
    if (await this.findProductById(id) === null) {
      throw new EntityNotFoundByIdException(id);
    }

    partialProductEntity.id = id;

    const savedProductEntity = await this.productsRepository.save(partialProductEntity);

    await this.productColorSizesRepository.delete({ product: savedProductEntity } as FindOptionsWhere<ProductColorSizeEntity>);
    const productColorSizeEntities = await this.getProductColorSizes(product.productColorSizes, savedProductEntity);
    const savedProductColorSizeEntities = await this.productColorSizesRepository.save(productColorSizeEntities);

    await this.productColorImagesRepository.delete({ product: savedProductEntity } as FindOptionsWhere<ProductColorImageEntity>);
    const productColorImageEntities = await this.getProductColorImages(product.productColorImages, savedProductEntity);
    const savedProductColorImageEntities = await this.productColorImagesRepository.save(productColorImageEntities);

    return this.productConverter.convertToViewDto(savedProductEntity, savedProductColorSizeEntities, savedProductColorImageEntities);
  }

  private async getProductColorSizes(productColorSizes: ProductColorSizeDto[],
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
  
  private async getProductColorImages(productColorImages: ProductColorImageDto[],
    productEntity: ProductEntity): Promise<ProductColorImageEntity[]> {
    const colorIds = new Set(productColorImages.map(productColorImage => productColorImage.colorId));
    const colorEntities = await this.settingsService.getSettingEntitiesByIds<ColorEntity>(colorIds, SettingType.COLORS);
    const colorsMap = new Map<number, ColorEntity>(colorEntities.map(colorEntity => [colorEntity.id, colorEntity]));
    return productColorImages.map(productColorImage => {
      return {
        id: null,
        product: productEntity,
        color: colorsMap.get(productColorImage.colorId),
        imageUrl: productColorImage.imageURLs,
      };
    });
  }

  private async getProductEntity(product: ProductDto): Promise<ProductEntity> {
    const categoryEntity = await this.settingsService.getSettingEntityById<CategoryEntity>(product.categoryId, SettingType.CATEGORIES);
    const modelEntity = await this.settingsService.getSettingEntityById<ModelEntity>(product.modelId, SettingType.MODELS);
    const materialIds = new Set<number>(product.materialIds.map(materialId => materialId));
    const materialEntities = await this.settingsService.getSettingEntitiesByIds<MaterialEntity>(materialIds, SettingType.MATERIALS);
    const partialEntity = this.productConverter.convertToPartialEntity(product);
    return {
      id: product.id,
      name: partialEntity.name,
      description: partialEntity.description,
      category: categoryEntity,
      model: modelEntity,
      materials: materialEntities,
    };
  }

  private async findProductById(id: number): Promise<ProductEntity> {
    return this.productsRepository.findOne({ where: { id: id } as FindOptionsWhere<ProductEntity> });
  }
}
