import { ImageSecureController } from '../../../../../app/controller/api/secure/image/image.secure.controller';
import { Test } from '@nestjs/testing';
import { IImageService } from '../../../../../app/service/image/image.service.abstraction';

describe('ImageSecureController', () => {
  let imageController: ImageSecureController;
  let imageService: IImageService;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          {
            provide: IImageService,
            useValue: {
              uploadImages: jest.fn(),
              uploadImagesToGoogleDrive: jest.fn(),
            },
          },
        ],
        controllers: [ImageSecureController],
      }).compile();

      imageService = moduleRef.get<IImageService>(IImageService);
      imageController = moduleRef.get<ImageSecureController>(ImageSecureController);
    });

    describe('upload',  () => {
        it('should upload images', async () => {
          const files = [] as any[];
          const result = {} as any;
            jest.spyOn(imageService, 'uploadImages').mockImplementation(() => result);
            const actualResult = await imageController.uploadImages(files);
            expect(actualResult).toBe(result);
        });

        it('should upload images to google cloud storage', async () => {
          const files = [] as any[];
          const result = {} as any;
            jest.spyOn(imageService, 'uploadImagesToGoogleDrive').mockImplementation(() => result);
            const actualResult = await imageController.uploadImagesToGoogleDrive(files);
            expect(actualResult).toBe(result);
        })
    });
});
