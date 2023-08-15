import { ProductsController } from '../../../../app/controller/api/unsecure/products/products.controller';
import { IProductsService } from '../../../../app/service/products/products.service.abstraction';
import { Test } from '@nestjs/testing';
import { generateProductSearchDto, generateProductSearchViewDto } from '../../../test-utils/mock-dto-generators';


describe('ProductsController', () => {
  let productsController: ProductsController;
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
              deleteProduct: jest.fn(),
              searchProducts: jest.fn(),
            },
          },
        ],
        controllers: [ProductsController],
      }).compile();

      productsService = moduleRef.get<IProductsService>(IProductsService);
      productsController = moduleRef.get<ProductsController>(ProductsController);
    });

    describe('get',  () => {
        it('should return product', async () => {
          const id = 1;
          const result = {} as any;
            jest.spyOn(productsService, 'getProduct').mockImplementation(() => result);
            const actualResult = await productsController.getProduct(id);
            expect(actualResult).toBe(result);
        });
    });

    describe('create',  () => {
        it('should create product', async () => {
          const product = {} as any;
          const result = {} as any;
            jest.spyOn(productsService, 'createProduct').mockImplementation(() => result);
            const actualResult = await productsController.createProduct(product);
            expect(actualResult).toBe(result);
        });
    });

    describe('update',  () => {
        it('should update product', async () => {
          const id = 1;
          const product = {} as any;
          const result = {} as any;
            jest.spyOn(productsService, 'updateProduct').mockImplementation(() => result);
            const actualResult = await productsController.updateProduct(id, product);
            expect(actualResult).toBe(result);
        });
    });

    describe('delete',  () => {
        it('should delete product', async () => {
          const id = 1;
            jest.spyOn(productsService, 'deleteProduct').mockResolvedValue();
            await productsController.deleteProduct(id);
            expect(productsService.deleteProduct).toHaveBeenCalled();
        });
    });

    describe('search', () => {
        it('should find product by many options', async () => {
          const productSearchDto = generateProductSearchDto();
          const result = generateProductSearchViewDto() as any;
            jest.spyOn(productsService, 'searchProducts').mockImplementation(() => result);
            const actualResult = await productsController.search(productSearchDto);
            expect(actualResult).toStrictEqual(result);
        });
    });
});