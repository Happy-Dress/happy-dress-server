import { UploadedFileModel } from './UploadedFile.model';
import { FailedUploadResult } from './FailedUploadResult.model';

export interface FilesUploadResult {
  uploadedFiles: UploadedFileModel[],
  failedFiles: FailedUploadResult[],
}