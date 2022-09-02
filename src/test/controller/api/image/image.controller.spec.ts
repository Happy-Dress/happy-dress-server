import { ImageController } from '../../../../app/controller/api/image/image.controller';
import { Test } from '@nestjs/testing';
import { IImageService } from '../../../../app/service/image/image.service.abstraction';
import { ServiceModule } from '../../../../app/service/service.module';

describe('ImageController', () => {
    let imageController: ImageController;
    let imageService: IImageService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ServiceModule,
            ],
            controllers: [ImageController],
        }).compile();

        imageService = moduleRef.get<IImageService>(IImageService);
        imageController = moduleRef.get<ImageController>(ImageController);
    });

    describe('upload',  () => {
        it('should upload images', async () => {
            const files = [] as any[];
            const result = {} as any;
            jest.spyOn(imageService, 'uploadImages').mockImplementation(() => result);
            const actualResult = await imageController.uploadImages(files);
            expect(actualResult).toBe(result);
        });
    });
});
