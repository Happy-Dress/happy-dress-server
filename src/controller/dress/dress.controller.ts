import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { IGoogleDriveClient } from '../../client/google-drive/google-drive.client.abstraction';
import { UploadedImageModel } from '../../client/google-drive/models/uploaded-image.model';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('dress')
export class DressController {

    constructor(private readonly googleDriveClient: IGoogleDriveClient) {}

    @Post('upload-images')
    @UseInterceptors(FilesInterceptor('files'))
    public async upload(@UploadedFiles() files: Express.Multer.File[]): Promise<UploadedImageModel[]> {
        return await this.googleDriveClient.uploadImages(files);
    }
}