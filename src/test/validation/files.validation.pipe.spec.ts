import { NullFilesValidationPipe } from '../../app/validation/files.validation.pipe';
import { BadRequestException } from '@nestjs/common';
import { NULL_FILES_DETECTED } from '../../app/messages/constants/messages.constants';

describe('NullFilesValidationPipe', () => {
  let nullFilesValidationPipe: NullFilesValidationPipe;
  const error = new BadRequestException(NULL_FILES_DETECTED);
    
    beforeEach( () => {
      nullFilesValidationPipe = new NullFilesValidationPipe();
    });

    describe('upload',  () => {
        it('should validate files and return them', () => {
          const files = [
            {
              id: 0,
            } as any,
          ] as Express.Multer.File[];
          const result = files;
          const actualResult = nullFilesValidationPipe.transform(files);
            expect(actualResult).toBe(result);
        });
        it.each([
          { files: [] as Express.Multer.File[] },
          { files: null as Express.Multer.File[] },
        ])('should throw an exception 400', ({ files }) => {
            expect(() => nullFilesValidationPipe.transform(files)).toThrow(error);
        });
    });
});