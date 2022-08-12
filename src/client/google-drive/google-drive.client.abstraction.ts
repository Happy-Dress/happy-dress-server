import { UploadedImageModel } from './models/uploaded-image.model';
export abstract class IGoogleDriveClient {

    public abstract uploadImages(images: Express.Multer.File[]): Promise<UploadedImageModel[]>;
}
