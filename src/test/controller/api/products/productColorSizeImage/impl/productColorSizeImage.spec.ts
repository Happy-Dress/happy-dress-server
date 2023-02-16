import {ISettingsService} from "../../../../../../app/service/settings/settings.service.abstraction";
import {Test} from "@nestjs/testing";
import {ProductEntity} from "../../../../../../app/repository/product/entity/product.entity";
import {
    ProductColorSizeEntity
} from "../../../../../../app/repository/product/product-color-size/entity/product-color-size.entity";
import {
    ProductColorSizeImagesService
} from "../../../../../../app/service/products/productColorSizeImage/impl/productColorSizeImages.service";
import {
    generateColorEntity, generateProductColorImageEntity,
    generateProductColorSizeEntity,
    generateProductEntity, generateSizeEntity
} from "../../../../../test-utils/mock-entity-generators";
import {ProductColorSizeDto} from "../../../../../../app/service/products/model/product-color-size.dto";
import {generateProductColorImageDto, generateProductColorSizeDto} from "../../../../../test-utils/mock-dto-generators";
import {ColorEntity} from "../../../../../../app/repository/settings/color/entity/color.entity";
import {SizeEntity} from "../../../../../../app/repository/settings/size/enitity/size.entity";
import {ProductColorImageDto} from "../../../../../../app/service/products/model/product-color-image.dto";
import {
    ProductColorImageEntity
} from "../../../../../../app/repository/product/product-color-image/entity/product-color-image.entity";

describe('ProductColorSizeImage', () => {
    let settingsService: ISettingsService;
    let productColorSizeImageService: ProductColorSizeImagesService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                ProductColorSizeImagesService,
                {
                    provide: ISettingsService,
                    useValue: {
                        getSettingEntityById: jest.fn(),
                        getSettingEntitiesByIds: jest.fn()
                    }
                },
            ],

        }).compile();

        settingsService = moduleRef.get<ISettingsService>(ISettingsService);
        productColorSizeImageService = moduleRef.get<ProductColorSizeImagesService>(ProductColorSizeImagesService);
    });

    it('should get productColorSize', async () => {
        const productEntity: ProductEntity = generateProductEntity();
        const productColorSizeDTOs: ProductColorSizeDto[] = [generateProductColorSizeDto()];

        const productColorSizeEntities: ProductColorSizeEntity[] = [generateProductColorSizeEntity()];

        const colorEntities: ColorEntity[] = [generateColorEntity()];
        const sizeEntities: SizeEntity[] = [generateSizeEntity()];

        jest.spyOn(settingsService, 'getSettingEntitiesByIds').mockResolvedValueOnce(colorEntities);
        jest.spyOn(settingsService, 'getSettingEntitiesByIds').mockResolvedValueOnce(sizeEntities);

        const actualProductColorSizeEntities = await productColorSizeImageService.getProductColorSizes(productColorSizeDTOs, productEntity);
        expect(actualProductColorSizeEntities[0].id).toBe(null);
        expect(actualProductColorSizeEntities[0].product).toBe(productEntity);
        expect(actualProductColorSizeEntities[0].color).toStrictEqual(productColorSizeEntities[0].color);
        expect(actualProductColorSizeEntities[0].size).toStrictEqual(productColorSizeEntities[0].size);
    })

    it('should get productColorImages', async () => {
        const productEntity: ProductEntity = generateProductEntity();
        const productColorImageDTOs: ProductColorImageDto[] = [generateProductColorImageDto()];

        const productColorImageEntities: ProductColorImageEntity[] = [generateProductColorImageEntity()];

        const colorEntities: ColorEntity[] = [generateColorEntity()];

        jest.spyOn(settingsService, 'getSettingEntitiesByIds').mockResolvedValue(colorEntities);
        const actualProductColorImageEntities = await productColorSizeImageService.getProductColorImages(productColorImageDTOs, productEntity);
        expect(actualProductColorImageEntities[0].id).toBe(null);
        expect(actualProductColorImageEntities[0].product).toBe(productEntity);
        expect(actualProductColorImageEntities[0].color).toStrictEqual(productColorImageEntities[0].color);
        expect(actualProductColorImageEntities[0].imageUrls).toStrictEqual(productColorImageEntities[0].imageUrls);

    });
})