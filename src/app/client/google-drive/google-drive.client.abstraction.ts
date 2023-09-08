import { FilesUploadResult } from './models/FilesUploadResult.model';
import { UploadedFileModel } from './models/UploadedFile.model';
import { DownloadedFileModel } from './models/DownloadedFile.model';

export abstract class IGoogleDriveClient {
  public abstract uploadFiles(images: Express.Multer.File[], folderName: string): Promise<FilesUploadResult>;
  public abstract uploadFile(htmlBlog: Express.Multer.File, folderName: string, fileId?: number): Promise<UploadedFileModel>;
  public abstract downloadFile(fileId: string, id?: number): Promise<DownloadedFileModel>;
}
