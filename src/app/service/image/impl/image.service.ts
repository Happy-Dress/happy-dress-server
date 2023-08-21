import { Inject, Injectable } from '@nestjs/common';
import { ImageValidator } from '../validator/image.validator';
import { IImageService } from '../image.service.abstraction';
import { IGoogleDriveClient } from '../../../client/google-drive/google-drive.client.abstraction';
import { FilesUploadResult } from '../model/FilesUploadResult';
import { Image } from '../model/Image';

const IMAGES_FOLDER_NAME = 'images';

@Injectable()
export class ImageService implements IImageService {

    @Inject()
    private readonly googleDriveClient: IGoogleDriveClient;

    @Inject()
    private readonly imageValidator: ImageValidator;


    public async uploadImages(files: Express.Multer.File[]): Promise<FilesUploadResult> {
      const images: Image[] = files.map((file, index) => ({ id : index, ...file }));
      const { validImages, invalidImagesMap } = this.imageValidator.getImageValidationResult(images);
      const uploadResult = await this.googleDriveClient.uploadFiles(validImages, IMAGES_FOLDER_NAME);
      uploadResult.failedFiles.push(...invalidImagesMap.values());
      return uploadResult;
    }
}