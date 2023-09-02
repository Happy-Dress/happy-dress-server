import { ProductConverter } from '../../../../../app/service/products/util/converters/product.converter';
import { CategoryConverter } from '../../../../../app/service/settings/util/converters/category.converter';
import { SimpleListSettingConverter } from '../../../../../app/service/util/converter/simple.list.setting.converter';
import { Test } from '@nestjs/testing';
import { ProductDto } from '../../../../../app/service/products/model/product.dto';
import {
  generateCategoryDto, generateMaterialDto, generateModelDto,
  generateProductColorImageViewDto,
  generateProductColorSizeViewDto,
  generateProductDto, generateProductViewDto,
} from '../../../../test-utils/mock-dto-generators';
import { ProductEntity } from '../../../../../app/repository/product/entity/product.entity';
import {
  generateProductColorImageEntity,
  generateProductColorSizeEntity,
  generateProductEntity,
} from '../../../../test-utils/mock-entity-generators';
import {
  ProductColorImageEntity,
} from '../../../../../app/repository/product/product-color-image/entity/product-color-image.entity';
import { ProductColorImageViewDto } from '../../../../../app/service/products/model/product-color-image.view.dto';
import {
  ProductColorSizeEntity,
} from '../../../../../app/repository/product/product-color-size/entity/product-color-size.entity';
import { ProductColorSizeViewDto } from '../../../../../app/service/products/model/product-color-size.view.dto';
import { ProductViewDto } from '../../../../../app/service/products/model/product.view.dto';
import { CategoryDto } from '../../../../../app/service/settings/model/category.dto';
import { ModelDto } from '../../../../../app/service/settings/model/model.dto';
import { MaterialDto } from '../../../../../app/service/settings/model/material.dto';


describe('ProductConverter', () => {
  let productConverter: ProductConverter;
  let categoryConverter: CategoryConverter;
  let simpleListSettingConverter: SimpleListSettingConverter;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          ProductConverter,
          {
            provide: CategoryConverter,
            useValue: {
              convertToDTO: jest.fn(),
            },
          },
          {
            provide: SimpleListSettingConverter,
            useValue: {
              convertToDTO: jest.fn(),
              convertToDTOs: jest.fn(),
            },
          },
        ],

      }).compile();

      productConverter = moduleRef.get<ProductConverter>(ProductConverter);
      categoryConverter = moduleRef.get<CategoryConverter>(CategoryConverter);
      simpleListSettingConverter = moduleRef.get<SimpleListSettingConverter>(SimpleListSettingConverter);
    });

    it('should convert to partial entity', () => {
      const productDto: ProductDto = generateProductDto();
      const productEntity: ProductEntity = generateProductEntity();

      const actualProductEntity: Partial<ProductEntity> = productConverter.convertToPartialEntity(productDto);
        expect(actualProductEntity.id).toBe(productEntity.id);
        expect(actualProductEntity.name).toBe(productEntity.name);
        expect(actualProductEntity.description).toBe(productEntity.description);
    });

    it('should convert to productColorImageViewDtos', () => {
      const productColorImageEntities: ProductColorImageEntity[] = [generateProductColorImageEntity()];
      const productColorImageViewDTOs: ProductColorImageViewDto[] = [generateProductColorImageViewDto()];

      const actualProductColorImageViewDTOs: ProductColorImageViewDto[] =
            productConverter.convertToProductColorImageViewDtos(productColorImageEntities);

        expect(actualProductColorImageViewDTOs[0].color).toStrictEqual(productColorImageViewDTOs[0].color);
        expect(actualProductColorImageViewDTOs[0].imageURLs).toStrictEqual(productColorImageViewDTOs[0].imageURLs);
    });

    it('should convert to ProductColorSizeViewDtos', () => {
      const productColorSizeEntities: ProductColorSizeEntity[] = [generateProductColorSizeEntity()];
      const productColorSizeViewDTOs: ProductColorSizeViewDto[] = [generateProductColorSizeViewDto()];

      const actualProductColorSizeViewDTOs: ProductColorSizeViewDto[] =
            productConverter.convertToProductColorSizeViewDtos(productColorSizeEntities);

        expect(actualProductColorSizeViewDTOs[0].color).toStrictEqual(productColorSizeViewDTOs[0].color);
        expect(actualProductColorSizeViewDTOs[0].size).toStrictEqual(productColorSizeViewDTOs[0].size);
    });

    it('should convert to viewDto', async () => {
      const productEntity: ProductEntity = generateProductEntity();
      const productColorSizeEntities: ProductColorSizeEntity[] = [generateProductColorSizeEntity()];
      const productColorImageEntities: ProductColorImageEntity[] = [generateProductColorImageEntity()];
      const productViewDto: ProductViewDto = generateProductViewDto();

      const categoryDto: CategoryDto = generateCategoryDto();
      const modelDto: ModelDto = generateModelDto();
      const materialDTOs: MaterialDto[] = [generateMaterialDto()];

        jest.spyOn(categoryConverter, 'convertToDTO').mockResolvedValue(categoryDto);
        jest.spyOn(simpleListSettingConverter, 'convertToDTO').mockResolvedValue(modelDto);
        jest.spyOn(simpleListSettingConverter, 'convertToDTOs').mockResolvedValue(materialDTOs);

        const actualProductViewDto = await productConverter
          .convertToViewDto(productEntity, productColorSizeEntities, productColorImageEntities);

        expect(actualProductViewDto.id).toBe(productViewDto.id);
        expect(actualProductViewDto.name).toBe(productViewDto.name);
        expect(actualProductViewDto.description).toBe(productViewDto.description);
        expect(actualProductViewDto.category).toStrictEqual(productViewDto.category);
        expect(actualProductViewDto.model).toStrictEqual(productViewDto.model);
        expect(actualProductViewDto.materials).toStrictEqual(productViewDto.materials);
        expect(actualProductViewDto.productColorSizes).toStrictEqual(productViewDto.productColorSizes);
        expect(actualProductViewDto.productColorImages).toStrictEqual(productViewDto.productColorImages);
    });
});