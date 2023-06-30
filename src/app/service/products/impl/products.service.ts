import { Inject, Injectable } from '@nestjs/common';
import { MapUtils } from '../../../util/map-utils';
import { IProductsService } from '../products.service.abstraction';
import { ProductDto } from '../../../repository/model/product.dto';
import { ProductViewDto } from '../../../repository/model/product.view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../../../repository/product/entity/product.entity';
import { FindOptionsWhere, In, Like, Repository } from 'typeorm';
import { ProductConverter } from '../util/converters/product.converter';
import { SettingType } from '../../settings/util/constant/setting.type.enum';
import { CategoryEntity } from '../../../repository/settings/category/entity/category.entity';
import { ModelEntity } from '../../../repository/settings/model/entity/model.entity';
import { MaterialEntity } from '../../../repository/settings/material/entity/material.entity';
import { ISettingsService } from '../../settings/settings.service.abstraction';
import { ProductColorSizeEntity } from '../../../repository/product/product-color-size/entity/product-color-size.entity';
import {
  ProductColorImageEntity,
} from '../../../repository/product/product-color-image/entity/product-color-image.entity';
import { Transactional } from 'typeorm-transactional';
import { EntitiesNotFoundByIdsException } from '../../../exception/entities-not-found-by-ids.exception';
import { IProductColorSizeImagesService } from '../productColorSizeImage/productColorSizeImages.service.abstraction';
import { EntityDuplicateFieldException } from '../../../exception/entity-duplicate-field.exception';
import { ProductSearchDto } from '../../../repository/model/product-search.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { ProductSearchViewDto } from '../../../repository/model/product-search.view.dto';

const PRODUCTS = 'Продукты';


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

  @Inject()
  readonly productColorSizeImagesService: IProductColorSizeImagesService;

  @Transactional()
  public async createProduct(product: ProductDto): Promise<ProductViewDto> {
    const productEntity = await this.getProductEntity(product);
    let savedProductEntity: ProductEntity;
    try {
      savedProductEntity = await this.productsRepository.save(productEntity);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new EntityDuplicateFieldException(PRODUCTS);
      }
    }

    const productColorSizeEntities = await this.productColorSizeImagesService.getProductColorSizes(product.productColorSizes, savedProductEntity);
    const savedProductColorSizeEntities = await this.productColorSizesRepository.save(productColorSizeEntities);

    const productColorImageEntities = await this.productColorSizeImagesService.getProductColorImages(product.productColorImages, savedProductEntity);
    const savedProductColorImageEntities = await this.productColorImagesRepository.save(productColorImageEntities);

    return this.productConverter.convertToViewDto(savedProductEntity, savedProductColorSizeEntities, savedProductColorImageEntities);
  }

  @Transactional()
  public async deleteProduct(id: number): Promise<void> {
    const deleteResult = await this.productsRepository.delete({ id: id } as FindOptionsWhere<ProductEntity>);
    if (deleteResult.affected === 0) {
      throw new EntitiesNotFoundByIdsException([id], PRODUCTS);
    }
  }

  @Transactional()
  public async getProduct(id: number): Promise<ProductViewDto> {
    const productEntity = await this.findProductById(id);

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
    await this.findProductById(id);

    const partialProductEntity = await this.getProductEntity(product);
    partialProductEntity.id = id;

    const savedProductEntity = await this.productsRepository.save(partialProductEntity);

    await this.productColorSizesRepository.delete({ product: savedProductEntity } as FindOptionsWhere<ProductColorSizeEntity>);
    const productColorSizeEntities = await this.productColorSizeImagesService.getProductColorSizes(product.productColorSizes, savedProductEntity);
    const savedProductColorSizeEntities = await this.productColorSizesRepository.save(productColorSizeEntities);

    await this.productColorImagesRepository.delete({ product: savedProductEntity } as FindOptionsWhere<ProductColorImageEntity>);
    const productColorImageEntities = await this.productColorSizeImagesService.getProductColorImages(product.productColorImages, savedProductEntity);
    const savedProductColorImageEntities = await this.productColorImagesRepository.save(productColorImageEntities);

    return this.productConverter.convertToViewDto(savedProductEntity, savedProductColorSizeEntities, savedProductColorImageEntities);
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

  public async searchProducts(productSearchDto: ProductSearchDto): Promise<ProductSearchViewDto> {
    const findOptions = this.buildFindOptions(productSearchDto);

    const paginationRes = await paginate<ProductEntity>(this.productsRepository, {
      page: productSearchDto.page,
      limit: productSearchDto.limit,
    }, findOptions);
    const productIds = paginationRes.items.map(item => item.id);
    const productColorSizeEntities = await this.productColorSizesRepository.findBy({ product: {
      id: In(productIds),
    } } as FindOptionsWhere<ProductColorSizeEntity>);

    const productColorImageEntities = await this.productColorImagesRepository.findBy({ product: {
      id: In(productIds),
    } } as FindOptionsWhere<ProductColorSizeEntity>);

    const productColorSizesMap = MapUtils.groupBy(productColorSizeEntities, (entity) => entity.product.id );
    const productColorImagesMap = MapUtils.groupBy(productColorImageEntities, (entity) => entity.product.id );

    const productViewDtos = Promise.all(
        paginationRes.items.map(item =>
            this.productConverter.convertToViewDto(item, productColorSizesMap.get(item.id), productColorImagesMap.get(item.id))
        ),
    );

    return {
      products: await productViewDtos,
      currentPage: paginationRes.meta.currentPage,
      itemsPerPage: paginationRes.meta.itemsPerPage,
      totalItems: paginationRes.meta.totalItems,
      totalPages: paginationRes.meta.totalPages,
    };
  }

  private async findProductById(id: number): Promise<ProductEntity> {
    const productEntity = await this.productsRepository.findOne({ where: { id: id } as FindOptionsWhere<ProductEntity> });
    if (productEntity === null) {
      throw new EntitiesNotFoundByIdsException([id], PRODUCTS);
    }
    return productEntity;
  }

  private buildFindOptions(productSearchDto: ProductSearchDto): FindOptionsWhere<ProductEntity> {
    const findOptions: Record<any, any> = { where: {} };
    if (productSearchDto?.name) {
      findOptions.where.name = Like('%' + productSearchDto.name + '%');
    }
    if (productSearchDto?.categoryId) {
      findOptions.where.category = { id: productSearchDto.categoryId };
    }
    if (productSearchDto?.modelIds) {
      findOptions.where.model = { id: In(productSearchDto.modelIds) };
    }
    if (productSearchDto?.materialIds) {
      findOptions.where.materials = { id: In(productSearchDto.materialIds) };
    }
    return findOptions as FindOptionsWhere<ProductEntity>;
  }
}
