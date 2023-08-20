import { FailedUploadResult } from '../../../service/image/model/FailedUploadResult';
import { HttpException, HttpStatus } from '@nestjs/common';

export class FileUploadError extends HttpException {
    private readonly failedFile: FailedUploadResult;

    constructor(failedImage: FailedUploadResult) {
        super(failedImage.reason, HttpStatus.INTERNAL_SERVER_ERROR);
        this.failedFile = failedImage;
    }

    public getFailedFiles(): FailedUploadResult {
      return this.failedFile;
    }
}