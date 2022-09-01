import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { IImageService } from '../../service/image/image.service.abstraction';
import { ImageUploadResult } from '../../service/image/model/ImageUploadResult';
import { NullFileValidationPipe } from '../../service/image/validator/image.validation.pipe';

@Controller('images')
export class ImageController {

    constructor(private readonly imageService: IImageService) {}

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files'))
    public async uploadImages(@UploadedFiles(NullFileValidationPipe) files: Express.Multer.File[]): Promise<ImageUploadResult> {
        return this.imageService.uploadImages(files);
    }
}