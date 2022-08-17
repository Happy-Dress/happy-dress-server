import {
    IMAGE_EXTENSIONS,
    MAX_IMAGE_SIZE,
    MIN_IMAGE_SIZE,
} from '../constants/validate-image/validate-image.constants';
import { Injectable } from '@nestjs/common';
import { FailedUploadResult } from '../model/FailedUploadResult';
import { INVALID_EXTENSION, INVALID_SIZE } from '../../../exceptions/constants/image.exception.constants';
import { Image } from '../model/Image';

@Injectable()
export class ImageValidator {
    public getInvalidImages(images: Image[]): FailedUploadResult[] {
        const failedImages: FailedUploadResult[] = [];
        images.forEach(image => {
            if (!this.isValidExtension(image)) {
                failedImages.push({
                    id: image.id,
                    imageName: image.originalname,
                    reason: `${INVALID_EXTENSION} ${image.mimetype}`,
                });
                return;
            }
            if (!this.isValidSize(image)) {
                failedImages.push({
                    id: image.id,
                    imageName: image.originalname,
                    reason: `${INVALID_SIZE}`,
                });
            }
        });
        return failedImages;
    }
    
    private isValidExtension(image: Express.Multer.File): boolean {
        return IMAGE_EXTENSIONS.includes(image.mimetype);
    }
    
    private isValidSize(image: Express.Multer.File): boolean {
        return image.size > MIN_IMAGE_SIZE && image.size < MAX_IMAGE_SIZE;
    }

}
