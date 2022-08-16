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
        const images: Image[] = [];
        files.forEach(file => images.push({ id : files.indexOf(file), ...file }));
        const invalidImages = this.imageValidator.getInvalidImages(images);
        const invalidImageId = invalidImages.map(image => image.id);
        const validImages = images.filter((image) => !invalidImageId.includes(image.id));
        const uploadResult = await this.googleDriveClient.uploadImages(validImages);
        const failedImages = uploadResult.failedImages || [];
        uploadResult.failedImages = [...failedImages, ...invalidImages];
        return uploadResult;
    }
    
}