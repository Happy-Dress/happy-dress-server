import {
  COEFFICIENT_BYTES_TO_MEGABYTES, FRACTION_DIGITS,
  IMAGE_EXTENSIONS, MAX_AMOUNT,
  MAX_IMAGE_SIZE,
  MIN_IMAGE_SIZE,
} from '../constants/validate-image/validate-image.constants';
import { Injectable } from '@nestjs/common';
import {
  INVALID_EXTENSION_MESSAGE,
  INVALID_IMAGES_AMOUNT_MESSAGE,
  INVALID_SIZE_MESSAGE,
} from '../../../messages/constants/messages.constants';
import { Image } from '../model/Image.model';
import { ImageValidationResult } from '../model/ImageValidationResult.model';
import { FailedImage } from '../model/FailedImage.model';

@Injectable()
export class ImageValidator {

  public getImageValidationResult(images: Image[]): ImageValidationResult {
    let invalidImagesMap = this.getInvalidImages(images);
    let validImages = this.getValidImages(images, invalidImagesMap);
    const overLimitedImagesMap = this.getOverLimitImages(validImages);
    invalidImagesMap = new Map([...invalidImagesMap, ...overLimitedImagesMap]);
    validImages = this.getValidImages(validImages, invalidImagesMap);
    return {
      invalidImagesMap: invalidImagesMap,
      validImages,
    };
  }

  private getOverLimitImages(images: Image[]): Map<number, FailedImage> {
    const oddImagesMap: Map<number, FailedImage> = new Map;
    if (images.length >= MAX_AMOUNT) {
      const oddImages = images.slice(MAX_AMOUNT, images.length);
            oddImages.forEach(image => {
                oddImagesMap.set(image.id, this.getFailedResult(image, INVALID_IMAGES_AMOUNT_MESSAGE));
            });
    }
    return oddImagesMap;
  }

  private getInvalidImages(images: Image[]): Map<number, FailedImage> {
    const failedImages: Map<number, FailedImage> = new Map;
        images.forEach(image => {
          const reason = this.checkIsValidExtension(image) || this.checkIsValidSize(image);
          if (reason) {
                failedImages.set(image.id, this.getFailedResult(image, reason));
          }
        });
        return failedImages;
  }
    
  private getValidImages(images: Image[], failedImages: Map<number, FailedImage>): Image[] {
    return images.filter(image => !failedImages.has(image.id));
  }
    
  private getFailedResult(image: Image, reason: string): FailedImage {
    return {
      id: image.id,
      imageName: image.originalname,
      reason,
    };
  }

  private checkIsValidExtension(image: Express.Multer.File): string {
    return IMAGE_EXTENSIONS.includes(image.mimetype) ? '' : this.getInvalidExtensionMessage(image.mimetype);
  }

  private checkIsValidSize(image: Express.Multer.File): string {
    return image.size > MIN_IMAGE_SIZE && image.size < MAX_IMAGE_SIZE ? '' : this.getInvalidSizeMessage(image.size);
  }

  private getInvalidSizeMessage(imageSize: number): string {
    const minSizeMB = (MIN_IMAGE_SIZE * COEFFICIENT_BYTES_TO_MEGABYTES).toFixed(FRACTION_DIGITS);
    const maxSizeMB = (MAX_IMAGE_SIZE * COEFFICIENT_BYTES_TO_MEGABYTES).toFixed(FRACTION_DIGITS);
    const currSizeMB = (imageSize * COEFFICIENT_BYTES_TO_MEGABYTES).toFixed(FRACTION_DIGITS);
    return INVALID_SIZE_MESSAGE
      .replace('$min', minSizeMB)
      .replace('$max', maxSizeMB)
      .replace('$current', currSizeMB);
  }

  private getInvalidExtensionMessage(imageType: string): string {
    return INVALID_EXTENSION_MESSAGE
      .replace('$current', imageType)
      .replace('$valid', IMAGE_EXTENSIONS.toString());
  }

}
