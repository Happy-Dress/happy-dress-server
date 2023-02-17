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
import {EntitiesNotFoundByIdsException} from "../../../../app/exception/entities-not-found-by-ids.exception";
import {EntityDuplicateFieldException} from "../../../../app/exception/entity-duplicate-field.exception";

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

        const actualProductViewDto: ProductViewDto = await productsService.getProduct(id);
        expect(actualProductViewDto.id).toBe(id);
        expect(actualProductViewDto.name).toBe(productViewDto.name);
        expect(actualProductViewDto.description).toBe(productViewDto.description);
        expect(actualProductViewDto.category).toBe(productViewDto.category);
        expect(actualProductViewDto.model).toBe(productViewDto.model);
        expect(actualProductViewDto.materials).toStrictEqual(productViewDto.materials);
        expect(actualProductViewDto.productColorSizes).toStrictEqual(productColorSizeViewDto);
        expect(actualProductViewDto.productColorImages).toStrictEqual(productColorImageViewDto);
    });

    it('should throw EntitiesNotFoundByIdsException when getting the product', async () => {
        const id = 1;
        productsRepository.findOne.mockReturnValue(null);
        try{
            await productsService.getProduct(id);
        } catch (error) {
            expect(error).toBeInstanceOf(EntitiesNotFoundByIdsException);
        }
    });

    it('should delete product', async () => {
        const id = 1;
        const deleteResult = {} as never;
        productsRepository.delete.mockResolvedValue(deleteResult);
        await productsService.deleteProduct(id);
        expect(productsRepository.delete).toHaveBeenCalled();
    });

    it('should throw EntitiesNotFoundByIdsException when deleting the product', async () => {
        const id = 1;
        const deleteResult = {
            affected: 0,
        };
        productsRepository.delete.mockReturnValue(deleteResult);
        try{
            await productsService.deleteProduct(id);
        } catch (error) {
            expect(error).toBeInstanceOf(EntitiesNotFoundByIdsException);
        }
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

        expect(actualProductViewDto.name).toBe(productViewDto.name);
        expect(actualProductViewDto.description).toBe(productViewDto.description);
        expect(actualProductViewDto.category).toBe(productViewDto.category);
        expect(actualProductViewDto.model).toBe(productViewDto.model);
        expect(actualProductViewDto.materials).toStrictEqual(productViewDto.materials);
        expect(actualProductViewDto.productColorSizes).toStrictEqual(productColorSizeViewDto);
        expect(actualProductViewDto.productColorImages).toStrictEqual(productColorImageViewDto);
    });

    it('should throw EntityDuplicateFieldException when adding the product', async () => {
        const productDto: ProductDto = generateProductDto();
        const duplicateError = {
            code: 'ER_DUP_ENTRY',
        } as never;
        const productEntity: Partial<ProductEntity> = generateProductEntity();

        const categoryEntity: CategoryEntity = generateCategoryEntity();
        const modelEntity: ModelEntity = generateSimpleListEntity();
        const materialEntities: MaterialEntity[] = [generateSimpleListEntity()];


        jest.spyOn(productConverter, 'convertToPartialEntity').mockImplementation(() => productEntity);
        jest.spyOn(settingsService, 'getSettingEntitiesByIds').mockResolvedValueOnce(materialEntities);
        jest.spyOn(settingsService, 'getSettingEntityById').mockResolvedValueOnce(categoryEntity);
        jest.spyOn(settingsService, 'getSettingEntityById').mockResolvedValueOnce(modelEntity);

        productsRepository.save.mockRejectedValue(duplicateError);
        try{
         await productsService.createProduct(productDto);
        } catch (error) {
            expect(error).toBeInstanceOf(EntityDuplicateFieldException);
        }

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

        expect(actualProductViewDto.name).toBe(productViewDto.name);
        expect(actualProductViewDto.description).toBe(productViewDto.description);
        expect(actualProductViewDto.category).toBe(productViewDto.category);
        expect(actualProductViewDto.model).toBe(productViewDto.model);
        expect(actualProductViewDto.materials).toStrictEqual(productViewDto.materials);
        expect(actualProductViewDto.productColorSizes).toStrictEqual(productColorSizeViewDto);
        expect(actualProductViewDto.productColorImages).toStrictEqual(productColorImageViewDto);
    });

    it('should throw EntitiesNotFoundByIdsException when updating the product', async () => {
        const id = 1;
        const productDto: ProductDto = generateProductDto();
        productsRepository.findOne.mockReturnValue(null);
        try{
            await productsService.updateProduct(id, productDto);
        } catch (error) {
            expect(error).toBeInstanceOf(EntitiesNotFoundByIdsException);
        }
    });
})