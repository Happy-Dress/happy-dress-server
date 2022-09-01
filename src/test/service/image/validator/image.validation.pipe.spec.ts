
import { NullFileValidationPipe } from '../../../../app/service/image/validator/image.validation.pipe';
import { Image } from '../../../../app/service/image/model/Image';
import { BadRequestException } from '@nestjs/common';
import { NULL_IMAGES_DETECTED } from '../../../../app/messages/constants/messages.constants';

describe('NullFileValidationPipe', () => {
    let nullFileValidationPipe: NullFileValidationPipe;
    const error = new BadRequestException(NULL_IMAGES_DETECTED);
    
    beforeEach( () => {
        nullFileValidationPipe = new NullFileValidationPipe();
    });

    describe('upload',  () => {
        it('should validate files and return them', () => {
            const files = [
                {
                    id: 0,
                },
            ] as Image[];
            const result = files;
            const actualResult = nullFileValidationPipe.transform(files);
            expect(actualResult).toBe(result);
        });
        it.each([
            { files: [] as Image[] },
            { files: null as Image[] }, 
        ])('should throw an exception 400', ({ files }) => {
            expect(() => nullFileValidationPipe.transform(files)).toThrow(error);
        });
    });
});