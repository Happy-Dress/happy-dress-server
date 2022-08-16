import { ImageUploadResult } from './model/ImageUploadResult';

export abstract class IImageService {

    public abstract uploadImages(images: Express.Multer.File[]): Promise<ImageUploadResult>;
}