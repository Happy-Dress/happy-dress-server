import { FilesUploadResult } from '../google-drive/models/FilesUploadResult.model';

export abstract class ICloudStorageClient {
  public abstract uploadFiles(images: Express.Multer.File[], folderName: string): Promise<FilesUploadResult>;
}