import { FailedUploadResult } from '../models/FailedUploadResult.model';
import { HttpException, HttpStatus } from '@nestjs/common';

export class FileUploadError extends HttpException {
    private readonly failedFile: FailedUploadResult;

    constructor(failedFile: FailedUploadResult) {
        super(failedFile.reason, HttpStatus.INTERNAL_SERVER_ERROR);
        this.failedFile = failedFile;
    }

    public getFailedFiles(): FailedUploadResult {
      return this.failedFile;
    }
}