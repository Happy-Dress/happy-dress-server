import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadedImageModel } from '../../client/google-drive/models/uploaded-image.model';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IImageService } from '../../service/image/image.service.abstraction';


@Controller('images')
export class ImageController {

    constructor(private readonly imageService: IImageService) {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    public async createDress(@UploadedFiles() files: Express.Multer.File[]): Promise<UploadedImageModel[]> {
        return await this.imageService.uploadImages(files);
    }
}