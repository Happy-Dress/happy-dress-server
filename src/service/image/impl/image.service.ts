import { Inject, Injectable } from '@nestjs/common';
import { ImageValidator } from '../validator/image.validator';
import { IImageService } from '../image.service.abstraction';
import { UploadedImageModel } from '../../../client/google-drive/models/uploaded-image.model';
import { IGoogleDriveClient } from '../../../client/google-drive/google-drive.client.abstraction';

@Injectable()
export class ImageService implements IImageService {

    @Inject()
    private readonly googleDriveClient: IGoogleDriveClient;

    @Inject()
    private readonly imageValidator: ImageValidator;

    public async uploadImages(images: Express.Multer.File[]): Promise<UploadedImageModel[]> {
        this.imageValidator.validate(images);
        return await this.googleDriveClient.uploadImages(images);
    }
    
}