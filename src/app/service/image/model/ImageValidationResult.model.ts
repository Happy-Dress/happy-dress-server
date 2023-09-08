import { Image } from './Image.model';
import { FailedImage } from './FailedImage.model';

export interface ImageValidationResult {
  invalidImagesMap: Map<number, FailedImage>;
  validImages:  Image[];
}