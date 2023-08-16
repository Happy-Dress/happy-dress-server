import {IProductsService} from "../../../../../app/service/products/products.service.abstraction";
import {Test} from "@nestjs/testing";
import {ProductsSecureController} from "../../../../../app/controller/api/secure/products/products.secure.controller";
import {generateProductSearchDto, generateProductSearchViewDto} from "../../../../test-utils/mock-dto-generators";

describe('ProductsSecureController', () => {
    let productsSecureController: ProductsSecureController;
    let productsService: IProductsService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                {
                    provide: IProductsService,
                    useValue: {
                        getProduct: jest.fn(),
                        createProduct: jest.fn(),
                        updateProduct: jest.fn(),
                        deleteProducts: jest.fn(),
                        searchProducts: jest.fn(),
                    },
                },
            ],
            controllers: [ProductsSecureController],
        }).compile();

        productsService = moduleRef.get<IProductsService>(IProductsService);
        productsSecureController = moduleRef.get<ProductsSecureController>(ProductsSecureController);
    });

    describe('get',  () => {
        it('should return product', async () => {
            const id = 1;
            const result = {} as any;
            jest.spyOn(productsService, 'getProduct').mockImplementation(() => result);
            const actualResult = await productsSecureController.getProduct(id);
            expect(actualResult).toBe(result);
        });
    });

    describe('create',  () => {
        it('should create product', async () => {
            const product = {} as any;
            const result = {} as any;
            jest.spyOn(productsService, 'createProduct').mockImplementation(() => result);
            const actualResult = await productsSecureController.createProduct(product);
            expect(actualResult).toBe(result);
        });
    });

    describe('update',  () => {
        it('should update product', async () => {
            const id = 1;
            const product = {} as any;
            const result = {} as any;
            jest.spyOn(productsService, 'updateProduct').mockImplementation(() => result);
            const actualResult = await productsSecureController.updateProduct(id, product);
            expect(actualResult).toBe(result);
        });
    });

    describe('delete',  () => {
        it('should delete product', async () => {
            const ids = [1];
            jest.spyOn(productsService, 'deleteProducts').mockResolvedValue();
            await productsSecureController.deleteProducts(ids);
            expect(productsService.deleteProducts).toHaveBeenCalled();
        });
    });

    describe('search', () => {
        it('should find product by many options', async () => {
            const productSearchDto = generateProductSearchDto();
            const result = generateProductSearchViewDto() as any;
            jest.spyOn(productsService, 'searchProducts').mockImplementation(() => result);
            const actualResult = await productsSecureController.search(productSearchDto);
            expect(actualResult).toStrictEqual(result);
        });
    });
});