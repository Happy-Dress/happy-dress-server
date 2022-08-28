import { ImageValidator } from '../../../../app/service/image/validator/image.validator';
import { Image } from '../../../../app/service/image/model/Image';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

describe('ImageValidator', () => {

    let imageValidator: ImageValidator;
    
    beforeEach( () => {
        imageValidator = new ImageValidator();
    });

    describe('validate',  () => {
        it('should validate images extension',  () => {
            const images: Image[] = [
                {
                    id: 1,
                    mimetype: 'invalid',
                } as any,
            ];
            const validationResult = imageValidator.getImageValidationResult(images);
            expect(validationResult.validImages.length).toBe(0);
            expect(validationResult.invalidImagesMap.has(images[0].id)).toBeTruthy();
        });
        it('should validate images size',  () => {
            const images: Image[] = [
                {
                    id:1,
                    size: 1e3,
                } as any,
            ];
            const validationResult = imageValidator.getImageValidationResult(images);
            expect(validationResult.validImages.length).toBe(0);
            expect(validationResult.invalidImagesMap.has(images[0].id)).toBeTruthy();
        });
        it('should return valid image',  () => {
            const images: Image[] = [
                {
                    id:1,
                    size: 1e6,
                    mimetype: 'image/jpeg',
                } as any,
            ];
            const validationResult = imageValidator.getImageValidationResult(images);
            expect(isEmpty(validationResult.invalidImagesMap)).toBeTruthy();
            expect(validationResult.validImages.length).toBe(1);
        });
        it('should validate amount of images', () => {
            const file: Image = {
                size: 1e6,
                mimetype: 'image/jpeg',
            } as any;
            const files: Image[] = [file, file, file, file, file, file, file, file, file, file, file];
            const images: Image[] = files.map((image, index) => ({ id: index, ...image }));
            const validationResult = imageValidator.getImageValidationResult(images);
            expect(validationResult.validImages.length).toBe(10);
            expect(validationResult.invalidImagesMap.has(images[10].id)).toBeTruthy();
        });
    });
});