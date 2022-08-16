import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IImageService } from '../../service/image/image.service.abstraction';
import { ImageUploadResult } from '../../service/image/model/ImageUploadResult';


@Controller('images')
export class ImageController {

    constructor(private readonly imageService: IImageService) {}


    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    public async createDress(@UploadedFiles() files: Express.Multer.File[]): Promise<ImageUploadResult> {
        return await this.imageService.uploadImages(files);
    }
}