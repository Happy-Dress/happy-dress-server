import { FilesUploadResult } from '../../service/image/model/FilesUploadResult';
import { UploadedFileModel } from './models/uploaded-file.model';

export abstract class IGoogleDriveClient {
  public abstract uploadFiles(images: Express.Multer.File[], folderName: string): Promise<FilesUploadResult>;
  public abstract uploadFile(htmlBlog: Express.Multer.File, folderName: string, fileId?: number): Promise<UploadedFileModel>;
}
