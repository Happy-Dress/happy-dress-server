import { IMAGE_EXTENSIONS, MAX_IMAGE_SIZE, MIN_IMAGE_SIZE } from '../constants/validate-image/validate-image-constants';
import { Injectable } from '@nestjs/common';
import { InvalidImageError } from '../excpetion/invalid-image.error';

@Injectable()
export class ImageValidator {
    public validate(images: Express.Multer.File[]): void {
        images.every((image) => {
            if (!IMAGE_EXTENSIONS.includes(image.mimetype)){
                throw new InvalidImageError('Invalid extension.', image.originalname);
            }
            if (!(image.size > MIN_IMAGE_SIZE && image.size < MAX_IMAGE_SIZE)) {
                throw new InvalidImageError('Invalid size.', image.originalname);
            }
        });
    }
}
