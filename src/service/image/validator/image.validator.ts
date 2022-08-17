import {
    IMAGE_EXTENSIONS, MAX_AMOUNT,
    MAX_IMAGE_SIZE,
    MIN_IMAGE_SIZE,
} from '../constants/validate-image/validate-image.constants';
import { Injectable } from '@nestjs/common';
import { FailedUploadResult } from '../model/FailedUploadResult';
import {
    INVALID_EXTENSION,
    INVALID_IMAGES_AMOUNT,
    INVALID_SIZE,
} from '../../../messages/constants/messages.constants';
import { Image } from '../model/Image';
import { ImageValidationResult } from '../model/ImageValidationResult';

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

    private getOverLimitImages(images: Image[]): Map<number, FailedUploadResult> {
        const oddImagesMap: Map<number, FailedUploadResult> = new Map;
        if (images.length >= MAX_AMOUNT) {
            const oddImages = images.slice(MAX_AMOUNT - 1, images.length - 1);
            oddImages.forEach(image => {
                oddImagesMap.set(image.id, this.getFailedResult(image, INVALID_IMAGES_AMOUNT));
            });
        }
        return oddImagesMap;
    }

    private getInvalidImages(images: Image[]): Map<number, FailedUploadResult> {
        const failedImages: Map<number, FailedUploadResult> = new Map;
        images.forEach(image => {
            const reason = this.checkIsValidExtension(image) || this.checkIsValidSize(image);
            if (reason) {
                failedImages.set(image.id, this.getFailedResult(image, reason));
            }
        });
        return failedImages;
    }
    
    private getValidImages(images: Image[], failedImages: Map<number, FailedUploadResult>): Image[] {
        return images.filter(image => !failedImages.has(image.id));
    }
    
    private getFailedResult(image: Image, reason: string): FailedUploadResult {
        return {
            id: image.id,
            imageName: image.originalname,
            reason,
        };
    }
    
    private checkIsValidExtension(image: Express.Multer.File): string {
        return IMAGE_EXTENSIONS.includes(image.mimetype) ? '' : `${INVALID_EXTENSION} ${image.mimetype}`;
    }
    
    private checkIsValidSize(image: Express.Multer.File): string {
        return image.size > MIN_IMAGE_SIZE && image.size < MAX_IMAGE_SIZE ? '' : INVALID_SIZE ;
    }
}
