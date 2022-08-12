import { UploadedImageModel } from '../../client/google-drive/models/uploaded-image.model';

export abstract class IImageService {

    public abstract uploadImages(images: Express.Multer.File[]): Promise<UploadedImageModel[]>;
}