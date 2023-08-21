import { Test } from '@nestjs/testing';
import { ImageValidator } from '../../../../app/service/image/validator/image.validator';
import { IGoogleDriveClient } from '../../../../app/client/google-drive/google-drive.client.abstraction';
import { ImageService } from '../../../../app/service/image/impl/image.service';

describe('ImageService', () => {
  let imageService: ImageService;
  let imageValidator: ImageValidator;
  let googleDriveClient: IGoogleDriveClient;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          ImageService,
          {
            provide: ImageValidator,
            useValue: {
              getImageValidationResult: jest.fn(),
            },
          },
          {
            provide: IGoogleDriveClient,
            useValue: {
              uploadFiles: jest.fn(),
            },
          },
        ],
      }).compile();

      imageService = moduleRef.get<ImageService>(ImageService);
      imageValidator = moduleRef.get<ImageValidator>(ImageValidator);
      googleDriveClient = moduleRef.get<IGoogleDriveClient>(IGoogleDriveClient);
    });

    describe('upload',  () => {
        it('should return upload result',  async () => {
          const files = [] as any[];
          const resultImageValidation = {
            validImages: [],
            invalidImagesMap: new Map,
          };
          const resultUploaded = {
            uploadFiles: [],
            failedFiles: [],
          } as any;
            jest.spyOn(imageValidator, 'getImageValidationResult').mockImplementation(() => resultImageValidation);
            jest.spyOn(googleDriveClient, 'uploadFiles').mockImplementation(() => resultUploaded);
            const actualResult = await imageService.uploadImages(files);
            expect(actualResult).toBe(resultUploaded);
        });
    });
});
