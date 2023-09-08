import { Inject, Injectable } from '@nestjs/common';
import { ImageValidator } from '../validator/image.validator';
import { IImageService } from '../image.service.abstraction';
import { IGoogleDriveClient } from '../../../client/google-drive/google-drive.client.abstraction';
import { Image } from '../model/Image.model';
import { ImageConverter } from '../util/converters/image.converter';
import { ImagesUploadResult } from '../model/ImagesUploadResult.model';

const IMAGES_FOLDER_NAME = 'images';

@Injectable()
export class ImageService implements IImageService {

    @Inject()
    private readonly googleDriveClient: IGoogleDriveClient;

    @Inject()
    private readonly imageValidator: ImageValidator;

    @Inject()
    private readonly imageConverter: ImageConverter;


    public async uploadImages(files: Express.Multer.File[]): Promise<ImagesUploadResult> {
      const images: Image[] = files.map((file, index) => ({ id : index, ...file }));
      const { validImages, invalidImagesMap } = this.imageValidator.getImageValidationResult(images);
      const filesUploadResult = await this.googleDriveClient.uploadFiles(validImages, IMAGES_FOLDER_NAME);
      const imageUploadResult = this.imageConverter.convertToImagesUploadResult(filesUploadResult);
      imageUploadResult.failedImages.push(...invalidImagesMap.values());
      return imageUploadResult;
    }
}