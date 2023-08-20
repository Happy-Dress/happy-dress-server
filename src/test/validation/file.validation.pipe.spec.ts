import {BadRequestException} from "@nestjs/common";
import {NULL_FILES_DETECTED} from "../../app/messages/constants/messages.constants";
import {NullFileValidationPipe} from "../../app/validation/file.validation.pipe";

describe('NullFileValidationPipe', () => {
    let nullFileValidationPipe: NullFileValidationPipe;
    const error = new BadRequestException(NULL_FILES_DETECTED);

    beforeEach(() => {
        nullFileValidationPipe = new NullFileValidationPipe();
    })

    describe('upload',  () => {
        it('should validate file and return it', () => {
            const file = {} as Express.Multer.File;
            const result = file;
            const actualResult = nullFileValidationPipe.transform(file);
            expect(actualResult).toBe(result);
        });
        it.each([
            { file: undefined as Express.Multer.File },
            { file: null as Express.Multer.File },
        ])('should throw an exception 400', ({ file }) => {
            expect(() => nullFileValidationPipe.transform(file)).toThrow(error);
        });
    })
});