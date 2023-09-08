import { UploadedImage } from './UploadedImage.model';
import { FailedImage } from './FailedImage.model';

export interface ImagesUploadResult {
  uploadedImages: UploadedImage[];
  failedImages: FailedImage[];
}