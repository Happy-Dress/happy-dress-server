import { HttpException, HttpStatus } from '@nestjs/common';
import { FailedDownloadResult } from '../models/FailedDownloadResult.model';

export class FileDownloadError extends HttpException {
    private readonly failedFile: FailedDownloadResult;
    constructor(failedFile: FailedDownloadResult) {
        super(failedFile.reason, HttpStatus.INTERNAL_SERVER_ERROR);
        this.failedFile = failedFile;
    }


    public getFailedFiles(): FailedDownloadResult {
      return this.failedFile;
    }
}