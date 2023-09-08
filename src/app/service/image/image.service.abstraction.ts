import { ImagesUploadResult } from './model/ImagesUploadResult.model';

export abstract class IImageService {

  public abstract uploadImages(images: Express.Multer.File[]): Promise<ImagesUploadResult>;
}