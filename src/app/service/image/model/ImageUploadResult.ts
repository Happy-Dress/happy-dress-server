import { UploadedImageModel } from '../../../client/google-drive/models/uploaded-image.model';
import { FailedUploadResult } from './FailedUploadResult';

export interface ImageUploadResult {
  uploadedImages: UploadedImageModel[],
  failedImages: FailedUploadResult[],
}