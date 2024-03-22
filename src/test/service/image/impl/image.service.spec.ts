import { Test } from '@nestjs/testing';
import { ImageValidator } from '../../../../app/service/image/validator/image.validator';
import { IGoogleDriveClient } from '../../../../app/client/google-drive/google-drive.client.abstraction';
import { ImageService } from '../../../../app/service/image/impl/image.service';
import {ImageConverter} from "../../../../app/service/image/util/converters/image.converter";
import {ICloudStorageClient} from "../../../../app/client/cloud-storage/cloud-storage.client.abstraction";

describe('ImageService', () => {
  let imageService: ImageService;
  let imageValidator: ImageValidator;
  let imageConverter: ImageConverter;
  let googleDriveClient: IGoogleDriveClient;
  let cloudStorageClient: ICloudStorageClient;

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
            provide: ImageConverter,
            useValue: {
              convertToImagesUploadResult: jest.fn(),
            }
          },
          {
            provide: IGoogleDriveClient,
            useValue: {
              uploadFiles: jest.fn(),
            },
          },
          {
            provide: ICloudStorageClient,
            useValue: {
              uploadFiles: jest.fn(),
            }
          }
        ],
      }).compile();

      imageService = moduleRef.get<ImageService>(ImageService);
      imageValidator = moduleRef.get<ImageValidator>(ImageValidator);
      imageConverter = moduleRef.get<ImageConverter>(ImageConverter);
      googleDriveClient = moduleRef.get<IGoogleDriveClient>(IGoogleDriveClient);
      cloudStorageClient = moduleRef.get<ICloudStorageClient>(ICloudStorageClient);
    });

    describe('upload',  () => {
        it('should return upload result',  async () => {
          const files = [] as any[];
          const resultImageValidation = {
            validImages: [],
            invalidImagesMap: new Map,
          };
          const resultUploaded = {
            uploadImages: [],
            failedImages: [],
          } as any;
            jest.spyOn(imageValidator, 'getImageValidationResult').mockImplementation(() => resultImageValidation);
            jest.spyOn(googleDriveClient, 'uploadFiles').mockImplementation(() => resultUploaded);
            jest.spyOn(imageConverter, 'convertToImagesUploadResult').mockImplementation(() => resultUploaded);
            const actualResult = await imageService.uploadImages(files);
            expect(actualResult).toBe(resultUploaded);
        });

      it('should return upload result to google cloud storage',  async () => {
        const files = [] as any[];
        const resultImageValidation = {
          validImages: [],
          invalidImagesMap: new Map,
        };
        const resultUploaded = {
          uploadImages: [],
          failedImages: [],
        } as any;
        jest.spyOn(imageValidator, 'getImageValidationResult').mockImplementation(() => resultImageValidation);
        jest.spyOn(cloudStorageClient, 'uploadFiles').mockImplementation(() => resultUploaded);
        jest.spyOn(imageConverter, 'convertToImagesUploadResult').mockImplementation(() => resultUploaded);
        const actualResult = await imageService.uploadImages(files);
        expect(actualResult).toBe(resultUploaded);
      });
    });
});
