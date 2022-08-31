
import { NullFileValidationPipe } from '../../../../app/service/image/validator/image.validation.pipe';
import { Image } from '../../../../app/service/image/model/Image';
import { BadRequestException } from '@nestjs/common';
import { NULL_IMAGES_DETECTED } from '../../../../app/messages/constants/messages.constants';

describe('NullFileValidationPipe', () => {
    let nullFileValidationPipe: NullFileValidationPipe;

    beforeEach( () => {
        nullFileValidationPipe = new NullFileValidationPipe();
    });

    describe('upload',  () => {
        it('should validate files and return them', () => {
            const files: Image[] = [
                {
                    id: 0,
                },
            ] as any[];
            const result = files;
            const actualResult = nullFileValidationPipe.transform(files);
            expect(actualResult).toBe(result);
        });
        it('should throw error 400, reason: array is empty', () => {
            const files = [] as any[];
            const error = new BadRequestException(NULL_IMAGES_DETECTED);
            expect(() => {
                nullFileValidationPipe.transform(files);
            }).toThrow(error);
        });
        it('should throw error 400, reason: file is null ', () => {
            const files = null as Express.Multer.File;
            const error = new BadRequestException(NULL_IMAGES_DETECTED);
            expect(() => {
                nullFileValidationPipe.transform(files);
            }).toThrow(error);
        });
    });
});