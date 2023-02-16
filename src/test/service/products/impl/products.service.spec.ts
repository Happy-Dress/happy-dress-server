import {ProductsService} from "../../../../app/service/products/impl/products.service";
import {Test} from "@nestjs/testing";
import {getRepositoryToken} from "@nestjs/typeorm";
import {MockType, repositoryMockFactory} from "../../../test-utils/test-utils";
import {ProductEntity} from "../../../../app/repository/product/entity/product.entity";
import {
    generateProductColorImageViewDto,
    generateProductColorSizeViewDto, generateProductDto,
    generateProductViewDto,
} from "../../../test-utils/mock-dto-generators";
import {ProductViewDto} from "../../../../app/service/products/model/product.view.dto";
import {Repository} from "typeorm";
import {
    ProductColorSizeEntity
} from "../../../../app/repository/product/product-color-size/entity/product-color-size.entity";
import {
    generateCategoryEntity,
    generateProductColorImageEntity,
    generateProductColorSizeEntity,
    generateProductEntity, generateSimpleListEntity
} from "../../../test-utils/mock-entity-generators";
import {
    ProductColorImageEntity
} from "../../../../app/repository/product/product-color-image/entity/product-color-image.entity";
import {ProductConverter} from "../../../../app/service/products/util/converters/product.converter";
import {ProductColorSizeViewDto} from "../../../../app/service/products/model/product-color-size.view.dto";
import {ProductColorImageViewDto} from "../../../../app/service/products/model/product-color-image.view.dto";
import {ISettingsService} from "../../../../app/service/settings/settings.service.abstraction";
import {
    IProductColorSizeImagesService
} from "../../../../app/service/products/productColorSizeImage/productColorSizeImages.service.abstraction";
import {ProductDto} from "../../../../app/service/products/model/product.dto";
import {CategoryEntity} from "../../../../app/repository/settings/category/entity/category.entity";
import {ModelEntity} from "../../../../app/repository/settings/model/entity/model.entity";
import {MaterialEntity} from "../../../../app/repository/settings/material/entity/material.entity";

jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),
}));

describe('ProductsService', () => {
    let settingsService: ISettingsService;
    let productColorSizeImageService: IProductColorSizeImagesService;
    let productsService: ProductsService;
    let productsRepository: MockType<Repository<ProductEntity>>;
    let productColorSizesRepository: MockType<Repository<ProductColorSizeEntity>>;
    let productColorImagesRepository: MockType<Repository<ProductColorImageEntity>>;
    let productConverter: ProductConverter;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: ISettingsService,
                    useValue: {
                        getSettingEntityById: jest.fn(),
                        getSettingEntitiesByIds: jest.fn()
                    }
                },
                {
                    provide: IProductColorSizeImagesService,
                    useValue: {
                        getProductColorSizes: jest.fn(),
                        getProductColorImages: jest.fn()
                    }
                },
                {
                    provide: ProductConverter,
                    useValue: {
                        convertToViewDto: jest.fn(),
                        convertToPartialEntity: jest.fn(),
                    }
                },

                { provide: getRepositoryToken(ProductEntity), useFactory: repositoryMockFactory},
                { provide: getRepositoryToken(ProductColorSizeEntity), useFactory: repositoryMockFactory},
                { provide: getRepositoryToken(ProductColorImageEntity), useFactory: repositoryMockFactory},
            ],

        }).compile();

        settingsService = moduleRef.get<ISettingsService>(ISettingsService);
        productColorSizeImageService = moduleRef.get<IProductColorSizeImagesService>(IProductColorSizeImagesService);
        productsService = moduleRef.get<ProductsService>(ProductsService);
        productsRepository = moduleRef.get(getRepositoryToken(ProductEntity));
        productColorSizesRepository = moduleRef.get(getRepositoryToken(ProductColorSizeEntity));
        productColorImagesRepository = moduleRef.get(getRepositoryToken(ProductColorImageEntity));
        productConverter = moduleRef.get<ProductConverter>(ProductConverter);



        jest.mock('typeorm-transactional', () => ({
            Transactional: () => () => ({}),
        }));
    });

    it('should get product', async () => {
        const id = generateProductEntity().id;
        const productEntity: ProductEntity = generateProductEntity();
        const productColorSizeEntities: ProductColorSizeEntity = generateProductColorSizeEntity();
        const productColorImageEntities: ProductColorImageEntity = generateProductColorImageEntity();

        const productViewDto: ProductViewDto = generateProductViewDto();
        const productColorSizeViewDto: ProductColorSizeViewDto[] = [generateProductColorSizeViewDto()];
        const productColorImageViewDto: ProductColorImageViewDto[] = [generateProductColorImageViewDto()];

        productsRepository.findOne.mockReturnValue(productEntity);
        productColorSizesRepository.findBy.mockReturnValue(productColorSizeEntities);
        productColorImagesRepository.findBy.mockReturnValue(productColorImageEntities);

        jest.spyOn(productConverter, 'convertToViewDto').mockResolvedValue(productViewDto);

        const productDto: ProductViewDto = await productsService.getProduct(id);
        expect(productDto.id).toBe(id);
        expect(productDto.name).toBe(productViewDto.name);
        expect(productDto.description).toBe(productViewDto.description);
        expect(productDto.category).toBe(productViewDto.category);
        expect(productDto.model).toBe(productViewDto.model);
        expect(productDto.materials).toStrictEqual(productViewDto.materials);
        expect(productDto.productColorSizes).toStrictEqual(productColorSizeViewDto);
        expect(productDto.productColorImages).toStrictEqual(productColorImageViewDto);
    });

    it('should delete product', async () => {
        const id = 1;
        const deleteResult = {} as never;
        productsRepository.delete.mockResolvedValue(deleteResult);
        await productsService.deleteProduct(id);
        expect(productsRepository.delete).toHaveBeenCalled();
    });

    it('should create product', async () => {

        const productDto: ProductDto = generateProductDto();
        const productViewDto: ProductViewDto = generateProductViewDto();

        const productEntity: Partial<ProductEntity> = generateProductEntity();

        const productColorSizeViewDto: ProductColorSizeViewDto[] = [generateProductColorSizeViewDto()];
        const productColorImageViewDto: ProductColorImageViewDto[] = [generateProductColorImageViewDto()];

        const categoryEntity: CategoryEntity = generateCategoryEntity();
        const modelEntity: ModelEntity = generateSimpleListEntity();
        const materialEntities: MaterialEntity[] = [generateSimpleListEntity()];

        jest.spyOn(productConverter, 'convertToPartialEntity').mockImplementation(() => productEntity);
        jest.spyOn(settingsService, 'getSettingEntitiesByIds').mockResolvedValueOnce(materialEntities);
        jest.spyOn(settingsService, 'getSettingEntityById').mockResolvedValueOnce(categoryEntity);
        jest.spyOn(settingsService, 'getSettingEntityById').mockResolvedValueOnce(modelEntity);
        jest.spyOn(productConverter, 'convertToViewDto').mockResolvedValue(productViewDto);

        const actualProductViewDto: ProductViewDto = await productsService.createProduct(productDto);

        expect(actualProductViewDto.name).toBe(actualProductViewDto.name);
        expect(actualProductViewDto.description).toBe(actualProductViewDto.description);
        expect(actualProductViewDto.category).toBe(actualProductViewDto.category);
        expect(actualProductViewDto.model).toBe(actualProductViewDto.model);
        expect(actualProductViewDto.materials).toStrictEqual(actualProductViewDto.materials);
        expect(actualProductViewDto.productColorSizes).toStrictEqual(productColorSizeViewDto);
        expect(actualProductViewDto.productColorImages).toStrictEqual(productColorImageViewDto);
    });

    it('should update product', async () => {
        const id = 1;

        const productDto: ProductDto = generateProductDto();
        const productViewDto: ProductViewDto = generateProductViewDto();

        const productEntity: Partial<ProductEntity> = generateProductEntity();

        const productColorSizeViewDto: ProductColorSizeViewDto[] = [generateProductColorSizeViewDto()];
        const productColorImageViewDto: ProductColorImageViewDto[] = [generateProductColorImageViewDto()];

        const categoryEntity: CategoryEntity = generateCategoryEntity();
        const modelEntity: ModelEntity = generateSimpleListEntity();
        const materialEntities: MaterialEntity[] = [generateSimpleListEntity()];


        jest.spyOn(productConverter, 'convertToPartialEntity').mockImplementation(() => productEntity);
        jest.spyOn(settingsService, 'getSettingEntitiesByIds').mockResolvedValueOnce(materialEntities);
        jest.spyOn(settingsService, 'getSettingEntityById').mockResolvedValueOnce(categoryEntity);
        jest.spyOn(settingsService, 'getSettingEntityById').mockResolvedValueOnce(modelEntity);
        jest.spyOn(productConverter, 'convertToViewDto').mockResolvedValue(productViewDto);

        const actualProductViewDto: ProductViewDto = await productsService.updateProduct(id, productDto);

        expect(actualProductViewDto.name).toBe(actualProductViewDto.name);
        expect(actualProductViewDto.description).toBe(actualProductViewDto.description);
        expect(actualProductViewDto.category).toBe(actualProductViewDto.category);
        expect(actualProductViewDto.model).toBe(actualProductViewDto.model);
        expect(actualProductViewDto.materials).toStrictEqual(actualProductViewDto.materials);
        expect(actualProductViewDto.productColorSizes).toStrictEqual(productColorSizeViewDto);
        expect(actualProductViewDto.productColorImages).toStrictEqual(productColorImageViewDto);
    });
})