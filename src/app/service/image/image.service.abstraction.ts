import { FilesUploadResult } from './model/FilesUploadResult';

export abstract class IImageService {

  public abstract uploadImages(images: Express.Multer.File[]): Promise<FilesUploadResult>;
}