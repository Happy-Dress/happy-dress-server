import { FailedUploadResult } from './FailedUploadResult';
import { Image } from './Image';

export interface ImageValidationResult {
    invalidImagesMap: Map<number, FailedUploadResult>;
    validImages:  Image[];
}