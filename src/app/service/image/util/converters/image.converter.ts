import { Injectable } from '@nestjs/common';
import { FilesUploadResult } from '../../../../client/google-drive/models/FilesUploadResult.model';
import { ImagesUploadResult } from '../../model/ImagesUploadResult.model';

@Injectable()
export class ImageConverter {
    
    private readonly IMAGE_DEFAULT_URL = 'https://storage.googleapis.com/happy-dress-prod/';
    public convertToImagesUploadResult(files: FilesUploadResult): ImagesUploadResult {
      return {
        uploadedImages: files.uploadedFiles.map((file) => {
          return {
            id: file.id,
            imageName: file.fileName,
            imageLink: `${this.IMAGE_DEFAULT_URL}${file.fileId}`,
          };
        }),
        failedImages: files.failedFiles.map((file) => {
          return {
            id: file.id,
            imageName: file.fileName,
            reason: file.reason,
          };
        }),
      };
    }
}