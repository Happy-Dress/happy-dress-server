import { Inject, Injectable } from '@nestjs/common';
import { ImageValidator } from '../validator/image.validator';
import { IImageService } from '../image.service.abstraction';
import { IGoogleDriveClient } from '../../../client/google-drive/google-drive.client.abstraction';
import { ImageUploadResult } from '../model/ImageUploadResult';
import { Image } from '../model/Image';

@Injectable()
export class ImageService implements IImageService {

    @Inject()
    private readonly googleDriveClient: IGoogleDriveClient;

    @Inject()
    private readonly imageValidator: ImageValidator;

    public async uploadImages(files: Express.Multer.File[]): Promise<ImageUploadResult> {
        const images: Image[] = files.map((file, index) => ({ id : index, ...file }));
        const { validImages, invalidImagesMap } = this.imageValidator.getImageValidationResult(images);
        const uploadResult = await this.googleDriveClient.uploadImages(validImages);
        uploadResult.failedImages.push(...invalidImagesMap.values());
        return uploadResult;
    }
}