import { UploadedFileModel } from '../../../client/google-drive/models/uploaded-file.model';
import { FailedUploadResult } from './FailedUploadResult';

export interface FilesUploadResult {
  uploadedFiles: UploadedFileModel[],
  failedFiles: FailedUploadResult[],
}