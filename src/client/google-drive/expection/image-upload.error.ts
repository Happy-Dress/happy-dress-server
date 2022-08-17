import { FailedUploadResult } from '../../../service/image/model/FailedUploadResult';

export class ImageUploadError extends Error {
    private readonly failedImage: FailedUploadResult;

    constructor(failedImage: FailedUploadResult) {
        super(failedImage.reason);
        this.failedImage = failedImage;
    }

    public getFailedImage(): FailedUploadResult {
        return this.failedImage;
    }
}