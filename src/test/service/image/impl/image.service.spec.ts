import { IImageService } from '../../../../app/service/image/image.service.abstraction';
import { Test } from '@nestjs/testing';
import { ServiceModule } from '../../../../app/service/service.module';
import { ImageValidator } from '../../../../app/service/image/validator/image.validator';
import { IGoogleDriveClient } from '../../../../app/client/google-drive/google-drive.client.abstraction';

describe('ImageService', () => {
    let imageService: IImageService;
    let imageValidator: ImageValidator;
    let googleDriveClient: IGoogleDriveClient;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                ServiceModule,
            ],
            providers: [
                ImageValidator,
            ],
        }).compile();

        imageService = moduleRef.get<IImageService>(IImageService);
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
            const resultGoogleDriveClient = {
                uploadImages: [],
                failedImages: [],
            } as any;
            jest.spyOn(imageValidator, 'getImageValidationResult').mockImplementation(() => resultImageValidation);
            jest.spyOn(googleDriveClient, 'uploadImages').mockImplementation(() => resultGoogleDriveClient);
            const actualResult = await imageService.uploadImages(files);
            expect(actualResult).toBe(resultGoogleDriveClient);
        });
    });
});